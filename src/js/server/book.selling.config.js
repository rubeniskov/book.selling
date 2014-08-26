(function( $ ){

    var path    = require("path"), 

        root    = process.cwd();

    $.config =
    {
    	dir        : 
    	{
            root    : root,

    		modules : path.join( root, 'modules' )
    	},

        mysql      : 
        {
            host            : '127.0.0.1' || '10.0.0.105',

            user            : 'root',

            password        : '',
            
            database        : 'db_bookselling'
        },

        package     : require( path.join( root, 'package.json' ) );
    }

    console.log( $.config.package );
})( BookSelling );