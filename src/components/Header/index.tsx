import React from "react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link, useHistory } from "react-router-dom";
import { useLogin } from "../../utils/login";
import { useStyles } from "./styles";

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    anchorElNotification,
    setAnchorElNotification,
  ] = React.useState<null | HTMLElement>(null);

  const { logout } = useLogin();

  const open = Boolean(anchorEl);
  const openNotification = Boolean(anchorElNotification);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const handleNotificationMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorElNotification(event.currentTarget);

  const handleClose = () => setAnchorEl(null);
  const handleCloseNotification = () => setAnchorElNotification(null);

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  const not = [
    { text: "Avaliação pendente" },
    { text: "Avaliação pendente" },
    { text: "Avaliação pendente" },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box
            onClick={() => history.push("/home")}
            className={classes.titleBox}
          >
            <Typography variant="h6">TEACH ME!</Typography>
          </Box>
          <div className={classes.root} />

          <IconButton color="inherit" onClick={handleNotificationMenu}>
            <Badge badgeContent={not.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={anchorElNotification}
            open={openNotification}
            onClose={handleCloseNotification}
          >
            {not.map((n) => (
              <MenuItem>{n.text}</MenuItem>
            ))}
          </Menu>

          <IconButton onClick={handleMenu} color="inherit">
            <AccountCircle />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose} component={Link} to="/minhaconta">
              Minha Conta
            </MenuItem>
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
