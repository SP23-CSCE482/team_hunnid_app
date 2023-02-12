import React from 'react';

function FileUpload() {
    const handleUpload =() => {
    alert("File uploaded")
    };
    return (
      <div className="App">
          <form onSubmit={handleUpload}>
            <h1>Upload a file</h1>
            <input type="file" />
            <button type="submit">Upload</button>
          </form>
      </div>
    );
  }
export default FileUpload;