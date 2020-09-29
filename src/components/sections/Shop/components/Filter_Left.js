import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';



const useStyles = makeStyles((theme) => ({
   heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
   },
}));



const FilterLeft = props => {
   const classes = useStyles();
   const [expanded, setExpanded] = React.useState('panel1');
   const [matterCheck, setMatterCheck] = React.useState([]);

   const handleChangeMatterBox = (value) => {
      // console.log('value', value)
      const currentIndex = matterCheck.indexOf(value);
      const newMatterCheck = [...matterCheck];

      if (currentIndex === -1) {
         newMatterCheck.push(value)
      } else {
         newMatterCheck.splice(currentIndex, 1)
      }
      setMatterCheck(newMatterCheck)
      props.handleFilters(newMatterCheck)
   };

   const handleChangeCat = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
   };
   const saveFilterByCat = (cat) => {
      localStorage.setItem('filterByCat', cat);
   }
      return (
         <>
            <h3 className={classes.heading}>
               {/* <div className="filter-result">Produit {this.state.products.length}</div> */}
                  Filtres actif :
            </h3>
            <Accordion elevation={0} square expanded={expanded === 'panel1'} onChange={handleChangeCat('panel1')}>
               <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
               >
                  <Typography className={classes.heading}>CATEGORIES</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <div className="filter-category">
                     <ul className="category-list" defaultValue={props.category} onChange={props.filterProductsByCat}>
                        <li className={`cat-list ${props.filterByCat === 'All' ? 'active secondary' : ''}`}
                           onClick={() => {
                              // this.addActiveClass('All'); 
                              props.filterProductsByCat('All');
                              saveFilterByCat('All')
                           }}>All
                        </li>
                        {props.categories.map((cat, index) =>
                           <li key={index}
                              className={`cat-list ${props.filterByCat === cat ? 'active secondary' : ''}`}
                              onClick={() => {
                                 props.filterProductsByCat(cat);
                                 saveFilterByCat(cat)
                              }}>{cat}
                           </li>
                        )}
                     </ul>
                  </div>
               </AccordionDetails>
            </Accordion>

            <Accordion elevation={0}>
               <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
               >
               <Typography className={classes.heading}>MATIERES</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <FormGroup row>
                     {props.matter.map((mat, id) => 
                        <FormControlLabel key={id}
                           label={mat}
                           value={mat}
                           control={
                              <Checkbox 
                              // checked={matterCheck.indexOf(id) === -1 ? false : true} 
                              // onChange={() => handleChangeMatterBox(id)} />
                              checked={matterCheck.indexOf(mat) === -1 ? false : true} 
                              onChange={(e) => handleChangeMatterBox(e.target.value)} />
                           }
                        />
                     )}
                     
                  </FormGroup>
               </AccordionDetails>
            </Accordion>

            <Accordion elevation={0}>
               <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
               >
               <Typography className={classes.heading}>COULEUR</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
               </AccordionDetails>
            </Accordion>

            <Accordion elevation={0}>
               <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
               >
               <Typography className={classes.heading}>COLLECTION</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
               </AccordionDetails>
            </Accordion>


         </>
      );

}
export default FilterLeft