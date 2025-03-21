import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Box,
  Link,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import fetchData from "../../../Utils/fetchData";
import useFormFields from "../../../Utils/useFormFields";
import notify from "../../../Utils/notify";
import { AuthContext } from "../../../Utils/AuthContext";

const Login = ({ handlePageType }) => {
  const [fields, handleChange] = useFormFields();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetchData("auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (response.success) {
        notify(response.message, "success");
        handleAuth(response.data.token, response.data.user);
        navigate("/");
      } else {
        setError(response.message || "Invalid username or password");
      }
    } catch (error) {
      setError("Connection Lost");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={6}
        sx={{ padding: 4, marginBottom: "70px", mt: 8, textAlign: "center", bgcolor: "#FFF2F2" }}
      >
        <LoginIcon sx={{ fontSize: 50, color: "#2D336B", mb: 1 }} />
        <Typography variant="h5" fontWeight="bold" color="#2D336B" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body2" color="#7886C7" mb={3}>
          Please login to continue.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={fields.username}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            sx={{ bgcolor: "white" }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={fields.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            sx={{ bgcolor: "white" }}
          />
          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Link href="#" variant="body2" color="#A9B5DF">
              Forgot password?
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.5, bgcolor: "#2D336B", "&:hover": { bgcolor: "#7886C7" } }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
          </Button>
        </form>
        <Typography variant="body2" mt={3}>
          Don't have an account?
          <Link onClick={handlePageType} sx={{ color: "#2D336B", ml: 1, cursor: "pointer" }}>
            Register Here
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
