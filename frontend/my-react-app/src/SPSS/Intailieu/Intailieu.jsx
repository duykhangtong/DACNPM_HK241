import './Intailieu.css'
import React, {useState, useEffect, useRef} from 'react';
import plus from '../../../Image/Frame 46.png';
import doc from '../../../Image/doc.png';
import pdf from '../../../Image/pdf.png';
import monster from '../../../Image/monster__1_-removebg-preview (1).png';
import axios from 'axios'; // Import axios
const FileConfigurationModal  = ({file, isVisible, onClose, onSave}) =>
{
    
    if(!isVisible) return null;
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
        </div>
       
        <div className="modal-footer">
            <button onClick={onSave}>Xác nhận</button>
        </div>
        </div>
        </div>
      </div>
    );
}




function Intailieu() {
  const [dbFiles, setDbFiles] = useState([]); // State for files from database
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch files from the database when the component mounts
  useEffect(() => {
    fetchFilesFromServer();
  }, []);

  // Function to fetch files from the server
  const fetchFilesFromServer = () => {
    axios
      .get('http://localhost:80/api/file/store')
      .then((response) => {
        setDbFiles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching files', error);
      });
  };

  // Handle file input change and upload files immediately
  const handleFileChange = (event) => {
    const filesToUpload = Array.from(event.target.files);
    handleUploadFiles(filesToUpload);
  };

  // Upload files to the database
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
      .then((response) => {
        console.log('Files uploaded successfully');
        // Fetch the updated list of files from the database
        fetchFilesFromServer();
      })
      .catch((error) => {
        console.error('Error uploading files', error);
      });
  };

  // Handle editing of file configurations
  const handleEditClick = (file) => {
    setSelectedFile(file);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedFile(null);
  };

  const handleSaveConfiguration = () => {
    console.log('Configuration saved for:', selectedFile);
    handleCloseModal();
  };

  // Handle viewing file details
  const handleViewDetails = (fileId) => {
    axios
      .get(`http://localhost:80/api/file/${fileId}/review`, { responseType: 'blob' })
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

  // Handle file deletion
  const handleDeleteFile = (fileId) => {
    axios
      .delete(`http://localhost:80/api/file/${fileId}`)
      .then((response) => {
        setDbFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
        console.log('File deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting file', error);
      });
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
          {/* Remove the confirm print button if it's no longer needed */}
          {/* <div className='container-accept-printing'>
            <button className='accept-printing' onClick={handleUploadFiles}>Xác nhận in</button>
          </div> */}
        </div>
      </div>
      <FileConfigurationModal
        file={selectedFile}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveConfiguration}
      />
    </div>
  );
}

export default Intailieu;