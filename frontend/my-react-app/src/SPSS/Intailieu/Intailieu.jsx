import './Intailieu.css'
import React, {useState, useEffect, useRef} from 'react';
import plus from '../../../Image/Frame 46.png';
let newfile='';
function Intailieu()
{
    return(
        <div className='prt-Body'>
            <div className='tt-container_upload'>
                <header>
                    IN TÀI LIỆU
                </header>
                <div className='ptr-sub_header'>
                    <p>Tải tài liệu mà bạn muốn in</p>
                </div>
               <div className='prt-drag_container'>
                <label className="prt-labelDrag" for='file-input'>
                    <img src={plus}></img>
                    <p className='prt-uploadtext'>Upload or Drag&Drop your file here</p>
                    <p className='prt-sizeuptext'>Size up to 100MB</p>
                </label>
                <input type='file' id='file-input'></input>
               </div>
            </div>
        </div>
    );
}
export default Intailieu;