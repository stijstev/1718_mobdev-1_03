'use strict';

import { SetCardProject, SetCardLogin, SetProfilePage } from './models';

import { DropDown } from './dropdown';

import * as firebase from 'firebase';

import { DB, Session } from './utils';

class App {
  constructor () {
    this.db = new DB();
    this.session = null;
  }

  init () {
    this.db.init();
    this.session = this.initSession();

    this.setNav();
    this.checkPage();

    // this.cardContent();
    const dd = new DropDown();
    dd.createDropDown();

    console.log('Initialized!');
  }

  checkPage () {
    this.cardProject();
    switch (this.session.currentPage) {
      case 'Cartspire | Home':
        console.log('test');
        cardProject();
        break;
      case 'Cartspire | Profile':
        break;
      case 'Cartspire | Home':
        break;
    }
  }

  cardProject () {
    let tempCards = document.querySelectorAll(`.card-project`);
    if (tempCards.length > 0) {
      tempCards.forEach((element, index) => {
        this.db.get(`projects/${index}`, data => {
          let card = new SetCardProject(data, element, this.db);
        });
      });
    }
  }

  cardContent () {
    const cardTypes = ['card-project', 'card-login', 'card-author']; //, 'card-author', 'card-text', 'card-register', 'card-opinion', 'card-blog', 'card-box'];

    cardTypes.forEach((element, index) => {
      let tempCards = document.querySelectorAll(`.${cardTypes[index]}`);
      if (tempCards.length > 0) {
        tempCards.forEach((element, index) => {
          switch (cardTypes[index]) {
            case 'card-project':
              this.db.get(`projects/${index}`, data => {
                let card = new SetCardProject(data, element, this.db);
              });
              break;

            case 'card-login':
              let card = new SetCardLogin(this.db);
              break;
          }
        });
      }
    });
  }

  setNav () {
    const navbar = document.querySelector('.navbar-container');
    const navButtons = {
      elLoginBtn: navbar.querySelector('#navbar-login-btn'),
      elProfileBtn: navbar.querySelector('#navbar-user-profile-btn')
    };
    if (!this.session.userId) {
      console.log(this.session);
      navButtons.elLoginBtn.textContent = 'Log in / Registreer';
      navButtons.elLoginBtn.setAttribute('href', '/login');

      navButtons.elProfileBtn.setAttribute('href', '#');
    } else {
      navButtons.elLoginBtn.textContent = 'Log uit';
      navButtons.elLoginBtn.setAttribute('href', '#');
      navButtons.elLoginBtn.addEventListener('click', () => {
        this.session.sessionObject.setSession('logout');
        window.location.reload(true);
      });

      navButtons.elProfileBtn.setAttribute('href', '/profile');
    }
  }

  initSession () {
    let session = new Session();
    let sessionObject = session;
    let userId = session.checkSession();

    let currentPage = document.getElementsByTagName('title')[0].innerHTML;
    return { sessionObject, userId, currentPage };
  }
}

window.addEventListener('load', ev => {
  const app = new App();
  app.init();
});
