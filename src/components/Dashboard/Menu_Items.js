import React from 'react';
import { Link } from 'react-router-dom';
import CallUsers from "../../apiCall/CallUsers.js";

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CreateIcon from '@material-ui/icons/Create';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';


const logout = () => {
  if (window.confirm('Deconnexion ?')) {
    CallUsers.logout();
    window.location = "/"
  }
}


const MainListItems = props => {

  return (
    <div className="dash-menu-items">
    <Link to="/dashboard">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>

    <Link to="/dashboard/listitems">
    <ListItem button>
      <ListItemIcon>
        <CreateIcon />
      </ListItemIcon>
      <ListItemText primary="Produits" />
    </ListItem>    
    </Link>

    <Link to="/dashboard/orders">
    <ListItem button>
      <ListItemIcon>
        <CreditCardIcon />
      </ListItemIcon>
      <ListItemText primary="Commandes" />
    </ListItem>
    </Link>

    <Link to="/dashboard/comments">
    <ListItem button>
      <ListItemIcon>
        <MessageOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Commentaires" />
    </ListItem>
    </Link>    
    
    <Link to="/dashboard/users">
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem>
    </Link>

    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Logistique" />
    </ListItem>

    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Interface" />
    </ListItem>    
    <hr />
    <ListItem button onClick={() => logout()}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
  )
  
}
export default MainListItems

// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );