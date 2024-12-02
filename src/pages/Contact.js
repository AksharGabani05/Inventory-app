import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message) newErrors.message = 'Message is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
      setSuccess(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="max-w-2xl w-full bg-white shadow-2xl rounded-xl p-10">
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-8">Get in Touch</h1>
        
        {success && (
          <div className="text-center mb-6 text-green-600 font-medium">
            Your message has been sent successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-4 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Write your message here"
              rows="5"
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm mt-2">{errors.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
