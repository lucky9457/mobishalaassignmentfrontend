
import './ClientDataset.css';
import { useTheme } from "../ThemeContext";
import ClientTableView from '../ClientTableView/ClientTableView';
import SideNavigationBar from '../SideNavigationBar/SideNavigationBar';
import ClientSidebar from '../ClientSidebar/ClientSidebar';
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from "reactjs-popup";
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { ClipLoader } from 'react-spinners';

function ClientDataset() {
    const { isDarkMode, toggleTheme } = useTheme();
    const [uploadingFile, setUploadingFile] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);


    console.log(isDarkMode,"abc")
    return (
        <div className={`clientdatasetContainer ${isDarkMode ? 'dark-mode' : 'light-mode'}`}  >
            <SideNavigationBar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <ClientSidebar className="mainSide" isDarkMode={isDarkMode} />
            <div className='tablesRows'>
                <div className='clientFolderAdd'>
                    <h1 className='clientHeader'>Clients</h1>
                    <Popup
                        className="popupclass"
                        trigger={<button id="createfolderbtn" className={`buttonClient ${isAnimating ? 'animate' : ''}`}>Create Client
                            <FontAwesomeIcon className='pencilIcon' icon={faPlus} />
                        </button>}
                        modal>
                        {close => (
                            <div id='modalClient' className="modal modalContainer2">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="headerclient headingCreateFolder">Create a Client</div>
                                <div className="contentClient">
                                    <form className="formStyle" >
                                        <input id="categoryinput" type="text" className="fileinput form-control" placeholder="Name the Folder" required />
                                        <input id="SerialNumber" type="text" className="fileinput form-control" placeholder="SerialNumber" required />
                                        <input id="Date" type="date" className="fileinput form-control" placeholder="Date" required />
                                        <input id="Name" type="text" className="fileinput form-control" placeholder="Name of Client" required />
                                        <input id="NumberMobile" type="Number" className="fileinput form-control" placeholder="MObile Number" required />
                                        <input id="Email" type="email" className="fileinput form-control" placeholder="Email" required />
                                        <input id="Remarks" type="text" className="fileinput form-control" placeholder="Remarks" required />

                                        <button className="btnCLassSubmitupload" type="submit">
                                            {uploadingFile ? <ClipLoader size={16} color="#ffffff" /> : 'Create Client'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                <ClientTableView />
            </div>

        </div>

    );
}

export default ClientDataset;