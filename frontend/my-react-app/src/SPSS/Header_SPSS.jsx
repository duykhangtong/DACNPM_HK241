import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import logoBK from '../../Image/logo_BK2-removebg.png';
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import style_headerSPSS from './SPSS.module.css'; // Import đúng CSS Module

let user = "NguyenKhang";

function User_Dropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className={style_headerSPSS["tt-user"]} onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} className={style_headerSPSS["tt-iconuser"]} />
            <span>{user}</span>
            <FontAwesomeIcon icon={faAngleDown} className={style_headerSPSS["tt-angledown"]} />
            {dropdownOpen && (
                <div className={style_headerSPSS["dropdown-menu"]}>
                    <a href="#" className={style_headerSPSS["dropdown-item"]}>
                        Thông tin
                    </a>
                    <a href="#" className={style_headerSPSS["dropdown-item"]}>
                        Báo cáo
                    </a>
                    <a href="#" className={style_headerSPSS["dropdown-item"]}>
                        Đăng xuất
                    </a>
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
