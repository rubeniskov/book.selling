/*! BookSelling - v0.0.1 - 2014-08-21 */

var argv 	= require('optimist').argv,

	path 	= require('path'),

	exec 	= require('child_process').exec,

	bs 		= require( "book-selling" ),

	mongod 	= path.join( process.cwd(),  'mongodb' );

	mongod 	= exec( mongod + '/server/mongod' + ' --dbpath ' + mongod + '/db' );

	mongod.stdout.on('data', function (data) 
	{	
		data = data.match( /(.+)\s\[(\w+)\]\s(.*)/ );
		
		switch( data[ 2 ] )
		{
			case 'initandlisten':
			case 'clientcursormon':
				console.info( 'MongoDB Server: ' + data[ 3 ] );
			break;
			case 'signalProcessingThread':
				console.warn( 'MongoDB Server: ' + data[ 3 ] );
			break;
		}
	});
	
	mongod.stderr.on('data', function (data) 
	{
		//console.log('stderr: ' + data);
	});
	
	mongod.on('close', function (code) 
	{
		console.warn('child process exited with code ' + code);
	});

bs.mysql.start();

bs.server.start( argv.service, argv.port );

process.on('exit', function(code) 
{
	
});

process.on('SIGINT', function() 
{
	console.warn( '\n\n\nDeteniendo servicios\n\n' );

	bs.server.stop();

	bs.mysql.stop();

  	setTimeout( function()
  	{
  		process.exit();
  	},1000)
});

//console.log( bs.session.store );

