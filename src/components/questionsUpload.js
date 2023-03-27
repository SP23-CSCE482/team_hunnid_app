import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import '../styles/pdf-upload.css'

const QuestionsUpload = ({
  label,
  updateQuestionsCB,
  ...otherProps
}) => {

  const handleUploadBtnClick = () => {
    // Takes all the information
  }

  const callUpdateQuestionsCB = () => {
    updateQuestionsCB(file)
  }

  return (
    <div className="file-upload-container">
      <button
        type="button"
        className="upload-file-button"
        onClick={handleUploadBtnClick}
      >
        <span>Upload a pdf file</span>
      </button>
      <input
        className="input-field"
        type="file"
        title=""
        value=""
        onChange={callUpdateQuestionsCB}
        ref={fileInputField}
        {...otherProps}
      />
    </div>
  )
}
QuestionsUpload.propTypes = {
  label: PropTypes.any,
  updateFileCb: PropTypes.any,
}

export default QuestionsUpload
