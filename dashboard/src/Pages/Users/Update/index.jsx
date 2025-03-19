import React, { useState, useEffect, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../Utils/AuthContext";
import { 
  TextField, Button, Typography, Paper, MenuItem, Select, FormControl, 
  InputLabel, Alert, Box, Container, Grid, Card, CardContent 
} from "@mui/material";

const UpdateUser = () => {
  const [formData, setFormData] = useState({ username: "", email: "", role: "user" });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // Fetch user data
  useEffect(() => {
    (async () => {
      const response = await fetchData(`users/${userId}`, {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });
      if (!response.success) {
        notify("Failed to fetch user data", "error");
        navigate("/users");
      } else {
        setFormData({
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
        });
      }
    })();
  }, [userId, navigate, token]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.role) newErrors.role = "Role is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetchData(`users/${userId}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.success) throw new Error(response.message || "Failed to update user");

      notify("User updated successfully!", "success");
      setSuccessMessage("User updated successfully!");
      setTimeout(() => navigate("/users"), 1500);
    } catch (error) {
      notify(error.message, "error");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Update User
      </Typography>

      <Grid container spacing={2}>
        {/* Left Side: User Update Form */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              {successMessage && <Alert severity="success">{successMessage}</Alert>}
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {/* Username Field */}
                <TextField
                  label="Username *"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.username}
                  helperText={errors.username}
                />

                {/* Email Field */}
                <TextField
                  label="Email *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email}
                />

                {/* Role Select */}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Role *</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    error={!!errors.role}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, py: 1.5 }}
                >
                  Update User
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: Information Box */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Instructions
            </Typography>
            <Typography variant="body2" color="textSecondary">
              - Ensure the username is unique.<br />
              - Email must be in a valid format.<br />
              - Only admins can change user roles.<br />
              - Click **Update User** to save changes.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UpdateUser;
