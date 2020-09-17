import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
   searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputInput: {
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      borderRadius: '3px',
      [theme.breakpoints.up('sm')]: {
         width: '12ch',
         '&:focus': {
            width: '20ch',
         },
      },
   },
}));


const FilterTop = props => {
   const classes = useStyles();
   // console.log(props.category);


      return (
         <div className="row" style={{ width: "100%" }}>

            <div className="col-sm-6 p-0 filter-search">
               <div className={classes.search}>
                  <div className={classes.searchIcon}>
                     <SearchIcon />
                  </div>
                  <InputBase
                     placeholder="Search…" aria-label="search"
                     classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                     }}
                     inputProps={{ 'aria-label': 'search' }}
                     onChange={(e) => props.searchBar(e.target.value)} 
                  />
               </div>
            </div>

         </div>
      );

}
export default FilterTop