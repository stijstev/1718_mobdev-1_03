'use strict';
let dropDownMenu = document.querySelector('#drop-menu');
let hamburger = document.querySelector('#hamburger-menu');
let menuActive = false;

export class DropDown {
  constructor () {
    console.log('this is the dropdown');
  }
  createDropDown () {
    hamburger.addEventListener('click', function () {
      console.log('open');
      if (!menuActive) {
        dropDownMenu.setAttribute('style', 'display: block');
        hamburger.src = '/assets/images/symbols/cross_white.svg';
        hamburger.classList.add('.btn-close');
        menuActive = true;
      } else {
        dropDownMenu.setAttribute('style', 'display: none');
        hamburger.src = '/assets/images/symbols/menu.svg';
        hamburger.classList.remove('.btn-close');
        menuActive = false;
      }
    });
  }
}

//   closeDropDown () {
//     let cross = document.querySelector('.close_btn');
//     cross.addEventListener('click', function () {
//       console.log('close');
//       dropdownmenu.setAttribute('style', 'display: none');
//     });
//   }
// }
