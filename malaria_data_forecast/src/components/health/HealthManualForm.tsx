import React, { useState } from 'react';
import axios from 'axios';

const HealthManualForm: React.FC = () => {
    const [formData, setFormData] = useState({
        location: '',
        malaria_incidence: '',
        test_positivity_rate: '',
        parasite_prevalence: '',
        anemia_prevalence: '',
        malaria_mortality_rate: '',
        recorded_at: ''
    });

    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccess(null);
        setError(null);
        try {
            await axios.post('http://127.0.0.1:8000/api/health-data/', formData);
            setSuccess('✅ Data submitted!');
            setFormData({
                location: '',
                malaria_incidence: '',
                test_positivity_rate: '',
                parasite_prevalence: '',
                anemia_prevalence: '',
                malaria_mortality_rate: '',
                recorded_at: ''
            });
        } catch (err) {
            console.error(err);
            setError('❌ Submission failed. Check input.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                    <label className="block font-medium">{key.replace(/_/g, ' ')}</label>
                    <input
                        type={key === 'recorded_at' ? 'datetime-local' : 'text'}
                        name={key}
                        value={value}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
            ))}

            <button type="submit" className="btn bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Submit
            </button>

            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}
        </form>
    );
};

export default HealthManualForm;
