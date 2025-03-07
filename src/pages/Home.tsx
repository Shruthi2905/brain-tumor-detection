import { Brain, Award, Clock, Users, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Advanced Brain Tumor Detection Using ML
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Leveraging cutting-edge machine learning technology to provide accurate and rapid brain tumor detection and classification.
        </p>
        <Link
          to="/detection"
          className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Detection
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Brain className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Advanced AI Model</h3>
          <p className="text-gray-600">
            State-of-the-art machine learning algorithms trained on extensive medical imaging datasets.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Clock className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Rapid Results</h3>
          <p className="text-gray-600">
            Get instant analysis of MRI scans with high accuracy and reliability.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Award className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Proven Accuracy</h3>
          <p className="text-gray-600">
            Validated results with high precision in tumor detection and classification.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Upload MRI Scan</h3>
            <p className="text-gray-600">Upload your MRI scan image in common formats</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-600">Our AI model analyzes the image</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Get Results</h3>
            <p className="text-gray-600">Receive detailed analysis and classification</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;