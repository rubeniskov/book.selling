module.exports = function( bs )
{
	return ({
		__render : function()
		{


			return ({});
		},
		__ready : function( $ )
		{
			$( '#form-contact-message' ).submit(function(e)
			{
				e.preventDefault();

				$.socket.emit( 'send-message', $( this ).serializeObject() );	
			})
			
		},
		events : 
		({
			'send-message': function( json_contact ) 
            {
                console.log(json_contact);

                var query = bs.mysql.query
	            ( 
	                "INSERT INTO `tb_contact`( `contact_name`, `contact_surname`, `contact_email`, `contact_message`) " +
	                "VALUES( :contact_name, :contact_surname, :contact_email, :contact_message )", 
	                json_contact
	            );
            }
		})
	})
	
};