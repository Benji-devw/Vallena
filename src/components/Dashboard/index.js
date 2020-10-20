import React from 'react';
import Dashboard from './views/Dashboard'
import ListItemsView from './views/ListItems/ListItemsView'
import Orders from './views/Orders/Orders'
import Users from './views/Users/Users'
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuItems from './Menu_Items';
// import NotificationsIcon from '@material-ui/icons/Notifications';
// import imgConfig from '../../scss/img/config.svg'
// import Box from '@material-ui/core/Box';
// import Link from '@material-ui/core/Link';
// import { mainListItems, secondaryListItems } from './listItems';




// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://vallena.fr/">
//         Vallena.fr
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const drawerWidth = 200;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    position: "absolute",
    zIndex: "100",
    top: ".7rem",
    left: "18px",
    marginRight: 36,
    background: "#fff",
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'absolute',
    whiteSpace: 'nowrap',
    height: '440px',
    overflow: 'hidden',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    // height: '100vh',
    overflow: 'auto',
  },

}));


const DisplayComponents = () => {

  switch (window.location.pathname) {
    case '/dashboard':
      return <Dashboard active={false} />

    case '/dashboard/listitems':
      return <ListItemsView />
  
    case '/dashboard/orders':
      return <Orders />
 
    case '/dashboard/users':
      return <Users />
  
    default:
        return <Dashboard active={false} />

  }
}

const Admin = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // console.log(window.location.pathname);

  return (
    <div id='dashboard' className={classes.root}>
     <CssBaseline />

      <Drawer
        // style={{ position: "absolute" }}
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MenuItems/></List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>


      <main className={`container mt-5`}>
        <DisplayComponents />
        {/* <Box pt={4}>
          <Copyright />
        </Box> */}
      </main>

    </div>
  );
}
export default Admin;    
