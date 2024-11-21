import './Login.css';
import React, {useState, useEffect, useRef} from 'react';
import login from '../LandingPage/API';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import img_login from '../../Image/img_login-removebg-preview.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock  } from '@fortawesome/free-solid-svg-icons';

const handleLogin = async (email,password,navigate) => {
    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }
    try {
        const response = await login(email, password); // Call the login function
        console.log(response);
        if (response.data && response.data.access_token) {
            localStorage.setItem('access_token', response.data.accessToken);
            console.log("OK");
        }
        if(response)
            navigate('/SPSS/trangchu')
    } catch (error) {
        alert("Login failed. Please check your credentials.");
    }
};
function ĐangNhap()
{
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    return(
        <div className='body-Landing_Page'>
            <div className='box-container-login'>
                <div className='left-container-login'>
                    <header>Sign in</header>
                    <div className='input'>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input type='email' placeholder='Enter your email' name='email' ref={emailRef}></input>
                        <div className='line'></div>
                    </div>
                    <div className='input'>
                        <FontAwesomeIcon icon={faLock} />
                        <input type='password' placeholder='Enter your password' name='password' ref={passwordRef}></input>
                        <div className='line'></div>
                    </div>
                    <div className='remember'>
                        <input type='checkbox'></input>
                        <span>Remember me</span>
                    </div>
                    <div className='kk'>
                        <button onClick={() => handleLogin(emailRef.current.value,passwordRef.current.value,navigate)}>Go Printing</button>
                    </div>
                  
                </div>
                <div className='right-container-login'>
                    <img src={img_login} alt='hehe'></img>
                </div>
            </div>
        </div>
    );
};
export default ĐangNhap