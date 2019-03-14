let firebase = require('firebase');
let minimist = require('minimist');
let tableData =  require('../dummy/data/tables');
let employeeData =  require('../dummy/data/employee');
let productData = require('../dummy/data/product');

let dummy = {
  table: {data: tableData },
  employee: {data: employeeData},
  product: {data: productData}
};


/* Firebase config */
let config = {
  apiKey: 'AIzaSyDxzuoS6ISH_ZqJqP8b-v2VwCYSvyOSbbQ',
  authDomain: 'meerkats-40f0a.firebaseapp.com',
  databaseURL: 'https://meerkats-40f0a.firebaseio.com',
  projectId: 'meerkats-40f0a',
  storageBucket: 'meerkats-40f0a.appspot.com',
  messagingSenderId: '1072246567046'
};
/* Init firebase */
firebase.initializeApp(config);

/* Get arguments */
let argv = minimist(process.argv.slice(2));

/* Argument validation */
argv._.forEach(a => {
  if (!dummy.hasOwnProperty(a)) {
    console.log(a + ' is not valid args');
    process.exit();
  }
});

/* Delete all dummy data */
if (argv._.findIndex(arg => arg === 'delete') > 0) {
  process.exit();
}

/* Push Firebase */
 argv._.forEach(arg => {
   firebase.database().ref(arg).set(dummy[arg].data);
 });














