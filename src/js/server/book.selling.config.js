(function( bs ){

    var path    = require("path"),

        root    = process.cwd(),

        pkg     = require( path.join( root,  "package.json" ) );

        is_win  = /^win/.test( process.platform );

    bs.config =
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

            password        : is_win ? 'root' : '',
            
            database        : 'db_bookselling'
        },

        service     : 'site',

        services    : pkg.services
    }


})( BookSelling );