(function( $ ){
    
    var io          = require('socket.io'),

        und         = require('underscore'),

        service     = $.config.service;

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
            und.each( $.config.services[ service ].modules, function( module, name_module )
            {
                module.events && module.events.length && und.each( module.events, function( event_name )
                {
                    socket.once( 'module-' + name_module + '.' + event_name , function( data )
                    {
                        var module = $.module( service, name_module ),

                            script = module.script,

                            events = script.events;

                            events[ event_name ] && events[ event_name ].call( this, data );
                    });
                });
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