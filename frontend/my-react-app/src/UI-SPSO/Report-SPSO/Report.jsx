import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './Report.css';

function Report() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1">
                <div className="container py-4">
                    <div className="card">
                        <div className="header">
                            <div className="col">
                                <label className="text-gray-700">Chọn loại báo cáo</label>
                                <button className="btn-report">
                                    Theo tháng <FontAwesomeIcon icon={faCaretDown} className="ms-2" />
                                </button>
                            </div>
                            <div className="col">
                                <label className="text-gray-700">Chọn theo năm</label>
                                <button className="btn-report">
                                    Chọn năm <FontAwesomeIcon icon={faCaretDown} className="ms-2" />
                                </button>
                            </div>
                            <div className="col">
                                <label className="text-gray-700">Chọn theo tháng</label>
                                <button className="btn-report">
                                    Tất cả <FontAwesomeIcon icon={faCaretDown} className="ms-2" />
                                </button>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Số thứ tự</th>
                                    <th>Tháng</th>
                                    <th>Năm</th>
                                    <th>Chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 1, month: 10, year: 2024, detail: "Báo cáo tháng 10/2024" },
                                    { id: 2, month: 9, year: 2024, detail: "Báo cáo tháng 9/2024" },
                                    { id: 3, month: 8, year: 2024, detail: "Báo cáo tháng 8/2024" },
                                    { id: 4, month: 7, year: 2024, detail: "Báo cáo tháng 7/2024" },
                                    { id: 5, month: 6, year: 2024, detail: "Báo cáo tháng 6/2024" },
                                    { id: 6, month: 5, year: 2024, detail: "Báo cáo tháng 5/2024" },
                                    { id: 7, month: 4, year: 2024, detail: "Báo cáo tháng 4/2024" },
                                    { id: 8, month: 3, year: 2024, detail: "Báo cáo tháng 3/2024" },
                                    { id: 9, month: 2, year: 2024, detail: "Báo cáo tháng 2/2024" },
                                ].map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.month}</td>
                                        <td>{item.year}</td>
                                        <td className="text-primary">
                                            <a href="#">{item.detail}</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <footer className="footer">
                <div className="footer-left d-flex align-items-center">
                    <img src="https://placehold.co/50x50" alt="HCMUT logo" />
                    <span className="info">HCMUT</span>
                </div>
                <div className="footer-center">
                    <div className="info"><span>DANH MỤC</span></div>
                    <div className="info">Báo cáo</div>
                    <div className="info">Quản lý</div>
                    <div className="info">Lịch sử dịch vụ</div>
                </div>
                <div className="footer-right">
                    <div className="info"><span>LIÊN HỆ</span></div>
                    <div className="info">268 Lý Thường Kiệt, phường 14, quận 10, TP.HCM</div>
                    <div className="info">(028) 38 651 670 - (028) 38 647 256 (Ext: 5258, 5234)</div>
                </div>
            </footer>
        </div>
    );
}

export default Report;
