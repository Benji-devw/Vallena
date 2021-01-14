import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import HomeCards from '../GeneralComponents/Home_Cards'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function HomeCardsDisplay() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const topNote = 5
  const topVente = 4
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" className="mx-auto justify-content-center">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Top Ventes" {...a11yProps(0)} />
          <Tab label="Mieux Notés" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}

        </Tabs>
      </AppBar>
      <div className="container" style={{minHeight:"35rem"}}>

      <TabPanel value={value} index={0}>
        <HomeCards val={topNote}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HomeCards val={topVente} />
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
      </div>

    </div>
  );
}