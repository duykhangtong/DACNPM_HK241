import axios from 'axios';
import './Muatrang.css';
import React, { useState,useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Muatrangin = () => {
  const [pages, setPages] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    zip: "",
  });
  const token = localStorage.getItem("access_token");
  const pricePerPage = 10; // Giá mỗi trang
  const totalAmount = pages * pricePerPage;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    if(pages < 1)
    {
      toast.error(`Số trang không hợp lệ`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    axios.post("http://localhost:80/api/pageOrders", { number_of_page: pages },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((response) => {
      toast.success(`Thanh toán thành công`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    ).catch((error) => {
      toast.error(`Thanh toán thất bại`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
    
  };

  return (
    <div className="mt-container">
      {/* Left Box */}
      <div className="mt-left-box">
        <div className='vien_left'></div>
        <div className='left_container_payment'>
        <h2>Chọn số trang và phương thức thanh toán</h2>
        {/* Số trang */}
        <label>
          <h3>Số trang cần mua:</h3>
          <input
            type="number"
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            min={1}
          />
        </label>

        {/* Phương thức thanh toán */}
        <h3>Phương thức thanh toán:</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {["Apple Pay", "Google Pay", "WeChat Pay", "PayPal", "Alipay"].map((method) => (
            <button
              key={method}
              onClick={() => setPaymentMethod(method)}
              className={paymentMethod === method ? "active" : ""}
            >
              {method}
            </button>
          ))}
        </div>

        {/* Thông tin thẻ */}
        <h3>Thông tin thẻ:</h3>
        <label>
          Số thẻ:
          <input
            type="text"
            name="cardNumber"
            value={cardInfo.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
          />
        </label>
        <label>
          Ngày hết hạn:
          <input
            type="text"
            name="expiryDate"
            value={cardInfo.expiryDate}
            onChange={handleInputChange}
            placeholder="MM/YY"
          />
        </label>
        <label>
          CVC:
          <input
            type="text"
            name="cvc"
            value={cardInfo.cvc}
            onChange={handleInputChange}
            placeholder="123"
          />
        </label>
        <label>
          Zip:
          <input
            type="text"
            name="zip"
            value={cardInfo.zip}
            onChange={handleInputChange}
            placeholder="12345"
          />
        </label>
        </div>
      </div>

      {/* Right Box */}
      <div className="mt-right-box">
      <div className='vien_right'></div>
      <div className='right_container_payment'>
        <h2>Thông tin thanh toán</h2>
        <p>Số trang bạn sẽ mua: {pages}</p>
        <p>Phương thức thanh toán: {paymentMethod || "Chưa chọn"}</p>
        <p>Tổng số tiền: ${totalAmount}</p>
        <button className="mt-payment-button" onClick={handleSubmit}>
          Thanh toán
        </button>
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Muatrangin;
