(function( bs ){
    
    var io          = require('socket.io'),

        und         = require('underscore');

    bs.socket       = function( server, session )
    {
        var sevent;

        console.info( 'Iniciando Socket.io' );

        io( server ).on('connection', function( socket )
        {
            session( socket.request, socket.request.res, function()
            {
                socket.request.session.socket = socket;
                
                und.each( bs.config.services[ bs.config.service ].modules, function( module, name_module )
                {
                    module.events && module.events.length && und.each( module.events, function( event_name )
                    {
                        //console.info( 'Setting Up Event ['+socket.request.cookies.get('ssid')+'] ' + bs.config.service, name_module +'.'+ event_name );

                        socket.on( 'module-' + name_module + '.' + event_name , function( data )
                        {
                            var module = bs.module( bs.config.service, name_module, 
                                { 
                                    session     : socket.request.session, 

                                    request     : socket.request, 

                                    response    : socket.request.res, 

                                    next        : function()
                                    {
                                        console.log( 'Socket hasn\'t got next statement' );
                                    }
                                }),

                                emit            = this.emit,

                                script          = module.script,

                                events          = script.events;

                                this.session    = socket.request.session

                                this.emit       = function()
                                {
                                    arguments[ 0 ]  = 'module-' + name_module + '.' + arguments[ 0 ];

                                    return emit.apply( this, arguments );
                                }

                                events[ event_name ] && events[ event_name ].call( this, data );

                                this.emit       = emit;
                        });
                    });
                });
            })
        });
    } 

})( BookSelling );