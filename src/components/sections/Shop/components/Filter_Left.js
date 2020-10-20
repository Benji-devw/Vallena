import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useSelector } from 'react-redux';
// import { addFilters } from '../../../../lib/actions'

const useStyles = makeStyles((theme) => ({
   heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
   },
}));


const FilterLeft = props => {
   const classes = useStyles();
   const filtersFromRedux = useSelector(state => state.filters)
   
   const [expanded, setExpanded] = useState('panelCat');
   const [expandedMatter, setExpandedMatter] = useState(false);
   const [expandedColor, setExpandedColor] = useState(false);
   const [expandedCollection, setExpandedCollection] = useState(false);


   useEffect(() => {
      // newVal.categoryProduct = filtersFromRedux[0].cat
      // newVal.matter = filtersFromRedux[0].matter
      // newVal.color = filtersFromRedux[0].color
      // newVal.yearCollection = filtersFromRedux[0].collection
      // newVal.promotionProduct = filtersFromRedux[0].promotion
      // newVal.novelty = filtersFromRedux[0].novelty
      if (filtersFromRedux[0].matter.length > 0) { setExpandedMatter(true) }
      if (filtersFromRedux[0].color.length > 0) { setExpandedColor(true) }
      if (filtersFromRedux[0].collection.length > 0) { setExpandedCollection(true) }
   }, [filtersFromRedux])



   const expendedCat = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
   };   
   const expendedMatter = (panel) => (event, newExpanded) => {
      setExpandedMatter(newExpanded ? panel : false);
   };   
   const expendedColor = (panel) => (event, newExpanded) => {
      setExpandedColor(newExpanded ? panel : false);
   };
   const expendedCollection = (panel) => (event, newExpanded) => {
      setExpandedCollection(newExpanded ? panel : false);
   };


   
      return (
         <>
            <Accordion elevation={0} square expanded={expanded === 'panelCat'} onChange={expendedCat('panelCat')}>
               <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
               >
               <Typography className={classes.heading}>CATEGORIES</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <div className="filter-category">
                     <ul className="category-list" defaultValue={filtersFromRedux[0].cat} >
                        <li className={`cat-list ${filtersFromRedux[0].cat.length <= 0 ? 'active secondary' : ''}`}
                           onClick={() => {
                              props.filterProductsByCat([]);
                           }}>All
                        </li>
                        {props.catList.map((cat, index) =>
                           <li key={index}
                              className={`cat-list ${filtersFromRedux[0].cat === cat ? 'active secondary' : ''}`}
                              onClick={() => {
                                 props.filterProductsByCat(cat);
                              }}>{cat}
                           </li>
                        )}
                     </ul>
                  </div>
               </AccordionDetails>
            </Accordion>

            <Accordion elevation={0} expanded={expandedMatter} onChange={expendedMatter(true)}>
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
                                 checked={filtersFromRedux[0].matter.indexOf(mat) === -1 ? false : true } 
                              onChange={(e) => props.handleChangeMatterBox(e.target.value)} />
                           }
                        />
                     )}
                     
                  </FormGroup>
               </AccordionDetails>
            </Accordion>

            <Accordion elevation={0} expanded={expandedColor} onChange={expendedColor(true)}>
               <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
               >
               <Typography className={classes.heading}>COULEURS</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <FormGroup row>
                     {props.colorList.map((color, id) =>
                        <FormControlLabel key={id}
                           label={color}
                           value={color}
                           control={
                              <Checkbox
                                 checked={filtersFromRedux[0].color.indexOf(color) === -1 ? false : true}
                                 onChange={(e) => props.handleChangeColorBox(e.target.value)} />
                           }
                        />
                     )}

                  </FormGroup>
               </AccordionDetails>
            </Accordion>

            <Accordion elevation={0} expanded={expandedCollection} onChange={expendedCollection(true)}>
               <AccordionSummary expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
               >
               <Typography className={classes.heading}>COLLECTIONS</Typography>
               </AccordionSummary>
               <AccordionDetails>
                  <FormGroup row>
                     {props.collectionList.map((collection, id) =>
                        <FormControlLabel key={id}
                           label={collection}
                           value={collection}
                           control={
                              <Checkbox
                                 checked={filtersFromRedux[0].collection.indexOf(collection) === -1 ? false : true}
                                 onChange={(e) => props.handleChangeCollectionBox(e.target.value)} />
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