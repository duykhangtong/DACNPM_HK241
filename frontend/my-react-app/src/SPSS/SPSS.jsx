import Trangchu from './Trangchu/trangchu.jsx';
import Intailieu from './Intailieu/Intailieu.jsx';
import Lichsuin from './Lichsuin/Lichsuin.jsx';
import { faBell, faUser} from '@fortawesome/free-regular-svg-icons';
import { faAngleDown,faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect, useRef} from 'react';
import logoBK from '../../Image/logo_BK2-removebg.png';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './SPSS.css';
let user = "NguyenKhang";
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
                    <NavLink to="/thongtin" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                        Thông tin
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/intailieu" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
                        In tài liệu
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/lichsuin" className={({ isActive }) => isActive ? 'tt-active' : 'tt-noactive'}>
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
    );
}
function SPSS()
{
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Trangchu />} />
                <Route path="/thongtin" element={<div>Thông tin</div>} />
                <Route path="/intailieu" element={<Intailieu />} />
                <Route path="/lichsuin" element={<Lichsuin/>} />
            </Routes>
        </Router>
    );
}
export default SPSS;