import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import fetchData from "../../Utils/fetchData";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Safely extract user and ID from Redux
  const user = useSelector(state => state.auth?.user);
  const id = user?.id; 

  console.log("User ID:", user); // Debugging line
  
  useEffect(() => {
    if (!id) return; // Avoid fetching if ID is undefined
    (async () => {
      try {
        setLoading(true);
        const response = await fetchData(`users/${id}`); // ✅ Fixed interpolation
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]); // ✅ Dependency array ensures fetch only runs when ID exists

  // Update user profile
  const handleUpdateProfile = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await fetchData(`users/${id}`, { // ✅ Fixed interpolation
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (response.success) {
        setEditMode(false);
      }
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  if (loading || !profile) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ padding: 4, mt: 8, textAlign: "center", bgcolor: "#FFF2F2" }}>
        <Typography variant="h4" fontWeight="bold" color="#2D336B">
          Profile Information
        </Typography>
        <Typography variant="body2" color="#7886C7" mb={3}>
          Manage your account details
        </Typography>

        {editMode ? (
          <>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={profile.username}
              onChange={handleChange}
              margin="normal"
              sx={{ bgcolor: "white" }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              margin="normal"
              sx={{ bgcolor: "white" }}
            />
            <TextField
              fullWidth
              label="Role"
              name="role"
              value={profile.role}
              onChange={handleChange}
              margin="normal"
              sx={{ bgcolor: "white" }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, bgcolor: "#2D336B", "&:hover": { bgcolor: "#7886C7" } }}
              onClick={handleUpdateProfile}
            >
              <SaveIcon sx={{ mr: 1 }} /> Save Changes
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6" color="#2D336B">
              Username: {profile.username}
            </Typography>
            <Typography variant="h6" color="#2D336B">
              Email: {profile.email}
            </Typography>
            <Typography variant="h6" color="#2D336B">
              Role: {profile.role}
            </Typography>
            <Box display="flex" justifyContent="center" mt={2}>
              <IconButton onClick={() => setEditMode(true)} sx={{ color: "#2D336B" }}>
                <EditIcon />
              </IconButton>
            </Box>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
