import React, { useEffect, useState } from "react";
import "./Info.css";
import axios from "axios";
const Info = () => {
  const [userData, setUserData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:5000/api/spso", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { full_name, email, phone_number } = response.data;
        setUserData({ full_name, email, phone_number });
      } catch (err) {
        console.error("Error fetching data:", err.response?.data || err.message);
      }
    };
    fetchData();
  }, []);   
  return (
    <div className="parent-info-container">
    <div className="info-container">
      <div className="info-header">
        {/* Avatar */}
        <div
          alt="Avatar"
          className="info-avatar"
        />

        {/* About Me Content */}
        <div className="info-details">
          <h1>About Me</h1>
          <p className="info-role">
            A Lead UX & UI designer based in Canada
          </p>
          <p className="info-description">
            I <span className="highlight">design and develop</span> services for customers of
            all sizes, specializing in creating stylish, modern websites, web
            services and online stores. My passion is to design digital user
            experiences through the bold interface and meaningful interactions.
          </p>

          {/* Personal Information */}
          <div className="info-personal">
            <div>
              <p>
                <strong className="olala">Full Name:</strong> {userData.full_name || "Loading..."}
              </p>
              <p>
                <strong className="olala">E-mail:</strong> {userData.email || "Loading..."}             
              </p>
            </div>
            <div>
              <p>
                <strong className="olala">Last Recently:</strong> {userData.phone_number || "Loading..."}              
              </p>
            </div>
    
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="info-stats">
        <div>
          <h2>500</h2>
          <p>Happy Clients</p>
        </div>
        <div>
          <h2>150</h2>
          <p>Projects Completed</p>
        </div>
        <div>
          <h2>850</h2>
          <p>Photo Captures</p>
        </div>
        <div>
          <h2>190</h2>
          <p>Telephonic Talks</p>
        </div>
      </div>
    </div>
    </div>
  );
};
export default Info;
