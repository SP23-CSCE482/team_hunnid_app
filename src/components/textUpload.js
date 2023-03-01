import React from 'react'
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");


function TextUpload() {
  const handleUpload = () => {
    alert('Text uploaded')
  }
  return (
    <form onSubmit={handleUpload}>
      <label>
        Input Question to Categorize:
        <input type="text" name="name" />
      </label>
    <input type="submit" value="Submit" />
  </form>
  )
}

export default textUpload
