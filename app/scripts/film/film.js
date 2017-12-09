'use strict'

window.onload = () => {

  function noselect() {return false;}

  document.ondragstart = noselect;
  document.onselectstart = noselect;

  //

  let pageManager = new PageManager();

  let appManager = new AppManager();
  appManager.pageManager = pageManager;

  $( "#title-watch-later-btn" ).click( () => {

    pageManager.onClickWatchLaterBtn();

  } );

};