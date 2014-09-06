/*! BookSelling - v0.0.1 - 2014-08-21 */

var argv 	= require('optimist').argv,

	path 	= require('path'),

	spawn 	= require('child_process').spawn,

	bs 		= require( "book-selling" ),

	mongod 	= path.join( process.cwd(),  'mongodb' );


console.log( mongod );

	mongod = spawn( mongod + '/server/mongod', '--dbpath ' + mongod + '/db' );

	mongod.stdout.on('data', function (data) 
	{
		console.log('stdout: ' + data);
	});
	
	mongod.stderr.on('data', function (data) 
	{
		console.log('stderr: ' + data);
	});
	
	mongod.on('close', function (code) 
	{
		console.log('child process exited with code ' + code);
	});

bs.server.start( argv.service, argv.port );

