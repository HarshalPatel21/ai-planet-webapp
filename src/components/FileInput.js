import React from "react";

const FileInput = ({ onFileSelected }) => {
  const handleInputChange = (event) => {
    const newFile = event.target.files[0];

    if (newFile) {
      onFileSelected(newFile);
      event.target.value = ""; // reset it so onChange can be triggered on same file
    }
  };

  return (
    <div className="file-input">
      <input
        type="file"
        id="file"
        className="file-input"
        accept="*"
        onChange={handleInputChange}
        style={{ display: "none" }}
      />
      <label htmlFor="file" className="upload-button">
        Upload File
      </label>
    </div>
  );
};

export default FileInput;
