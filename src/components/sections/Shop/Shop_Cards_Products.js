import React, {Component} from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components'

const Show = styled.div`
	cursor: pointer;
`



class UpdateProduct extends Component {
  // Evite de passer par <Link to={}> et regle le problème de pertes de props au refresh
  showProduct = event => {
    event.preventDefault()
    window.location.href = `/product/${this.props.id}`		// Lien => app.js
  }
  render() {
    // console.log(this.props.test)
    // console.log(this.props.children)
    return <Show test={this.props.test} onClick={this.showProduct}>{this.props.children}</Show>
  }
}

const ProductItems = ({ state: { products, displayCategory } }) => {
  // console.log(displayCategory)
return (
  <Row>
    {/* map sur products => recup categoryProduct => les filtre et créer un new tab des valeur qui remplisse les condition de filter sinon categoryProduct === "all" */}
    {products.filter(({ categoryProduct }) => displayCategory === categoryProduct || displayCategory === "all")

      // map sur le tab rendu par filter
      .map((datas, t) => (
        <Col lg={3} key={datas._id} id="card-shop" draggable="false" className='col-md-4 col-sm-6 text-center'>
          <div className='card-border'>
            
            <UpdateProduct id={datas._id} test={datas} >
            <img src={datas.imgCollection[0]} className="img-fluid" alt={datas.titleProduct}/>
            </UpdateProduct>
            
            {/* <ShopModalProducts
              item={datas}
            /> */}
            <div className='card-title'> {datas.titleProduct} </div>
            <div className='card-category'>{datas.categoryProduct} </div>
            <div className='card-price'> <b>{datas.priceProduct}</b> €</div>
            <div className='card-quantity'>stock : <b>{datas.quantityProduct}</b> </div>
            <div className='card-avis'> avis (0)</div>
          </div>
          <div className="borderb mt-3"></div>
        </Col>
      ))
    }
  </Row>)
}

const ListeCategory =  (productCategoriesList, setCategory, state) => {
  // console.log('state', state)
  return (
    <div className="category-shop">
    {productCategoriesList.map((category, i) => (
      <li key={i} className={category === state.displayCategory ? 'category-shop active' : 'category-shop card-category' }
      onClick={() => setCategory(category)}           // setCategory clické au state.displayCategory ds Main
    >
      {category}
    </li>
    ))}
    </div>
    )
}

const UI = ({ state, state: { productCategoriesList }, setCategory }) => {
  return (    // directement () evite le return()
    <>
      {ListeCategory(productCategoriesList, setCategory, state)}

      <ProductItems state={state}/>
    </>
)}

class ShopCardProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCategory: "all",
      products: props.products,                       // recup in OBJET product
      productCategoriesList: props.productCategoriesList      // recup in TAB categoryProduct
    };
    this.setCategory = this.setCategory.bind(this);
  }
  setCategory(category) {
    this.setState({
      displayCategory: category
    });
  }

  render() {
    return (
      <>
        {/* {console.log('products : ', this.state)} */}

        {/* Value init => setCategory === 'all' && state === all props */}
        <UI setCategory={this.setCategory} state={this.state} disp={this.displayCategory} />
      </>
    )
  }
}
export default ShopCardProducts

