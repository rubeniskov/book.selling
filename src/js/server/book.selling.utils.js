(function( bs ){
    
    var crypto  = require('crypto'),

        parse   = require('url').parse,

        fs      = require('fs'),

        twig    = require('twig').twig;

    bs.utils = 
    ({
        merge   : function(a, b)
        {
          if (a && b) {
            for (var key in b) {
              a[key] = b[key];
            }
          }
          return a;
        },
        
        uid     : function(len) 
        {
          return crypto.randomBytes(Math.ceil(len * 3 / 4))
            .toString('base64')
            .slice(0, len);
        },
        
        pause     : require('pause'),
        
        template  : function( path, data )
        {
            var html = 'Template error: ' + path;

            if( fs.existsSync( path ) && ( html = fs.readFileSync( path, "binary" ) ) )
                html = twig({ data : html }).render(data);

            return html;
        }
    });    
    
})( BookSelling );