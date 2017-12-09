class AppManager{

  initiateApp(){

    this.app = this.electron.app;

    this.path = this.app.getAppPath();
    this.configManager.setConfig( this.path + "/app/data/configs/main.cfg" );

    this.app.on( "ready", () => {

      this.onReady();

    } );

    this.app.on('window-all-closed', function() {

      if ( process.platform != 'darwin' ) {

        this.app.quit();

      }

    });    

  }

  onReady(){

    this.initiateWindow();
    this.initiateIPC();

    this.setPage();

  }

  initiateWindow(){

    const BrowserWindow = this.electron.BrowserWindow;
    const area = this.electron.screen.getPrimaryDisplay().workArea;

    this.window = new BrowserWindow( { width: area.width, height: area.height, frame: false, minWidth: 1024, minHeight:600, title: "Filser" } );
    this.window.setMenu( null );

  }

  initiateIPC(){

    this.ipcMain = this.electron.ipcMain;

    let todoList = [ [ "film-page-request", this.requestManager.filmPage ],
    [ "films-page-request", this.requestManager.filmsPage ],
    [ "downloads-page-request", this.requestManager.downloadsPage ],
    [ "settings-page-request", this.requestManager.settingsPage ],
    [ "set-config-rule", this.configManager.set ],
    [ "close-app", this.app.quit ] ]

    todoList.forEach( ( list, id ) => {

      let maxFilmsOnPage;

      if( id < 4 ){

        list[ 1 ] = list[ 1 ].bind( this.requestManager );

      }else if( id == 4 ){

        list[ 1 ] = list[ 1 ].bind( this.configManager );

      }

      let configManager = this.configManager;

      this.ipcMain.on( list[ 0 ], function( event, data ){

        if( id < 4 ){

          data.event = event;
          data.maxFilmsOnPage = configManager.get( "max-films-on-page" );

        }

        list[ 1 ]( data );

      } );

    } );

    this.ipcMain.on( "minimize-window", () => {

      this.window.minimize();

    } )

    this.ipcMain.on( "maximize-window", () => {

      if( this.window.isMaximized() ){

        this.window.unmaximize();

      }else{

        this.window.maximize();

      }

    } )

  }

  setPage(){

    this.window.loadURL( 'file://' + __dirname + '/../../index.html' );

  }

}

let appManager = new AppManager();
module.exports = appManager;