import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Manage() {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-gray-300">
                    <div className="container">
                        <a className="navbar-brand font-weight-bold" href="#">SPSS</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Trang chủ</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Báo cáo</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Quản lý</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Lịch sử dịch vụ</a>
                                </li>
                            </ul>
                            <div className="d-flex align-items-center">
                                <FontAwesomeIcon icon={faUser} className="me-2" />
                                <span className="me-2">SPSO</span>
                                <FontAwesomeIcon icon={faCaretDown} />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="container my-5">
                <div className="d-flex justify-content-between align-items-center mb-8">
                    <h1 className="text-3xl font-weight-bold">Danh sách máy in</h1>
                    <div className="d-flex">
                        <button className="btn btn-primary me-3">Thêm máy in</button>
                        <input type="text" placeholder="Tìm kiếm" className="form-control" />
                    </div>
                </div>
                <div className="row row-cols-3 g-8">
                    {Array.from({ length: 9 }, (_, i) => (
                        <div key={i} className="text-center">
                            <img src="https://placehold.co/200x200" alt={`Máy in ${i + 1}`} className="mx-auto mb-2" />
                            <button className="btn btn-primary">Máy in {i + 1}</button>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="bg-white shadow-md py-4">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <img src="https://placehold.co/50x50" alt="HCMUT logo" className="w-12 h-12" />
                        <span className="text-gray-700 ms-2">HCMUT</span>
                    </div>
                    <div className="text-center">
                        <div className="text-gray-700 font-weight-bold">DANH MỤC</div>
                        <div className="text-gray-700">Báo cáo</div>
                        <div className="text-gray-700">Quản lý</div>
                        <div className="text-gray-700">Lịch sử dịch vụ</div>
                    </div>
                    <div className="text-right">
                        <div className="text-gray-700 font-weight-bold">LIÊN HỆ</div>
                        <div className="text-gray-700">268 Lý Thường Kiệt, phường 14, quận 10, TP.HCM</div>
                        <div className="text-gray-700">(028) 38 651 670 - (028) 38 647 256 (Ext: 5258, 5234)</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Manage;