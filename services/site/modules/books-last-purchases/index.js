module.exports = function( $ )
{
	return ({
		__render : function()
		{
			var query	= $.mysql.query( "SELECT * FROM v_books_purchased_new" );
	
			if( query.error )
			{
				return false;
			}

			return ({ 
				purchase_last: query.result
			});
		}
	})
	
};