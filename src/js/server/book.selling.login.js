(function(bs) {

    bs.login =
    ({
        signUp   : function( data, callback )
        {
            var query = bs.mysql.query
            ( 
                "INSERT INTO `tb_users`( `user_email`, `user_password`, `user_name`, `user_surname`, `user_birthdate`, `user_sex`, `user_phone`, `user_address`, `user_cp`, `user_state`, `user_country`) " +
                "VALUES( :user_email,  MD5(:user_password), :user_name, :user_surname, :user_birthdate, :user_sex, :user_phone, :user_address, :user_cp, :user_state, :user_country )", 
                data
            );

            console.log( query );
        },
        signIn   : function( credentials )
        {
            var query   = bs.mysql.query( "SELECT user_id, user_email, user_name, user_surname, user_birthdate, user_sex, user_phone, user_address, user_cp, user_state, user_country FROM tb_users WHERE user_email=:user_email AND user_password=:user_password", credentials );

            return query.error ? false : query.result[ 0 ];
        }
    });

})(BookSelling);
