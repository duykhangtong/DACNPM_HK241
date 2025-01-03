import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Lichsuin.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
function PrintHistoryFilter() {
  const token = localStorage.getItem("access_token");
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [printHistoryData, setPrintHistoryData] = useState([]); // Filtered data
  const [allPrintHistoryData, setAllPrintHistoryData] = useState([]); // All data
  const [printers, setPrinters] = useState([]); //Tất cả máy in
  const [selectedPrintOrder, setSelectedPrintOrder] = useState(null); //xem chi tiết
  const [loading, setLoading] = useState(true); // Add loading state
  const [sortByNearest, setSortByNearest] = useState(true); // Toggle sorting state

//Láy thông tin lịch sư in
  const handleHistoryInfo = () => {
    axios
      .get("http://localhost:80/api/printOrders/history", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        let printOrders = response.data;
        const filePromises = printOrders.map((order) =>
          fetchFileName(order.file_id)
        );
        const printerPromises = printOrders.map((order) =>
            fetchPrinterDetails(order.printer_id)
        );

        Promise.all(filePromises).then((fileNames) => {
          Promise.all(printerPromises).then((printerNames) => {
            const updatedPrintOrders = printOrders.map((order, index) => ({
              ...order,
              fileName: fileNames[index],
              printerName: printerNames[index].name,
              printerLocation: `${printerNames[index].campus} - ${printerNames[index].building} - ${printerNames[index].room}`
            }));
            setAllPrintHistoryData(updatedPrintOrders);
            setPrintHistoryData(updatedPrintOrders);
            setLoading(false);
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching print history", error);
        setLoading(false); // Set loading to false in case of error

      });
  };

  const fetchFileName = (fileId) => {
    return axios
      .get(`http://localhost:80/api/file/${fileId}/infor`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data.originalname)
      .catch((error) => {
        console.error("Error fetching file name", error);
        return 'Unknown';
      });
  };

  const fetchPrinterDetails = (printerId) => {
    return axios
      .get(`http://localhost:80/api/printers/${printerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching printer name", error);
        return { name: 'Unknown', campus: '', building: '', room: '' };
    });
  };

//   const handleSortByNearestDate = () => {
//     const sortedData = [...printHistoryData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     setPrintHistoryData(sortedData);
//   };

//   const handleSortByFarthestDate = () => {
//     const sortedData = [...printHistoryData].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//     setPrintHistoryData(sortedData);
//   };
  const handleViewDetails = (printOrder) => {
    setSelectedPrintOrder(printOrder);
  };
  const handleCloseDetails = () => {
    setSelectedPrintOrder(null);
  };
  const handleGetAllPrinter = () => {
    axios
      .get("http://localhost:80/api/printers")
      .then((response) => {
        setPrinters(response.data);
      })
      .catch((error) => {
        console.error("Error fetching printers", error);
      });
  };

  const handleSortToggle = () => {
    const sortedData = [...printHistoryData].sort((a, b) =>
      sortByNearest ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt)
    );
    setPrintHistoryData(sortedData);
    setSortByNearest(!sortByNearest);
  };

  const filterPrintHistoryData = () => {
    let filteredData = allPrintHistoryData;

    if (selectedPrinter) {
      filteredData = filteredData.filter((order) => order.printer_id === selectedPrinter);
    }

    if (startDate) {
      filteredData = filteredData.filter((order) => new Date(order.createdAt) >= new Date(startDate));
    }

    if (endDate) {
      filteredData = filteredData.filter((order) => new Date(order.createdAt) <= new Date(endDate));
    }

    setPrintHistoryData(filteredData);
  };
  useEffect(() => {
    handleGetAllPrinter();
    handleHistoryInfo();
    
  }, []);
  
  useEffect(() => {
    filterPrintHistoryData();
  }, [selectedPrinter, startDate, endDate]);


  return (
    <div>
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
              <option key={index} value={printer._id}>{printer.name}</option>
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
        <button className="filter-button" onClick={handleSortToggle}>
          {sortByNearest ? 'Ngày gần nhất' : 'Ngày xa nhất'}
        </button>
      </div>

      <table className="print-history-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên tài liệu</th>
            <th>Máy in</th>
            <th>Địa điểm máy in</th>
            <th>Thời gian bắt đầu</th>
            <th>Trạng thái</th>
            <th>Xem chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {printHistoryData.map((history, index) => (
            <tr key={index+1}>
                <td>{index+1}</td>
              <td>{history.fileName}</td>
              <td>{history.printerName}</td>
              <td>{history.printerLocation}</td>
              <td>{new Date(history.createdAt).toLocaleDateString()}</td>
              <td className="ohaha">
                <div className={`status-badge-fake ${history.state === "pending" ? "pending" : "completed"}`}><p>{history.state}</p></div></td>
              <td>
                  <button className="details-button" onClick={() => handleViewDetails(history)}>    
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
                  <p>Xem chi tiết</p>
                  </button>
            </td>
            </tr>
            
          ))}
        </tbody>
      </table>
    </div>
    {selectedPrintOrder && (
        <div className="his-print-modal-overlay">
          <div className="hist-print-modal-content">
            <h3>Chi tiết đơn in</h3>
            <p><strong>Kích thước trang:</strong> {selectedPrintOrder.page_size}</p>
            <p><strong>Hướng trang:</strong> {selectedPrintOrder.page_orientation}</p>
            <p><strong>Tỷ lệ:</strong> {selectedPrintOrder.scale}</p>
            <p><strong>Số trang cần in:</strong> {selectedPrintOrder.pages_to_printed}</p>
            <p><strong>Số trang mỗi tờ:</strong> {selectedPrintOrder.pages_per_sheet}</p>
            <p><strong>Tổng số trang in:</strong> {selectedPrintOrder.total_print_pages}</p>
            <button onClick={handleCloseDetails}>Đóng</button>
          </div>
        </div>
      )}
      </div>
  );
}
export default PrintHistoryFilter;
