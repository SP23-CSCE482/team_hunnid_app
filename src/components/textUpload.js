import React from 'react'
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
import "./text-upload.css";

function TextUpload() {
  const handleUpload = () => {
    alert('Text uploaded')
  }
  
  return (
    <form onSubmit={handleUpload}>
      <label>
        Input Question to Categorize:
        <textarea id="freeform" name="freeform" rows="4" cols="50">
        </textarea>
      </label>
    <input type="submit" value="Submit" />
  </form>
  )
}

export default TextUpload
