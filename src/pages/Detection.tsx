import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';

function Detection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    // Here you would typically send the image to your ML model
    // For now, we'll simulate a response
    setTimeout(() => {
      setResult('Glioma Tumor Detected');
      setLoading(false);
    }, 2000);
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

        {result && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Analysis Result:</h3>
            <p className="text-gray-800">{result}</p>
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