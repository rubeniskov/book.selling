(function( bs ){
    
    var io          = require('socket.io'),

        und         = require('underscore'),

        service     = bs.config.service;

    bs.socket        = function( server, session )
    {
        var sevent;

        io( server ).on('connection', function( socket )
        {
            session( socket.request, socket.request.res, function()
            {
                socket.request.session.socket = socket;
                
                und.each( bs.config.services[ service ].modules, function( module, name_module )
                {
                    module.events && module.events.length && und.each( module.events, function( event_name )
                    {
                        socket.on( 'module-' + name_module + '.' + event_name , function( data )
                        {
                            var module = bs.module( service, name_module, 
                                { 
                                    session     : socket.request.session, 

                                    request     : socket.request, 

                                    response    : socket.request.res, 

                                    next        : function()
                                    {
                                        console.log( 'Socket hasn\'t got next statement' );
                                    }
                                }),

                                script = module.script,

                                events = script.events;

                                events[ event_name ] && events[ event_name ].call( this, data );
                        });
                    });
                });
            })
        });
    } 

})( BookSelling );