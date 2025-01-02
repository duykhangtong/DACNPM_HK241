import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import './Intailieu.css';
import monster from '../../../Image/monster__1_-removebg-preview (1).png';
import React, { useState, useEffect } from 'react';
import plus from '../../../Image/Frame 46.png';
import doc from '../../../Image/doc.png';
import pdf from '../../../Image/pdf.png';
import axios from 'axios';

const FileConfigurationModal = ({ Order, isVisible, onClose, trigger, setTrigger, onSave, printers }) => {
  if (!isVisible) return null;
  const token = localStorage.getItem('access_token');
  const [copies, setCopies] = useState(Order.number_of_copies); // Default number of copies is 1
  // const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState(Order.printer_id);
  // const [pageRange, setPageRange] = useState('Toàn bộ');
  const [printSide, setPrintSide] = useState(Order.sided);
  const [paperSize, setPaperSize] = useState(Order.page_size);
  const [orientation, setOrientation] = useState(Order.page_orientation);
  const [pagesPerSheet, setPagesPerSheet] = useState(Order.pages_per_sheet);
  

  const handleSave = () => {
    const printOrderData = {
      printer_id: selectedPrinter,
      page_size: paperSize,
      page_orientation: orientation,
      sided: printSide,
      pages_per_sheet: pagesPerSheet,
      number_of_copies: copies
    };
    axios
      .put(`http://localhost:80/api/printOrders/${Order._id}/update`, printOrderData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Cập nhật thông số in thành công!');
        setTrigger(!trigger);
        onSave();
      })
      .catch((error) => {
        console.error('Error updating print order', error);
      });
  };

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
              <select value={selectedPrinter} onChange={(event) => setSelectedPrinter(event.target.value)}>
                {printers.map((printer) => 
                (<option key={printer._id} value={printer._id}>{printer.name}</option>)
                  )}
              </select>
            </label>
            {/* <label>
              <span>Số trang:</span>
              <select value={pageRange} onChange={(e) => setPageRange(e.target.value)}>
                <option>Toàn bộ</option>
                <option>Tùy chọn</option>
              </select>
            </label> */}
            <label>
              <span>Mặt in:</span>
              <select value={printSide} onChange={(e) => setPrintSide(e.target.value)}> 
                <option value={'one-sided'}>Một mặt</option>
                <option value={'double-sided'}>Hai mặt</option>
              </select>
            </label>
            <label>
              <span>Khổ giấy:</span>
              <select value={paperSize} onChange={(e) => setPaperSize(e.target.value)}> 
                <option value={'A4'}>A4</option>
                <option value={'A3'}>A3</option>
              </select>
            </label>
            <label>
              <span>Hướng in:</span>
              <select value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                <option value={'vertical'}>Dọc</option>
                <option value={'horizontal'}>Ngang</option>
              </select>
            </label>
            <label>
              <span>Số trang mỗi tờ:</span>
              <select value={pagesPerSheet} onChange={(e) => setPagesPerSheet(parseInt(e.target.value, 10))}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
              </select>
            </label>
            <label>
              <span>Số lượng bản copies:</span>
              <input type="number" min="1" max="100" value={copies} onChange={(e) => setCopies(e.target.value)}/>
            </label>
          </div>
          <div className="modal-footer">
            <button onClick={handleSave}>Xác nhận</button>
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
  printOrder,
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
            onClick={() => onConfirm(printOrder)}
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
  const [trigger, setTrigger] = useState(false);
  const [printOrder, setPrintOrder] = useState([]);
  const [printers, setPrinters] = useState([]); // Add printers state here
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    getPossiblePrinters();
  }, []);

  useEffect(() => {
    fetchFilesFromServer();
    fetchOrder();
  }, [trigger])

  const fetchFilesFromServer = () => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    }
    axios
      .get('http://localhost:80/api/file/store', config)
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

  const getPossiblePrinters = () => {
    axios
      .get('http://localhost:80/api/printers/active', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPrinters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching printers', error);
      });
  };

  const fetchOrder = async () => {
    const printOrder = await axios.get('http://localhost:80/api/printOrders/my', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
    if(!printOrder.data && !printOrder.data.length) {
      return;
    }
    console.log(printOrder.data);
    let total = 0;
    printOrder.data.forEach((order) => {
      total += order.total_print_pages;
    })
    setPrintOrder(printOrder.data);
    setDocumentPages(total);
  }

  const handleFileChange = (event) => {
    const filesToUpload = Array.from(event.target.files);
    handleUploadFiles(filesToUpload);
    event.target.value = null;
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
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
        },
      })
      .then((res) => {
        res.data.data.forEach((file) => {
          createPrintOrder(file);
        })
        setTrigger(!trigger);
      })
      .catch((error) => {
        console.error('Error uploading files', error);
      });
  };

  const createPrintOrder = (item) => {
    const printOrderData = {
      printer_id: printers[0]?._id || '', // Default to the first printer
      file_id: item._id,
      page_size: "A4",
      page_orientation: "vertical",
      sided: "double-sided",
      pages_to_printed: item.pageNumber,
    };

    axios
      .post(`http://localhost:80/api/printOrders`, printOrderData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log('Print order created successfully');
      })
      .catch((error) => {
        console.error('Error creating print order', error);
      });
  };


  const handleEditClick = (file) => {
    const order = printOrder.find((order) => order.file_id === file._id);
    setSelectedFile(order);
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
      .get(`http://localhost:80/api/file/${fileId}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
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
      .delete(`http://localhost:80/api/file/${fileId}/delete`,
        { headers: { Authorization: `Bearer ${token}` }}
      )
      .then((response) => {
        if(response.status === 200) {
          deleteOrder(fileId);
          setDbFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
        }
      })
      .catch((error) => {
        console.error('Error deleting file', error);
      });
  };

  const handleUpdateFile = (fileId) => {
    axios.put('http://localhost:80/api/file/update', {
      id: fileId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then((res) => {
      res.status === 200 && fetchFilesFromServer();
    })
    .catch((err) => {
      console.error('Error updating file', err);
    })
  }

  const deleteOrder = (file_id) => {
    axios.delete(`http://localhost:80/api/printOrders/${file_id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  const handleConfirmPrint = (orders) => {
    if (userPages >= documentPages) {
      orders.map((order) => {
        confirmPrintOrder(order._id);
      })
      setTrigger(!trigger);
      alert('Đã xác nhận in tài liệu!');
    } else {
      alert('Không đủ số trang để in tài liệu này!');
    }
  };
  // Added function to confirm print order
  const confirmPrintOrder = (id) => {
    axios
      .patch('http://localhost:80/api/printOrders/confirm',
      {
        id: id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        res.data.file_id && handleUpdateFile(res.data.file_id);
        setIsModalVisible_printAll(false);
      })
      .catch((error) => {
        console.error('Error confirming print order', error);
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
          <div className="printall-button">
            <button onClick={() => setIsModalVisible_printAll(true)}>
              <FontAwesomeIcon icon={faPrint} className="print-icon" /> In tài liệu
            </button>
          </div>
        </div>
      </div>
      <FileConfigurationModal
        Order={selectedFile}
        trigger={trigger}
        setTrigger={setTrigger}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        onSave={handleSaveConfiguration}
        printers={printers}
      />
      <PrintConfirmationModal
        isVisible={isModalVisible_printAll}
        onClose={handleCloseModal_printAll}
        printOrder={printOrder}
        userPages={userPages}
        documentPages={documentPages}
        onConfirm={handleConfirmPrint}
      />
    </div>
  );
}

export default Intailieu;
