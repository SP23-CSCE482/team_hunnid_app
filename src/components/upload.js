import React from 'react'
import { Button } from '@material-ui/core'
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js')

function FileUpload() {
  const handleUpload = () => {
    alert('File uploaded')
  }
  return (
    <form onSubmit={handleUpload}>
      <input id="userPdf" type="file" />
      <Button variant="contained" type="submit">
        Upload
      </Button>
    </form>
  )
}
export default FileUpload
