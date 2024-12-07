import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const TeamDetails = () => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { teamId } = useParams();

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/team/${teamId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch team details');
        }
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 rounded-lg">
        <h2 className="text-red-600 text-xl font-semibold">Error</h2>
        <p className="mt-2 text-red-500">{error}</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
          ← Back to Registration
        </Link>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-yellow-50 rounded-lg">
        <h2 className="text-yellow-600 text-xl font-semibold">Team Not Found</h2>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
          ← Back to Registration
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Team Details</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Team Name</h3>
            <p className="mt-1 text-gray-600">{team.teamName}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Team Code</h3>
            <p className="mt-1 text-gray-600 font-mono">{team.teamCode}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700">Members</h3>
            <ul className="mt-2 space-y-2">
              {team.members.map((member) => (
                <li key={member._id} className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.email}</p>
                  <p className="text-sm text-gray-500">{member.collegeName}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-block bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            ← Back to Registration
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;