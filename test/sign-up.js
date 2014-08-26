$.each
({ 
	user_email: 'j@gmail.com',
	user_password: '123456',
	user_name: 'Jorge',
	user_surname: 'Alonso',
	user_birthdate: '1988-07-24',
	user_sex: '1',
	user_phone: '123456789',
	user_address: 'C/andevalo',
	user_cp: '28053',
	user_state: 'Madrid',
	user_country: 'Espaa'
}, function( key, value )
{
	$('#form-sign-up').find( '[name=' + key + ']' ).val( value );
});