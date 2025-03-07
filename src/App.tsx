import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Brain, HomeIcon, Mail, Upload } from 'lucide-react';
import Detection from './pages/Detection';
import Contact from './pages/Contact';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold text-gray-900">MRI Brain Tumor Detection</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600">
                  <HomeIcon className="h-5 w-5 mr-1" />
                  Home
                </Link>
                <Link to="/detection" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600">
                  <Upload className="h-5 w-5 mr-1" />
                  Detection
                </Link>
                <Link to="/contact" className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-600">
                  <Mail className="h-5 w-5 mr-1" />
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detection" element={<Detection />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;