let appManager = require( "./app/scripts/app/appManager" );
appManager.fs = require( "fs" );
appManager.electron = require( "electron" );
appManager.events = require( "events" );

appManager.configManager = require( "./app/scripts/app/configManager" );
appManager.configManager.fs = appManager.fs;

appManager.requestManager = require( "./app/scripts/app/requestManager" );
appManager.requestManager.fs = appManager.fs;
appManager.requestManager.needle = require( "needle" );
appManager.requestManager.cheerio = require( "cheerio" );

appManager.initiateApp();