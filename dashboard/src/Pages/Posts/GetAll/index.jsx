import React, { useEffect, useState, useContext } from "react";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { AuthContext } from "../../../Utils/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, CircularProgress, Typography, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const GetAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State for confirmation dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const response = await fetchData("posts");
    setPosts(response?.data || []);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!postToDelete) return;

    const response = await fetchData(`posts/${postToDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.success) {
      notify(response.message, "success");
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postToDelete));
    } else {
      notify(response.message || "Failed to delete post", "error");
    }

    setOpenDialog(false);
    setPostToDelete(null);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 3, color: "#3498db", textAlign: "center" }}>
        Manage Posts
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#ecf0f1" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Title</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Image</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Category</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <TableRow 
                    key={post._id} 
                    hover 
                    onClick={(e) => {
                      if (!e.target.closest(".actionBtn")) {
                        navigate(`/posts/${post._id}`);
                      }
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell sx={{ textAlign: "center" }}>{post?.title}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <img 
                        src={post?.images?.[0] ? import.meta.env.VITE_BASE_FILE + post.images[0] : "/placeholder.jpg"} 
                        alt={post.title || "Post Image"} 
                        style={{ width: 60, height: 60, borderRadius: "5px", objectFit: "cover" }}
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>{post?.categoryId?.title}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      {/* Edit Button */}
                      <IconButton 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click from triggering navigation
                          navigate(`/posts/${post._id}`);
                        }} 
                        className="actionBtn"
                        sx={{ color: "#3498db", marginRight: 1 }}
                      >
                        <EditIcon />
                      </IconButton>

                      {/* Delete Button */}
                      <IconButton 
                        onClick={(e) => {
                          e.stopPropagation();
                          setPostToDelete(post._id);
                          setOpenDialog(true);
                        }} 
                        className="actionBtn"
                        sx={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: "center", padding: 3, fontStyle: "italic", color: "#7f8c8d" }}>
                    No posts available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this post? This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GetAllPosts;
