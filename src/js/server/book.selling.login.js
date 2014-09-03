(function( bs ){

    bs.login =
    ({
        signUp   : function( data, callback )
        {
            var query = bs.mysql.query
            ( 
                "INSERT INTO `tb_users`( `user_email`, `user_password`, `user_name`, `user_surname`, `user_birthdate`, `user_sex`, `user_phone`, `user_address`, `user_cp`, `user_state`, `user_country`) " +
                "VALUES( :user_email, :user_password, :user_name, :user_surname, :user_birthdate, :user_sex, :user_phone, :user_address, :user_cp, :user_state, :user_country )", 
                data
            );
        },
        signIn   : function( credentials )
        {
            var query = bs.mysql.query( "SELECT * FROM tb_users WHERE user_email=:user_email AND user_password=:user_password", credentials );

            console.log( query );
        },
        signOut  : function()
        {

        }
        
    });

})( BookSelling );


