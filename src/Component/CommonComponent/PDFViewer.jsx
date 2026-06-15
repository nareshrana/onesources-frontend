import React, { useEffect } from "react";
import { loader } from "./Loader";


const PDFViewer = ({ pdfUrl }) => {
    console.log(pdfUrl,"pdfUrl");
    
    useEffect(() => {
        loader("hide")
    }, [])

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <iframe
        src={`https://docintel.app/pdf-view?url=${encodeURIComponent(pdfUrl)}`}
        style={{ width: "100%", height: "100vh", border: "none", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "8px" }}
        title="PDF Viewer"
      ></iframe>
    </div>
  );
};

export default PDFViewer;