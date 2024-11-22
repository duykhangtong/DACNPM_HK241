import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Manage() {
    return (
        <div>
           
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