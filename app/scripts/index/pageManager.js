'use strict'

class PageManager{

  constructor(){

    this.genresRus = [ "Боевик", "Военный", "Вестерн", "Драма", "Детектив", "Документальный", "Исторический", "Комедия", "Криминал", "Мелодрама", "Мюзикл", "Приключения", "Семейный", "Спорт", "Сериал", "Триллер", "Ужасы", "Фэнтези", "Фантастика", "Аниме" ];
    this.genresEng = [ "boevik", "voennoe", "vestern", "drama", "detektiv", "documentalnyy", "history", "komediya", "kriminal", "melodrama", "myuzikl", "priklyucheniya", "semeynoe", "sport", "serial", "triller", "uzhasy", "fentezi", "fantastika", "anime" ];
    this.genresImg = [ "hitman", "war", "western", "drama", "detective", "documentary", "history", "comedy", "criminal", "melodrama", "musical", "adventure", "family", "sport", "serials", "thriller", "horror", "fantasy", "fantastic", "anime" ];

  }

  createGenresMenu(){

    this.genresRus.forEach( ( genreRus, id ) => {

      let item = this.createDivWithClass( "menu-of-genres-item btn-with-img-inside" );
      item.setAttribute( "genreRus", genreRus );
      item.setAttribute( "genreEng", this.genresEng[ id ] );

      let img = document.createElement( "img" );
      img.src = "resources/icons/genres/" + this.genresImg[ id ] + ".png";

      item.appendChild( img );

      $( item ).click( () => {

        this.appManager.setPage( { src: "films", data: { pageType: "genre", argument: this.genresEng[ id ], rusArgument: genreRus, userPage: 1 } } );

      } );

      document.getElementById( "menu-of-genres" ).appendChild( item );

    } );

  }

  setButtonsFunctions(){

    $( "#close-btn" ).click( () => {

      this.appManager.closeApp();

    } );

    $( "#minimize-btn" ).click( () => {

      this.appManager.minimizeWindow();

    } );

    $( "#maximize-btn" ).click( () => {

      this.appManager.maximizeWindow();

    } );

  }

  createDivWithClass( className ){

    let div = document.createElement( "div" );
    div.className = className;

    return( div );

  }

}