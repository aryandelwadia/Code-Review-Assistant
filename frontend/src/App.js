
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

import Slider from './Slider';
import { motion } from 'framer-motion';
import Spinner from './Spinner';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [reviewReport, setReviewReport] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setReviewReport(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    setError(null);
    setReviewReport(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:8000/review/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setReviewReport(response.data);
      setCode(response.data.code);
    } catch (err) {
      setError("Error uploading file or getting review: " + err.message);
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blurry-background min-h-screen flex flex-col">

      <Slider />
      <div className={`container mx-auto p-4 flex flex-col items-center ${reviewReport ? 'justify-start' : 'justify-center'} flex-grow`}>
        <motion.div 
          className="blurry-background rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-white text-8xl font-bold font-orbitron m-20">Code Review Assistant</div>
          <h2 className="text-2xl font-bold mb-4">Upload Code for Review</h2>
          <div className="mb-4">
            <input type="file" className="w-full px-3 py-2 border rounded-lg" onChange={handleFileChange} />
          </div>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 flex items-center justify-center"
            onClick={handleUpload} 
            disabled={!selectedFile || loading}
          >
            {loading ? (
              <Spinner />
            ) : (
              "Upload and Review"
            )}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </motion.div>

        <div className="flex w-full mt-4 space-x-4">
          {code && (
            <motion.div 
              className="blurry-background rounded-lg shadow-md p-6 w-1/2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Code</h2>
              <pre className="text-white bg-gray-900 p-4 rounded-lg overflow-auto"><code>{code}</code></pre>
            </motion.div>
          )}

          {reviewReport && (
            <motion.div 
              className="blurry-background rounded-lg shadow-md p-6 w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
            <h2 className="text-2xl font-bold mb-4">Review Report for {reviewReport.filename}</h2>
            {reviewReport.suggestions.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {reviewReport.suggestions.map((suggestion, index) => (
                  <li key={index} className="py-4">
                    <p className="font-semibold text-xl">Line {suggestion.line}:</p>
                    <p>{suggestion.suggestion}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No specific suggestions found. Good job!</p>
            )}
          </motion.div>
        )}
      </div>
      </div>
    </div>
  );
}

export default App;
