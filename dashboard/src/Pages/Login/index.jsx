import React, { useContext, useState } from 'react';
import fetchData from '../../Utils/fetchData'; // Adjust the path as needed
import useFormFields from '../../Utils/useFormFields'; // Adjust the path as needed
import notify from '../../Utils/notify';
import { AuthContext } from '../../Utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, CircularProgress } from '@mui/material';

const Login = () => {
  const [fields, handleChange] = useFormFields();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetchData('auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      if (response.success) {
        if (response.data.user.role !== 'admin') {
          notify('You do not have permission', 'error');
        } else {
          notify(response.message, 'success');
          handleAuth(response.data.token, response.data.user);
          navigate('/');
        }
      } else {
        setError(response.message || 'Invalid username or password');
      }
    } catch (error) {
      setError('Connection Lost');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 3 }}>
          Admin Dashboard Login
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={fields.username || ''}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            sx={{ mb: 2 }}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={fields.password || ''}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            sx={{ mb: 2 }}
          />

          {/* Error Message */}
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ padding: '12px', fontWeight: 'bold', backgroundColor: '#1abc9c', '&:hover': { backgroundColor: '#16a085' } }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
