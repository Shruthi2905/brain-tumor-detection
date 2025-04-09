import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Create mailto URL with form data
      const mailtoUrl = `mailto:detectiontumor@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      
      // Open email client
      window.location.href = mailtoUrl;
      
      setSubmitStatus({
        success: true,
        message: "Email client opened. Please send the email from your mail application."
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus({
        success: false,
        message: "There was an error opening your email client. Please try again or contact us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <p className="text-gray-600 mb-8">
            Have questions about our brain tumor detection system? We're here to help.
            Reach out to us using any of the following methods.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">detectiontumor@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+91 9390948610</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">
                  Bhavans Vivekananda College<br />
                  Sainikpuri<br />
                  Hyderabad, Telangana.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
          
          {submitStatus && (
            <div className={`mb-4 p-3 rounded ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;