import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Lichsuin.css';
function PrintHistoryFilter()
{
    const [selectedPrinter, setSelectedPrinter] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const printers = ["Printer 1", "Printer 2", "Printer 3", "Printer 4"];
    const printHistoryData = [
        { id: 16, name: "BIG DATA ANALYSIS_Nhom 17.pdf", printer: "Máy in 1", startTime: "09/12/2023, 22:40:46", endTime: "09/12/2023, 22:40:46", status: "Chưa in" },
        { id: 15, name: "Assignment_2__Computer_Network.pdf", printer: "Máy in 2", startTime: "09/12/2023, 22:37:54", endTime: "09/12/2023, 22:37:54", status: "Chưa in" },
        // Add more rows as needed
    ];
    return(

        <div className="his-container">
            <h2>Lịch sử in</h2>
            <div className="filter-container">
                <div className='sub-filter'>
                    <label>Chọn máy in</label>
                    <select
                        value={selectedPrinter}
                        onChange={(e) => setSelectedPrinter(e.target.value)}
                    >
                        <option value="">Chọn máy in</option>
                        {printers.map((printer, index) => (
                            <option key={index} value={printer}>{printer}</option>
                        ))}
                    </select>
                </div>
                <div className='sub-filter' >
                    <label>Chọn ngày bắt đầu</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                    />
                </div>
                <div className='sub-filter'>
                    <label>Chọn ngày kết thúc</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="dd/mm/yyyy"
                    />
                </div>
            </div>
            
            <table className="print-history-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên tài liệu</th>
                        <th>Máy in</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Trạng thái</th>
                        <th>Xem chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {printHistoryData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.printer}</td>
                            <td>{item.startTime}</td>
                            <td>{item.endTime}</td>
                            <td><span className="status-badge">{item.status}</span></td>
                            <td><button className="details-button">🔍</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default PrintHistoryFilter;