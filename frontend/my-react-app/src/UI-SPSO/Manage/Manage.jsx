import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Manage.css';
function Manage() {
    return (
        <div>
            <main className="container my-5">
                <div className="header">
                    <h1>Danh sách máy in</h1>
                    <div className="actions">
                        <button className="btn-add">Thêm máy in</button>
                        <input type="text" placeholder="Tìm kiếm" className="search-input" />
                    </div>
                </div>
                <div className="printer-list">
                    {Array.from({ length: 9 }, (_, i) => (
                        <div key={i} className="printer-item">
                            <img src="https://placehold.co/200x200" alt={`Máy in ${i + 1}`} className="mx-auto mb-2" />
                            <button className="btn-primary">Máy in {i + 1}</button>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="footer">
                <div className="left d-flex align-items-center">
                    <img src="https://placehold.co/50x50" alt="HCMUT logo" />
                    <span className="info">HCMUT</span>
                </div>
                <div className="center">
                    <div className="info"><span>DANH MỤC</span></div>
                    <div className="info">Báo cáo</div>
                    <div className="info">Quản lý</div>
                    <div className="info">Lịch sử dịch vụ</div>
                </div>
                <div className="right">
                    <div className="info"><span>LIÊN HỆ</span></div>
                    <div className="info">268 Lý Thường Kiệt, phường 14, quận 10, TP.HCM</div>
                    <div className="info">(028) 38 651 670 - (028) 38 647 256 (Ext: 5258, 5234)</div>
                </div>
            </footer>
        </div>
    );
}

export default Manage;
