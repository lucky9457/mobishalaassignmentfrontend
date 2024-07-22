import "./ClientTableView.css"
import "../StorageMainContent/StorageMainContent.css"
import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


const ClientTableView = () => {
    const a="a"
    return (
        <div className="tableSearchTable tablesearchVw">
            <div className="searchrow">
                <div className="searchCon">
                    <FontAwesomeIcon className="searchicon" icon={faMagnifyingGlass} />
                    <input className="searchEle"
                        type="search"
                        id="searchElement"
                      
                        placeholder="Search files..."
                        />
                </div>
            </div>

            <div className="table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Name</th>
                            <th>Uploaded Date</th>
                            <th>Filesize</th>
                            <th>View</th>
                           
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>hn</td>
                        <td>ss</td>
                        <td>ss</td>
                        <td>ss</td>
                        <td>ss</td>
                        <td>ss</td>
                        <td>ss</td>

                        
                    </tbody>
                </table>
            </div></div>
    )
}

export default ClientTableView