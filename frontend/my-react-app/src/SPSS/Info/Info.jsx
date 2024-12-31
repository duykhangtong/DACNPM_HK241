import React from "react";
import "./Info.css"; // Đảm bảo tạo file CSS tương ứng

const Info = () => {
  return (
    <div className="profile-container">
      <div className="header-section">
        <div className="header-bg"></div>
        <div className="hobbies">
          <div className="hobby">Bóng rổ</div>
          <div className="hobby">Bơi lội</div>
          <div className="hobby">Vua trò chơi</div>
          <div className="hobby">UI/UX</div>
        </div>
        <div className="profile-pic"></div>
        <h1>Nguyễn Minh Khang</h1>
        <p>
          Sinh viên có <span className="highlight">đam mê</span> với thiết kế web
        </p>
      </div>
      <div className="info-section">
        <h2>Thông tin cá nhân</h2>
        <div className="info-grid">
          <div className="info-card">
            <span className="info-icon">👤</span>
            <div>
              <h3>Họ và tên</h3>
              <p>Nguyễn Minh Khang</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">🎂</span>
            <div>
              <h3>Ngày sinh</h3>
              <p>13/12/2004</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">📞</span>
            <div>
              <h3>SDT liên hệ</h3>
              <p>0949121304</p>
            </div>
          </div>
          <div className="info-card">
            <span className="info-icon">🏠</span>
            <div>
              <h3>Địa chỉ thường trú</h3>
              <p>198 Lý Thường Kiệt, Dĩ An, BD</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
