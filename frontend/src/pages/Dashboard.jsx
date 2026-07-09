import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Fetch User's Projects from Backend
  const fetchProjects = async () => {
    try {
      const { data } = await API.get('/projects/my-projects');
      setProjects(data);
      setLoading(false);
    } catch (err) {
      console.error("Projects load karne mein dikkat aayi:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 2. Create a New Project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!title) return;

    try {
      const { data } = await API.post('/projects/create', { title, description });
      setProjects([...projects, data]); // UI list mein naya project turant add karo
      setTitle('');
      setDescription('');
      alert('Project Created Successfully!');
    } catch (err) {
      alert('Project banane mein error aaya');
    }
  };

  // 3. Logout handler
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2>My Projects Dashboard</h2>
        <button onClick={handleLogout} style={{ padding: '8px 15px', background: '#DC3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {/* Form to Create New Project */}
      <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '4px' }}>
        <h3>Create New Project</h3>
        <form onSubmit={handleCreateProject} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <textarea placeholder="Project Description (Optional)" value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', height: '60px' }} />
          <button type="submit" style={{ padding: '10px', background: '#28A745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            + Create Project
          </button>
        </form>
      </div>

      {/* List of Existing Projects */}
      <h3>Your Projects</h3>
      {loading ? <p>Loading projects...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {projects.length === 0 ? <p>No projects found. Create one above!</p> : (
            projects.map((project) => (
              <div key={project._id} 
                   onClick={() => navigate(`/project/${project._id}`)} // Project Workspace link
                   style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}
                   onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                   onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <h4 style={{ margin: '0 0 10px 0', color: '#007BFF' }}>{project.title}</h4>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{project.description || 'No description provided.'}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;