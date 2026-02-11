import { useRef, useState } from "react";
import { uploadImage } from "../services/api";

function UploadBox() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [quality, setQuality] = useState(75);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Select image first");
      return;
    }

    try {
      setLoading(true);
      const blob = await uploadImage(file, quality);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.webp";
      a.click();
    } catch (err) {
      console.error(err);
      alert("Conversion failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className={`upload-box ${isDragging ? "dragging" : ""}`}
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <strong>Drop image or click to upload</strong>
        <p>Supports JPG, PNG, WEBP</p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ marginTop: "20px", maxWidth: "100%", borderRadius: "12px" }}
        />
      )}

      <div className="slider">
        <p>Compression Quality : {quality}%</p>
        <p>Note 75 is best compression </p>
        <input
          type="range"
          min="10"
          max="100"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
        />
      </div>

      <button className="primary-btn" onClick={handleConvert}>
        {loading ? "Processing..." : "Convert & Download"}
      </button>
    </div>
  );
}

export default UploadBox;
