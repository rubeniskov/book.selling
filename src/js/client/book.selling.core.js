(function( $ )
{
	$.socket 					= io.connect();

	$.use 						= function( name, fn )
	{
		var core 	= function( selector )
		{
			return $( selector, '.' + name );
		}

		core.socket 		= function()
		{

		}

		core.socket.on 		= function( )
		{
			arguments[ 0 ] 	= name + '.' + arguments[ 0 ];

			$.socket.on.apply( $.socket, arguments );
		}

		core.socket.emit 	= function()
		{
			arguments[ 0 ] 	= name + '.' + arguments[ 0 ];

			$.socket.emit.apply( $.socket, arguments );
		}

		$( document.body ).ready( function()
		{
			fn.call( window, core );
		});
	}

	$.fn.serializeObject 		= function()
	{
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};

	$.fn.getPath 				= function () 
	{

	    if (this.length != 1) throw 'Requires one element.';

	    var path, node = this;

	    while ( node.length ) 
	    {
	        var realNode = node[0], name = realNode.localName;
	        if (!name) break;
	        name = name.toLowerCase();

	        var parent = node.parent();

	        var siblings = parent.children(name);
	        if (siblings.length > 1) 
	        { 
	            name += ':eq(' + siblings.index(realNode) + ')';
	        }

	        path = name + (path ? '>' + path : '');
	        node = parent;
	    }

	    return path;
	};
	
})( jQuery );