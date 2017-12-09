'use strict'

class PageManager{

  constructor(){

    this.watchLaterBtnState = true;

    this.testFilm = {

      rusName: "Тёмная башня",
      engName: "The Dark Tower",
      year: "2017",
      country: "США",
      tagline: "«Есть и другие миры, кроме этих»",
      producer: "Николай Арсель",
      genres: "Боевик, Вестерн, Приключения, Ужасы, Фантастика, Фэнтези",
      actors: [ "Кэтрин Уинник", "Мэттью МакКонахи", "Идрис Эльба", "Эбби Ли", "Джеки Эрл Хейли" ],
      budget: "$66 000 000",
      premiere: "27 июля 2017",
      age: "12+",
      time: "95 мин. / 01:35",
      //
      plot: [ "Наш мир не является единственным среди всех существующих. Данная кинолента является давно ожидаемой экранизацией нашумевшей книги известного фантаста Стивена Кинга про стрелка Роланда Дискейна, последнего члена древнейшего ордена рыцарей. Как и в оригинальной книге, в фильме сюжет основан на поисках Темной башни, которой под силу не дать мрачному миру полностью погрузиться во тьму и хаос. В основном события киноленты развиваются вокруг длительного путешествия по миру после апокалипсиса, который похож Старый Запад и в котором есть место магии и чудесам.",
      "Приключения стрелка Дискейна и его друзей состоят из посещения прочих миров и разных временных эпох. Роланд абсолютно уверен, что если ему удастся найти центр всех миров, отыскать Темную башню, то он поднимется на самую ее вершину и увидит, кто же управляет Мирозданием. И тогда ему, возможно, удастся вернуть порядок в этот мир. В этом фильме столкнутся силы Добра и Зла, а стрелок Роланд – единственный, кто сможет остановить таинственного Человека в Черном, который планирует разрушить Темную Башню."],
      trailerURL: "https://www.youtube.com/embed/L1PZkSiMcWs",
      ratings: [ [ "8.338", "Оценок: 65" ], [ "6", "Оценок: 4 458" ], [ "5.76", "Оценок: 9 491" ] ],
      imgs: [ "http://sm-im.torrent-filmi.net/im/3901/temnaya-bashnya-8.jpg", "http://sm-im.torrent-filmi.net/im/3901/temnaya-bashnya-7.jpg", "http://sm-im.torrent-filmi.net/im/3901/temnaya-bashnya-6.jpg" ],
      //
      torrents: [ {
        name: "Темная башня (2017) BDRip | Лицензия",
        extra: { 
          translation: "Дублированный | iTunes",
          video: "XviD, 720x304, 23.976 fps, 1749 kbps",
          audio: "AC3, 6 ch, 384 kbps"
        },
        size: "1.42Gb",
        url: "http://torrent-filmi.net/uploads/torrent/2017-10/tvlend.net-temnaya-bashnya-699209.torrent"
      },
      {
        name: "Темная башня (2017) BDRip | Лицензия",
        extra: { 
          translation: "Дублированный | iTunes",
          video: "AVC, 1024x428 (2.40:1), 23.976 fps, 2 394 Kbps (0.228 bit/pixel)",
          audio: [ "AC-3, 48.0 KHz, 6 ch, 384 Kbps, CBR (Russian)", "AC-3, 48.0 KHz, 6 ch, 448 Kbps, CBR (English)" ]
        },
        size: "2.14Gb",
        url: "http://torrent-filmi.net/uploads/torrent/2017-10/tvlend.net-temnaya-bashnya-489258.torrent"
      },
      {
        name: "Темная башня (2017) BDRip | Лицензия",
        extra: { 
          translation: "Дублированный | iTunes",
          video: "XviD, 720x304, 23.976 fps, 1749 kbps",
          audio: "AC3, 6 ch, 384 kbps"
        },
        size: "1.42Gb",
        url: "http://torrent-filmi.net/uploads/torrent/2017-10/tvlend.net-temnaya-bashnya-699209.torrent"
      } ]

    };

  }

  setFilm( film ){

    //  Header

    //    Names

    $( "#title-rus-name" ).html( film.rusName );
    $( "#title-eng-name" ).html( film.engName );

    //    Player

    $( "#player" ).html( this.getTrailerPlayer( film.trailerURL ) );

    //  Middle

    //    Downloader

    film.torrents.forEach( ( torrent ) => {

      var translation = "<b>Перевод: </b>" + torrent.extra.translation;
      var video = "<b>Видео: </b>" + torrent.extra.video;

      if( torrent.extra.audio.length == 0 ){

        var audio = "";

      }else{

        var audio = "<b>Аудио: </b>" + torrent.extra.audio;

      }

      let torrentElement = `
        <div class="torrent">
          <div class="torrent-body">
            <div class="torrent-progress-bar" style="display:none">
              <div class="torrent-progress-bar-rectangle"></div>
            </div>
            <div class="torrent-name">${ torrent.name }</div>
            <div class="torrent-info" style="display:none">
              <div class="torrent-translation">${ translation }</div>
              <div class="torrent-video">${ video }</div>
              <div class="torrent-audio">${ audio }</div>
            </div>
            <div class="torrent-size">${ torrent.size }</div>
          </div>
          <div class="torrent-controller">
            <div class="torrent-others-btn btn-with-img-inside"><img src="resources/icons/system/others.png"></div>
            <div class="torrent-menu" style="display:none">
              <div class="torrent-menu-btn btn-with-img-inside torrent-download-btn"><img src="resources/icons/system/downloads.png"></div>
              <div class="torrent-menu-btn btn-with-img-inside torrent-torrent-btn" style="display:none"><img src="resources/icons/system/torrent.png"></div>
              <div class="torrent-menu-btn btn-with-img-inside torrent-folder-btn" style="display:none"><img src="resources/icons/system/folder.png"></div>
            </div>
          </div>
        </div>`;

      $( "#downloader" ).append( torrentElement );

    } );

    //      Torrent others button

    $( ".torrent-others-btn" ).mouseover( function(){

      let torrentMenu = $( this ).parent().find( ".torrent-menu" );

      torrentMenu.css( "display", "flex" );

      let counter = 0;

      torrentMenu.children().each( function() {

        if( $( this ).css( "display" ) == "flex" ){

          counter += 1;

        }

      } );

      torrentMenu.css( "height", ( counter * 100 ) + "%" );

      torrentMenu.children().css( "height", ( 100 / counter ) + "%" );

    } );

    $( ".torrent-others-btn" ).mouseout( function(){

      $( this ).parent().children( ".torrent-menu" ).css( "display", "none" );

    } );

    //      Torrent menu

    $( ".torrent-menu" ).mouseover( function(){

      $( this ).css( "display", "flex" );

    } );

    $( ".torrent-menu" ).mouseout( function(){

      $( this ).css( "display", "none" );

    } );

    //        Torrent "Download" button

    $( ".torrent-download-btn" ).click( function(){

      $( this ).css( "display", "none" );

      let $torrentBody = $( this ).parent().parent().parent().find( ".torrent-body" );

      $torrentBody.children( ".torrent-name" ).css( "display", "none" );
      $torrentBody.children( ".torrent-info" ).css( "display", "none" );

      $torrentBody.children( ".torrent-progress-bar" ).css( "display", "flex" );
 
    } );

    //        Torrent "Open in torrent" button

    //$( ".torrent-torrent-btn" ).click();

    //        Torrent "Open folder" button

    //$( ".torrent-folder-btn" ).click();

    //      Torrent name / info

    $( ".torrent-name" ).click( function(){

      $( this ).css( "display", "none" );

      $( this ).parent().children( ".torrent-info" ).css( "display", "flex" );

    } );

    $( ".torrent-info").click( function(){

      $( this ).css( "display", "none" );

      $( this ).parent().children( ".torrent-name" ).css( "display", "flex" );

    } );

    //    Middle info

    let ratingsNames = [ "TF.net", "IMDb", "КиноПоиск" ];

    film.ratings.forEach( ( info, id ) => {

      let rating = document.createElement( "div" );
      rating.className = "rating";
      rating.id = "rating-" + ( id + 1); 

      rating.innerHTML = `<div class="rating-name">${ ratingsNames[ id ] }</div>
      <div class="rating-value">${ info[ 0 ] }</div>
      <div class="rating-voted">${ info[ 1 ] }</div>`;

      $( "#middle-info-ratings" ).append( rating );

    } );

    film.imgs.forEach( ( url ) => {

      let img = document.createElement( "img" );
      img.src = url;

      $( "#middle-info-imgs" ).append( img );

    } );

    //  Footer

    //    Footer info

    let $footerInfo = $( "#footer-info" );
    $footerInfo.append( `<div class="footer-info-name">${ film.rusName }</div>` );

    let lineList = [ [ "Слоган", film.tagline ], [ "Год", film.year ], [ "Страна", film.country],
    [ "Режиссёр", film.producer ], [ "Жанр", film.genres ], [ "Актёры", film.actors ],
    [ "Премьера", film.premiere ], [ "Длительность", film.time ], [ "Бюджет", film.budget ],
    [ "Возраст", film.age ] ];
    lineList.forEach( ( list ) => {

      if( list[ 1 ] !== undefined && list[ 1 ].length > 0 ){

        $footerInfo.append( '<div class="footer-info-line"><b>' + list[ 0 ] + ': '  + '</b>' + list[ 1 ] + '</div>' );

      }

    } );

    //    Plot

    film.plot.forEach( ( plotPart ) => {

      $( "#plot" ).html( $( "#plot" ).html() + "<p>" + plotPart + "</p>" );

    } )

    // Sizes

    $footerInfo.height( $( "#plot" ).height() );

  }

  //

  onClickWatchLaterBtn(){

    switch( this.watchLaterBtnState ){

      case true:
        $( "#title-watch-later-btn" ).html( "Добавлено в список" );
        break;

      case false:
        $( "#title-watch-later-btn" ).html( "Посмотреть позже" );
        break;

    }

    this.watchLaterBtnState = this.watchLaterBtnState ? false : true;

  }

  getTrailerPlayer( trailerURL ){

    return( '<iframe width="100%" height="100%" src="' + trailerURL + '" frameborder="0" gesture="media" allowfullscreen></iframe>' );

  }

  createDivWithClass( className ){

    let div = document.createElement( "div" );
    div.className = className;

    return( div );

  }

  updateProgressBar( torrentElement, value ){

    if( value == 100 ){

      let $torrentBody = $( torrentElement ).children( ".torrent-body" );

      $torrentBody.children( ".torrent-progress-bar" ).css( "display", "none" );
      $torrentBody.children( ".torrent-name" ).css( "display", "flex" );

      let $torrentMenu = $( torrentElement ).children( ".torrent-controller" ).children( ".torrent-menu" );

      $torrentMenu.children().css( "display", "flex" );
      $torrentMenu.children().first().css( "display", "none" );

    }else{

      $( torrentElement ).children( ".torrent-body" ).children( ".torrent-progress-bar" ).children().width( value + "%" );

    }

  }

}