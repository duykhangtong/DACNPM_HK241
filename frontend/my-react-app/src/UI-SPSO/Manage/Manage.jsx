import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "./Manage.css";
import logoBK from "../../../Image/logo_BK2-removebg.png";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:80/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const fetchPrinters = () => {
  return api.get("/printers");
};
const addPrinter = (printerDetails) => {
  return api.post("/printers", printerDetails);
};

const deletePrinter = (printerId) => {
  const url = `http://localhost:80/api/printers/${printerId}`;
  return axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const updatePrinterState = (printerId, state) => {
  const url = `http://localhost:80/api/printers/${printerId}`;
  return axios.put(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

function Manage() {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [printerDetails, setPrinterDetails] = useState({
    id: "",
    name: "",
    brand: "",
    machine_model: "",
    state: true,
    campus: "",
    building: "",
    room: "",
  });
  const [printers, setPrinters] = useState([]);
  
  useEffect(() => {
    loadPrinters();
  }, []);

  const loadPrinters = async () => {
    try {
      const response = await fetchPrinters();
      setPrinters(response.data);
    } catch (error) {
      console.error("Error fetching printers:", error);
    }
  };

  const handleAddPrinter = () => {
    setPrinterDetails({
      id: "",
      name: "",
      brand: "",
      machine_model: "",
      state: true,
      campus: "",
      building: "",
      room: "",
    });
    setShowForm(true);
    setShowDetails(false);
  };

  const handlePrinterClick = (index) => {
    const printerInfo = printers[index];
    setPrinterDetails(printerInfo);
    setShowDetails(true);
    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addPrinter(printerDetails);
      loadPrinters();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding printer:", error);
    }
  };

  const handleDeletePrinter = async (printerId) => {
    try {
      await deletePrinter(printerId);
      loadPrinters();
    } catch (error) {
      console.error("Error deleting printer:", error);
    }
  };
  
  const handleActivate = async () => {
    try {
      await updatePrinterState(printerDetails._id, true);
      setPrinterDetails((prevDetails) => ({ ...prevDetails, state: true }));
      loadPrinters();
    } catch (error) {
      console.error("Error updating printer state:", error);
    }
  };

  const handleDisable = async () => {
    try {
      await updatePrinterState(printerDetails._id, false);
      setPrinterDetails((prevDetails) => ({ ...prevDetails, state: false }));
      loadPrinters();
    } catch (error) {
      console.error("Error updating printer state:", error);
    }
  };

  return (
    <div className="managePage">
      <main className="container my-5">
        <div className="header">
          <h1>Danh sách máy in</h1>
          <div className="actions">
            <button className="btn-add" onClick={handleAddPrinter}>
              Thêm máy in
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="search-input"
            />
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
              onChange={(e) =>
                setPrinterDetails({ ...printerDetails, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              name="brand"
              placeholder="Hãng sản xuất"
              value={printerDetails.brand}
              onChange={(e) =>
                setPrinterDetails({ ...printerDetails, brand: e.target.value })
              }
              required
            />
            <input
              type="text"
              name="machine_model"
              placeholder="Loại máy"
              value={printerDetails.machine_model}
              onChange={(e) =>
                setPrinterDetails({
                  ...printerDetails,
                  machine_model: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              name="campus"
              placeholder="Cơ sở"
              value={printerDetails.campus}
              onChange={(e) =>
                setPrinterDetails({ ...printerDetails, campus: e.target.value })
              }
            />
            <input
              type="text"
              name="building"
              placeholder="Tòa nhà"
              value={printerDetails.building}
              onChange={(e) =>
                setPrinterDetails({
                  ...printerDetails,
                  building: e.target.value,
                })
              }
            />
            <input
              type="text"
              name="room"
              placeholder="Phòng"
              value={printerDetails.room}
              onChange={(e) =>
                setPrinterDetails({ ...printerDetails, room: e.target.value })
              }
            />
            <div>
              <label>Trạng thái: </label>
              <select
                name="state"
                value={printerDetails.state}
                onChange={(e) =>
                  setPrinterDetails({
                    ...printerDetails,
                    state: e.target.value === "true",
                  })
                }
                required
              >
                <option value={true}>Kích hoạt</option>
                <option value={false}>Vô hiệu</option>
              </select>
            </div>

            <div className="formChoice">
              <button type="submit" className="btn-primary">
                Lưu máy in
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => setShowForm(false)}
              >
                Hủy
              </button>
            </div>
          </form>
        )}
        {showDetails && (
          <div className="printer-details">
            <h2>Thông tin máy in</h2>
            <p>
              <strong>Tên máy in:</strong> {printerDetails.name}
            </p>
            <p>
              <strong>Hãng sản xuất:</strong> {printerDetails.brand}
            </p>
            <p>
              <strong>Loại máy:</strong> {printerDetails.machine_model}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {printerDetails.state ? "Kích hoạt" : "Vô hiệu"}
            </p>
            <p>
              <strong>Cơ sở:</strong> {printerDetails.campus}
            </p>
            <p>
              <strong>Tòa nhà:</strong> {printerDetails.building}
            </p>
            <p>
              <strong>Phòng:</strong> {printerDetails.room}
            </p>
            <button className="btn-activate" onClick={handleActivate}>
              Kích hoạt
            </button>
            <button className="btn-disable" onClick={handleDisable}>
              Vô hiệu hóa
            </button>
            <button className="cancel" onClick={() => setShowDetails(false)}>
              Trở lại
            </button>
          </div>
        )}
        <div className="printer-list">
          {printers.map((printer, index) => (
            <div key={printer._id} className="printer-item">
              <img
                src="https://phucanhcdn.com/media/product/23196_may_in_canon_lbp6230dn_03.jpg"
                alt={`Máy in ${index + 1}`}
                className="mx-auto mb-2"
              />

              <div className="printerChoice">
                <button
                  className="btn-primary"
                  onClick={() => handlePrinterClick(index)}
                >
                  Máy in {index + 1}
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePrinter(printer._id)}
                >
                  Xóa máy in
                </button>
              </div>
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

export default Manage;