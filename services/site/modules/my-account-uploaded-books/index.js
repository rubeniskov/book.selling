module.exports = function(bs) {
    return ({
        __ready: function($) 
        {

            $('#book-image').on('change', function(e)
            {
                var file    = e.originalEvent.target.files[0],

                    reader  = new FileReader();
                
                reader.onload = function(evt)
                {
                    $('#imageSelected').attr('src', evt.target.result);

                    $('#selectedImageConainer').css('display', '');

                    var phoneNum = $('#phoneNumber').val();
                    var jsonObject = 
                    {
                        'imageData': evt.target.result,
                        'imageMetaData': phoneNum
                    }
 
                    // send a custom socket message to server
                    //socket.emit('book-image', jsonObject);

                    console.log( jsonObject )
                };
                
                reader.readAsDataURL( file );
      });
        },
        events: 
        ({
            'upload-book': function() 
            {
                bs.login.uploadBook( book_data );
            }

        })
    })

};
