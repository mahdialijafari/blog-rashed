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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import fetchData from "../../../Utils/fetchData";
import useFormFields from "../../../Utils/useFormFields";
import notify from "../../../Utils/notify";
import { AuthContext } from "../../../Utils/AuthContext";

const Register = ({ handlePageType }) => {
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
      const response = await fetchData("auth/register", {
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
        setError(response.message || "ثبت نام ناموفق بود. دوباره تلاش کنید.");
      }
    } catch (error) {
      setError("ارتباط با سرور قطع شده است.");
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
        <PersonAddIcon sx={{ fontSize: 50, color: "#2D336B", mb: 1 }} />
        <Typography variant="h5" fontWeight="bold" color="#2D336B" gutterBottom>
          ایجاد حساب کاربری
        </Typography>
        <Typography variant="body2" color="#7886C7" mb={3}>
          به ما بپیوندید! اطلاعات زیر را وارد کنید.
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
            label="ایمیل"
            name="email"
            type="email"
            value={fields.email || ""}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.5, bgcolor: "#2D336B", "&:hover": { bgcolor: "#7886C7" } }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "ثبت‌نام"}
          </Button>
        </form>
        <Typography variant="body2" mt={3}>
          قبلاً ثبت‌نام کرده‌اید؟
          <Link onClick={handlePageType} sx={{ color: "#2D336B", ml: 1, cursor: "pointer" }}>
            وارد شوید
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Register;
