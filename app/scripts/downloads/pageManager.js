'use strict'

class PageManager{

  constructor(){

    this.testTorrent = {

      state: "loading", // loading, finished
      progress: "10", // 0-100 ( % )
      extra: {

        name: "Темная башня (2017) BDRip | Лицензия",
        size: "1.42Gb",
        url: "http://torrent-filmi.net/uploads/torrent/2017-10/tvlend.net-temnaya-bashnya-699209.torrent",
        translation: "Дублированный | iTunes",
        video: "XviD, 720x304, 23.976 fps, 1749 kbps",
        audio: "AC3, 6 ch, 384 kbps"

      }

    };

    this.testTorrent2 = {

      state: "finished", // loading, finished
      progress: "100", // 0-100 ( % )
      extra: {

        name: "Темная башня (2017) BDRip | Лицензия",
        size: "2.14Gb",
        url: "http://torrent-filmi.net/uploads/torrent/2017-10/tvlend.net-temnaya-bashnya-489258.torrent",
        translation: "Дублированный | iTunes",
        video: "AVC, 1024x428 (2.40:1), 23.976 fps, 2 394 Kbps (0.228 bit/pixel)",
        audio: [ "AC-3, 48.0 KHz, 6 ch, 384 Kbps, CBR (Russian)", "AC-3, 48.0 KHz, 6 ch, 448 Kbps, CBR (English)" ]

      }

    };

  }

  addTorrent( torrent ){

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
            <div class="torrent-name">${ torrent.extra.name }</div>
            <div class="torrent-info" style="display:none">
              <div class="torrent-translation">${ translation }</div>
              <div class="torrent-video">${ video }</div>
              <div class="torrent-audio">${ audio }</div>
            </div>
            <div class="torrent-size">${ torrent.extra.size }</div>
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

    $( "#main" ).append( torrentElement );

  }

  torrentsOnAdded(){

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

    $( ".torrent-torrent-btn" ).click();

    //        Torrent "Open folder" button

    $( ".torrent-folder-btn" ).click();

    //      Torrent name / info

    $( ".torrent-name" ).click( function(){

      $( this ).css( "display", "none" );

      $( this ).parent().children( ".torrent-info" ).css( "display", "flex" );

    } );

    $( ".torrent-info").click( function(){

      $( this ).css( "display", "none" );

      $( this ).parent().children( ".torrent-name" ).css( "display", "flex" );

    } );

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

  //

  createDivWithClass( className ){

    let div = document.createElement( "div" );
    div.className = className;

    return( div );

  }

}