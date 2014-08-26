(function( $ ){

    $.login =
    ({
        signUp   : function( data, callback )
        {
            $.mysql.query
            ( 
                "INSERT INTO `tb_users`( `user_email`, `user_password`, `user_name`, `user_surname`, `user_birthdate`, `user_sex`, `user_phone`, `user_address`, `user_cp`, `user_state`, `user_country`) " +
                "VALUES( :user_email, :user_password, :user_name, :user_surname, :user_birthdate, :user_sex, :user_phone, :user_address, :user_cp, :user_state, :user_country )", 
                data,
                function( err, result ) 
            {
                callback( err );
                console.log( arguments );
                //console.log( 'Usuario registrado [' + result.insertId + ']' );
            });
        },
        signIn   : function()
        {
            //server.listen(parseInt(port, 10));
        },
        signOut  : function()
        {

        }
        
    });

})( BookSelling );


