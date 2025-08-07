// src/components/QuoteForm.js
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import EstimateResult from "./EstimateResult";
import './quoteForm.css';

function QuoteForm() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "model/stl": [".stl"], "model/obj": [".obj"] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setResult(null); // reset on new file
    },
  });

  const handleSubmit = async () => {
    if (!file) return alert("Please upload a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/api/quote/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      alert("Failed to get estimate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-container">
      <div {...getRootProps()} className={`drop-area ${isDragActive ? "active" : ""}`}>
        <input {...getInputProps()} />
        {file ? <p>{file.name}</p> : <p>Drag & drop your STL/OBJ here</p>}
      </div>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Estimating..." : "Get Estimate"}
      </button>

      {result && <EstimateResult result={result} />}
    </div>
  );
}

export default QuoteForm;
