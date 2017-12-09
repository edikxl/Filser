'use strict'

window.onload = () => {

  function noselect() {return false;}

  document.ondragstart = noselect;
  document.onselectstart = noselect;

  //

  let pageManager = new PageManager();

  for( var i = 0; i < 10; i++ ){

    pageManager.addTorrent( pageManager.testTorrent );
    pageManager.addTorrent( pageManager.testTorrent2 );

  }

  //

  pageManager.torrentsOnAdded();
  
};