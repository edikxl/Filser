'use strict'

window.onload = () => {

  function noselect() {return false;}

  document.ondragstart = noselect;
  document.onselectstart = noselect;

  //

}