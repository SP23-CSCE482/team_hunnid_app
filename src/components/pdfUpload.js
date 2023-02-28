import React, {useRef} from "react";

import "./pdf-upload.css";

DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000

const PdfUpload = ({
                        label,
                        updateFileCb,
                        maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
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

export default PdfUpload;
