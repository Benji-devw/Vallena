import React from 'react';

const FilterTop = props => {


      // console.log(props.category);
      return (
         <div className="row" style={{ width: "100%" }}>

            <div className="col filter-search">
               <input type="search" placeholder="Search" aria-label="search"
                  onChange={(e) => props.searchBar(e.target.value)} 
               />
            </div>


            <div className="col text-right filter-sort">
               Tri
               <select defaultValue={props.sort} onChange={props.sortProducts}>
                  <option>---</option>
                  <option value="lowest">Le plus cher</option>
                  <option value="highest">Le moins cher</option>
               </select>
            </div>
            
         </div>
      );

}
export default FilterTop