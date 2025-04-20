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
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import fetchData from "../../Utils/fetchData";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth?.user);
  const token = useSelector((state) => state.auth?.token);

  useEffect(() => {
    if (!user?._id) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetchData(`users/${user._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.success) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات کاربر:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?._id, token]);

  const handleUpdateProfile = async () => {
    if (!user?._id) return;

    try {
      setLoading(true);
      const response = await fetchData(`users/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (response.success) {
        setEditMode(false);
      }
    } catch (error) {
      console.error("خطا در بروزرسانی پروفایل:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  if (loading || !profile) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ direction: "rtl" }}>
      <Paper
        elevation={8}
        sx={{
          padding: 5,
          m: 8,
          textAlign: "center",
          bgcolor: "#FFF2F2",
          borderRadius: "20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "#2D336B",
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            {profile.username?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h4" fontWeight="bold" color="#2D336B" mt={2}>
            اطلاعات کاربری
          </Typography>
          <Typography variant="body2" color="#7886C7" mb={3}>
            مدیریت اطلاعات حساب کاربری شما
          </Typography>
        </Box>

        {editMode ? (
          <>
            <TextField
              fullWidth
              label="نام کاربری"
              name="username"
              value={profile.username}
              onChange={handleChange}
              margin="normal"
              sx={{ bgcolor: "white", borderRadius: "10px" }}
            />
            <TextField
              fullWidth
              label="ایمیل"
              name="email"
              value={profile.email}
              onChange={handleChange}
              margin="normal"
              sx={{ bgcolor: "white", borderRadius: "10px" }}
            />
            <TextField
              fullWidth
              label="نقش کاربر"
              name="role"
              value={profile.role}
              onChange={handleChange}
              margin="normal"
              sx={{ bgcolor: "white", borderRadius: "10px" }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: "#2D336B",
                color: "white",
                "&:hover": { bgcolor: "#7886C7" },
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              onClick={handleUpdateProfile}
            >
              <SaveIcon sx={{ ml: 1 }} /> ذخیره تغییرات
            </Button>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 2,
                p: 3,
                bgcolor: "#ffffff",
                borderRadius: "15px",
                boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h6" color="#2D336B">
                <strong>نام کاربری:</strong> {profile.username}
              </Typography>
              <Typography variant="h6" color="#2D336B">
                <strong>ایمیل:</strong> {profile.email}
              </Typography>
              <Typography variant="h6" color="#2D336B">
                <strong>نقش:</strong> {profile.role}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="center" mt={3}>
              <IconButton
                onClick={() => setEditMode(true)}
                sx={{
                  bgcolor: "#2D336B",
                  color: "white",
                  "&:hover": { bgcolor: "#7886C7" },
                  padding: 2,
                  borderRadius: "50%",
                }}
              >
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
