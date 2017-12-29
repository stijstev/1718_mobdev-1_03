'use strict';

import * as firebase from 'firebase';

export class DB {
  constructor () {
    this.dbRef = null;
    this.dbConfig = require('./firebaseconfig.json');
  }
  init () {
    firebase.initializeApp(this.dbConfig);
    this.dbRef = firebase.database();
  }
  get (dataPath, callback) {
    let data = this.dbRef.ref(dataPath);
    console.log(data);
    data.on('value', function (snapshot) {
      if (callback) {
        callback(snapshot.val());
      } else {
        return snapshot.val();
      }
    });
    return false;
  }

  /*getWhere (dataPath, key, condition) {
    while (data)
      let data = this.get(dataPath);



      if (data.key == condition
  }*/
  
  update (dataPath, value) {
    this.dbRef.ref(dataPath).update(
      data
    );
  }
  set (dataPath, value) {
    this.dbRef.ref(dataPath).set(
      value
    );
  }
}

export class Session {
  constructor (userId) {
    this.userId = userId;
    this.ls = new LocalStorage();
  }
  checkSession () {
    if (this.ls.get('cartspire_session')) {
      return this.ls.get('cartspire_session');
    } else {
      return false;
    }
  }
  setSession (status) {
    if (status == 'login') {
      this.ls.set('cartspire_session', this.userId);
      return true;
    } else {
      this.ls.remove('cartspire_session');
    }
  }
}

export class LocalStorage {
  constructor () {
    if (typeof Storage !== 'undefined') {
      this.ls = localStorage;
    } else {
      console.log(
        'Local storage is not supported on this browser, upgrade your browser for the best experience'
      );
    }
  }

  get (item) {
    return this.ls.getItem(item);
  }

  set (item, value) {
    this.ls.setItem(item, value);
  }
  remove (item) {
    this.ls.removeItem(item);
  }
}

// AJAX (url) {
//     return new Promise((resolve, reject) => {
//       let xhr = new XMLHttpRequest();
//       xhr.open('get', url, true);
//       xhr.onload = function () {
//         if (xhr.status == 200) {
//           let data = xhr.response;
//           resolve(data);
//         } else {
//           reject(Error('Error state: ' + status));
//         }
//       };
//       xhr.onerror = function () {
//         reject(Error('Network Error'));
//       };
//       xhr.send();
//     });
//   }
