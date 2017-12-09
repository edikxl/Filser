'use strict'

window.onload = () => {

  function noselect() {return false;}

  document.ondragstart = noselect;
  document.onselectstart = noselect;

  let appManager = new AppManager();

  let pageManager = new PageManager();
  pageManager.appManager = appManager;
  pageManager.createGenresMenu();
  pageManager.setButtonsFunctions();

  appManager.setPage( { src: "films", data: { pageType: "main", argument: "", userPage: 1 } } );

}

function show( elementId, displayType = "flex" ){

  document.getElementById( elementId ).style.display = displayType;

}

function hide( elementId ){

  document.getElementById( elementId ).style.display = "none";

}