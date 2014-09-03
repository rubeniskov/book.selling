/*! BookSelling - v0.0.1 - 2014-08-21 */

var argv 	= require('optimist').argv,

	bs 		= require( "book-selling" );

bs.server.start( argv.service, argv.port );
