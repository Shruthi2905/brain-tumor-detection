import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import axios from 'axios';

// Define response type for TypeScript
interface PredictionResult {
  prediction: string;
  confidence: number;
  probabilities: {
    [key: string]: number;
  };
}

function Detection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Backend API URL
  const API_URL = 'http://localhost:5000/predict';

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    
    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      // Send request to backend
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Set prediction results
      setResult(response.data);
    } catch (err: any) {
      console.error('Error during prediction:', err);
      setError(err.response?.data?.error || 'Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to format tumor name for display
  const formatTumorName = (name: string): string => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Brain Tumor Detection</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Select MRI Scan
                </label>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>

          {preview && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Selected Image:</h3>
              <img src={preview} alt="Selected MRI" className="max-w-md mx-auto rounded-lg" />
            </div>
          )}

          <button
            type="submit"
            disabled={!selectedFile || loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${
              !selectedFile || loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </form>

        {error && (
          <div className="mt-8 p-4 bg-red-50 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Analysis Result:</h3>
            <div className="space-y-4">
              <p className="text-xl font-medium">
                Diagnosis: <span className="font-bold">{formatTumorName(result.prediction)}</span>
              </p>
              
              
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
          <p className="text-sm text-yellow-800">
            This is a demonstration tool and should not be used for actual medical diagnosis. 
            Always consult with healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Detection;