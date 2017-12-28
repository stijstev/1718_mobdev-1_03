'use strict';

import { Session } from './utils.js';

import * as firebase from 'firebase';

export class SetCardProject {
  constructor (project, element, db) {
    this.image = project.images.thumbnail;
    this.likes = project.stats.likes;
    this.project = project;
    this.db = db;
    this.url = '/detail';
    this.setCard(element);
  }
  setCard (element) {
    element.querySelector('.card-image').setAttribute('src', this.image);

    let elLikes = element.querySelector('.card-likes');
    elLikes.textContent = this.likes;
    console.log(elLikes);

    setControls(elLikes, this.db, `projects/${this.project.id}/stats`);

    return true;
  }
}

export class SetCardLogin {
  constructor (db) {
    this.db = db;
    this.setCard();
  }
  setCard () {
    document.querySelector('.login-button').addEventListener(
      'click',
      () => {
        this.checkCreds();
      },
      false
    );
  }

  checkCreds () {
    let mailField = document.querySelector('#Email-1').value;
    let passField = document.querySelector('#Password-1').value;

    let users = this.db.get('users', data => {
      data.forEach(user => {
        if (user.email == mailField && user.password == passField) {
          console.log('found');
          let session = new Session(user.id);
          return session.setSession('login');
        }
      });
    });
  }
}

function setControls (like, db, dataPath) {
  like.addEventListener(
    'click',
    () => {
      db.set(dataPath, like, db.get(`${dataPath}/likes`) + 1);
    },
    false
  );
}
