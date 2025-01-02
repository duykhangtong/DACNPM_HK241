import axios from 'axios';
import './Muatrang.css';
import React, { useState,useRef,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Muatrangin = () => {
  const [pages, setPages] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const token = localStorage.getItem("access_token");
  const pricePerPage = 500; // Giá mỗi trang
  const totalAmount = pages * pricePerPage;
  const historyRef = useRef(null);
  const [paymentHistory, setPaymentHistory] = useState([]); // Lịch sử thanh toán
  const [showHistory, setShowHistory] = useState(false); // Hiển thị lịch sử
  const fetchPaymentHistory = () => {
    axios
      .get('http://localhost:80/api/pageOrders/my', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPaymentHistory(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payment history:', error);
      });
  };
  useEffect(() => {
    fetchPaymentHistory();
  }, []);
  const scrollToHistory = () => {
    historyRef.current.scrollIntoView({ behavior: 'smooth' });
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
      fetchPaymentHistory();

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
  const toggleHistory = () => {
    setShowHistory(!showHistory);
    if (!showHistory) scrollToHistory();
  };
  return (
  <div className="body-mt-container">
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
           
            
            placeholder="1234 5678 9012 3456"
          />
        </label>
        <label>
          Ngày hết hạn:
          <input
            type="text"
            name="expiryDate"
        
            placeholder="MM/YY"
          />
        </label>
        <label>
          CVC:
          <input
            type="text"
            name="cvc"
           
            placeholder="123"
          />
        </label>
        <label>
          Zip:
          <input
            type="text"
            name="zip"
          
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
        {/* Payment History Section */}
      
      <ToastContainer />
    </div>
     {/* Toggle History Section */}
     <div className="history-section" ref={historyRef}>
        <button onClick={toggleHistory}>
          {showHistory ? 'Ẩn lịch sử thanh toán' : 'Xem lịch sử thanh toán'}
          <span className={`arrow ${showHistory ? 'up' : 'down'}`} />
        </button>

        {showHistory && (
          <div className="payment-history">
            <h3>Lịch sử thanh toán</h3>
            <table>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Số trang</th>
                  <th>Tổng số tiền</th>
                  <th>Ngày thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((history, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{history.number_of_page}</td>
                    <td>${history.money_amount}</td>
                    <td>{new Date(history.purchase_time).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
export default Muatrangin;
