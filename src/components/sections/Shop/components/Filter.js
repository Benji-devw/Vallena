import React, { Component } from 'react';

export default class Filter extends Component {

   
   render() {
      return (
         <div className="col filter">
            <div className="filter-result">{this.props.count} Products</div>
            <div className="filter-sort">
               Order 
               <select defaultValue={this.props.sort} onChange={this.props.sortProducts}>
                  <option>Latest</option>
                  <option value="lowest">lowest</option>
                  <option value="highest">highest</option>
               </select>
            </div>
            <div className="filter-category">
               filter 
               {/* <ul defaultValue={this.props.category} onClick={this.props.filterProducts}>
                  <div className="category-shop">

                  {this.props.catList.map(cat => <li key={cat._id}>{cat.categoryProduct} </li>)}
                  </div>
               </ul> */}
               <select defaultValue={this.props.category} onChange={this.props.filterProducts}>
                  <option>All</option>
                  {this.props.catList.map(cat => <option key={cat._id}>{cat.categoryProduct}</option>)}
               </select>
            </div>
         </div>
      );
   }
}
