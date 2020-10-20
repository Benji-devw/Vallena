import React, { useEffect, useState } from 'react';
import PuffLoader from "react-spinners/PuffLoader";
import { Link } from 'react-router-dom'
import {InsertProduct} from './Insert_Product';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import apiCall from '../../../../apiCall/Products_Api'
import 'react-table/react-table.css'
import ReactTable from 'react-table'
import styled from 'styled-components'
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';




// // Generate Order Data
// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }



const useStyles = makeStyles((theme) => ({ 
  seeMore: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const Delete = styled.div`
	color: #ff0000;
	cursor: pointer;
`

class UpdateProduct extends React.Component {
  render() {
    return <Link to={`/update/${this.props.id}`}><CreateIcon className="edit-icon" style={{color:"#2196f3"}}/></Link>
  }
}

class DeleteProduct extends React.Component {
  delproduct = event => {
    // event.preventDefault()
    if (window.confirm(`Confirmer la suppréssion du produit ID: ${this.props.id}`,)) {
      // apiCall.deleteProductById(this.props.id)
      // window.location.reload()
      alert('Suppression désactivé !')
    }
  }
  render() {
    return <Delete onClick={this.delproduct}><DeleteIcon disabled className="edit-icon" style={{ color:"#f44336"}} /></Delete>
  }
}




export default function ListItemsView() {
  const classes = useStyles();
  const [ isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    apiCall.getProducts().then(product => {
      // console.log('products', product)
      setProducts(product.data.products)
      setIsLoading(false)
    })
  }, [])

  // Tableau REACT
  const columns = [

    {
      Header: '',
      accessor: '',
      width: 40,
      Cell: function (props) {
        return (
          <span>
            <DeleteProduct id={props.original._id} />
          </span>
        )
      },
    },
    {
      Header: '',
      accessor: '',
      width: 40,
      Cell: function (props) {
        return (
          <span>
            <UpdateProduct id={props.original._id} />
          </span>
        )
      },
    },
    {
      Header: "Image",
      accessor: "imgCollection",
      Cell: function (props) {
        return (
          <img src={props.original.imgCollection[0]} width={80} alt="img" />
        )
      },
    },
    {
      Header: 'ID',
      accessor: '_id',
      filterable: true,
    },

    {
      Header: 'Nom',
      accessor: 'titleProduct',
      filterable: true,
    },
    {
      Header: 'Description',
      accessor: 'descriptionProduct',
      filterable: true,
    },
    {
      Header: 'Prix',
      accessor: 'priceProduct',
      filterable: true,
    },
    {
      Header: 'PrixPromo',
      accessor: 'oldPriceProduct',
      filterable: true,
    },
    {
      Header: 'Catégories',
      accessor: 'categoryProduct',
      filterable: true,
    },
    {
      Header: 'Dimensions',
      accessor: 'sizeProduct',
      filterable: true,
    },
    {
      Header: 'Poids',
      accessor: 'weightProduct',
      filterable: true,
    },
    {
      Header: 'Quantité',
      accessor: 'quantityProduct',
      filterable: true,
    },


    {
      Header: 'Tags',
      accessor: 'tags',
      filterable: true,
    },
    {
      Header: 'Matière',
      accessor: 'matter',
      filterable: true,
    },
    {
      Header: 'composition',
      accessor: 'composition',
      filterable: true,
    },
    {
      Header: 'Fabrication',
      accessor: 'fabrication',
      filterable: true,
    },
    {
      Header: 'Couleur',
      accessor: 'color',
      filterable: true,
    },
    {
      Header: 'Entretien',
      accessor: 'entretien',
      filterable: true,
    },
    {
      id: 'novelty',
      Header: 'Nouveauté',
      accessor: d => d.novelty.toString(),
      filterable: true,
    },
    {
      id:"DisplayHome",
      Header: 'DisplayHome',
      accessor: d => d.displaySlideHome.toString(),
      filterable: true,
    },
    {
      Header: 'Collection',
      accessor: 'yearCollection',
      filterable: true,
    },
    {
      id: 'stock',
      Header: 'En stock',
      accessor: d => d.stockProduct.toString(),
      filterable: true,

    },
    {
      id: 'promotion',
      Header: 'Promotion',
      accessor: d => d.promotionProduct.toString(),
      filterable: true,
    },
    {
      id: 'visible',
      Header: 'Visible',
      accessor: d => d.visible.toString(),
      filterable: true,
    },
    {
      Header: 'Crée par',
      accessor: 'reporterProduct',
      filterable: true,
    },
    // {
    // 	id: 'date',
    // 	Header: 'Date',
    // 	accessor: d => d.createdAt.toString(),
    // 	filterable: true,
    // }

  ]

  let showTable = true
  if (!products.length) {
    showTable = false
  }

  return (
    <React.Fragment>
      <div className={`row list-items mt-5`}>
      <h3>Liste des Produits : <span>resultat ({products.length})</span> </h3>
      <Grid item xs={12} className={`text-center ${classes.seeMore}`}>
        {!isLoading ? ( <>
          {showTable && (
              <ReactTable
                data={products}
                columns={columns}
                loading={isLoading}
                defaultPageSize={10}
                showPageSizeOptions={true}
                minRows={0}
              />
            )}
          </>) : (<PuffLoader size={50} color={"#f50057"} />)}
          
        </Grid >
      </div>
      <div className="row">
        <InsertProduct data={products}/>
      </div>
    </React.Fragment>
  );
} 