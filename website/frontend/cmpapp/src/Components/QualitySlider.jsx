import { useState } from "react";

function QualitySlider() {
  const [quality, setQuality] = useState(75);

  return (
    <div className="slider">
      <p>Compression Quality: {quality}%</p>
      <input
        type="range"
        min="10"
        max="100"
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
      />
    </div>
  );
}

export default QualitySlider;
