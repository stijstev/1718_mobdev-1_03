'use strict';

import { SetCardProject, SetCardLogin, SetCardRegister, SetAuthorCard, SetProfilePage, SetDetailCard } from './models';

import { DropDown } from './dropdown';

import * as firebase from 'firebase';

import { DB, Session, LocalStorage } from './utils';

class App {
  constructor () {
    this.db = new DB();
    this.ls = new LocalStorage();
    this.session = null;
  }

  init () {
    this.db.init();
    this.session = this.initSession();

    this.setNav();
    this.checkPage(); //Perform page specific functions

    // this.cardContent();
    const dd = new DropDown();
    dd.createDropDown();

    console.log('Initialized!');
  }

  checkPage () {
    if (this.session.currentPage == 'Cartspire | Home') {
      let tempCards = document.querySelectorAll(`.card-project`);
      if (tempCards.length > 0) {
        tempCards.forEach((element, index) => {
          this.db.get(`projects/${index}`, data => {
            let card = new SetCardProject(data, element, this.db, this.ls);
          });
        });
      }
      this.setHeaderImage('https://firebasestorage.googleapis.com/v0/b/mobdev-i-cartspire.appspot.com/o/AHS_MARIAKERKE.jpg?alt=media&token=6571fd22-2938-4af9-91c5-743a5bf79e54', document.querySelector('.header-image__container'));
    }
    if (this.session.currentPage == 'Cartspire | Profile' && this.session.userId) {
      this.db.get(`users/${this.session.userId}`, (data) => {
        document.querySelector('.author-title').textContent = data.name;
        let studentId;
        if (data.isStudent) {
          studentId = data.id;
        }
        this.db.get(`students/${studentId}/course`, (course) => {
          let card = new SetAuthorCard(data.name, course);
        });
        let bio = document.querySelector('.bio');
        if (data.bio) {
          bio.textContent = data.bio;
        } else {
          bio.style.display = 'none'; //WIP
        }
      });
      this.setHeaderImage('https://firebasestorage.googleapis.com/v0/b/mobdev-i-cartspire.appspot.com/o/LOKAAL.jpg?alt=media&token=697e40e4-e87f-415d-83ab-0a8d2187f2cb', document.querySelector('.header-image__container'));
    }
    if (this.session.currentPage == 'Cartspire | Blog') {
      let tempCards = document.querySelectorAll(`.card-project`);
      if (tempCards.length > 0) {
        tempCards.forEach((element, index) => {
          this.db.get(`projects/${index}`, data => {
            let card = new SetCardProject(data, element, this.db, this.ls);
          });
        });
      }
      this.setHeaderImage('https://firebasestorage.googleapis.com/v0/b/mobdev-i-cartspire.appspot.com/o/MEDIATHEEK.png?alt=media&token=1fa0bf02-ed62-4a25-ae3f-bcf49de097ff', document.querySelector('.header-image__container'));
    }
    if (this.session.currentPage == 'Cartspire | Login') {
      console.log('hello');
      let cardLogin = new SetCardLogin(this.db);
      let cardRegister = new SetCardRegister(this.db);
    }
    if (this.session.currentPage == 'Cartspire | Detail Page') {
      this.db.get(`projects/${this.ls.get('lastClick')}`, (data) => {
        let card = new SetDetailCard(data, this.db);
        document.querySelector('.detail-desc').textContent = data.description;
        this.setHeaderImage(data.images.thumbnail, document.querySelector('.header-image__container'));
      })
    }
    if (this.session.currentPage == 'Cartspire | Opleiding') {
      this.setHeaderImage('https://firebasestorage.googleapis.com/v0/b/mobdev-i-cartspire.appspot.com/o/AHS_MARIAKERKE.jpg?alt=media&token=6571fd22-2938-4af9-91c5-743a5bf79e54', document.querySelectorAll('.header-image__container')[0]);
      this.setHeaderImage('https://firebasestorage.googleapis.com/v0/b/mobdev-i-cartspire.appspot.com/o/MEDIATHEEK.png?alt=media&token=1fa0bf02-ed62-4a25-ae3f-bcf49de097ff', document.querySelectorAll('.header-image__container')[1]);
    }
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
    let userId = session.checkSession();
    if (!userId) {
      session.setSession('unregistered');
    }
    let sessionObject = session;
    let currentPage = document.getElementsByTagName('title')[0].innerHTML;
    return { sessionObject, userId, currentPage };
  }

  setHeaderImage (url, element) {
    element.style.background = `url(${url}) no-repeat fixed center`;
  }
}

window.addEventListener('load', ev => {
  const app = new App();
  app.init();
});
