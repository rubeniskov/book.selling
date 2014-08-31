module.exports = function( $ )
{
	return ({

		__render : function()
		{
			var query 	= $.mysql.query( "SELECT * FROM db_bookselling.tb_purchases" );
			//var query2 	= $.mysql.query( "SELECT * FROM db_bookselling.tb_books_purchased;" );

			if( query.error )
			{
				return false;
			}

			return ({ 

					purchases:query.result

					});
		}
	})
};