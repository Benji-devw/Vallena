import React, {useEffect, useState}  from 'react';
import apiCallOrders from '../../../../apiCall/Orders_Api';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import EuroRoundedIcon from '@material-ui/icons/EuroRounded';
import Button from '@material-ui/core/Button';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PuffLoader from "react-spinners/PuffLoader";
import moment from 'moment';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';



// Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    marginTop: "-5px",
    marginLeft: "5px",
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: "10"
  },
  inputInput: {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    background: "#ffffff",
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





export default function Orders() {
  const classes = useStyles();

  const [order, setOrder] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [short, setShort] = useState("croissant")
  
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  // Statut
  const [inProgress, setInProgress] = useState(true)
  const [finish, setFinish] = useState(false)
  const handleCheckboxChangeProgress = (e) => { setInProgress(e.target.checked) }
  const handleCheckboxChangeFinish = (e) => { setFinish(e.target.checked) }
  const [cmd, setCmd] = useState()
  const [display, setDisplay] = useState(false)
  const confirm = (id) => {
    setCmd(cmd => ({ ...cmd, statut: {
        inProgress: inProgress,
        finish: finish
      }}))
    if (id === cmd._id) {
      setDisplay(true)
    }
  }
  const update = async (id) => {
    // console.log('id', id)
    // console.log(cmd._id);
    if(id === cmd._id ) {
      await apiCallOrders.updateOrderById(id, cmd).then(res => {
      })
      window.alert(`Status changé !`)
      window.location.reload(false)
    }
    else {window.alert(`Tu essaies d'envoyer une autre commande ! Il faut recochez les statut et confirmer puis envoyer ! `)}
  }


    const [searchBar, setSearchBar] = useState("")
    // console.log('searchBar', searchBar)
    const handleVal = (e) => {
      setSearchBar(e)
    }
        

  useEffect(() => {
    apiCallOrders.getAllOrders().then(order => {
      const term = searchBar.toLowerCase()
      const fullList = order.data.data
      if (short === "croissant") {
        setOrder({
          order:
            fullList.filter(order =>
              // console.log('name', name.client[0].shipping.name.full_name.toLowerCase())
              order.client[0].shipping.name.full_name.toLowerCase().indexOf(term) > -1
            ).reverse()
        })
        // setOrder(order.data.data.reverse())
        setIsLoading(false)
      } else {
        setOrder({
          order:
            fullList.filter(order =>
              // console.log('name', name.client[0].shipping.name.full_name.toLowerCase())
              order.client[0].shipping.name.full_name.toLowerCase().indexOf(term) > -1
            )
        })
        // setOrder(order.data.data)
        setIsLoading(false)
      }
    })
  }, [short, searchBar ])



  return (
    <React.Fragment>
      <div className={`orders mt-5 ${classes.container}`}>
      <h3 className="mb-4">Liste des Commandes : <span>resultat ({order.length}) </span></h3>

        <div className="row">
          <div className="col-sm-6 text-left">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…" aria-label="search"
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => handleVal(e.target.value)}
              />
            </div>
          </div>

          <div className="col-sm-6 filter-sort-date text-right p-2">
            Tri par date 
            <select style={{ width: "10rem", height: "2rem", marginLeft: "1rem" }} 
                className="custom-select" 
                onClick={(e) => setShort(e.target.value)}>
              <option value="croissant">Croissant</option>
              <option value="decroissant">Decroissant</option>
            </select>
          </div>
        </div>

      
      {!isLoading ?
      ( <>
        {order.order.map((commande, id) => (
          <Accordion key={id} expanded={expanded === id} onChange={handleChange(id)} className={`order-items ${expanded === id ? 'order-items-style' : ''}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            
            <div className="row no-gutters text-left" style={{width:"100%"}}>
              {commande.client.map((client, id) => (
                <React.Fragment key={id}>
                  <div key={id} className="col-md-8">
                    <p  className="mb-0">
                      <b><PersonOutlineOutlinedIcon /> </b> {client.shipping.name.full_name}
                      <br />
                      <b><LocalShippingIcon /> </b>
                        {client.shipping.address.address_line_1} - {client.shipping.address.address_line_2} - {client.shipping.address.admin_area_2}
                         - {client.shipping.address.postal_code} - {client.shipping.address.country_code}
                    </p>
                  </div> 

                  <div className="col-md-4">
                    <p>
                      <b><DateRangeOutlinedIcon /> </b> {client.payments.captures.map(e => moment(e.create_time).format('Do MMMM YYYY') )} 
                      <br />
                      <b><EuroRoundedIcon /> </b> {client.amount.value} {client.amount.currency_code} 
                    </p>
                  </div>
                </React.Fragment>
              ))} 
              <div className="col-12">
                <b><AlternateEmailIcon /></b> {commande.payer.email_address}
              </div>
            </div>

            <div className="col-md-2">
              <div className={`statut ${commande.statut.inProgress ? 'statut-inprogress' : ''}`}></div>
              <div className={`statut ${commande.statut.finish ? 'statut-finish' : ''}`}></div>
            </div>

          </AccordionSummary>
          <AccordionDetails>
            <div key={id} className="row no-gutters" style={{ width: "100%" }}>

              <div className="col-12 statut-order text-right" style={{marginTop:"5px"}}>
                <h5 style={{position: "relative", right:"1rem", display:'inline-block'}}>Statut : </h5>
                <label htmlFor={`prep-${commande._id}`}>Préparation</label>
                <input type="checkbox" className="mr-4" id={`prep-${commande._id}`}
                  defaultChecked={commande.statut.inProgress}
                  onChange={handleCheckboxChangeProgress}
                  onClick={() => setCmd(commande)}
                />
                <label htmlFor={`send-${commande._id}`}>Envoyé</label>
                <input type="checkbox" id={`send-${commande._id}`} className="mr-4"
                  defaultChecked={commande.statut.finish}
                  onChange={handleCheckboxChangeFinish}
                  onClick={() => setCmd(commande)}
                />
                {cmd && <Button onClick={() => confirm(commande._id)} variant="outlined" >Confirm</Button> }
                {display && <Button onClick={() => update(commande._id)} variant="outlined" color="primary">Envoyer</Button> }
              </div>


              {commande.items.map((item, id) => (
                <div key={id} className="col-sm-6">
                  <div className="row p-3 align-items-center ">
                  <div className="col-sm-4">
                    <img src={item.details.imgCollection[0]} alt={item.details._id} className="img-fluid"/> 
                  </div>
                   <div className="col-sm-8">
                     <h5>{item.details.titleProduct}</h5>
                      <p>
                        {item.details._id} <br />  {item.details.priceProduct}€/u 
                        <br /> poids : <b>{item.details.weightProduct}</b> <br /> 
                        Quantités : <strong style={{fontSize:"1.3em"}}>{item.quantity}</strong>
                      </p>
                   </div>
                  </div>
                 </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
            
        ))}
      </>) : ( <PuffLoader size={50} color={"#f50057"}/> )}
    
      </div>
    </React.Fragment>
  );
}









