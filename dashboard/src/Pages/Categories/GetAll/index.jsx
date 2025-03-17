import React, { useContext, useEffect, useState } from "react";
import fetchData from "../../../Utils/fetchData";
import { useNavigate } from "react-router-dom";
import notify from "../../../Utils/notify";
import { AuthContext } from "../../../Utils/AuthContext";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";

const GetAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchData("categories"); // Replace with your API endpoint
        if (!response.success) {
          throw new Error("Failed to fetch categories");
        }
        setCategories(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoryToDelete]);

  // Handle delete confirmation dialog open
  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  // Handle delete confirmation dialog close
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  // Handle actual delete action
  const handleDeleteConfirm = async () => {
    if (categoryToDelete) {
      const response = await fetchData(`categories/${categoryToDelete}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });

      if (response.success) {
        notify(response.message, "success");
        const newCategories = categories.filter((e) => e._id != id);
        setCategories(newCategories);
      }
      handleDeleteDialogClose();
    }
  };

  // Handle edit button click
  const handleEditClick = (id) => {
    navigate(`/categories/${id}`); // Navigate to the edit page
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography color="textSecondary" variant="h4" gutterBottom>
        {categories.length>0?"All Categories":"You Don't Have any Category"}
      </Typography>
      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item key={category._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate(`/categories/${category._id}`)}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box display="flex" alignItems="center">
                    {category.icon && (
                      <Box
                        component="img"
                        src={category.icon}
                        alt="icon"
                        sx={{ width: 24, height: 24, mr: 2 }}
                      />
                    )}
                    <Typography variant="h6">{category.title}</Typography>
                  </Box>
                  <Box>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click event
                        handleEditClick(category._id);
                      }}
                      color="info"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click event
                        handleDeleteClick(category._id);
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this category?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GetAllCategories;
