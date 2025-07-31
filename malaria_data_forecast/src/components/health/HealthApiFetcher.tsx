import React, { useState } from 'react';
import axios from 'axios';

const HealthApiFetcher: React.FC = () => {
    const [customApi, setCustomApi] = useState('');
    const [data, setData] = useState<any>(null);
    const [status, setStatus] = useState<string | null>(null);

    const handleFetch = async () => {
        try {
            setStatus('Fetching data...');
            const response = await axios.get(customApi || 'http://localhost:8000/api/health-data/fetch/');
            setData(response.data);
            setStatus('✅ Data fetched successfully');
        } catch (error) {
            console.error(error);
            setStatus('❌ Failed to fetch data');
        }
    };

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Optional: Enter API endpoint"
                value={customApi}
                onChange={(e) => setCustomApi(e.target.value)}
                className="input w-full"
            />
            <button onClick={handleFetch} className="btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Fetch Health Data
            </button>
            {status && <p>{status}</p>}
            {data && <pre className="bg-gray-100 p-2 rounded text-xs max-h-60 overflow-auto">{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

export default HealthApiFetcher;
