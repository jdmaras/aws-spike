import React, { useState } from 'react';
import axios from 'axios'



const Uploader = () => {
    //store it locally in state before uploading it to aws
  const [selectedFile, setSelectedFile] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()
    //zFormData constructors making a new form data object
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios({
        method: "post",
        url: "/upload",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }


    return (
        <div>
            <img src="https://ah-yeah-bucket-zone.s3.us-east-2.amazonaws.com/uploads/f9b4cb53-032c-4aee-81bb-1efd8a6dd682-animeshorts.jpeg" />
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" />
    </form>
        </div>
    )
  }
  
export default Uploader;