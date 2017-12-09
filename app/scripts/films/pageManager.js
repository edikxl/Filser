'use strict'

class PageManager{

  constructor(){

    this.testFilm = {

      rusName: "Проклятие Аннабель: Зарождение зла",
      engName: "Annabelle 2",
      description: "Данный кинофильм продолжает историю, которая началась в первой части, но с участием уже других персонажей. Тогда, в 2014 году, этот малобюджетный триллер стал хитом и собрал большую выручку при минимальном вложении. Именно на такой результат рассчитывают создатели данного ужастика и в этот раз.   Специалист по созданию кукол, чья единственная дочка трагически погибла двадцать л...",
      producer: "Дэвид Ф. Сандберг",
      country: "США",
      year: "2017",
      genres: "Детектив, Триллер, Ужасы",
      time: "109 мин. / 01:49",
      quality: "HDRip",
      rating: "6.158",
      img: "http://im.torrent-filmi.net/posters/200_300_94_0/poster/3892/proklyatie-annabel-zarozhdenie-zla.jpg"

    };

    this.testFilm2 = {

      rusName: "Геошторм",
      engName: "Annabelle 2",
      description: "Данный кинофильм продолжает историю, которая началась в первой части, но с участием уже других персонажей. Тогда, в 2014 году, этот малобюджетный триллер стал хитом и собрал большую выручку при минимальном вложении. Именно на такой результат рассчитывают создатели данного ужастика и в этот раз.   Специалист по созданию кукол, чья единственная дочка трагически погибла двадцать л...",
      producer: "Дэвид Ф. Сандберг",
      country: "США",
      year: "2017",
      genres: "Детектив, Триллер, Ужасы",
      time: "109 мин. / 01:49",
      quality: "CAMRip",
      rating: "6.158",
      img: "http://hd-kinomax.org/uploads/posts/2017-10/1508514296-1763527929.jpg"

    };

  }

  setInfoText( text, type ){

    if( type == "genre" ){

      document.getElementById( "info-text-field" ).innerHTML = "Фильмы по запросу: <b>" + text + "</b>";

    }else if( type == "main" ){

      document.getElementById( "info-text-field" ).innerHTML = "Последние добавленные";

    }else if( type == "watchLater" ){

      document.getElementById( "info-text-field" ).innerHTML = 'Фильмы из списка "Посмотреть позже"';

    }else{

      throw "Тип текста для информационного блока указан неверно."

    }

  }

  setPaginations( numOfPage, maxPage ){

    if( !numOfPage || !maxPage ) throw "Номер текущей или максимальной страницы неизвестен.";

    let blocks = [];

    let nums = [];
    let needFirstThreePoints = true;
    let needLastThreePoints = true;

    if( !( maxPage > 10 ) ){

      needLastThreePoints = false;

    }

    // TODO: SHORTEN NUMS!

    if( numOfPage >= maxPage - 6 ){

      nums = [ maxPage - 8, maxPage - 7, maxPage - 7, maxPage - 5, maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage ];
      needLastThreePoints = false;

    }else if( numOfPage > 7 ){

      nums = [ numOfPage - 4, numOfPage - 3, numOfPage - 2, numOfPage - 1, numOfPage, numOfPage + 1, numOfPage + 2, numOfPage + 3, numOfPage + 4 ];

    }else if( numOfPage <= 6 ){

      nums = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
      needFirstThreePoints = false;

    }

    nums.forEach( ( num, id ) => {

      if( id == 0 && needFirstThreePoints ){

        blocks.push( 1 );
        blocks.push( "..." );

      }

      if( num != numOfPage ){

        blocks.push( num );

      }else{

        blocks.push( [num] );

      }

      if( id == nums.length - 1 && needLastThreePoints ){

        blocks.push( "..." );
        blocks.push( maxPage );

      }

    } )

    Array.from( document.getElementsByClassName( "pagination-nav" ) ).forEach( ( nav ) => {

      blocks.forEach( ( block ) => {

        let navBlock = this.createDivWithClass( "pagination-nav-block" );

        if( nav.parentElement.id == "fixed-pagination" ){

          navBlock.id = "fixed-pagination-nav-block";

        }

        if( typeof( block ) == "string" || typeof( block ) == "number"){

          if( block == "..." ){

            navBlock.className += " pagination-nav-is-disabled";

          }

          navBlock.innerHTML = "<p>" + block + "</p>";

        }else{

          navBlock.className += " pagination-nav-now-page";
          navBlock.innerHTML = "<p>" + block[0] + "</p>";

        }

        nav.appendChild( navBlock );

      } );

    } );

  }

  // FILMS

  addFilm( film ){

    /*
    <div class="film">
      <div class="film-quality">Quality</div>
      <div class="film-img"><img src=""></div>
      <div class="film-name">Name</div>
    </div>
    */

    let filmElement = this.createDivWithClass( "film" );

    filmElement.id = "next-film-to-process";

    // Film quality

    let filmQuality = this.createDivWithClass( "film-quality" );
    filmQuality.innerHTML = "<p>" + film.quality + "</p>";

    filmElement.appendChild( filmQuality );

    // Film image

    let filmImage = this.createDivWithClass( "film-img" );

    let img = document.createElement( "img" );
    img.src = film.img;

    filmImage.appendChild( img );
    filmElement.appendChild( filmImage );

    // Film name

    let filmName = this.createDivWithClass( "film-name" );

    let len = film.rusName.length;

    if( len > 20 ){

      filmName.innerHTML = film.rusName.slice( 0, 20 ) + "...";

    }else{

      filmName.innerHTML = film.rusName;

    }

    filmElement.appendChild( filmName );

    //

    document.getElementById( "films" ).appendChild( filmElement );

    // After

    let html = `

    <div class="full-film" id="full-film">
      <div class="full-film-head">
        <div class="full-film-names">
          <div class="full-film-rus-name">${ film.rusName }</div>
          <div class="full-film-eng-name">${ film.engName }</div>
        </div>
        <div class="full-film-line">
          <div class="full-film-rating">${ film.rating }</div>
          <div class="full-film-year">${ film.year }</div>
          <div class="full-film-time">${ film.time }</div>
        </div>
      </div>
      <div class="full-film-body">
        <div class="full-film-description">${ film.description }</div>
        <div class="full-film-other-info">
          <b class="full-film-b">Режиссёр: </b>${ film.producer }<br>
          <b class="full-film-b">Жанр: </b>${ film.genres }<br>
          <b class="full-film-b">Страна: </b>${ film.country }
        </div>
        <div class="full-film-btns">
          <div class="full-film-btn full-film-goto-film">Перейти к фильму</div>
          <div class="full-film-btn full-film-add-to-watch-list">Смотреть позже</div>
        </div>
      </div>
    </div>

    `;

    filmElement = document.getElementById( "next-film-to-process" );
    filmElement.id = "";
    let appManager = this.appManager;
    let pageManager = this;

    $( filmElement ).mouseover( function(){

      let time = new Date;
      time = parseInt( time.getTime() );

      if( time - pageManager.lastScrollTime < 100 ){ return true };

      let $film = $( this );
      $film.after( html );

      let $fullFilm = $( "#full-film" );

      //

      $fullFilm.find( ".full-film-goto-film" ).first().click( function(){

        appManager.setFilmPage( { url: film.url, rusName: film.rusName } );

      } );

      //
      let films = document.getElementById( "films" );
      let offset = $film.offset();

      if( offset.left + $film.width() < films.offsetWidth * 0.8 ){

        $fullFilm.css( "left", offset.left + $film.width() );

      }else{

        $fullFilm.css( "left", offset.left - $fullFilm.width() );

      }

      if( offset.top + $film.height() <= films.offsetHeight ){

        $fullFilm.css( "top", offset.top );

      }else{

        $fullFilm.css( "top", document.body.clientHeight - $fullFilm.height() - 4 ); // "- 4" because width of border = 4 px

      }

      $fullFilm.mouseout( function( e ){

        if( e.relatedTarget != null ){

          if( e.relatedTarget.className.indexOf( "full-film" ) != -1 ){

            return true;

          }

        }

        $( this ).remove();

      } )

    } );

    $( filmElement ).mouseout( function( e ){

      if( e.relatedTarget != null ){

        if( e.relatedTarget.className.indexOf( "full-film" ) != -1 ){

          return true;

        }

      }

      $( "#full-film" ).remove();

    } );

  }

  normalizeFilmNames(){

    Array.from( document.getElementsByClassName( "film-name" ) ).forEach( ( filmName, id ) => {

      filmName.style.height = document.body.clientHeight * 0.06 + "px";

    } );

  }

  createDivWithClass( className ){

    let div = document.createElement( "div" );
    div.className = className;

    return( div );

  }

}