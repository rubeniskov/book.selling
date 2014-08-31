(function( $ ){

    var path    = require("path"),

        root    = process.cwd(),

        pkg     = require( path.join( root,  "package.json" ) );

    $.config =
    {
    	dir        : 
    	{
            root    : root,

    		modules : path.join( root, 'modules' )
    	},

        view        : 'site',

        mysql      : 
        {
            host            : '127.0.0.1' || '10.0.0.105',

            user            : 'root',

            password        : '',
            
            database        : 'db_bookselling'
        },

        service      : 'admin',

        services     : pkg.services

    }


})( BookSelling );