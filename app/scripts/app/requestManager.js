class RequestManager{

  loadPage( data, callback, isFilmRequest = false ){

    if( isFilmRequest ){

      this.needle.get( data.url, ( err, res ) => {

        let filmHTML = res.body;
        let queryFilmName = encodeURI( "трейлер+" + data.rusName.split( " " ).join( "+" ) );
        let youtubeURL = "https://www.youtube.com/results?search_query=" + queryFilmName;

        this.needle.get( youtubeURL, ( err, res ) => {

          callback.call( this, filmHTML, res.body, data );

        } );

      } );

    }else{

      this.needle.get( data.url, ( err, res ) =>{

        callback.call( this, res.body, data );

      } );

    }
    
  }
  
  //

  filmPage( data ){

    this.loadPage( data, this.parseFilmPage, true );

  }

  parseFilmPage( filmHTML, youtubeHTML, data ){
    
    let film = {};

    let $ = this.cheerio.load( filmHTML );

    film.filmHTML = filmHTML;

    let filmInfoChildren = $( ".f_info" ).first().children();

    for( var i = 0; i < filmInfoChildren.length; i++ ){

      let $info = $( filmInfoChildren[ i ] );
      let infoName = $info.children().first().text();
      let infoValue;
      if( $info.children().last().children().length == 0 ){
        infoValue = $info.children().last().text();
      }else{
        infoValue = $info.children().last().children().first().text();
      }

      switch( infoName ){

        case( "название:" ):
        film.rusName = infoValue;
        break;

        case( "оригинал:" ):
        film.engName = infoValue;
        break;

        case( "год:" ):
        film.year = infoValue;
        break;

        case( "страна:" ):
        film.country = infoValue;
        break;

        case( "слоган:" ):
        film.tagline = infoValue;
        break;

        case( "режиссер:" ):
        film.producer = infoValue;
        break;

        case( "жанр:" ):
        film.genres = infoValue;
        break;

        case( "в ролях:" ):
        film.actors = infoValue;
        break;

        case( "премьера Мир:" ):
        film.premiere = infoValue;
        break;

        case( "время:" ):
        film.time = infoValue;
        break;

      }

    }

    film.plot = [];

    let filmText = $( ".film_text" ).first().children();

    for( var i = 0; i < filmText.length; i++ ){

      if( $( filmText[ i ] ).prop( "tagName" ) == "P" ){

        film.plot.push( $( filmText[ i ] ).text() );

      }

    }

    film.ratings = [];
    film.ratings.push( [ $( ".rat_one" ).find( ".rate2" ).first().text(), $( ".rat_one" ).find( ".rat_v" ).text() ] );
    film.ratings.push( [ $( ".rat_two" ).find( ".rat_r" ).first().text(), $( ".rat_two" ).find( ".rat_v" ).text() ] );
    film.ratings.push( [ $( ".rat_tree" ).find( ".rat_r" ).first().text(), $( ".rat_tree" ).find( ".rat_v" ).text() ] );

    film.imgs = [];
    let imgList = $( ".k_i" ).find( "img" );
    for( var i = 0; i < imgList.length; i++ ){

      film.imgs.push( $( imgList[ i ] ).attr( "src" ) );

    }

    film.torrents = [];
    let torrents = $( ".storrent" ).children().first().children();
    for( var i = 1; i < torrents.length; i++ ){

      let $torElem = $( torrents[ i ] );

      let torrent = {};
      torrent.extra = {};
      torrent.extra.video = "";
      torrent.extra.translation = "";
      torrent.extra.audio = "";

      torrent.name = $torElem.children( ".st2" ).first().children().first().text();
      torrent.size = $torElem.children( ".st3" ).text();
      torrent.url = $torElem.children( ".st4" ).first().children().first().attr( "href" );

      let sti = $torElem.children( ".st2" ).first().children( "sti" ).first().children();

      for( var j = 1; j < sti.length; j++ ){

        switch( $( sti[ j ] ).children().first().text() ){

          case( "Видео:" ):
            torrent.extra.video = $( sti[ j ] ).children().first().after();
            break;

          case( "Перевод:" ):
            torrent.extra.translation = $( sti[ j ] ).children().first().after();
            break;

          case( "Аудио:" ):
            torrent.extra.audio = $( sti[ j ] ).children().first().after();
            break;

        }

      }

      film.torrents.push( torrent );

    }

    //

    $ = this.cheerio.load( youtubeHTML );

    let trailerURL = $( ".yt-lockup-thumbnail" ).children( "a" ).first().attr( "href" );
    trailerURL = trailerURL.slice( trailerURL.indexOf( "=" ) + 1 );
    trailerURL = "https://www.youtube.com/embed/" + trailerURL;

    film.trailerURL = trailerURL;

    //

    data.event.sender.send( "page-request", film );

  }

  //

  filmsPage( data ){

    switch( data.pageType ){

      case "main":

        data.domen = "http://torrent-filmi.net/page/";
        break;

      case "genre":

        data.domen = "http://torrent-filmi.net/cat/" + data.argument + "/page/";
        break;

      case "search":
        break;

    }

    //

    var m = parseInt( data.maxFilmsOnPage );
    var n = data.userPage;
    var s = m * ( n - 1 ); // Sorry, but i really don't know what is it, and yes, i wrote it

    data.requestInfo = {};
    data.requestInfo.startPage = ( s / 10 ) + 1;
    data.requestInfo.amountOfPages = m / 10;

    for( var i = 0; i < data.requestInfo.amountOfPages; i++ ){

      data.url = data.domen + ( parseInt( data.requestInfo.startPage ) + i ) + "/";
      data.requestInfo.packageNum = i + 1;
      this.loadPage( data, this.parseFilmsPage );

    }

  }

  parseFilmsPage( html, data ){

    let dataForSender = {};

    if( data.requestInfo.packageNum == 1 ){

      dataForSender.userPage = data.userPage;
      dataForSender.pageType = data.pageType;
      dataForSender.argument = data.argument;
      dataForSender.rusArgument = data.rusArgument;

    }

    dataForSender.amountOfPackages = data.requestInfo.amountOfPages;
    dataForSender.packageNum = data.requestInfo.packageNum;
    dataForSender.filmsList = [];

    //

    let $ = this.cheerio.load( html );

    if( data.requestInfo.packageNum == 1 ){

      dataForSender.maxUserPage = parseInt( $( ".navigation" ).first().find( "a" ).last().prev().text() ) * 10 / parseInt( data.maxFilmsOnPage );

    }

    let $newsElems = $( ".m_news" );

    for( var i = 0; i < $newsElems.length; i++ ){

      let film = {};

      let $news = $( $newsElems[i] );

      film.rusName = $news.find( ".m_title a" ).first().text();
      film.engName = $news.find( ".m_eng" ).first().text();
      film.description = $news.find( ".m_f" ).first().children().first().text();

      $news.find( ".m_f" ).first().find( "br" ).after( "/Kostul/" );

      let mfText = $news.find( ".m_f" ).first().text();
      let getSomethingFromMFText = function( text ){

        let index1 = mfText.indexOf( text );
        let index2 = mfText.slice( index1 ).indexOf( "/Kostul/" ) + index1;
        let something = mfText.slice( index1 + text.length + 1, index2 );

        return( something );

      };

      film.producer =  getSomethingFromMFText( "Режиссер:" );
      film.country =  getSomethingFromMFText( "Страна:" );
      film.year = getSomethingFromMFText( "Год:" );
      film.genres = getSomethingFromMFText( "Жанр:" );
      film.time = getSomethingFromMFText( "Продолжительность:" );

      film.quality = $news.find( ".m_ka span font" ).first().text();
      film.rating = $news.find( ".m_r span font" ).first().text();

      film.img = $news.find( ".m_news_i img" ).attr( "src" );
      film.url = $news.find( ".m_news_b a" ).last().attr( "href" );

      dataForSender.filmsList.push( film );

    }

    //

    data.event.sender.send( "page-request", dataForSender );

  }

  //

  downloadsPage( data ){}

  //

  settingsPage( data ){}

}

let requestManager = new RequestManager();
module.exports = requestManager;