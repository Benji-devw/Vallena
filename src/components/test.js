import React from 'react';
import { Row, Col } from 'react-bootstrap';
import blogImage1 from '../assets/img/blog1.jpg';


const ProductItems = ({ state: { products, displayCategory } }) => (
   <>
      {/* map sur products => recup categoryProduct => les filtre et créer un new tab des valeur qui remplisse les condition de filter sinon categoryProduct === "all" */}
      {products.filter( ({ categoryProduct }) => displayCategory === categoryProduct || displayCategory === "all" )
   
            // map sur le tab rendu par filter
         .map(( datas, t ) => (
         <Col md={3} key={datas._id} className='mt-5 mb-5'>
         <div key={t} className='card rounded-0'>
            <img src={blogImage1} className='card-img-top' alt='Blog 1' />
            <div className='card-body'>
               <h5 className='card-title'>{datas.titleProduct}</h5>
               <p className='card-text'>
                  {datas.descriptionProduct}<br />
               </p>
                  
                  <b>{datas.priceProduct}€</b> <br />
                  en stock <b>{datas.quantityProduct}</b> <br />
                  cat : <b>{datas.categoryProduct}</b>
               
               {/* <ModalProduct 
                  datas={produit}
                  img={blogImage1}
               /> */}
            </div>
         </div>
         </Col>
         ))
      }
   </>
);

const ListeCategory = (productCategoriesList, setCategory) =>
   productCategoriesList.map((category, i) => (
      <li key={i} className={`btn-${category}`}
         onClick={() => setCategory(category)}           // setCategory clické au state.displayCategory ds Main
      >
        <b>{category}</b> 
      </li>
   ));

const UI = ({ state, state: { productCategoriesList }, setCategory }) => (
   <>
      <Col>
         <Row>
         <h5>Catégories : </h5>
         {ListeCategory(productCategoriesList, setCategory)}
         </Row>
         <Row>
            <ProductItems state={state} />
         </Row>
      </Col>
   </>
   );

class Main extends React.Component {
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
            <UI setCategory={this.setCategory} state={this.state} />
         </>
         )
   }
}
export default Main

