import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Utils/AuthContext";
import fetchData from "../../Utils/fetchData";
import notify from "../../Utils/notify";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper } from "@mui/material";
import { Container } from "@mui/system";

export default function Comments() {
  const [comments, setComments] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const res = await fetchData("comments?populate=userId,postId", {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
        },
      });
      setComments(res.data);
    })();
  }, [token]);

  const handleRemove = async (id) => {
    const res = await fetchData(`comments/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${token}`,
      },
    });
    if (res.success) {
      notify("Comment removed successfully", "success");
      const newComments = comments?.filter((e) => e._id !== id);
      setComments(newComments);
    } else {
      notify("Failed to remove comment", "error");
    }
  };

  const handleActivies = async (id, isActive) => {
    const res = await fetchData(`comments/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ isActive: !isActive }),
    });
    if (res.success) {
      notify("Comment updated successfully", "success");
      const newComments = comments?.map((e) => {
        if (e._id === id) {
          e.isActive = !isActive;
        }
        return e;
      });
      setComments(newComments);
    } else {
      notify("Failed to update comment", "error");
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Comments Management
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">User</TableCell>
                <TableCell align="center">Comment</TableCell>
                <TableCell align="center">Post</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments?.map((e, index) => (
                <TableRow key={e._id}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{e?.userId?.username}</TableCell>
                  <TableCell align="center">{e?.content}</TableCell>
                  <TableCell align="center">{e?.postId?.title}</TableCell>
                  <TableCell align="center">{e?.createdAt.split('T')[0]}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color={e?.isActive ? "success" : "error"}
                      sx={{ textTransform: "capitalize" }}
                    >
                      {e?.isActive ? "Active" : "Inactive"}
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => handleActivies(e._id, e.isActive)}
                      variant="contained"
                      color="primary"
                      sx={{ marginRight: 2 }}
                    >
                      Toggle Active
                    </Button>
                    <Button
                      onClick={() => handleRemove(e._id)}
                      variant="contained"
                      color="error"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}
