'use strict'

class AppManager{

  constructor( pageManager ){

    window.addEventListener( "message", ( event ) => {

      this.pageManager.setFilm( event.data );

    });

  }

}