

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


