import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import './Intailieu.css';
import monster from '../../../Image/monster__1_-removebg-preview (1).png';
import React, { useState, useEffect } from 'react';
import plus from '../../../Image/Frame 46.png';
import doc from '../../../Image/doc.png';
import pdf from '../../../Image/pdf.png';
import axios from 'axios';

const FileConfigurationModal = ({ file, isVisible, onClose, onSave }) => {
  if (!isVisible) return null;

  useEffect(() => {
    const handleMouseMove = (event) => {
      const eyes = document.querySelectorAll('.eye');
      eyes.forEach((eye) => {
        const pupil = eye.querySelector('.pupil');

        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);

        const maxDistance = eyeRect.width / 4;
        const pupilX = Math.cos(angle) * maxDistance;
        const pupilY = Math.sin(angle) * maxDistance;

        pupil.style.transform = `translate(-50%, -50%) translate(${pupilX}px, ${pupilY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="monster-container">
          <div className="monster">
            <img src={monster} alt="Monster" />
            <div className="eye" id="eye-left">
              <div className="pupil"></div>
            </div>
            <div className="eye" id="eye-right">
              <div className="pupil"></div>
            </div>
          </div>
        </div>
        <div className='body-info-printer'>
          <h3>Thay đổi thông số in</h3>
          <div className="modal-body">
            <label>
              <span>Máy in:</span>
              <select>
                <option>Máy in 1</option>
                <option>Máy in 2</option>
              </select>
            </label>
            <label>
              <span>Số trang:</span>
              <select>
                <option>Toàn bộ</option>
                <option>Tùy chọn</option>
              </select>
            </label>
            <label>
              <span>Mặt in:</span>
              <select>
                <option>Một mặt</option>
                <option>Hai mặt</option>
              </select>
            </label>
            <label>
              <span>Khổ giấy:</span>
              <select>
                <option>A4</option>
                <option>A3</option>
              </select>
            </label>
            <label>
              <span>Hướng in:</span>
              <select>
                <option>Dọc</option>
                <option>Ngang</option>
              </select>
            </label>
            <label>
              <span>Số trang mỗi tờ:</span>
              <select>
                <option>1</option>
                <option>2</option>
                <option>4</option>
              </select>
            </label>
            <label>
              <span>Số lượng bản copies:</span>
              <input type="number" min="1" max="100" />
            </label>
          </div>
          <div className="modal-footer">
            <button onClick={onSave}>Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrintConfirmationModal = React.memo(function PrintConfirmationModal({
  isVisible,
  onClose,
  userPages,
  documentPages,
  onConfirm,
}) {
  if (!isVisible) return null;

  const remainingPages = userPages - documentPages;

  return (
    <div className="modal-overlay-modern">
      <div className="modal-box-modern-printall">
        <h3 className="modal-title-modern">Xác nhận in tài liệu</h3>
        <div className="modal-content-modern">
          <p><strong>Số trang hiện có:</strong> {userPages}</p>
          <p><strong>Số trang tài liệu:</strong> {documentPages}</p>
          <p><strong>Số trang còn lại:</strong> {remainingPages < 0 ? 0 : remainingPages}</p>
          {remainingPages < 0 && (
            <p className="modal-warning-modern">
              Bạn không đủ số trang để in tài liệu này.
            </p>
          )}
        </div>
        <div className="modal-actions-modern">
          <button
            className="btn-modern btn-confirm"
            onClick={onConfirm}
            disabled={remainingPages < 0}
          >
            Xác nhận
          </button>
          <button className="btn-modern btn-cancel" onClick={onClose}>
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
});

function Intailieu() {
  const [dbFiles, setDbFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userPages, setUserPages] = useState(100);
  const [documentPages, setDocumentPages] = useState(10);
  const [isModalVisible_printAll, setIsModalVisible_printAll] = useState(false);
  useEffect(() => {
    fetchFilesFromServer();
  }, []);

  const fetchFilesFromServer = () => {
    axios
      .get('http://localhost:80/api/file/store')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDbFiles(response.data);
        } else {
          setDbFiles([]);
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching files', error);
      });
  };

  const handleFileChange = (event) => {
    const filesToUpload = Array.from(event.target.files);
    handleUploadFiles(filesToUpload);
  };

  const handleUploadFiles = (filesToUpload) => {
    const formData = new FormData();
    filesToUpload.forEach((file) => {
      formData.append('files', file);
    });

    axios
      .post('http://localhost:80/api/file/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        fetchFilesFromServer();
      })
      .catch((error) => {
        console.error('Error uploading files', error);
      });
  };

  const handleEditClick = (file) => {
    setSelectedFile(file);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedFile(null);
  };
  const handleCloseModal_printAll = () => {
    setIsModalVisible_printAll(false);
  };
  const handleSaveConfiguration = () => {
    console.log('Configuration saved for:', selectedFile);
    handleCloseModal();
  };

  const handleViewDetails = (fileId) => {
    axios
      .get(`http://localhost:80/api/file/${fileId}`, { responseType: 'blob' })
      .then((response) => {
        const file = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        console.error('Error fetching file details', error);
      });
  };

  const handleDeleteFile = (fileId) => {
    axios
      .delete(`http://localhost:80/api/file/${fileId}/delete`)
      .then(() => {
        setDbFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
      })
      .catch((error) => {
        console.error('Error deleting file', error);
      });
  };

  const handleConfirmPrint = () => {
    if (userPages >= documentPages) {
      alert('In tài liệu thành công!');
      setIsModalVisible_printAll(false);
    } else {
      alert('Không đủ số trang để in tài liệu này!');
    }
  };

  return (
    <div className='prt-Body'>
      <div className={`tt-container_upload ${dbFiles.length > 0 ? 'active' : ''}`}>
        <div className={`tt-container_uploadleft ${dbFiles.length > 0 ? 'active' : ''}`}>
          <header>IN TÀI LIỆU</header>
          <div className='ptr-sub_header'>
            <p>Tải tài liệu mà bạn muốn in</p>
          </div>
          <div className={`prt-drag_container ${dbFiles.length > 0 ? 'active' : ''}`}>
            <label className='prt-labelDrag' htmlFor='file-input'>
              <img src={plus} alt='Plus icon' />
              <p className='prt-uploadtext'>Upload or Drag&Drop your file here</p>
              <p className='prt-sizeuptext'>Size up to 100MB</p>
            </label>
            <input type='file' id='file-input' multiple onChange={handleFileChange} />
          </div>
        </div>
        <div className={`prt-file_list ${dbFiles.length > 0 ? 'active' : ''}`}>
          <h3>Tài liệu đã tải</h3>
          <div className='container-file'>
            {dbFiles.map((file, index) => (
              <div key={index} className='file-item'>
                <img src={file.mimetype === 'application/pdf' ? pdf : doc} alt='File icon' />
                <span className='file-name'>{file.originalname}</span>
                <button className='watchingdetails' onClick={() => handleViewDetails(file._id)}>
                  Xem chi tiết
                </button>
                <button className='configuration' onClick={() => handleEditClick(file)}>
                  Chỉnh sửa
                </button>
                <button className='delete' onClick={() => handleDeleteFile(file._id)}>
                  Xóa
                </button>
              </div>
            ))}
          </div>
          <div className="printall-button">
            <button onClick={() => setIsModalVisible_printAll(true)}>
              <FontAwesomeIcon icon={faPrint} className="print-icon" /> In tài liệu
            </button>
          </div>
        </div>
      </div>
      <FileConfigurationModal
        file={selectedFile}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveConfiguration}
      />
      <PrintConfirmationModal
        isVisible={isModalVisible_printAll}
        onClose={handleCloseModal_printAll}
        userPages={userPages}
        documentPages={documentPages}
        onConfirm={handleConfirmPrint}
      />
    </div>
  );
}

export default Intailieu;
