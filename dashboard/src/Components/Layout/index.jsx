import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Typography,
} from "@mui/material";
import {
  Category,
  Comment,
  PostAdd,
  People,
  Logout,
  Home,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../Utils/AuthContext";

const Layout = () => {
  const {handleAuth} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            backgroundColor: "#2c3e50",
            color: "#ecf0f1",
            padding: "10px 0",
          },
        }}
      >
        <Typography sx={{
            textAlign:'center',
            padding:'4% 0',
            fontSize:'24px',
            color:'lightblue'
        }}>Admin Dashboard</Typography>
        <List>
          {[
            { text: "Home", icon: <Home />, path: "/" },
            { text: "Categories", icon: <Category />, path: "/categories" },
            { text: "Posts", icon: <PostAdd />, path: "/posts" },
            { text: "Comments", icon: <Comment />, path: "/comments" },
            { text: "Users", icon: <People />, path: "/users" },
          ].map(({ text, icon, path }) => (
            <ListItem button key={text} component={Link} to={path}>
              <ListItemIcon sx={{ color: "#ecf0f1" }}>{icon}</ListItemIcon>
              <ListItemText primary={text} sx={{ color: "#ecf0f1" }} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="error"
          startIcon={<Logout />}
          sx={{
            margin: 2,
            position: "absolute",
            bottom: 20,
            left: 20,
            width: "80%",
          }}
          onClick={() => {
            handleAuth(null, null);
            navigate('/login');
          }}
        >
          Logout
        </Button>
      </Drawer>
      <Outlet />
    </>
  );
};

export default Layout;
