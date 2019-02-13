let firebase = require("firebase");
const tableData =  require('../dummy/data/tables');

let argv = require('minimist')(process.argv.slice(2));
console.dir(argv);


return;

// TODO read environment
let config = {
  apiKey: 'AIzaSyDxzuoS6ISH_ZqJqP8b-v2VwCYSvyOSbbQ',
  authDomain: 'meerkats-40f0a.firebaseapp.com',
  databaseURL: 'https://meerkats-40f0a.firebaseio.com',
  projectId: 'meerkats-40f0a',
  storageBucket: 'meerkats-40f0a.appspot.com',
  messagingSenderId: '1072246567046'
};


firebase.database().ref('tables').set({
  location: 'falan',
  chair: 8,
  no: 'BHC-020256',
  barcode: '015230151121',
  business_id: '12asd05121321210a0152',

});

firebase.initializeApp(config);



