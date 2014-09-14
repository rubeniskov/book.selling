module.exports = function($) {
    return ({
        __render: function() {
            var query = $.mysql.query("SELECT * FROM tb_users");

            if (query.error) {
                return false;
            }

            return {
                users: query.result
            };
            console.log(users);
        },
        __ready: function($) {

           

            $('[data-item-cmd]').click(function()
            {
                var btn    = $( this );

                $.socket.emit( btn.attr( 'data-item-cmd' ),btn.attr( 'data-item-id' ) );

                $.refresh();
            });
        },
        events: ({
            'remove-item': function( user_id ) 
            {
                var query = $.mysql.query( "DELETE FROM db_bookselling.tb_users WHERE user_id=" + user_id );
                
            }

        })
    })

};
