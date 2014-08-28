module.exports = function( $ )
{
	return ({

		__render : function()
		{
			var query	= $.mysql.query( "SELECT count(*) FROM tb_books" );
			

			if( query.error )
			{
				return false;
			}

			return { books : query.result[ 0 ]};
			console.log(books)
		}
		
	})
};