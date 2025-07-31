// src/components/climate/FileUpload.tsx

import React, { useState } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        if (!file) {
            setStatus("❌ Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/upload-climate-file/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setStatus("✅ File uploaded successfully.");
        } catch (err) {
            console.error(err);
            setStatus("❌ Upload failed. Please check the file format and contents.");
        }
    };

    return (
        <div className="border p-6 rounded bg-white max-w-xl shadow-md">
            <form onSubmit={handleSubmit}>
                <label className="block font-medium mb-2">Upload File (CSV, XLSX, XLS, TSV)</label>
                <input
                    type="file"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .tsv"
                    onChange={handleChange}
                    className="mb-4"
                    required
                />
                <button type="submit" className="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Upload
                </button>
            </form>
            {status && <p className="mt-4 text-sm">{status}</p>}
        </div>
    );
};

export default FileUpload;
