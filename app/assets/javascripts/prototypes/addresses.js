(function( $ ) {
    $('.address--edit').on('click', function() {
        $(this).closest('form').removeClass('disabledInput');
        $(this).closest('form').find('input').removeAttr('disabled');
        $(this).html('Save');
    });
})( jQuery );