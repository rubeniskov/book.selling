(function( bs ){
    
    var io          = require('socket.io'),

        und         = require('underscore'),

        service     = bs.config.service;

    bs.socket        = function( server )
    {
        var sevent;

        io( server ).on('connection', function( socket )
        {
            und.each( bs.config.services[ service ].modules, function( module, name_module )
            {
                module.events && module.events.length && und.each( module.events, function( event_name )
                {
                    socket.on( 'module-' + name_module + '.' + event_name , function( data )
                    {
                        var module = bs.module( service, name_module ),

                            script = module.script,

                            events = script.events;

                            events[ event_name ] && events[ event_name ].call( this, data );
                    });
                });
            });
        });
    }

})( BookSelling );