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

        services    : pkg.services,

        user        :
        {
            signed          : true,

            user_email      : 'jal198j@gmail.com',

            user_password   : '81dc9bdb52d04dc20036dbd8313ed055'
        }
    }


})( BookSelling );