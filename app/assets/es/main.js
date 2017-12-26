'use strict';

import { Person, Student } from './models';

import { AJAX } from './utils';
// import { GridOverlayElement } from './grid';
import { DropDown } from './dropdown';
//let Handlebars = require('handlebars');

class App {
  constructor () {

    // document.registerElement('grid-overlay', GridOverlayElement);

    window.addEventListener('resize', () => this.resizeWindow());
  }

  resizeWindow () {
    this._gridOverlayElement.updateRendering(
      window.innerWidth,
      Math.max(
        window.innerHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight
      ),
      24
    );
  }

  init () {
    let template = '../templates/card-project.html';
    let context = {likes: 'This is a test', comments:'Five I guess'};
    let templateScript = Handlebars.compile(template);
    let html = templateScript(context);
    console.log(html);

    const dd = new DropDown();
    dd.createDropDown();
  }
}

window.addEventListener('load', ev => {
  const app = new App();
  app.init();
});
