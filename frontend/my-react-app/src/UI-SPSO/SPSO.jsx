import HomePage from './HomePage/HomePage.jsx';
import Manage from './Manage/Manage.jsx';
import PrinhtHis from './PrintingHistory/PrintHis.jsx';
import Report from './Report-SPSO/Report.jsx';
import { faBell, faUser} from '@fortawesome/free-regular-svg-icons';
import { faAngleDown,faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect, useRef} from 'react';
import logoBK from '../../Image/logo_BK2-removebg.png';
import { BrowserRouter as Router, Routes, Route, NavLink, Outlet, useNavigate } from 'react-router-dom';
import './SPSO.css';
import style_headerSPSS from './SPSS.module.css'; // Import đúng CSS Module
let user = "SPSO";
function User_Dropdown() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
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
    return (
        <div className={style_headerSPSS["tt-user"]} onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUser} className={style_headerSPSS["tt-iconuser"]} />
            <span>{user}</span>
            <FontAwesomeIcon icon={faAngleDown} className={style_headerSPSS["tt-angledown"]} />
            {dropdownOpen && (
                <div className={style_headerSPSS["dropdown-menu"]}>
                   
                    <button className={style_headerSPSS["dropdown-item"]}  onClick={() => {handleDelete();}}>
                        Đăng xuất
                    </button>
                </div>
            )}
        </div>
    );
}
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
        
                   <User_Dropdown />
    </div>
            <Outlet />
    </div>
    );
}
export default Header;