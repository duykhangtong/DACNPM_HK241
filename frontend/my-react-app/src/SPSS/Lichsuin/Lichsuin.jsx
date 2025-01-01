import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Lichsuin.css";
import axios from "axios";
function PrintHistoryFilter() {
  const token = localStorage.getItem("access_token");
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [printHistoryData, setPrintHistoryData] = useState([]);
  const [printers, setPrinters] = useState([]);
  const [fileDetails, setFileDetails] = useState({});
  const [printerDetails, setPrinterDetails] = useState({});
//Láy thông tin lịch sư in
  const handleHistoryInfo = () => {
    axios
      .get("http://localhost:80/api/printOrders/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const printOrders = response.data;
        const filePromises = printOrders.map((order) =>
          fetchFileName(order.file_id)
        );
        const printerPromises = printOrders.map((order) =>
          fetchPrinterName(order.printer_id)
        );

        Promise.all(filePromises).then((fileNames) => {
          Promise.all(printerPromises).then((printerNames) => {
            const updatedPrintOrders = printOrders.map((order, index) => ({
              ...order,
              fileName: fileNames[index],
              printerName: printerNames[index],
            }));
            setPrintHistoryData(updatedPrintOrders);
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching print history", error);
      });
  };

  const fetchFileName = (fileId) => {
    return axios
      .get(`http://localhost:80/api/file/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data.originalname)
      .catch((error) => {
        console.error("Error fetching file name", error);
        return 'Unknown';
      });
  };

  const fetchPrinterName = (printerId) => {
    return axios
      .get(`http://localhost:80/api/printers/${printerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data.name)
      .catch((error) => {
        console.error("Error fetching printer name", error);
        return "Unknown";
      });
  };

  const handleGetAllPrinter = () => {
    axios
      .get("http://localhost:80/api/printers")
      .then((response) => {
        setPrinters(response.name);
      })
      .catch((error) => {
        console.error("Error fetching printers", error);
      });
  };

  useEffect(() => {
    handleHistory();
    handleGetAllPrinter();
  }, []);

  return (
    <div className="his-container">
      <h2>Lịch sử in</h2>
      <div className="filter-container">
        <div className="sub-filter">
          <label>Chọn máy in</label>
          <select
            value={selectedPrinter}
            onChange={(e) => setSelectedPrinter(e.target.value)}
          >
            <option value="">Tất cả</option>
            {printers.map((printer, index) => (
              <option key={index} value={printer}>
                {printer}
              </option>
            ))}
          </select>
        </div>
        <div className="sub-filter">
          <label>Chọn ngày bắt đầu</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
          />
        </div>
        <div className="sub-filter">
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
            <th>STT</th>
            <th>Tên tài liệu</th>
            <th>Máy in</th>
            <th>Thời gian bắt đầu</th>
            <th>Trạng thái</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {printHistoryData.map((history, index) => (
            <tr key={index}>
              <td>{history.printer_id}</td>
              <td>{new Date(history.createdAt).toLocaleDateString()}</td>
              <td>{history.total_print_pages}</td>
              <td>{history.state}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PrintHistoryFilter;
