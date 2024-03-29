import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DetailsIcon from '@material-ui/icons/Details';
import DescriptionIcon from '@material-ui/icons/Description';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
// import HelpIcon from '@material-ui/icons/Help';
import Box from '@material-ui/core/Box';

// import MotionFramer from './motionScall/Motion_framer'
import ScrollAnimation from 'react-animate-on-scroll'
import CustomerComments from './tabPanel/Customer_Comments'


function TabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`scrollable-force-tabpanel-${index}`}
         aria-labelledby={`scrollable-force-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box className="p-3" p={3}>
               {children}
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
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
   };
}

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
   },
}));

const TabsProductView = props => {
   const classes = useStyles();
   const [value, setValue] = React.useState(0);
   const data = props.data
   // const imgs = props.images

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   const formatDescription = (str) => {
      if (str) {
         return (
            str.split("<br />").map(function (desc, id) {
               return (
                  <p key={id} className="text-left pl-4">
                     {desc}
                     <br />
                  </p>
               )
            })
         )
      }
   }

   return (
      <div className={`${classes.root}`}>
         <AppBar position="static" color="default">
            <Tabs
               value={value}
               onChange={handleChange}
               variant="scrollable"
               scrollButtons="on"
               indicatorColor="primary"
               textColor="primary"
               aria-label="scrollable force tabs example"
            >
               <Tab label="Description" icon={<DetailsIcon />} {...a11yProps(0)} />
               <Tab label="FICHE TECHNIQUE" icon={<DescriptionIcon />} {...a11yProps(1)} />
               <Tab label="Avis clients" icon={<ChatOutlinedIcon />} {...a11yProps(2)} />
               {/* <Tab label="Item Four" icon={<HelpIcon />} {...a11yProps(3)} /> */}
            </Tabs>
         </AppBar>


         <TabPanel value={value} index={0}>
            <div className="row p-3 justify-content-center" style={{minHeight:"300px"}}>
               <div className="col-sm-2 pt-2 text-left" style={{borderTop:"1px solid rgba(0,0,0, .3)"}}>
                  {/* <ScrollAnimation animateIn='fadeIn' delay={0}><p>Taille: <b>{data.sizeProduct}</b></p></ScrollAnimation> */}
                  <ScrollAnimation animateIn='fadeIn' delay={300}><p>Poids: {data.weightProduct}</p></ScrollAnimation>
                  <ScrollAnimation animateIn='fadeIn' delay={600}><p>Matière: {data.matter}</p></ScrollAnimation>
                  <ScrollAnimation animateIn='fadeIn' delay={900}><p>Composition:<br /> {data.composition}</p></ScrollAnimation>
                  <ScrollAnimation animateIn='FadeIn' delay={1200}><p>Fabrication: {data.fabrication}</p></ScrollAnimation>
               </div>
               <div className="col-sm-8">
               {formatDescription(data.descriptionProduct)}

               </div>
            </div>
           
            {/* <MotionFramer images={imgs} /> */}
         </TabPanel>

         <TabPanel value={value} index={1}>
            <table className="table table-description text-left">
               {/* <thead>
                  <tr>
                     <th scope="col">Description</th>
                  </tr>
               </thead> */}
               <tbody>
                  <tr>
                     <th scope="row">Nom</th>
                     <td>{data.titleProduct}</td>
                  </tr>
                  <tr>
                     <th scope="row">Prix</th>
                     <td>{data.priceProduct} € /unité</td>
                  </tr>
                  <tr>
                     <th scope="row">Quantité</th>
                     <td>{data.quantityProduct} en stock</td>
                  </tr>
                  <tr>
                     <th scope="row">Catégories</th>
                     <td>{data.categoryProduct}</td>
                  </tr>
                  <tr>
                     <th scope="row">Matière</th>
                     <td>{data.matter}</td>
                  </tr>
                  <tr>
                     <th scope="row">Coloris</th>
                     <td>{data.color}</td>
                  </tr>
                  <tr>
                     <th scope="row">Taille</th>
                     <td>{data.sizeProduct}</td>
                  </tr>
                  <tr>
                     <th scope="row">Poids</th>
                     <td>{data.weightProduct}</td>
                  </tr>      
                  <tr>
                     <th scope="row">Composition</th>
                     <td>{data.composition}</td>
                  </tr>      
                  <tr>
                     <th scope="row">Fabrication</th>
                     <td>{data.fabrication}</td>
                  </tr>          
                  <tr>
                     <th scope="row">Nouveauté</th>
                     <td>{data.novelty === true ? 'oui' : "non"}</td>
                  </tr>                  
                  <tr>
                     <th scope="row">En promotion</th>
                     <td>{data.promotionProduct === true ? 'oui' : 'non'}</td>
                  </tr>
                  <tr>
                     <th scope="row">Collection</th>
                     <td>{data.yearCollection}</td>
                  </tr>                  
                  <tr>
                     <th scope="row">Mots clé</th>
                     <td>{data.tags}</td>
                  </tr>

                  <tr>
                     <th scope="row">Crée par</th>
                     <td></td>
                  </tr>

               </tbody>
            </table>
         </TabPanel>
         <TabPanel value={value} index={2}>
               <CustomerComments data={data}/>
         </TabPanel>
         {/* <TabPanel value={value} index={3}>
            Item Four
         </TabPanel> */}

      </div>
   );
}
export default TabsProductView