//contentful js
/*function load_accordion() {
    var deferred = $.Deferred();
 
    $.ajax({
        url: "https://cdn.contentful.com/spaces/7gi7vlzlqchz/entries?content_type=accordion",
        headers: {"Authorization": "Bearer 50947fbd2ca8e8538b77db100058cf4cee3d4550f6e915e1522fa0e01ffadf77"}
    })
    .done(function( data ) {
        console.log( "Data Loaded: " + data.items.length );
        data.items.map(function(item) {
            //console.log(item.fields.title);
            $('ul[data-module="accordion"]').append(
                $('<li>').append(
                    $('<div>').attr('class','accordion-drawer')
                    .append(
                        $('<a>').attr('href','#').attr('class','header')
                        .append(
                            $('<span>').attr('class', 'sr-only').attr('id','tooltip').append("Click to expand")
                        )
                        .append(item.fields.title)
                    )
                    .append(
                        $('<div>').attr('class','content-block').attr('display', 'none')
                        .append(item.fields.content)
                    )
                )
            )
 
        });
        deferred.resolve();
    });
 
    return deferred.promise();
}*/

function load_carousel() {
    var deferred = $.Deferred();

    $.ajax({
        url: "https://cdn.contentful.com/spaces/7gi7vlzlqchz/entries?content_type=carousel",
        headers: {"Authorization": "Bearer 50947fbd2ca8e8538b77db100058cf4cee3d4550f6e915e1522fa0e01ffadf77"}
    })
    .done(function( data ) {
        console.log( "Data Loaded: " + data.items.length );
        data.items.map(function(item, index) {
            //console.log(item.fields.title);
            $(".carousel-inner").append(
                $('<div>').attr('class',
                'item' 
                + (index === 0 ? ' active': '') 
                + (index === (data.items.length - 1) ? ' yes': ''))
                .append(
                    $('<div>')
                    .attr('class','fill')
                    .attr('style','background-image:url(' + item.fields.imageUrl + ')')
                )
                    .append(
                        $('<div>').attr('class','carousel-caption')
                        .append(
                            $('<a>').attr('href', item.fields.linkTarget)
                            .append(
                                $('<h2>').append(
                                    $('<span>').append(
                                        item.fields.title
                                    )
                                )
                            )
                            .append(
                                $('<p>').append(
                                    item.fields.description
                                )
                            )
                        )
                    )
                    
                )
 
        });

        $(".carousel-inner div").last().css("class", "yes");
        deferred.resolve();
    });
 
    return deferred.promise();

}

function load_group_promo() {
    var deferred = $.Deferred();
 
    $.ajax({
        url: "https://cdn.contentful.com/spaces/7gi7vlzlqchz/entries?content_type=groupPromo",
        headers: {"Authorization": "Bearer 50947fbd2ca8e8538b77db100058cf4cee3d4550f6e915e1522fa0e01ffadf77"}
    })
    .done(function( data ) {
        console.log( "Data Loaded: " + data.items.length );
        data.items.map(function(item) {
            //console.log(item.fields.title);
            $('ul.promo-group').append(
                $('<li>').attr('class','equal-item').append(
                    $('<a>').attr('href',item.fields.url)
                    .append(
                    $('<img>').attr('src', 'sr-only'))
                    
                    .append(
                        $('<h3>').append(item.fields.title)
                    )
                    .append(
                        $('<p>').append(item.fields.description)
                    )
                )
            )
 
        });
        deferred.resolve();
    });
 
    return deferred.promise();
}
 
$(function() {
    load_accordion().then(function() {
        LCC.modules.start($("#accordion-contentful"), true);
    });

    load_carousel().then(function() {
        LCC.modules.start($("#myCarousel"), true);
    });

    load_group_promo().then(function() {
        LCC.EqualHeights.applyEqualHeights();
    })
});