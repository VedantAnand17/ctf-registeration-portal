"use client"

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const RegistrationForm = () => {
  const [registrationType, setRegistrationType] = useState('new');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    collegeName: '',
    teamName: '',
    teamCode: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = registrationType === 'new' 
      ? '/api/register/new-team'
      : '/api/register/join-team';

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      toast.success(data.message);
      if (data.teamCode) {
        toast.success(`Your team code is: ${data.teamCode}`);
      }
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        collegeName: '',
        teamName: '',
        teamCode: ''
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Team Registration</h2>
        
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
                registrationType === 'new'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setRegistrationType('new')}
            >
              Create New Team
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-md transition-colors duration-200 ${
                registrationType === 'existing'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setRegistrationType('existing')}
            >
              Join Existing Team
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm text-black focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm text-black focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">College Name</label>
            <input
              id="collegeName"
              type="text"
              name="collegeName"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm text-black focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              value={formData.collegeName}
              onChange={handleChange}
              placeholder="Enter your college name"
            />
          </div>

          {registrationType === 'new' ? (
            <div>
              <label htmlFor="teamName" className="block text-sm font-medium text-gray-700">Team Name</label>
              <input
                id="teamName"
                type="text"
                name="teamName"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm text-black focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="Choose a unique team name"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="teamCode" className="block text-sm font-medium text-gray-700">Team Code</label>
              <input
                id="teamCode"
                type="text"
                name="teamCode"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm text-black focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={formData.teamCode}
                onChange={handleChange}
                placeholder="Enter your team code"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          >
            {registrationType === 'new' ? 'Create Team' : 'Join Team'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;