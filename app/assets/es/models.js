'use strict';

import { Session } from './utils.js';

import * as firebase from 'firebase';

import DB from './utils.js';

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
  }
}

export class SetCardLogin {
  constructor (db) {
    this.db = db;
    this.setCard();
  }
  setCard () {
    document.querySelector('#login-button').addEventListener('click', () => {
      let mailField = document.querySelector('#Email-1').value;
      let passField = document.querySelector('#Password-1').value;
      checkLoginCreds(mailField, passField);
    }, false
  )};
}

export class SetCardRegister {
  constructor (db) {
    this.db = db;
    this.setCard();
  }
  setCard () {
    console.log(this.checkIfIdentical('hi', 'hi')); 
    document.querySelector('#register-button').addEventListener('click', () => {
      let mailField = document.querySelector('#Email-1').value;
      let passField = document.querySelector('#Password-2').value;
      let passField2 = document.querySelector('#Repeat-password-1').value;
      let userField = document.querySelector('#Username').value;
      let nameField = document.querySelector('#Name').value;
      let isStudentField = document.querySelector('#Is-student').value;

      if (this.checkIfIdentical(passField, passField2)) {
        let user = new User(nameField, userField, mailField, passField, isStudentField, this.db);
        setRegisterCreds(user.get(), this.db);
      }
    })
  }
  checkIfIdentical (item1, item2) {
    if (item1 == item2) {
      return true;
    } else {
      return false;
    }
  }
}

function checkLoginCreds (mailField, passField) {
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

function setRegisterCreds (student, db) {
  console.log('test');
  db.set(`users/${student.id}`, student);
}

export class SetAuthorCard {
  constructor (name, course) {
    this.name = name;
    this.course = course;
    this.setCard();
  }
  setCard () {
    document.querySelector('.name').textContent = this.name;
    document.querySelector('.course').textContent = this.course;
  }
}

function setControls (like, db, dataPath) {
  like.addEventListener('click', () => {
    db.update(dataPath, 'likes', parseInt(like.textContent) + 1);
  }, false
  );
}

export class User {
  constructor (name, username, email, password, isStudent, db) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.isStudent = isStudent;
    this.id = db.dbRef.child('posts').push().key;
  }
  get () {
    return {'name': this.name, 'username': this.username, 'email': this.email, 'password': this.password, 'isStudent': this.isStudent, 'id': this.id, 'socialLinks': ' ', 'profileViews': ' '};
  }
}



export class Student extends User {

}