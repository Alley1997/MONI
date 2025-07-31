import React, { useState } from 'react';
import axios from 'axios';

const ManualForm: React.FC = () => {
    const now = new Date().toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"

    const [formData, setFormData] = useState({
        location: '',
        temperature: '',
        humidity: '',
        rainfall: '',
        wind_speed: '',
        recorded_at: now,
    });

    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(null);
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/climate-data/', formData);
            setSuccess('✅ Data submitted successfully!');
            setFormData({
                location: '',
                temperature: '',
                humidity: '',
                rainfall: '',
                wind_speed: '',
                recorded_at: now,
            });
        } catch (err: any) {
            console.error(err);
            setError('❌ Submission failed. Please check input and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl p-6 bg-white rounded shadow">
            <div>
                <label className="block font-semibold text-gray-700 mb-1">Location</label>
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block font-semibold text-gray-700 mb-1">Temperature (°C)</label>
                <input
                    type="number"
                    step="0.1"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block font-semibold text-gray-700 mb-1">Humidity (%)</label>
                <input
                    type="number"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label className="block font-semibold text-gray-700 mb-1">Rainfall (mm)</label>
                <input
                    type="number"
                    step="0.1"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block font-semibold text-gray-700 mb-1">Wind Speed (km/h)</label>
                <input
                    type="number"
                    step="0.1"
                    name="wind_speed"
                    value={formData.wind_speed}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block font-semibold text-gray-700 mb-1">
                    Recorded At <span className="text-sm text-gray-500">(Use format: YYYY-MM-DDTHH:MM)</span>
                </label>
                <input
                    type="datetime-local"
                    name="recorded_at"
                    value={formData.recorded_at}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>

            <button
                type="submit"
                className={`w-full py-2 px-4 rounded text-white font-semibold ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>

            {success && <p className="text-green-600 font-medium">{success}</p>}
            {error && <p className="text-red-600 font-medium">{error}</p>}
        </form>
    );
};

export default ManualForm;
