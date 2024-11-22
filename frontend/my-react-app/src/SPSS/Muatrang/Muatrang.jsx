import './Muatrang.css';
import React, { useState } from "react";
const Muatrangin = () => {
  const [pages, setPages] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    zip: "",
  });

  const pricePerPage = 10; // Giá mỗi trang
  const totalAmount = pages * pricePerPage;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    alert(`Thanh toán thành công! Bạn đã mua ${pages} trang với tổng số tiền $${totalAmount}`);
  };

  return (
    <div className="mt-container">
      {/* Left Box */}
      <div className="mt-left-box">
        <h2>Chọn số trang và phương thức thanh toán</h2>
        {/* Số trang */}
        <label>
          Số trang cần mua:
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

      {/* Right Box */}
      <div className="mt-right-box">
        <h2>Thông tin thanh toán</h2>
        <p>Số trang bạn sẽ mua: {pages}</p>
        <p>Phương thức thanh toán: {paymentMethod || "Chưa chọn"}</p>
        <p>Tổng số tiền: ${totalAmount}</p>
        <button className="mt-payment-button" onClick={handleSubmit}>
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Muatrangin;
