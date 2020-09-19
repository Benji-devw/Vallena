import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { useDispatch, useSelector } from 'react-redux';
import { updateCart, removeFromCart } from '../../lib/actions'

import FirstPageIcon from '@material-ui/icons/FirstPage';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';



const RowItem = props => {
   const { id, quantity, details } = props.item    // Redux
   const item = details

   const [qty, setQty] = useState(quantity)
   const dispatch = useDispatch()				        // Dispatch le store localement pr le lire les actions et fontions

   const update = (action) => {
      if (action === 'increment') { 
         setQty(item.quantityProduct > qty ? qty + 1 : qty) 
      }
      if (action === 'decrement') { setQty(qty - 1) }
   }

   useEffect(() => {                 // est executé lors d'un chagement local du component
      dispatch(updateCart(id, qty))   // change la quantity dans le panier lors de " increment et decrement "
   }, [dispatch, id, qty])

   const remove = id => {
      dispatch(removeFromCart(id))
      window.location.reload(false);
   }


   return (
      <div className="row payment-list-item align-items-center no-gutters">
         <div className="col-md-6">
            <h2>{item.titleProduct}</h2>
            <Link to={`/product/${item._id}`}>
            <img
               src={item.imgCollection[0]}
               alt="none"
            />
            </Link>
         </div>

         <div className="col-md-6">
            <div className="row no-gutters">

               <div className="col-6 cart-qty align-self-center text-center">
                  <div className="qty-content">
                     <button className="btn-cart-qty" type="button"
                     onClick={() => {
                        if (qty > 1) {
                           update('decrement')
                        }
                     }} > <b>-</b>
                     </button>

                     <span className="qty">{qty}</span>

                     <button className="btn-cart-qty" type="button"
                        onClick={() => {
                           update('increment')
                        }} > <b>+</b>
                     </button>
                  </div>
                  
               </div>
               
               <div className="col-6 cart-price text-right">
                  <h2>€ {qty * item.priceProduct}</h2>
                  <IconButton aria-label="delete" className="btn-cart-remove"
                     onClick={() => {
                        if (window.confirm("Etes vous sur de vouloir supprimer le produit ?"))
                           remove(id)
                     }}
                  >
                     <DeleteIcon />
                  </IconButton>
             
               </div>

            </div>
            
         <hr />
         </div>
      </div>
   );
}











const useStyles = makeStyles((theme) => ({
   root: {
      margin: 'auto',
   },
   paper: {
      // height: 230,
      overflow: 'auto',
   },
   button: {
      margin: theme.spacing(4, 1),
      outline: 'none !important'
   },
}));

function not(a, b) {
   return a.filter((value) => b.indexOf(value) === -1);
}
function intersection(a, b) {
   return a.filter((value) => b.indexOf(value) !== -1);
}







export default function TransferList(props) {

   const items = useSelector(state => state.items)
   // console.log('items', items)

   const [left, setLeft] = useState(items);
   const [right, setRight] = useState([]);


   const classes = useStyles();
   const [checked, setChecked] = useState([]);
   const leftChecked = intersection(checked, left);
   const rightChecked = intersection(checked, right);

   const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
         newChecked.push(value);
      } else {
         newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
   };
   const handleAllRight = () => {
      setRight(right.concat(left));
      setLeft([]);
   };
   const handleCheckedRight = () => {
      setRight(right.concat(leftChecked));
      setLeft(not(left, leftChecked));
      setChecked(not(checked, leftChecked));
   };
   const handleCheckedLeft = () => {
      setLeft(left.concat(rightChecked));
      setRight(not(right, rightChecked));
      setChecked(not(checked, rightChecked));
   };
   const handleAllLeft = () => {
      setLeft(left.concat(right));
      setRight([]);
   };

   const customList = (items) => (
      <Paper id='transfer-list' className={classes.paper}>
         <List dense component="div" role="list" className='list-items'>
            {items.map((value, i) => {
               // console.log('value', value)
               const labelId = `transfer-list-item-${value}-label`;
               
               return (
                  <div key={i} role="listitem" className="row align-items-center no-gutters">
                     <div  className="col-sm-1">
                     <ListItemIcon>
                        <Checkbox onClick={handleToggle(value)}
                           checked={checked.indexOf(value) !== -1}
                           tabIndex={-1}
                           disableRipple
                           inputProps={{ 'aria-labelledby': labelId }}
                        />
                     </ListItemIcon>
                     </div>

                     <div className="col-sm-11 fadeIn">
                        <RowItem item={value}/>
                     </div>
                     
                  </div>
               );
            })}
            <ListItem />
         </List>
      </Paper>
   );

   return (
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
         <div className="row justify-content-center payment-arrow">
            <div className="col-md-12">
               <Grid item>{customList(left)}</Grid>
            </div>
            <div className="col-sm-6">
               <Grid item>
                  <Grid container alignItems="center">
                     <Button
                        size="small"
                        className={`${classes.button}`}
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                     >
                        <FirstPageIcon className="move-all-gift" />
                     </Button>
                     <Button
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                     >
                        <ExpandLessIcon className="move-item-gift" />
                     </Button>
                     <Button
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                     >
                        <ExpandLessIcon className="move-item-client" />
                     </Button>
                     <Button
                        size="small"
                        className={classes.button}
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                     >
                        <FirstPageIcon className="move-all-client" />
                     </Button>
                  </Grid>
               </Grid>
            </div>
            <div className="col-md-10">
               <Grid item>{customList(right)}</Grid>
            </div>

         </div>
         

         
      </Grid>
   );
}
