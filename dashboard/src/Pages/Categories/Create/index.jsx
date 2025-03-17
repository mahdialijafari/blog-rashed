import React, { useEffect, useState } from 'react';
import useFormFields from '../../../Utils/useFormFields';
import fetchData from '../../../Utils/fetchData';
import { useContext } from 'react';
import { AuthContext } from '../../../Utils/AuthContext';
import notify from '../../../Utils/notify';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';

const CreateCategory = () => {
  const [errors, setErrors] = useState('');
  const [fields, handleChange] = useFormFields();
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetchData('categories', {
      method: 'POST',
      headers: {
        'authorization': `bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(fields),
    });
    setLoading(false);
    if (response.success) {
      notify(response.message, 'success');
      navigate('/categories');
    } else {
      notify(response.message, 'error');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', backgroundColor: '#e8f5e9',mt:4 }}>
      <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, boxShadow: 5, width: '100%', maxWidth: 360 }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold', 
            marginBottom: 3, 
            textAlign: 'center', 
            color: '#2c3e50', // Title color 
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' 
          }}
        >
          Create Category
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Icon Field */}
          <TextField
            fullWidth
            label="Icon URL (optional)"
            name="icon"
            value={fields.icon || ''}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            placeholder="Enter icon URL"
            sx={{ marginBottom: 2 }}
          />

          {/* Title Field */}
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={fields.title || ''}
            onChange={handleChange}
            required
            variant="outlined"
            margin="normal"
            placeholder="Enter category title"
            error={!!errors}
            helperText={errors?.title && errors}
            sx={{ marginBottom: 2 }}
          />

          {/* Submit Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="success"  // Using 'success' color for the button (green)
            disabled={loading}
            sx={{ padding: '12px', fontWeight: 'bold', backgroundColor: '#28a745', '&:hover': { backgroundColor: '#218838' } }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Category'}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreateCategory;
