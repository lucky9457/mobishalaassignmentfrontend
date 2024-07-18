import React,{useState} from 'react';
import './ClientSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from "reactjs-popup";
import {faPencil, faPlus} from '@fortawesome/free-solid-svg-icons'

import { ClipLoader } from 'react-spinners';
function ClientSidebar({isDarkMode}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [uploadingFile,setUploadingFile] = useState(false);
  
  


  return (
    <div className={`sidebar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1 className='LegAiLOGOName'>LegAi</h1>
      <button className="activate-pro">Legal Ai Assistant</button>
      <hr className='linehor'/>
      
      <div className="pinned-chats">
        <h1 className='knowledgeSidebar'>Clients</h1>
       
        <Popup
         className="popupclass" 
         trigger={<button  id="createfolderbtn" className={`new-chat ${isAnimating ? 'animate' : ''}`}>Create Client
         <FontAwesomeIcon className='pencilIcon' icon={faPlus} />
         </button>}
          modal>
                {close => (
                  <div className="modal modalContainer2">
                    <button className="close" onClick={close}>
                      &times;
                    </button>
                    <div className="header headingCreateFolder">Create a Client</div>
                    <div className="content">
                      <form className="formStyle" >
                        <input  id="categoryinput" type="text" className="fileinput form-control" placeholder="Name the Folder" required/>
                        <input  id="SerialNumber" type="text" className="fileinput form-control" placeholder="SerialNumber" required/>
                        <input  id="Date" type="date" className="fileinput form-control" placeholder="Date" required/>
                        <input  id="Name" type="text" className="fileinput form-control" placeholder="Name of Client" required/>
                        <input  id="NumberMobile" type="Number" className="fileinput form-control" placeholder="MObile Number" required/>
                        <input  id="Email" type="email" className="fileinput form-control" placeholder="Email" required/>
                        <input  id="Remarks" type="text" className="fileinput form-control" placeholder="Remarks" required/>
                        
                        <button className="btnCLassSubmitupload" type="submit">
                        {uploadingFile? <ClipLoader size={16} color="#ffffff" /> : 'Create Client'}
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </Popup>
        
        <h3 className='h3tag'>Folders</h3>
        <p>No Folders yet</p>
      </div> 
      
    </div>
  
  );
}

export default ClientSidebar;