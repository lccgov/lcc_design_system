(function( $ ) {

    var inputs = $('.inputfile'),
        fileIndex = 0;

    inputs.each( function(index) {

        var parent = $(this).parent();

        fileIndex++;

// Setting unique identifiers
    
    parent.find('.files__remove').attr('data-index', 'fileIndex-'+fileIndex);
    parent.find('input[type="file"]').attr('data-index', 'fileIndex-'+fileIndex);

// On change
        $(this).eq(index).on('change', function() {
            console.log('some change');

            var filename = '',
                label = $(this).next('label');

            parent.find('.files__toUpload, .files').removeClass('active');

            // If more than one file being uploaded
            if( this.files && this.files.length > 1 ) {

                // Change text with files count
                filename = (this.getAttribute('data-multiple-caption') || '').replace( '{count}', this.files.length );
                label.find('span:nth-of-type(2)').html(filename);

                // Compile list of filenames
                var files = [];
                for(var i = 0; i < this.files.length; i++) {
                    $('<li>'+this.files[i].name+'</li>').appendTo(parent.find('.files__toUpload ul'));
                }

                // Show remove button and files being uploaded
                parent.find('.files__toUpload, .files').addClass('active');

            // Single file
            } else {

                filename = $(this).val().replace(/.*(\/|\\)/, '');

                // Show remove button only
                parent.find('.files').addClass('active');

            }

            // change html to reflect files
            label.find('span:nth-of-type(2)').html(filename);
        });
    
// Clearing files        
    $('.files__remove').click(function() {
        var clear = $(this).attr('data-index');
        console.log(clear);
        $('input[type="file"][data-index="'+clear+'"]').val('');

        console.log(this.files);

        parent.find('.form-label--file span:nth-of-type(2)').html('');
        parent.find('.files__toUpload, .files').removeClass('active');
        $('.files__toUpload').empty();

    });

    });


    // var pullfiles=function(){ 
    //     var fileInput = document.querySelector("#file-input"),
    //         files = fileInput.files,
    //         fl = files.length,
    //         i = 0;
    
    //     $('.files__toUpload').empty();

    //     while ( i < fl) {
    //         // localize file var in the loop
    //         var file = files[i];
    //         console.log(file.name);
    //         $('<p>'+file.name+'</p>').appendTo('.files__toUpload');
    //         i++;
    //     }    
    // }
    
    // // set the input element onchange to call pullfiles
    // document.querySelector("#file-input").onchange=pullfiles;

    // // clear files in upload area
    // var fileIndex = 0;
    // $('input[type="file"]').each(function() {
    //     fileIndex++;
    //     $(this).wrap('<div id="fileIndex-'+fileIndex+'"></div>');
        
    //     $(this).after('<div class="files__toUpload"></div>');
    //     $(this).after('<input type="button" value="Remove files" class="fileIndex-'+fileIndex+'" />');
    // });

    // $('input[value="Remove files"]').click(function() {
    //     var clear = $(this).attr('class');
        
    //     $('#'+clear+' input[type="file"]').val('');

    //     $('.files__toUpload').empty();
    // });

})( jQuery );