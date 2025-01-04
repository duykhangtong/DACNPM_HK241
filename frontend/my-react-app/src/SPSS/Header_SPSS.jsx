import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState,useEffect } from 'react';
import logoBK from '../../Image/logo_BK2-removebg.png';
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet,useNavigate } from 'react-router-dom';
import style_headerSPSS from './SPSS.module.css'; // Import đúng CSS Module
import { use } from 'react';
import axios from 'axios';
function User_Dropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userName,setUserName] = useState("Loading...");
    const navigate = useNavigate();
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const handleDelete = () => {
        localStorage.clear();
        navigate('/');
    };
    const handleInfo = () => {
        navigate('/SPSS/info');
    };
    const fetchData = async () => {
        try {
          const accessToken = localStorage.getItem("access_token");
          const response = await axios.get("http://localhost:80/api/account/client", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          setUserName(response.data.full_name);
        } catch (err) {
          console.error("Error fetching data:", err.response?.data || err.message);
        }
      };
      useEffect(() => {
        fetchData();
      }
    ,[]);
    return (
        <div className={style_headerSPSS["tt-user"]} onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} className={style_headerSPSS["tt-iconuser"]} />
            <span>{userName}</span>
            <FontAwesomeIcon icon={faAngleDown} className={style_headerSPSS["tt-angledown"]} />
            {dropdownOpen && (
                <div className={style_headerSPSS["dropdown-menu"]}>
                    <button className={style_headerSPSS["dropdown-item"]}  onClick={() => {handleInfo();}}>
                        Thông tin
                    </button>
                    <button className={style_headerSPSS["dropdown-item"]}  onClick={() => {handleDelete();}}>
                        Đăng xuất
                    </button>
                </div>
            )}
        </div>
    );
}

function Header_SPSS() {
    const [notificationCount, setNotificationCount] = useState(3);

    return (
        <div>
            <div className={style_headerSPSS["tt-navbar"]}>
                <div className={style_headerSPSS["tt-logo-SPSS"]}>
                    <span>
                        <img src={logoBK} alt="Logo đh BK" />
                    </span>
                    <span className={style_headerSPSS["tt-SPSS"]}>SPSS</span>
                </div>
                <ul className={style_headerSPSS["SPSS-tt-nav-links"]}>
                    <li>
                        <NavLink
                            to="/SPSS/trangchu"
                            end
                            className={({ isActive }) =>
                                isActive ? style_headerSPSS["tt-active"] : style_headerSPSS["tt-noactive"]
                            }
                        >
                            Trang chủ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/SPSS/muatrangin"
                            className={({ isActive }) =>
                                isActive ? style_headerSPSS["tt-active"] : style_headerSPSS["tt-noactive"]
                            }
                        >
                            Mua trang
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/SPSS/intailieu"
                            className={({ isActive }) =>
                                isActive ? style_headerSPSS["tt-active"] : style_headerSPSS["tt-noactive"]
                            }
                        >
                            In tài liệu
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/SPSS/lichsuin"
                            className={({ isActive }) =>
                                isActive ? style_headerSPSS["tt-active"] : style_headerSPSS["tt-noactive"]
                            }
                        >
                            Lịch sử in
                        </NavLink>
                    </li>
                </ul>
                <div className={style_headerSPSS["tt-notification"]}>
                    <FontAwesomeIcon icon={faBell} className={style_headerSPSS["tt-iconbell"]} />
                    {notificationCount > 0 && (
                        <span className={style_headerSPSS["notification-badge"]}>{notificationCount}</span>
                    )}
                </div>
                <User_Dropdown />
            </div>
            <Outlet />
        </div>
    );
}

export default Header_SPSS;
