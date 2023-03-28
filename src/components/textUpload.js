import React from 'react'
import './text-upload.css'

function TextUpload() {
  const handleUpload = () => {
    alert('Text uploaded')
  }

  return (
    <div className="text-upload-container">
      <form onSubmit={handleUpload}>
        <label>
          Input Question to Categorize:
          <textarea id="freeform" name="freeform" rows="4" cols="50"></textarea>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default TextUpload
