import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PrintHis.css";
import axios from "axios";

function PrintHistoryFilter() {
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [selectedClient, setSelectedClient] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [clients, setClients] = useState([]);
  const [printers, setPrinters] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [printOrders, setPrintOrders] = useState([]);
  const [filteredPrintOrders, setFilteredPrintOrders] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Số lượng đơn in trên mỗi trang

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:80/api/account/allClient",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };

    const fetchPrinters = async () => {
      try {
        const response = await axios.get("http://localhost:80/api/printers", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPrinters(response.data);
      } catch (error) {
        console.error("Error fetching printer data:", error);
      }
    };

    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://localhost:80/api/documents", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching document data:", error);
      }
    };

    const fetchPrintOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:80/api/printOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPrintOrders(response.data);
      } catch (error) {
        console.error("Error fetching print orders:", error);
      }
    };

    fetchClients();
    fetchPrinters();
    fetchDocuments();
    fetchPrintOrders();
  }, []);

  const filterPrintOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:80/api/printOrders/filterSPSO",
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            client_id: selectedClient,
            printer_id: selectedPrinter,
            start_date: startDate
              ? startDate.toISOString().split("T")[0]
              : null,
            end_date: endDate ? endDate.toISOString().split("T")[0] : null,
          },
        }
      );

      const filteredData = response.data.filter((order) => {
        const orderStartDate = new Date(order.createdAt)
          .toISOString()
          .split("T")[0];
        const orderEndDate = order.end_date
          ? new Date(order.end_date).toISOString().split("T")[0]
          : null;

        const isStartDateMatch = startDate
          ? orderStartDate > startDate.toISOString().split("T")[0]
          : true;
        const isEndDateMatch = endDate
          ? orderEndDate <= endDate.toISOString().split("T")[0]
          : true;

        return isStartDateMatch && isEndDateMatch;
      });

      setFilteredPrintOrders(filteredData);
      setIsFiltered(true);
      setCurrentPage(1); // Reset trang khi lọc
    } catch (error) {
      console.error("Error fetching filtered print orders:", error);
    }
  };

  const getClientNameById = (id) => {
    const client = clients.find((c) => c._id === id);
    return client ? client.full_name : "Unknown";
  };

  const getPrinterNameById = (id) => {
    const printer = printers.find((p) => p._id === id);
    return printer ? printer.name : "Unknown";
  };

  const getDocumentNameById = (id) => {
    const document = documents.find((d) => d._id === id);
    return document ? document.name : "Unknown";
  };

  const getPrinterLocationById = (id) => {
    const printer = printers.find((p) => p._id === id);
    return printer
      ? {
          campus: printer.campus,
          building: printer.building,
          room: printer.room,
        }
      : { campus: "Unknown", building: "Unknown", room: "Unknown" };
  };

  const updatePrintOrderStatus = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      await axios.put(
        `http://localhost:80/api/printOrders/:{orderId}`,
        {
          state: "complete",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPrintOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, state: "complete" } : order
        )
      );
      alert("Trạng thái đã được cập nhật thành công!");
    } catch (error) {
      console.error("Error updating print order status:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái.");
    }
  };

  const ordersToDisplay = isFiltered ? filteredPrintOrders : printOrders;

  // Tính toán các đơn in cần hiển thị cho trang hiện tại
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = ordersToDisplay.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(ordersToDisplay.length / ordersPerPage);

  return (
    <>
      <main>
        <div className="his-container">
          <h2>Lịch sử in</h2>
          <div className="filter-container">
            <div className="sub-filter">
              <label>Chọn tên</label>
              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
              >
                <option value="">Chọn tên sinh viên</option>
                {Array.isArray(clients) &&
                  clients.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.full_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="sub-filter">
              <label>Chọn máy in</label>
              <select
                value={selectedPrinter}
                onChange={(e) => setSelectedPrinter(e.target.value)}
              >
                <option value="">Chọn máy in</option>
                {Array.isArray(printers) &&
                  printers.map((printer) => (
                    <option key={printer._id} value={printer._id}>
                      {printer.name}
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
          <button onClick={filterPrintOrders}>Xác nhận</button>
          {currentOrders.length === 0 ? (
            <p>Không có đơn in nào</p>
          ) : (
            <table className="print-history-table">
              <thead>
                <tr>
                  <th>Tên tài liệu</th>
                  <th>Tên người dùng</th>
                  <th>Tên máy in</th>
                  <th>Cơ sở</th>
                  <th>Tòa nhà</th>
                  <th>Phòng</th>
                  <th>Kích cỡ trang</th>
                  <th>Ngày bắt đầu đặt in</th>
                  <th>Ngày in xong</th>
                  <th>Tổng số trang in</th>
                  <th>Trạng thái</th>
                  <th>Xác nhận hoàn tất</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => {
                  const location = getPrinterLocationById(order.printer_id);
                  return (
                    <tr key={order._id}>
                      <td>{getDocumentNameById(order.file_id)}</td>
                      <td>{getClientNameById(order.client_id)}</td>
                      <td>{getPrinterNameById(order.printer_id)}</td>
                      <td>{location.campus}</td>
                      <td>{location.building}</td>
                      <td>{location.room}</td>
                      <td>{order.page_size}</td>
                      <td>
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleString()
                          : "Unknown"}
                      </td>
                      <td>
                        {order.end_date
                          ? new Date(order.end_date).toLocaleString()
                          : "Unknown"}
                      </td>
                      <td>{order.total_print_pages}</td>
                      <td>{order.state}</td>
                      <td>
                        {order.state === "pending" && (
                          <button
                            onClick={() => updatePrintOrderStatus(order._id)}
                          >
                            Hoàn tất
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default PrintHistoryFilter;
