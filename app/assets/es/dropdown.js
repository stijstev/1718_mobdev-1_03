'use strict';
let dropdownmenu = document.querySelector('#drop-menu');
let hamburger = document.querySelector('#hamburger-menu');

export class DropDown {
  constructor () {
    console.log('this is the dropdown');
  }

  createDropDown () {
    hamburger.addEventListener('click', function () {
      console.log('open');
      dropdownmenu.setAttribute('style', 'display: block');
      hamburger.src = '/assets/images/symbols/cross_white.svg';
      hamburger.classList.add('.btn-close');
    });
  }

  closeDropDown () {
    let cross = document.querySelector('.close_btn');
    cross.addEventListener('click', function () {
      console.log('close');
      dropdownmenu.setAttribute('style', 'display: none');
    });
  }
}
