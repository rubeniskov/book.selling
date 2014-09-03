(function( bs ){
    
    var swig        = require('swig'),

        cheerio     = require("cheerio"),

        fs          = require("fs"),

        path        = require("path");

    bs.view         = function( service, view, app, cb )
    {
        if( !service || !view)
            throw bs.debug.error( '[bs.view] -> View Error.' );

        var error,

            includes    = {},

            views       = bs.service.getViews( service, view ),

            html        = path.join( bs.config.dir.root, 'services', service, 'views', view + '.html' ),

            exp         = new RegExp( Object.keys( views || {} ).join( '|' ) );

            if( exp.test( view ) )
            {
                if( fs.existsSync( html ) )
                {
                    html    = bs.module.render( service, swig.renderFile( html, { } ), includes, app );
                }
                else
                {
                    error   = bs.debug.error( '[bs.view] -> View ' + service + '.' + view + ' hasn\'t got index.html, please check if file exists.' );
                }
            }
            else
            {
                error   = bs.debug.error( '[bs.view] -> View ' + service + '.' + view + ' doesn\'t found.' );
            }

        return cb && cb.call ? cb.call( bs, error, html, includes ) : ({ error : error, html : html, includes : includes });
    }
    
})( BookSelling );