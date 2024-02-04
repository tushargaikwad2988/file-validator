import React, { useState } from 'react';
import { useCSVReader, formatFileSize } from "react-papaparse";
import './dashboard.css';

export default function Dashboard() {
    const { CSVReader } = useCSVReader();
    const [col, setCol] = useState([]);
    const [val, setVal] = useState([]);
    return (
            <CSVReader
                onUploadAccepted={(results) => {
                    const value = results.data;
                    const filtered = value.filter((_, i) => i !== 0);
                    setCol(value[0]);
                    setVal(filtered);
                }}
                config={{ worker: true }}
                noDrag
            >
                {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                    getRemoveFileProps,
                    Remove,
                }) => (
                    <>
                        <div {...getRootProps()}>
                            {acceptedFile ? (
                                <>
                                    <div className="info-container">
                                        <div>
                                            <p>{acceptedFile.name}</p>
                                            <span>{formatFileSize(acceptedFile.size)}</span>
                                        </div>
                                        <div className="info__progress">
                                            <ProgressBar />
                                        </div>
                                        <div {...getRemoveFileProps()} className="info__remove">
                                            <Remove color={"red"} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <button>Upload file</button>
                            )}
                        </div>
                        <table style={{display: 'block', overflowX: 'auto', fontSize: '20px'}}>
                            <thead>
                                <tr>
                                    {col.length > 0 &&
                                        col.map((col, i) => <th key={i}>{col}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {val.map((val, i) => (
                                    <tr key={i}>
                                        {val.map((v, i) => (
                                            <td key={i}>{v}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </CSVReader>
    );
}