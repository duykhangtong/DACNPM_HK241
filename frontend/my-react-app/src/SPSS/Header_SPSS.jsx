
import { faBell, faUser} from '@fortawesome/free-regular-svg-icons';
import { faAngleDown,faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect, useRef} from 'react';
import logoBK from '../../Image/logo_BK2-removebg.png';
import { BrowserRouter as Router, Routes, Route, NavLink,Outlet } from 'react-router-dom';
import './SPSS.css';
let user = "NguyenKhang";
function Header_SPSS() 
{
    const [notificationCount, setNotificationCount] = useState(3);
    return(
    <div>
            <div className='tt-navbar'>
                <div className="tt-logo-SPSS">
                    <span>
                        <img src={logoBK} alt='Logo đh BK'></img>
                    </span>
                    <span className='tt-SPSS'>
                        SPSS
                    </span>
                </div>
                <ul className="tt-nav-links">
                        <li>
                            <NavLink to="/SPSS/trangchu" end className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                                Trang chủ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/SPSS/thongtin" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                                Thông tin
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/SPSS/intailieu" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                                In tài liệu
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/SPSS/lichsuin" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                                Lịch sử in
                            </NavLink>
                        </li>
                </ul>
                <div className="tt-notification">
                <FontAwesomeIcon icon={faBell} className="tt-iconbell"/>
                {notificationCount > 0 && (
                        <span className="notification-badge">{notificationCount}</span>
                    )}
                </div>
                <div className="tt-user">
                    <FontAwesomeIcon icon={faUser} className="tt-iconuser"/>
                    <span>{user}</span>
                    <FontAwesomeIcon icon={faAngleDown} className="tt-angledown"/>
                </div>
            
            </div>
            <Outlet />
    </div>
    );
}
export default Header_SPSS;