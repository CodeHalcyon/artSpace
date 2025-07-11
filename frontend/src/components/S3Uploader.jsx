import React, { useState } from "react";
import api from "../api/axios"; // your axios instance with baseURL

const S3Uploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");

    try {
      setUploading(true);

      // 1. Request pre-signed URL from backend
      const { data } = await api.post("s3/upload-url/", {
        filename: file.name,
        filetype: file.type,
      });

      const { url, key } = data;

      // 2. Upload directly to S3
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      // 3. Construct the file URL
      const fileUrl = `https://${import.meta.env.VITE_S3_BUCKET}.s3.${import.meta.env.VITE_S3_REGION}.amazonaws.com/${key}`;
      onUpload(fileUrl); // return the uploaded URL to the parent

      alert("Upload successful!");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md p-4 border rounded shadow-md">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload to S3"}
      </button>
    </div>
  );
};

export default S3Uploader;
