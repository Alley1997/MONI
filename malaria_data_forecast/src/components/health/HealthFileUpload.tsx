import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const HealthFileUpload: React.FC = () => {
    const [uploadedData, setUploadedData] = useState<any[]>([]);
    const [success, setSuccess] = useState<string | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target?.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
            setUploadedData(data);
            setSuccess("✅ File uploaded successfully.");
        };
        reader.readAsBinaryString(file);
    };

    return (
        <div className="space-y-4">
            <input type="file" accept=".csv,.xlsx" onChange={handleFileUpload} className="input" />
            {success && <p className="text-green-600">{success}</p>}

            {uploadedData.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-bold mb-2">Preview:</h3>
                    <pre className="bg-gray-100 p-2 rounded text-xs max-h-60 overflow-auto">
                        {JSON.stringify(uploadedData.slice(0, 5), null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};

export default HealthFileUpload;
