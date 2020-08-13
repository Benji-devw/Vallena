import React from 'react';
import { Row, Col } from 'react-bootstrap';
import HomeModalProducts from './Home_Modal_Product'


const ProductItems = ({ state: { products, displayCategory } }) => {
  console.log(displayCategory)
return (
  <Row>
    {/* map sur products => recup categoryProduct => les filtre et créer un new tab des valeur qui remplisse les condition de filter sinon categoryProduct === "all" */}
    {products.filter(({ categoryProduct }) => displayCategory === categoryProduct || displayCategory === "all")

      // map sur le tab rendu par filter
      .map((datas, t) => (
        <Col md={4} key={datas._id} id="card-home" className='col-md-4 col-sm-6 text-center'>
          <div className='card-border'>

            <HomeModalProducts
              item={datas}
            />
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
  console.log('state', state)
  return (
    <div className="category-home">
    {productCategoriesList.map((category, i) => (
      <li key={i} className={category == state.displayCategory ? 'category-home active' : 'category-home card-category' }
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

class HomeCardProducts extends React.Component {
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
export default HomeCardProducts

