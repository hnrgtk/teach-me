import React, { useEffect } from "react";
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
import useAxios from "axios-hooks";
import moment from "moment";
import FeedbackDialog from "./feedbackDialog";
import { useForm } from "react-hook-form";

export type FeedbackFormType = {
  observacoes: string;
  nota: number;
  professorId: number;
  aulaId: number;
  alunoId: number;
};

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const { getUserId } = useLogin();
  const id = getUserId();
  const [{ data: feedbacks }] = useAxios(
    `/v1/aula/pendenciaAvaliacao?alunoId=${id}`
  );
  const formHandlers = useForm<FeedbackFormType>();
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

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleCloseDialog = () => setOpenDialog(false);

  const openFeedbackDialog = (f: any) => {
    formHandlers.reset({
      aulaId: f.id,
      professorId: f.professorId,
      alunoId: f.alunoId,
    });
    setOpenDialog(true);
  };

  return (
    <>
      <FeedbackDialog
        open={openDialog}
        onClose={handleCloseDialog}
        formHandlers={formHandlers}
      />
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
              <Badge badgeContent={feedbacks?.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorElNotification}
              open={openNotification}
              onClose={handleCloseNotification}
            >
              {feedbacks ? (
                feedbacks?.map((f: any) => (
                  <MenuItem key={f.id} onClick={() => openFeedbackDialog(f)}>
                    Aula pendente para avaliação:
                    {moment(f.dataInicioPrestacao).format("DD/MM/YYYY")}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Vazio</MenuItem>
              )}
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
    </>
  );
}
