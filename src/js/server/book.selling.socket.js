(function( $ ){
    
    var io          = require('socket.io'),

        und         = require('underscore'),

        service     = 'site';

        //onevent     = io.Socket.prototype.onevent;

        /*io.Socket.prototype.onevent = function()
        {
            //this.emit( '' );

            console.log( arguments );

            onevent.apply( this, arguments );
        };*/

    $.socket        = function( server )
    {
        var sevent;

        io( server ).on('connection', function( socket )
        {
            /*socket.on( 'ready', function( args )
            {
                console.log(arguments);
            });*/

            und( $.config.services[ 'site' ].modules, function( name )
            {
                console.log( name );
            });
            
            socket.on( 'module.ready', function( name )
            {
                var module = $.module( service, name.replace( 'module-', '' ) );
                
                console.log( module );
            });

            return;

            var fn = function( args )
            {
                console.log( arg );
                //console.log( arguments );
                /*console.log( 'Getting event ' + args.module + ' - ' + args.cmd );   

                var module = $.module.getScript( args.module );
               
                if( module.events  && ( sevent = module.events[ args.cmd ] ))
                    sevent.call( this, args.params );*/
            }

            
            
            socket.on( 'event', function( args )
            {
                console.log(arguments);
            });   

             socket.on( 'message', function( args )
            {
                console.log(arguments);
            });   

            socket.on( 'module-header.exec', function( args )
            {
                //console.log( arguments );
                /*console.log( 'Getting event ' + args.module + ' - ' + args.cmd );   

                var module = $.module.getScript( args.module );
               
                if( module.events  && ( sevent = module.events[ args.cmd ] ))
                    sevent.call( this, args.params );*/
            });
        });
    }

})( BookSelling );