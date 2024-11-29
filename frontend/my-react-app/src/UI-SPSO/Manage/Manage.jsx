import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Manage.css';
import { useState } from 'react';
import logoBK from '../../../Image/logo_BK2-removebg.png';

function Manage() {
    const [showForm, setShowForm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [printerDetails, setPrinterDetails] = useState({
        name: '',
        manufacturer: '',
        type: '',
        description: '',
        location: '',
        status: ''
    });

    const handleAddPrinter = () => {
        setPrinterDetails({
            name: '',
            manufacturer: '',
            type: '',
            description: '',
            location: '',
            status: ''
        });
        setShowForm(true);
        setShowDetails(false);
    };

    const handlePrinterClick = (index) => {
        
        const printerInfo = {
            name: `Máy in ${index + 1}`,
            manufacturer: 'Hãng A',
            type: 'Loại A',
            description: 'Mô tả máy in',
            location: index % 2 === 0 ? 'Tòa' : 'Phòng', // Ví dụ cơ sở
            status: index % 2 === 0 ? 'Kích hoạt' : 'Vô hiệu'
        };
        setPrinterDetails(printerInfo);
        setShowDetails(true);
        setShowForm(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Thông tin máy in mới:", printerDetails);
        setShowForm(false);
    };
    return (
        <div>
            <main className="container my-5">
                <div className="header">
                    <h1>Danh sách máy in</h1>
                    <div className="actions">
                        <button className="btn-add" onClick={handleAddPrinter}>Thêm máy in</button>
                        <input type="text" placeholder="Tìm kiếm" className="search-input" />
                    </div>
                </div>
                {showForm && (
                    <form onSubmit={handleSubmit} className="add-printer-form">
                        <h2>Thêm máy in mới</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Tên máy in"
                            value={printerDetails.name}
                            onChange={(e) => setPrinterDetails({ ...printerDetails, name: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            name="manufacturer"
                            placeholder="Hãng sản xuất"
                            value={printerDetails.manufacturer}
                            onChange={(e) => setPrinterDetails({ ...printerDetails, manufacturer: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            name="type"
                            placeholder="Loại máy"
                            value={printerDetails.type}
                            onChange={(e) => setPrinterDetails({ ...printerDetails, type: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Mô tả"
                            value={printerDetails.description}
                            onChange={(e) => setPrinterDetails({ ...printerDetails, description: e.target.value })}
                        />
                        <div>
                            <span>Cơ sở: </span>
                            <select
                                name="location"
                                value={printerDetails.location}
                                onChange={(e) => setPrinterDetails({ ...printerDetails, location: e.target.value })}
                                required
                            >
                                <option value="" disabled>Chọn cơ sở</option>
                                <option value="toa">Tòa</option>
                                <option value="phong">Phòng</option>
                            </select>
                        </div>
                        <div>
                            <span>Trạng thái: </span>
                            <select
                                name="status"
                                value={printerDetails.status}
                                onChange={(e) => setPrinterDetails({ ...printerDetails, status: e.target.value })}
                                required
                            >
                                <option value="" disabled>Chọn trạng thái</option>
                                <option value="kichhoat">Kích hoạt</option>
                                <option value="vohieu">Vô hiệu</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-primary">Lưu máy in</button>
                        <button type="button" onClick={() => setShowForm(false)}>Hủy</button>
                    </form>
                )}
                {showDetails && (
                    <div className="printer-details">
                        <h2>Thông tin máy in</h2>
                        <p><strong>Tên máy in:</strong> {printerDetails.name}</p>
                        <p><strong>Hãng sản xuất:</strong> {printerDetails.manufacturer}</p>
                        <p><strong>Loại máy:</strong> {printerDetails.type}</p>
                        <p><strong>Mô tả:</strong> {printerDetails.description}</p>
                        <p><strong>Cơ sở:</strong> {printerDetails.location}</p>
                        <p><strong>Trạng thái:</strong> {printerDetails.status}</p>
                        <button className="btn-activate" onClick={() => alert('Kích hoạt máy in')}>Kích hoạt</button>
                        <button className="btn-disable" onClick={() => alert('Vô hiệu hóa máy in')}>Vô hiệu hóa</button>
                        <button onClick={() => setShowDetails(false)}>Trở lại</button>
                    </div>
                )}
                <div className="printer-list">
                    {Array.from({ length: 9 }, (_, i) => (
                        <div key={i} className="printer-item">
                            <img src="https://phucanhcdn.com/media/product/23196_may_in_canon_lbp6230dn_03.jpg" alt={`Máy in ${i + 1}`} className="mx-auto mb-2" />
                            <button className="btn-primary" onClick={()=>handlePrinterClick(i)}>Máy in {i + 1}</button>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="footer">
                <div className="left d-flex align-items-center">
                    <img src={logoBK} alt="HCMUT logo" />
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
