import './Intailieu.css'
import React, {useState, useEffect, useRef} from 'react';
import plus from '../../../Image/Frame 46.png';
import doc from '../../../Image/doc.png';
import pdf from '../../../Image/pdf.png';
import monster from '../../../Image/monster__1_-removebg-preview (1).png';
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

function Intailieu()
{
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
      
        const uploadedFiles = Array.from(event.target.files).map(file => ({
            name: file.name,
            size: file.size,
            status: 'Complete', // Initial status
            type: file.type,
        }));

        setFiles(prevFiles => [...prevFiles, ...uploadedFiles]);
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleEditClick = (file) =>
    {
        setSelectedFile(file);
        setIsModalVisible(true);
    }
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setSelectedFile(null);
      };
      const handleSaveConfiguration = () => {
        console.log('Configuration saved for:', selectedFile);
        handleCloseModal();
      };
    return(
        <div className='prt-Body'>
           <div className={`tt-container_upload ${files.length > 0 ? 'active' : ''}`}>
                <div className={`tt-container_uploadleft ${files.length > 0 ? 'active' : ''}`}>
                    <header>
                        IN TÀI LIỆU
                    </header>
                    <div className='ptr-sub_header'>
                        <p>Tải tài liệu mà bạn muốn in</p>
                    </div>
                    <div className={`prt-drag_container ${files.length > 0 ? 'active' : ''}`}>
                    <label className="prt-labelDrag" for='file-input'>
                        <img src={plus}></img>
                        <p className='prt-uploadtext'>Upload or Drag&Drop your file here</p>
                        <p className='prt-sizeuptext'>Size up to 100MB</p>
                    </label>
                    <input type='file' id='file-input' multiple onChange={handleFileChange}></input>
                    </div>
               </div>
               <div className={`prt-file_list ${files.length > 0 ? 'active' : ''}`}>
                    <h3>Tài liệu đã tải</h3>
                    <div className='container-file'>
                    {files.map((file, index) => (
                        <div key={index} className='file-item'>
                            <img src={file.type === 'application/pdf' ? pdf : doc} alt="File icon" />
                            <span className='file-name'>{file.name}</span>
                            <button className='watchingdetails'>Xem chi tiết</button>
                            <button className='configuration' onClick={() => handleEditClick(file)}>Chỉnh sửa</button>
                            <button className='delete'>Xóa</button>
                        </div>
                    ))}
                    </div>
                    <div className='container-accept-printing'>
                    <button className='accept-printing'>Xác nhận in</button>
                    </div>
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