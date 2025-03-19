import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../../Utils/fetchData";
import notify from "../../../Utils/notify";
import { AuthContext } from "../../../Utils/AuthContext";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Typography, Paper, IconButton, Tooltip 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Container } from "@mui/system";

export default function GetAllUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { id } = useParams();

  // Fetch all users
  useEffect(() => {
    (async () => {
      const response = await fetchData("users", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.success) {
        setUsers(response.data);
      } else {
        notify("Failed to fetch users", "error");
      }
    })();
  }, [token]);

  return (
    <Container maxWidth="xl">
      <Paper sx={{ padding: 3, marginTop: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          User Management
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>Username</strong></TableCell>
                <TableCell align="center"><strong>Email</strong></TableCell>
                <TableCell align="center"><strong>Role</strong></TableCell>
                <TableCell align="center"><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow 
                  key={index}
                  hover
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.role}</TableCell>
                  <TableCell align="center">
                    {/* Edit Button */}
                    <Tooltip title="Edit User">
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/users/${user._id}`)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
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
