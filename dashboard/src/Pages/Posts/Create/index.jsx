import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Select, MenuItem, CircularProgress, InputLabel, FormControl, Typography, Box } from "@mui/material";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { AuthContext } from "../../../Utils/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    images: [],
  });
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetchData("categories");
      if (response.success) {
        setCategories(response.data);
      } else {
        notify("Something went wrong while fetching categories", "error");
      }
    })();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    const response = await fetchData("upload", {
      method: "POST",
      headers: { authorization: `Bearer ${token}` },
      body: uploadFormData,
    });

    setUploading(false);
    if (!response.success) {
      return notify("Image upload failed!", "error");
    }

    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, response.file.filename],
    }));
    notify("Image uploaded successfully!", "success");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      const response = await fetchData("posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.success) {
        if (response.errors) {
          setErrors(response.errors); // Backend validation errors
        } else {
          notify(response.message || "Failed to create post", "error");
        }
        return;
      }

      notify("Post created successfully!", "success");
      navigate("/posts"); // Redirect to posts list
    } catch (error) {
      notify("An unexpected error occurred. Please try again.", "error");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>Create New Post</Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Title *"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={!!errors.title}
          helperText={errors.title}
        />

        <TextField
          label="Description *"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          error={!!errors.description}
          helperText={errors.description}
        />

        <FormControl fullWidth margin="normal" error={!!errors.categoryId}>
          <InputLabel>Category *</InputLabel>
          <Select name="categoryId" value={formData.categoryId} onChange={handleInputChange}>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box mt={2} display="flex" alignItems="center">
          <input type="file" id="upload-image" hidden onChange={handleImageUpload} />
          <label htmlFor="upload-image">
            <Button variant="contained" color="primary" component="span" disabled={uploading}>
              {uploading ? <CircularProgress size={20} color="inherit" /> : "Upload Image"}
            </Button>
          </label>
        </Box>
        {errors.images && <Typography color="error" variant="body2">{errors.images}</Typography>}

        {/* Image Preview */}
        {formData.images.length > 0 && (
          <Box display="flex" mt={2} gap={2}>
            {formData.images.map((image, index) => (
              <img key={index} src={import.meta.env.VITE_BASE_FILE + image} alt="Uploaded" width={80} height={80} style={{ borderRadius: 8 }} />
            ))}
          </Box>
        )}

        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 3 }}>
          Create Post
        </Button>
      </form>
    </Box>
  );
};

export default CreatePost;
