import React, { useState, useContext, useEffect } from "react";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { AuthContext } from "../../../Utils/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UpdatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    images: [],
  });
  const [uploading, setUploading] = useState(false);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id: postId } = useParams();
  const [categories, setCategories] = useState([]);

  // Fetch categories & post data
  useEffect(() => {
    (async () => {
      const categoriesRes = await fetchData("categories");
      if (categoriesRes.success) setCategories(categoriesRes.data);
      else notify("Error fetching categories", "error");

      const postRes = await fetchData(`posts/${postId}`);
      if (postRes.success) {
        setFormData({
          title: postRes.data.title,
          description: postRes.data.description,
          categoryId: postRes.data.categoryId,
          images: postRes.data.images,
        });
      } else {
        notify("Failed to fetch post", "error");
        navigate("/getAll");
      }
    })();
  }, [postId, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
  
    if (!response.success || !response.file) {
      return notify("Image upload failed!", "error");
    }
  
    // Ensure the correct property name (filename or path)
    const uploadedImage = response.file.filename || response.file.path;
  
    if (!uploadedImage) {
      return notify("Invalid image response from server!", "error");
    }
  
    setFormData((prevData) => ({
      ...prevData,
      images: [...prevData.images, uploadedImage],
    }));
  
    notify("Image uploaded successfully!", "success");
  };
  
  

  const handleUpdateClick = async () => {
    setUploading(true);
    const response = await fetchData(`posts/${postId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.success) {
      notify("Post updated successfully!", "success");
      navigate("/posts");
    } else {
      notify(response.message || "Failed to update post", "error");
    }
    setUploading(false);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 4, backgroundColor: "#f4f6f9", borderRadius: 3 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center", color: "#3498db" }}>
            Update Post
          </Typography>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select name="categoryId" value={formData.categoryId} onChange={handleInputChange}>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{ marginY: 2, backgroundColor: "#3498db" }}
            disabled={uploading}
          >
            Upload Image
            <input type="file" hidden onChange={handleImageUpload} />
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#2ecc71" }}
            disabled={uploading}
            onClick={handleUpdateClick}
          >
            {uploading ? <CircularProgress size={24} color="inherit" /> : "Update Post"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UpdatePost;
