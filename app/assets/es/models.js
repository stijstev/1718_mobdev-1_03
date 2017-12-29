'use strict';

import { Session } from './utils.js';

import * as firebase from 'firebase';

import { DB, LocalStorage } from './utils.js';

export class SetCardProject {
  constructor (project, element, db, ls) {
    this.image = project.images.thumbnail;
    this.likes = project.stats.likes;
    this.project = project;
    this.db = db;
    this.ls = ls
    this.setCard(element);
  }
  setCard (element) {
    element.querySelector('.card-image-url').addEventListener('click', () => {this.ls.set('lastClick', this.project.id)});
    element.querySelector('.card-image').setAttribute('src', this.image);
    

    let elLikes = element.querySelector('.card-likes');
    elLikes.textContent = this.likes;

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

export class SetDetailCard {
  constructor (data, db) {
    console.log(data);
    this.title = data.name;
    this.studentId = data.studentIds[0];
    this.date = `${data.createdDate.day} / ${data.createdDate.month} / ${data.createdDate.year}`;
    this.tags = data.tagIds;
    this.db = db;
    this.setCard();
  }
  setCard () {
    console.log(this.tags);
    document.querySelector('.detail-title').textContent = this.title;
    document.querySelector('.detail-date').textContent = this.date;

    this.tags.forEach((element, index) => {
      this.db.get(`tags/${this.tags[index]}`, (data) => {
        document.querySelector('.tag-row').innerHTML += `<div class='tag'>${data.name}</div>`
      })
    });

    this.db.get(`users/${this.studentId}/name`, (data) => {
      document.querySelector('.detail-author').textContent = data + ' • ';
    });
  }
}
export class SetCardRegister {
  constructor (db) {
    this.db = db;
    this.setCard();
  }
  setCard () {
    document.querySelector('#register-button').addEventListener('click', () => {
      let mailField = document.querySelector('#Email-2').value;
      let passField = document.querySelector('#Password-2').value;
      let passField2 = document.querySelector('#Repeat-password-1').value;
      let userField = document.querySelector('#Username').value;
      let nameField = document.querySelector('#Name').value;
      let isStudentField = document.querySelector('#Is-student').value;

      if (this.checkIfIdentical(passField, passField2)) {
        let user = new User(nameField, userField, mailField, passField, isStudentField, this.db);
        user.assignId((id) => {
          user.id = id;
          setRegisterCreds(user.get(), this.db);
        })
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
        let session = new Session(user.id);
        return session.setSession('login');
      }
    });
  });
}

function setRegisterCreds (student, db) {
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
    db.update(dataPath, {'likes': parseInt(like.textContent) + 1});
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
    this.db = db;
    this.id = null;
  }
  get () {
    return {'name': this.name, 'username': this.username, 'email': this.email, 'password': this.password, 'isStudent': this.isStudent, 'id': this.id, 'socialLinks': ' ', 'profileViews': ' '};
  }
  assignId (callback) {
    this.db.dbRef.ref('users').limitToLast(1).on('child_added', (childSnapshot) => {
      callback(childSnapshot.val().id + 1);
    });
  }
}



export class Student extends User {

}