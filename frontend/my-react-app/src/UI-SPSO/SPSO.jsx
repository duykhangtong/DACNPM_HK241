import HomePage from './HomePage/HomePage.jsx';
import Manage from './Manage/Manage.jsx';
import PrinhtHis from './PrintingHistory/PrintHis.jsx';
import Report from './Report-SPSO/Report.jsx';
import { faBell, faUser} from '@fortawesome/free-regular-svg-icons';
import { faAngleDown,faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect, useRef} from 'react';
import logoBK from '../../Image/logo_BK2-removebg.png';
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet } from 'react-router-dom';
import './SPSO.css';
let user = "SPSO";
function Header() 
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
                    <NavLink to="/SPSO/trangchu" end className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                        Trang chủ
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/SPSO/quanly" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                        Quản Lý
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/SPSO/lichsuin" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                        Lịch sử hệ thống
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/SPSO/baocao" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                        Báo Cáo
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
