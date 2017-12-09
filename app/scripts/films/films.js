'use strict'

window.onload = () => {

  function noselect() {return false;}

  document.ondragstart = noselect;
  document.onselectstart = noselect;

  //

  let pageManager = new PageManager();
  let appManager = new AppManager( pageManager );
  pageManager.appManager = appManager;

  //

  let time = new Date;
  time = parseInt( time.getTime() );

  pageManager.lastScrollTime = time;

  document.getElementById( "main" ).onscroll = function(){

    let time = new Date;
    time = parseInt( time.getTime() );

    pageManager.lastScrollTime = time;

    //

    let scrolled = event.currentTarget.scrollTop;
    let minHeight = document.body.clientHeight * 20 / 100;
    let fixedPagination = document.getElementById( "fixed-pagination" );

    if( scrolled > minHeight && fixedPagination.style.display != "flex" ){

      fixedPagination.style.display = "flex";

    }else if( fixedPagination.style.display != "none" && scrolled < minHeight ){

      fixedPagination.style.display = "none";

    }

  }

}