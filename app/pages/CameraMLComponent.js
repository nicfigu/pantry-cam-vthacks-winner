import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import Next.js dynamic

const MODEL_NAME = "ingredient-detector-fc7de";
const MODEL_VERSION = 1;
const CONFIDENCE_THRESHOLD = 0.1;
const PUBLISHABLE_KEY = "rf_85Q3CqevavPYXiP30d5P8AYth6e2";

// Dynamically import roboflow on the client side only
const roboflow = dynamic(
  () => import("roboflow-js"),
  { ssr: false } // Disable server-side rendering for roboflow
);

function CameraMLComponent({ onDetection }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    loadModel();
    setupCamera();
  }, []);

  const loadModel = async () => {
    try {
      const rf = await roboflow; // Ensure roboflow is loaded dynamically
      const loadedModel = await rf
        .auth({
          publishable_key: PUBLISHABLE_KEY,
        })
        .load({
          model: MODEL_NAME,
          version: MODEL_VERSION,
        });
      loadedModel.configure({ threshold: CONFIDENCE_THRESHOLD });
      setModel(loadedModel);
    } catch (error) {
      console.error("Error loading model:", error);
    }
  };

  const setupCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      const imageData = canvasRef.current.toDataURL("image/jpeg");
      detectImage(imageData);
    }
  };

  const detectImage = async (imageData) => {
    if (!model) {
      console.log("Model not loaded yet");
      return;
    }

    try {
      const predictions = await model.detect(imageData);
      const detectedIngredients = predictions
        .filter((pred) => pred.confidence > CONFIDENCE_THRESHOLD)
        .map((pred) => pred.class);
      onDetection(detectedIngredients);
    } catch (error) {
      console.error("Detection failed:", error);
    }
  };

  return (
    <div className="mt-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full max-w-md mx-auto"
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button
        onClick={captureImage}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Capture and Detect
      </button>
    </div>
  );
}

export default CameraMLComponent;
