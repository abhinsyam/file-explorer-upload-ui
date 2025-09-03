import React, { useState } from "react";

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files) return;
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));

    try {
      const res = await fetch(
        "http://localhost:8080/api/resumes/upload?username=abhin",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setStatus("Upload success: " + JSON.stringify(data.uploaded));
    } catch (err) {
      console.error(err);
      setStatus("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Resumes</h2>
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
};
export default FileUpload;
