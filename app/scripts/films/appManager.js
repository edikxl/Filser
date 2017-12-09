'use strict'

class AppManager{

  constructor( pageManager ){

    this.pageManager = pageManager;

    this.gotPackages = 0;
    this.packages = [];

    window.addEventListener( "message", ( event ) => {

      this.gotPackages += 1;
      this.packages[ event.data.packageNum ] = event.data;

      if( this.gotPackages == event.data.amountOfPackages ){

        this.allPackagesAccepted();

      }

    });

  }

  allPackagesAccepted(){

    for( var i = 1; i < this.packages.length; i++ ){

      let Package = this.packages[ i ];

      Package.filmsList.forEach( ( film ) => {

        this.pageManager.addFilm( film );    

      } );

      if( Package.packageNum == 1 ){

        this.pageManager.setInfoText( Package.rusArgument, Package.pageType );
        this.pageManager.setPaginations( Package.userPage, Package.maxUserPage );

      }

    }

    this.pageManager.normalizeFilmNames();

  }

  setFilmPage( data ){

    parent.postMessage( {

      requestType: "change-page",
      pageType: "film",
      url: data.url,
      rusName: data.rusName

    }, "*" );

  }

}