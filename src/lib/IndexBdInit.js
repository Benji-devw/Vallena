

export default function IndexDbInit(products) {

   var request = indexedDB.open('customers', 2);
   request.onerror = function (event) { console.log('Error INDEXED_DB...', event) };
   request.onupgradeneeded = function (event) {
      // console.log('event', event)
      var db = event.target.result;

      var objectStore = db.createObjectStore("product", { keyPath: "_id" });
      objectStore.createIndex("titleProduct", "titleProduct", { unique: false });
      objectStore.createIndex("categoryProduct", "categoryProduct", { unique: false });

      objectStore.transaction.oncomplete = function (event) {
         // Stocker les valeurs dans le nouvel objet de stockage.
         var customerObjectStore = db.transaction("product", "readwrite").objectStore("product");
         for (var i in products) {
            customerObjectStore.add(products[i]);
         }
      }
      
   }
}







// INIT
// const indexDbInit = () => {
//    let indexDBFound = indexedDB.databases();
//    // console.log('indexDBFound', indexDBFound)
//    indexDBFound.then((value) => {
//       if (value.length < 1) {
//          console.log('APICALL');
//          apiCall.getProducts().then(product => {
//             IndexDbInit(product.data.products)
//          })
//       }
//    })
// }
// indexDbInit()
//   }, [saveLocalStorage, items])





// CALL
// useEffect(() => {
//    // IndexDB getAll
//    setTimeout(() => {    // setTimeout sinon ce rend avant App/IndexDbInit()
//       var request = indexedDB.open('customers', 2);
//       request.onsuccess = function (event) {
//          const db = event.target.result
//          db.transaction('product').objectStore('product')
//             .getAll().onsuccess = function (event) {
//                setProductsDb(event.target.result);
//             }
//       }
//    }, 300);
// }, []);

// const saveFilterByCat = (cat) => {
//    localStorage.setItem('filterByCat', cat)
// }