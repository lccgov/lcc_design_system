(function( $ ) {
    
    // Create session storage for removing cancelled alerts
    function alerts() {
        var alertNumber = $(this).attr('data-alert'),
            alertsObj = new Object();

        alertsObj.seen = alertNumber;

        if( sessionStorage.alerts ) {
            alerts = JSON.parse(sessionStorage.getItem('alerts'));
        } else {
            alerts = [];
        }
        alerts.push(alertsObj);
        sessionStorage.setItem('alerts', JSON.stringify(alerts));

        var retrieveObject = sessionStorage.getItem('alerts');
        
        // Debug
        // console.log(alerts);
        // console.log('retrievedObject', JSON.parse(retrieveObject));

    }
    $('.alert').on('click', '.close', alerts );

    // Remove alerts that have been cancelled
    if( sessionStorage.alerts ) {
        var retrieveObject = sessionStorage.getItem('alerts'),
            data = JSON.parse(retrieveObject);
        
        $.each(data, function(i, item) {

            // Debug
            // console.log(item.seen);

            $('html').find('button[data-alert="'+item.seen+'"]').closest('.alert').remove();
        });        
    }

})( jQuery );