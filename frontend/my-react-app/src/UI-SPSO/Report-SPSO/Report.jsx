import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import './Report.css'
function Report() {
    return (
        <div className="d-flex flex-column min-vh-100">
            

            <main className="flex-grow-1">
                <div className="container py-4">
                    <div className="card bg-gray-300 p-4 rounded-md shadow-md">
                        <div className="row mb-4">
                            <div className="col">
                                <label className="text-gray-700">Chọn loại báo cáo</label>
                                <button className="btn btn-light border border-gray-400">
                                    Theo tháng <FontAwesomeIcon icon={faCaretDown} className="ms-2" />
                                </button>
                            </div>
                            <div className="col">
                                <label className="text-gray-700">Chọn theo năm</label>
                                <button className="btn btn-light border border-gray-400">
                                    Chọn năm <FontAwesomeIcon icon={faCaretDown} className="ms-2" />
                                </button>
                            </div>
                            <div className="col">
                                <label className="text-gray-700">Chọn theo tháng</label>
                                <button className="btn btn-light border border-gray-400">
                                    Tất cả <FontAwesomeIcon icon={faCaretDown} className="ms-2" />
                                </button>
                            </div>
                        </div>
                        <table className="table table-striped table-bordered table-hover bg-gray-200">
                            <thead className="bg-gray-400 text-white">
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
                                    <tr key={item.id} className="text-center">
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

export default Report;