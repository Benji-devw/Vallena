import React, {useState} from 'react';
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
   const [expanded, setExpanded] = useState('panel1');
   const [matterCheck, setMatterCheck] = useState([]);
   const [colorCheck, setColorCheck] = useState([]);
   const [collectionCheck, setCollectionCheck] = useState([]);

   const handleChangeColorBox = (value) => {
      // console.log('value', value)
      const currentIndex = colorCheck.indexOf(value);
      const newColorCheck = [...colorCheck];

      if (currentIndex === -1) {
         newColorCheck.push(value)
      } else {
         newColorCheck.splice(currentIndex, 1)
      }
      setColorCheck(newColorCheck)
      props.handleColor(newColorCheck)
   };

   const handleChangeMatterBox = (value) => {
      const currentIndex = matterCheck.indexOf(value);
      const newMatterCheck = [...matterCheck];

      if (currentIndex === -1) {
         newMatterCheck.push(value)
      } else {
         newMatterCheck.splice(currentIndex, 1)
      }
      setMatterCheck(newMatterCheck)
      props.handleMatter(newMatterCheck)
   };

   const handleChangeCollectionBox = (value) => {
      const currentIndex = collectionCheck.indexOf(value);
      const newCollectionCheck = [...collectionCheck];

      if (currentIndex === -1) {
         newCollectionCheck.push(value)
      } else {
         newCollectionCheck.splice(currentIndex, 1)
      }
      setCollectionCheck(newCollectionCheck)
      props.handleCollection(newCollectionCheck)
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
                     <ul className="category-list" defaultValue={props.categoryDefault} onChange={props.filterProductsByCat}>
                        <li className={`cat-list ${props.filterByCat === 'All' ? 'active secondary' : ''}`}
                           onClick={() => {
                              // this.addActiveClass('All'); 
                              props.filterProductsByCat('All');
                              saveFilterByCat('All')
                           }}>All
                        </li>
                        {props.catList.map((cat, index) =>
                           <li key={index}
                              className={`cat-list ${props.filterByCat === cat ? 'active secondary' : ''}`}
                              onClick={() => {
                                 props.filterProductsByCat(cat);
                                 props.handleCat(cat)
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
                     {props.matterList.map((mat, id) => 
                        <FormControlLabel key={id}
                           label={mat}
                           value={mat}
                           control={
                              <Checkbox 
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
                  aria-controls="panel3a-content"
                  id="panel3a-header"
               >
               <Typography className={classes.heading}>COULEUR</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <FormGroup row>
                     {props.colorList.map((color, id) =>
                        <FormControlLabel key={id}
                           label={color}
                           value={color}
                           control={
                              <Checkbox
                                 checked={colorCheck.indexOf(color) === -1 ? false : true}
                                 onChange={(e) => handleChangeColorBox(e.target.value)} />
                           }
                        />
                     )}

                  </FormGroup>
               </AccordionDetails>
            </Accordion>

            <Accordion elevation={0}>
               <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
               >
               <Typography className={classes.heading}>COLLECTION</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <FormGroup row>
                     {props.collectionList.map((collection, id) =>
                        <FormControlLabel key={id}
                           label={collection}
                           value={collection}
                           control={
                              <Checkbox
                                 checked={collectionCheck.indexOf(collection) === -1 ? false : true}
                                 onChange={(e) => handleChangeCollectionBox(e.target.value)} />
                           }
                        />
                     )}

                  </FormGroup>
               </AccordionDetails>
            </Accordion>


         </>
      );

}
export default FilterLeft