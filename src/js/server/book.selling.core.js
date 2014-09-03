(function( global ){

    var bs 					= 

    	module.exports 		= 

    	global.BookSelling 	= function()
    {

    };
    
    bs.extend 				= function( target, source ) 
    {
  		target = target || {};

		for ( var prop in source ) 
		{
			if (typeof source[prop] === 'object') 
			{
				target[prop] = bs.extend(target[prop], source[prop]);
			} else 
			{
				target[prop] = source[prop];
			}
		}

		return target;
	}

	bs.debug 				= function()
	{

	}

	bs.debug.error 			= function( message )
	{
		return new Error( message );
	}

})( global );