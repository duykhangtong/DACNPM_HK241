import HomePage from './HomePage/HomePage.jsx';
import Manage from './Manage/Manage.jsx';
import PrinhtHis from './PrintingHistory/PrintHis.jsx';
import Report from './Report-SPSO/Report.jsx';
import { faBell, faUser} from '@fortawesome/free-regular-svg-icons';
import { faAngleDown,faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect, useRef} from 'react';
import logoBK from '../../Image/logo_BK2-removebg.png';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './SPSO.css';
let user = "SPSO";
function Header() 
{
    const [notificationCount, setNotificationCount] = useState(3);
    return(
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
                    <NavLink to="/" end className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                        Trang chủ
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/manage" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                        Quản Lý
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/printhistory" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                        Lịch sử hệ thống
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/report" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
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
    );
}
function SPSS()
{
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/manage" element={<Manage/>} />
                <Route path="/printhistory" element={<PrinhtHis />} />
                <Route path="/report" element={<Report/>} />
            </Routes>
        </Router>
    );
}
export default SPSS;