module.exports = function($) {
    return ({
        __render: function() {
            var query = $.mysql.query("SELECT * FROM v_books_available limit 0,8");

            if (query.error) {
                return false;
            }

            return ({
                carousel: query.result,
            });
        },
        __ready: function($) {
            var recent = $("#owl-recent");

            recent.owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items: 4,
                mouseDrag: false,
                pagination: false
            });

            $(".next").click(function() {
                recent.trigger('owl.next');
            })

            $(".prev").click(function() {
                recent.trigger('owl.prev');
            })

        }
    })

};
