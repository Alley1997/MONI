import React, { useState } from "react";
import FileUpload from "@/components/climate/FileUpload";
import ApiFetcher from "@/components/climate/ApiFetcher";
import ManualForm from "@/components/climate/ManualForm";

console.log("✅ ClimateData.tsx loaded");

const ClimateData: React.FC = () => {
    const [option, setOption] = useState("upload");

    console.log("✅ Rendering ClimateData component");

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Upload Climate Data</h1>

            {/* Option Toggle Buttons with Active State Styling */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setOption("upload")}
                    className={`px-4 py-2 rounded font-medium transition ${option === "upload" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                        }`}
                >
                    Upload File
                </button>
                <button
                    onClick={() => setOption("api")}
                    className={`px-4 py-2 rounded font-medium transition ${option === "api" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                        }`}
                >
                    Use API
                </button>
                <button
                    onClick={() => setOption("form")}
                    className={`px-4 py-2 rounded font-medium transition ${option === "form" ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
                        }`}
                >
                    Fill Form
                </button>
            </div>

            {/* Conditional Render Based on Selected Option */}
            {option === "upload" && <FileUpload />}
            {option === "api" && <ApiFetcher />}
            {option === "form" && <ManualForm />}
        </div>
    );
};

export default ClimateData;
