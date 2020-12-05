import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  createStyles,
  makeStyles,
  Theme,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { useLogin } from "../../utils/login";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    titleBox: {
      cursor: "pointer",
    },
  })
);

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { logout } = useLogin();

  const open = Boolean(anchorEl);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Box onClick={() => history.push("/home")} className={classes.titleBox}>
            <Typography variant="h6">TEACH ME!</Typography>
          </Box>
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
