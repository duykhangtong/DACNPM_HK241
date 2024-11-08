import logoBK from '../../../Image/logo_BK2-removebg.png';
import React, {useState, useEffect, useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser} from '@fortawesome/free-solid-svg-icons';
import { faAngleDown,faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import advertise_backgr from '../../../Image/image 14.jpg';
import advertise from '../../../Image/Group 17.jpg';
import guide_student from '../../../Image/image 13.png';
import './trangchu.css';
let user = "NguyenKhang";

function Advertisement()
{
    return(
    
    <div className='tt-advertise-container'>
      <div className='tt-advertise-content'>
                <div className="tt-containerAngle">
                    <FontAwesomeIcon icon={faAngleLeft} className="tt-faAngleLeft"/>
                </div>
                <div className='img_advertise'>
                    <div className='tt-image-section'>
                        <div className='tt-text-section'>
                        <h2>Sale</h2>
                        <div className='tt-discount'>
                            <p>50%</p>
                            <div class="star star-1"></div>
                            <div class="star star-2"></div>
                        </div>
                        </div>
                        <p>CHO 10 LẦN IN TRONG THÁNG</p>
                        <p>KHI BẠN LÀ <span className='tt-highlight'>THÀNH VIÊN CỨNG</span></p>
                        <div className='tt-register'><button className='tt-register-button'>ĐĂNG KÝ NGAY</button>
                        </div>
                    
                    </div>
                </div>
               
                <div className="tt-containerAngle">
                <FontAwesomeIcon icon={faAngleRight} className="tt-faAngleRight"/>
                </div>
        </div>
       
    </div>
    );  
};
function Guide() {
    return (
        <div className="tt-container_guide">

            <div className="tt-card">
                <div className='tt-top_container first'>
                    <div className='tt-img first'>
                    </div>
                </div>
                <header className='tt-header-card first'>
                    Về chúng tôi
                </header>
                <div className='tt-content-card first'>
                    <p>Chúng tôi có một quá trình hình thành và phát triển rất thú vị</p>
                   
                </div>
                <button>Xem thêm</button>
            </div>

            <div className="tt-card">
                <div className='tt-top_container second'>
                    <div className='tt-img second'>
                    </div>
                </div>
                <header className='tt-header-card second'>
                    Hướng dẫn dành cho sinh viên
                </header>
                <div className='tt-content-card second'>
                    <p>Các bạn lưu ý và đọc kỹ nhé !</p>
                    
                </div>
                <button>Xem thêm</button>
            </div>

            <div className="tt-card">
                <div className='tt-top_container third'>
                    <div className='tt-img third'>
                    </div>
                </div>
                <header className='tt-header-card third'>
                    Quy định dành cho sinh viên
                </header>
                <div className='tt-content-card third'>
                    <p>Các bạn lưu ý và đọc kỹ nhé !</p>
                    
                </div>
                <button>Xem thêm</button>
            </div>
        </div>
    );
};

function Trangchu()
{
    return (
    <div>
    <Guide/>
    </div>
);
};
export default Trangchu;