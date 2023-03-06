import React, {useRef} from "react";
import PropTypes from 'prop-types';
import "./pdf-upload.css";



const PdfUpload = ({
                        label,
                        updateFileCb,
                        maxFileSizeInBytes = 500000,
                        ...otherProps
                    }) => {
    const fileInputField = useRef(null);

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const handleNewFileUpload = (e) => {
        const {files: newFile} = e.target;
        if (newFile.length) {
            callUpdateFilesCb(newFile);
        }
    };

    const callUpdateFilesCb = (file) => {
        updateFileCb(file);
    };

    return (
        <div className="file-upload-container">
            <button type="button" className="upload-file-button" onClick={handleUploadBtnClick}>
                <span>Upload a pdf file</span>
            </button>
            <input
                className="input-field"
                type="file"
                title=""
                value=""
                onChange={handleNewFileUpload}
                ref={fileInputField}
                {...otherProps}
            />
        </div>
    )
}
PdfUpload.propTypes = {
    label : PropTypes.any,
    updateFileCb : PropTypes.any,
    maxFileSizeInBytes : PropTypes.any,
    };

export default PdfUpload;
