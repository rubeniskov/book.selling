module.exports = function( bs ) {
    return ({
        __render: function(app) 
        {
            
        },
        __ready: function( $ )
        {
            return false;
            $( 'a:regex(href, ^\\?)' ).attr('href', function(i, v)
            {
                return window.location.href + ( v.replace( '?', '&' ) );
            });
        }
    })
};
