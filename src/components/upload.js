import React from 'react';
import { Button } from '@material-ui/core';

function FileUpload() {
    const handleUpload =() => {
    alert("File uploaded")
    };
    return (
      <div className="FileUploadComp">
          <form onSubmit={handleUpload}>
            <h1 class="text-white" >Upload a file</h1>
            <input type="file" />
            <Button variant="contained" type="submit">Upload</Button>
          </form>
      </div> 
    );
  }
export default FileUpload;