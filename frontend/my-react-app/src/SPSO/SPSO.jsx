import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {useState, useEffect, useRef} from 'react';
import { faBell, faUser, faComment } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown,faChartColumn,faGear,faHistory, faPrint, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import './SPSO.css';
let user ='Khang';
function Navbar_row()
{
    return(
    <div className='SPSO-navbar-row'>
        <div className='SPSO-logo'>
            <p>SPSO</p>
        </div>
        <div className='SPSO-rightnavbar'>
            <FontAwesomeIcon icon={faComment} className="SPSO-faComment"/>
            <FontAwesomeIcon icon={faBell} className="SPSO-faBell"/>
            <div className='SPSO-user'>
                <FontAwesomeIcon icon={faUser} className="SPSO-faUser"/>
                <p>{user}</p>
                <FontAwesomeIcon icon={faAngleDown} className="SPSO-faAngleDown"/>
            </div>
        </div>
    </div>
    );
};
function Body()
{
    return(
    <div className='SPSO-Body'>
        <div className='SPSO-navbar-col'>
            <div className='SPSO-function Statistic'>
                <div>
                <FontAwesomeIcon icon={faChartColumn} className="SPSO-faChartColumn"/>
                </div>
                <div>
                <p>Thống kê</p>
                </div>
            </div>
            <div className='SPSO-function Info'>
                <div>
                    <FontAwesomeIcon icon={faInfoCircle} className="SPSO-faInfoCircle"/>
                </div>  
                <div>
                    <p>Thông tin</p>
                </div>
            </div>
            <div className='SPSO-function Print'>
                <div>
                    <FontAwesomeIcon icon={faPrint} className="SPSO-faPrint"/>
                </div>
                <div>
                <p>Máy in</p>
                </div>
            </div>
            <div className='SPSO-function Config'>
                <div>
                    <FontAwesomeIcon icon={faGear} className="SPSO-faGear"/>
                </div>
                <div>
                <p>Cấu hình</p>
                </div>
            </div>
            <div className='SPSO-function History'>
                <div>
                    <FontAwesomeIcon icon={faHistory} className="SPSO-faHistory"/>
                </div>
                <div>
                <p>Lịch sử in</p>
                </div>
            </div>

        </div>
        <div className='content'>

        </div>
    </div>
    );
}
function SPSO()
{
    return(
      <div>
        <Navbar_row/>      
        <Body/>
        </div>
    );
};
export default SPSO;