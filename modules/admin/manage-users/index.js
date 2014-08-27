module.exports = function( $ )
{
	return ({

		__render : function()
		{
			var query 	= $.mysql.query( "SELECT * FROM tb_users" );

			if( query.error )
			{
				return false;
			}

			return { users : query.result };
			console.log(users);
		}
	})
};