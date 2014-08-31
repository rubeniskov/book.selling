module.exports = function( $ )
{
	return ({

		__render : function()
		{
			var query 	= $.mysql.query( "SELECT * FROM tb_books" );

			SELECT * FROM db_bookselling.tb_books_uploaded;

			if( query.error )
			{
				return false;
			}

			return { books : query.result };
		}
	})
};