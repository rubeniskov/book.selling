module.exports = function( $ )
{
	return ({
		__render : function()
		{


			return ({});
		},
        __ready: function( $ )
        {
            $( 'li[rel]' ).each(function()
            {
                ( new RegExp( $(this).attr( 'rel' ) ) ).test( window.location.href ) && $(this).addClass( 'active' );
            })
        }
	})
	
};