'use strict'

class AppManager{

  constructor(){

    this.ipcRenderer = require( "electron" ).ipcRenderer;

    this.ipcRenderer.on( "page-request", ( event, data ) => {

      document.getElementById( "iframe" ).contentWindow.postMessage( data, "*" );

    } );

    window.addEventListener( 'message', ( event ) => {

      let data = event.data;

      switch( data.requestType ){

        case "change-page":
          this.setPage( { src: data.pageType, data: { url: data.url, rusName: data.rusName } } )
          break;

      }

    } );

    this.ipcRenderer.on( "change-page", ( event, data ) => {

      //

    } );

  }

  send( event, data = {} ){

    this.ipcRenderer.send( event, data );

  }

  setPage( info ){

    $( "#iframe" ).attr( "src", info.src + ".html" );

    this.send( info.src + "-page-request" , info.data );

  }

  setConfigRule( data ){

    this.send( "set-config-rule", data );   

  }

  closeApp(){

    this.send( "close-app" );

  }

  minimizeWindow(){

    this.send( "minimize-window" );

  }

  maximizeWindow(){

    this.send( "maximize-window" );

  }

}