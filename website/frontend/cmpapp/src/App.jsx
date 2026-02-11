import UploadBox from "./components/UploadBox";
import "./styles.css";

function App() {
  return (
    <>
      <div className="navbar">
        <div className="logo">COMPRESSOR</div>
        <div>Fast & Efficient Image Compression</div>
      </div>

      <div className="main-container">
        <div className="hero">
          <h1>
            Optimize <span>JPEG, PNG & WebP</span> Easily
          </h1>
        </div>

        <div className="upload-card">
          <UploadBox />
        </div>
      </div>
    </>
  );
}

export default App;
