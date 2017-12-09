class ConfigManager{

  constructor(){

    this.configPath, this.loadedConfig = null;

  }

  setConfig( path ){

    this.configPath = path;
    this.loadConfigFromFile();

  }

  loadConfigFromFile(){

    this.loadedConfig = JSON.parse( this.fs.readFileSync( this.configPath, "utf-8" ) );

  }

  loadConfigToFile(){

    this.fs.writeFileSync( this.configPath, JSON.stringify( this.loadedConfig ) );

  }

  set( key, value ){

    this.loadedConfig[ key ] = value;

    this.loadConfigToFile()

  }

  get( key ){

    return( this.loadedConfig[ key ] );

  }

}

let configManager = new ConfigManager();
module.exports = configManager;