// src/components/climate/ApiFetcher.tsx

import React, { useState } from 'react';
import axios from 'axios';

const ApiFetcher: React.FC = () => {
    const [location, setLocation] = useState('');
    const [apiUrl, setApiUrl] = useState('open-meteo');
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/fetch-climate/', {
                location,
                api_source: apiUrl,
            });
            setData(response.data);
        } catch (err: any) {
            console.error(err);
            setError("API fetch failed.");
        } finally {
            setLoading(false);
        }
    };

    const downloadJson = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'climate_data.json';
        link.click();
    };

    return (
        <div className="max-w-xl space-y-4">
            <div className="bg-white shadow p-4 rounded-xl">
                <h2 className="text-xl font-semibold mb-2">Fetch Climate Data</h2>

                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Enter location (e.g., Lilongwe)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="input w-full"
                        required
                    />

                    <select
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                        className="input w-full"
                    >
                        <option value="open-meteo">Open-Meteo (default)</option>
                        <option value="custom">Custom API</option>
                    </select>

                    {apiUrl === "custom" && (
                        <input
                            type="url"
                            placeholder="https://your-api-endpoint.com"
                            onChange={(e) => setApiUrl(e.target.value)}
                            className="input w-full"
                        />
                    )}
                </div>

                <button
                    onClick={fetchData}
                    disabled={loading}
                    className="btn mt-4 bg-blue-600 text-white"
                >
                    {loading ? "Fetching..." : "Fetch Data"}
                </button>
            </div>

            {error && <p className="text-red-600">{error}</p>}

            {data && (
                <div className="bg-gray-50 border p-4 rounded-xl">
                    <h3 className="font-medium mb-2">Result</h3>
                    <pre className="text-sm overflow-x-auto">{JSON.stringify(data, null, 2)}</pre>
                    <button onClick={downloadJson} className="btn mt-2">Download JSON</button>
                </div>
            )}
        </div>
    );
};

export default ApiFetcher;
