
// INDEXED_DB
// INSERT TO NAVIGATEUR

const IndexDbInit = (event) => {
      var request = indexedDB.open('customers', 2);
   request.onerror = function (event) { console.log('Error INDEXED_DB...', event) };
   request.onupgradeneeded = function (event) {
      console.log('event', event)
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

   




   // REQUETE GET PRODUCT
   var request = indexedDB.open('customers', 2);
   request.onsuccess = function (event) {
      const db = event.target.result
      // console.log('db', db)

      db.transaction('product').objectStore('product').get(`${lulu._id}`).onsuccess = function (event) {
         this.setState({ result: event.target.result })
         // console.log('event', event.target.result)
         // return this.setState({ result: event.target.result })
      }
   }


