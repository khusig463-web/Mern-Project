import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        // Login API Call
        const { data } = await API.post('/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard'); // Login ke baad direct Dashboard par bhejo
      } else {
        // Signup API Call
        await API.post('/auth/signup', formData);
        alert('Registration Successful! Please Login.');
        setIsLogin(true); // Signup ke baad login screen par le jao
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: '10px' }}>
            <label>Name:</label>
            <input type="text" style={{ width: '100%', padding: '8px' }} required
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
        )}
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input type="email" style={{ width: '100%', padding: '8px' }} required
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input type="password" style={{ width: '100%', padding: '8px' }} required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p style={{ marginTop: '15px', textAlign: 'center', cursor: 'pointer', color: '#007BFF' }} 
         onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default Auth;