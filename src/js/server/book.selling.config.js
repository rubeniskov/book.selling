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

        mysql      : 
        {
            host            : '127.0.0.1',

            user            : 'root',

            password        : is_win ? 'root' : '',
            
            database        : 'db_bookselling'
        },

        mongodb    : 
        {
            host            : '127.0.0.1',

            port            : 27017,
            
            database        : 'db_bookselling'
        },

        service     : 'site',

        services    : pkg.services,

        resources   : pkg.resources,

        user        :
        {
            signed          : true,

            user_email      : 'jal198j@gmail.com',

            user_password   : '81dc9bdb52d04dc20036dbd8313ed055'
        }
    }


})( BookSelling );