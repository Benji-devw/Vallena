

import $ from 'jquery'



var $filterCheckboxes = $('input[type="checkbox"]');
var filterFunc = function () {

   var selectedFilters = {};

   $filterCheckboxes.filter(':checked').each(function () {

      if (!selectedFilters.hasOwnProperty(this.name)) {
         selectedFilters[this.name] = [];
      }

      selectedFilters[this.namea].push(this.value);
   });

   // create a collection containing all of the filterable elements
   var $filteredResults = $('.flower');

   // loop over the selected filter name -> (array) values pairs
   $.each(selectedFilters, function (name, filterValues) {

      // filter each .flower element
      $filteredResults = $filteredResults.filter(function () {

         var matched = false,
            currentFilterValues = $(this).data('category').split(' ');

         // loop over each category value in the current .flower's data-category
         $.each(currentFilterValues, function (_, currentFilterValue) {

            // if the current category exists in the selected filters array
            // set matched to true, and stop looping. as we're ORing in each
            // set of filters, we only need to match once

            if ($.inArray(currentFilterValue, filterValues) !== -1) {
               matched = true;
               return false;
            }
         });

         // if matched is true the current .flower element is returned
         return matched;

      });
   });

   $('.flower').hide().filter($filteredResults).show();
}

$filterCheckboxes.on('change', filterFunc); 






      // const getCats = localStorage.getItem('filterByCat');
      // const getMatters = localStorage.getItem('filterByMatters');
      // const getColors = localStorage.getItem('filterByColors');
      // const getCollections = localStorage.getItem('filterByCollections');





      // if (getCats) {
      //    if (getCats !== "All") {
      //       newVal.categoryProduct = getCats
      //    } else {
      //       newVal.categoryProduct = []
      //    }
      // }
      // if (getMatters !== [] && getMatters !== null & getMatters !== '') {
      //    newVal.matter = getMatters.split(',')
      // }
      // if (getColors !== [] && getColors !== null & getColors !== '') {
      //    newVal.color = getColors.split(',')
      // }      
      // if (getCollections !== [] && getCollections !== null & getCollections !== '') {
      //    newVal.yearCollection = getCollections.split(',')
      // }








      useEffect(() => {}

            // setAllFilters({ categoryProduct: filtersFromRedux[0].cat})
      // setAllFilters({ matter: filtersFromRedux[0].matter})
      // setAllFilters({ color: filtersFromRedux[0].color})
      // setAllFilters({ collection: filtersFromRedux[0].collection})

      // const newVal = {...allFilters} 
      // console.log('newVal', newVal)

      // if (newVal.categoryProduct.length > 0) {
      //    if (filtersFromRedux[0].cat !== "All") {
      //       newVal.categoryProduct = filtersFromRedux[0].cat
      //       // setAllFilters({ categoryProduct: filtersFromRedux[0].cat })
      //    } else {
      //       newVal.categoryProduct = []
      //       // setAllFilters({ categoryProduct: [] })
      //    }
      // }
      // if (filtersFromRedux[0].matter !== [] && filtersFromRedux[0].matter !== null & filtersFromRedux[0].matter !== '') {
      //    newVal.matter = filtersFromRedux[0].matter
      //    // setAllFilters({ matter: filtersFromRedux[0].matter })
      // }
      // if (filtersFromRedux[0].color !== [] && filtersFromRedux[0].color !== null & filtersFromRedux[0].color !== '') {
      //    newVal.color = filtersFromRedux[0].color
      //    // setAllFilters({ color: filtersFromRedux[0].color })
      // }
      // if (filtersFromRedux[0].collection !== [] && filtersFromRedux[0].collection !== null & filtersFromRedux[0].collection !== '') {
      //    newVal.collection = filtersFromRedux[0].collection
      //    // setAllFilters({ collection: filtersFromRedux[0].collection })
      // } 

      // showFilteredResult(newVal)
      // dispatch(updateFilters(newVal.categoryProduct, newVal.matter, newVal.color, newVal.yearCollection))
      // dispatch(updateFilters(allFilters.categoryProduct, allFilters.matter, allFilters.color, allFilters.yearCollection))
         





























            // if (filtersFromRedux[0].cat) {
      //    if (filtersFromRedux[0].cat.length <= 0) {
      //       // newValue.categoryProduct = []
      //       setAllFilters({ categoryProduct: [] })

      //    } else {
      //       // newValue.categoryProduct = filtersFromRedux[0].cat
      //       setAllFilters({ categoryProduct: filtersFromRedux[0].cat })
      //    }
      // }
      // if (filtersFromRedux[0].matter !== [] && filtersFromRedux[0].matter !== null & filtersFromRedux[0].matter !== '') {
      //    // newValue.matter = filtersFromRedux[0].matter
      //    setAllFilters({ matter: filtersFromRedux[0].matter })
      // }
      // if (filtersFromRedux[0].color !== [] && filtersFromRedux[0].color !== null & filtersFromRedux[0].color !== '') {
      //    // newValue.color = filtersFromRedux[0].color
      //    setAllFilters({ color: filtersFromRedux[0].color })
      // }
      // if (filtersFromRedux[0].collection !== [] && filtersFromRedux[0].collection !== null & filtersFromRedux[0].collection !== '') {
      //    // newValue.collection = filtersFromRedux[0].collection
      //    setAllFilters({ collection: filtersFromRedux[0].collection })
      // }