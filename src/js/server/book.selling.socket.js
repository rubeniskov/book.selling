(function( $ ){
    
    var io          = require('socket.io');

    $.socket        = function( server )
    {
        var sevent;

        io( server ).on('connection', function( socket )
        {
            socket.on( 'exec', function( args )
            {
                console.log( 'Getting event ' + args.module + ' - ' + args.cmd );   

                var module = $.module.getScript( args.module );
               
                if( module.events  && ( sevent = module.events[ args.cmd ] ))
                    sevent.call( this, args.params );
            });
        });
    }

})( BookSelling );