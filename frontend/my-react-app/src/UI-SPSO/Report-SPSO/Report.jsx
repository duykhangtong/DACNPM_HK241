import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import "./Report.css";
import { useState, useEffect } from "react";
import logoBK from "../../../Image/logo_BK2-removebg.png";
import axios from "axios";

function Report() {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => 2025 - i);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [statisticsData, setStatisticsData] = useState([]);
  const [showStatistics, setShowStatistics] = useState(false); // New state

  const fetchReportData = async (month, year) => {
    try {
      const response = await axios.get("http://localhost:80/api/report", {
        params: { month, year },
      });
      const statisticsArray = Object.entries(response.data)
        .filter(([key]) => key !== 'total')
        .map(([, value]) => value);
      setStatisticsData(statisticsArray);
    } catch (error) {
      console.error("Error fetching report data:", error);
      setStatisticsData([]);
    }
  };

  const handleDetailClick = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    fetchReportData(month, year);
    setShowStatistics(true); // Show statistics table
  };

  const handleBackClick = () => {
    setShowStatistics(false); // Hide statistics table
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <div className="container py-4">
          <div className="card">
            <div className="header">
              
              <div className="col">
                <label className="text-gray-700">Chọn theo tháng</label>
                <select
                  className="form-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="" disabled>
                    Chọn tháng
                  </option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      Tháng {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label className="text-gray-700">Chọn theo năm</label>
                <select
                  className="form-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="" disabled>
                    Chọn năm
                  </option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
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
                  { id: 1, month: 1, year: 2025, detail: "Báo cáo tháng 1/2025" },
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
                      <a
                        className="report"
                        onClick={() => handleDetailClick(item.month, item.year)}
                      >
                        {item.detail}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showStatistics && ( // Only show the statistics table if showStatistics is true
            <div className="statistics-container">
              <h2>Báo cáo hệ thống</h2>
             
              <table className="statistics-table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Máy in</th>
                    <th>Số đơn đặt hàng</th>
                    <th>Số trang giấy A3</th>
                    <th>Số trang giấy A4</th>
                  </tr>
                </thead>
                <tbody>
                  {statisticsData.length === 0 ? (
                    <tr>
                      <td colSpan="5">Không có dữ liệu</td>
                    </tr>
                  ) : (
                    statisticsData.map((data, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{data.printer}</td>
                        <td>{data.amount}</td>
                        <td>{data.number_A3}</td>
                        <td>{data.number_A4}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
               <button className="cancel" onClick={handleBackClick}>
                Trở lại
              </button>
            </div>
          )}
        </div>
      </main>
           <footer className="footer">
        <div className="left d-flex align-items-center">
          <img src={logoBK} alt="HCMUT logo" />
          <span className="info">HCMUT</span>
        </div>
        <div className="center">
          <div className="info">
            <span>DANH MỤC</span>
          </div>
          <div className="info">
            <a href="/SPSO/baocao">Báo cáo</a>
          </div>
          <div className="info">
            <a href="quanly">Quản lý</a>
          </div>
          <div className="info">
            <a href="lichsuin">Lịch sử dịch vụ</a>
          </div>
        </div>
        <div className="right">
          <div className="info">
            <span>LIÊN HỆ</span>
          </div>
          <div className="info">
            268 Lý Thường Kiệt, phường 14, quận 10, TP.HCM
          </div>
          <div className="info">
            (028) 38 651 670 - (028) 38 647 256 (Ext: 5258, 5234)
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Report;