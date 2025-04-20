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
import { login } from "../../../Store/Slices/AuthSlice";
import { useDispatch } from "react-redux";

const Login = ({ handlePageType }) => {
  const [fields, handleChange] = useFormFields();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, handleAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

        const { token, user } = response.data;
        dispatch(login({ token, user }));
        handleAuth(token, user);
        navigate("/profile");
      } else {
        setError(response.message || "نام کاربری یا رمز عبور اشتباه است");
      }
    } catch (error) {
      setError("ارتباط با سرور برقرار نشد. لطفاً اینترنت خود را بررسی کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ direction: "rtl" }}>
      <Paper
        elevation={6}
        sx={{ padding: 4, marginBottom: "70px", mt: 8, textAlign: "center", bgcolor: "#FFF2F2" }}
      >
        <LoginIcon sx={{ fontSize: 50, color: "#2D336B", mb: 1 }} />
        <Typography variant="h5" fontWeight="bold" color="#2D336B" gutterBottom>
          خوش آمدید!
        </Typography>
        <Typography variant="body2" color="#7886C7" mb={3}>
          لطفاً وارد حساب کاربری خود شوید
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="نام کاربری"
            name="username"
            value={fields.username || ""}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            sx={{ bgcolor: "white" }}
          />
          <TextField
            fullWidth
            label="رمز عبور"
            name="password"
            type="password"
            value={fields.password || ""}
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
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Link href="#" variant="body2" color="#A9B5DF">
              فراموشی رمز عبور؟
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.5, bgcolor: "#2D336B", "&:hover": { bgcolor: "#7886C7" } }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "ورود"}
          </Button>
        </form>
        <Typography variant="body2" mt={3}>
          حساب کاربری ندارید؟
          <Link onClick={handlePageType} sx={{ color: "#2D336B", ml: 1, cursor: "pointer" }}>
            ثبت‌نام کنید
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
