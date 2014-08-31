(function( $ ){
    
    var io          = require('socket.io');

        //onevent     = io.Socket.prototype.onevent;

        /*io.Socket.prototype.onevent = function()
        {
            //this.emit( '' );

            console.log( arguments );

            onevent.apply( this, arguments );
        };*/

    $.socket        = function( server )
    {
        return false;
        var sevent;

        io( server ).on('connection', function( socket )
        {
            und.each( $.config.services[ 'site' ].modules, function( module, name_module )
            {
<<<<<<< HEAD
                module.events && module.events.length && und.each( module.events, function( event_name )
                {
                    console.log( event_name, name_module + '.' + event_name );
                    
                    socket.on( name_module + '.' + event_name , function()
                    {
                        var module = $.module( service, name_module ),

                            script = module.script,

                            events = script.events;

                            events[ event_name ] && events[ event_name ].call(); 

                            console.log( arguments );
                    });
                });
            });
            
            /*socket.on( 'module.ready', function( name )
            {
                var module = $.module( service, name.replace( 'module-', '' ) );
                
                console.log( module );
            });*/

            return;
=======
                console.log(arguments);
            });*/ 
>>>>>>> FETCH_HEAD

            var fn = function( args )
            {
                console.log( arg );
                //console.log( arguments );
                /*console.log( 'Getting event ' + args.module + ' - ' + args.cmd );   

                var module = $.module.getScript( args.module );
               
                if( module.events  && ( sevent = module.events[ args.cmd ] ))
                    sevent.call( this, args.params );*/
            }

            socket.on()
            return;
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