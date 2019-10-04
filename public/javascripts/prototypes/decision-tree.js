(function( $ ) {
    var settings;
    var currentCard;
    var prevCard = [];
    
    // Plugin definition.
    $.fn.decisionTree = function( options ) {
        var elem = $( this );
        settings = $.extend( {}, $.fn.decisionTree.defaults, options );
        
        elem.addClass(settings.containerClass);
        renderRecursive(settings.data, elem, "dctree-first");
        
        $('.dctree-prev').on('click', function() {
            showCard(prevCard.pop(), true);
        });

        currentCard = $('#dctree-first');
        currentCard.show();
    };
    
    
    $.fn.decisionTree.defaults = {
        data: null,
        animationSpeed: "slow",
        animation: "fade",
        containerClass: "lcc-tree",
        cardClass: "lcc-tree-card",
        messageClass: "lcc-tree-card-content"
    };
    
    function renderRecursive(data, elem, id) {
        var container = $('<div></div>')
            .addClass(settings.cardClass);
        var message = $('<div></div>').addClass(settings.messageClass).append(data.message);
        container.append(message);
        
        if (id != null) {
            container.attr('id', id)
        }
        
        if (typeof data.decisions != "undefined") {
            var decisions = $('<div></div>').addClass('lcc-tree-card-actions');
            for(var i=0; data.decisions.length > i; i++) {
                var decision = data.decisions[i];
                var genId = guid();
                var grid = $('<div></div>');
                var answer = $('<button class="test"></button>')
                    .addClass("btn btn-primary dctree-answer-" + i)
                    .append(decision.answer)
                    .on('click', function() {
                        getNextCard(this);
                    })
                    .attr('data-dctree-targetid', genId);
                if (typeof decision.class != "undefined") {
                    answer.addClass(decision.class);
                }
                grid.append(answer);
                decisions.append(grid);
                renderRecursive(decision, elem, genId);
            }
            container.append(decisions);
        }
        
            
        if (id != 'dctree-first') {
            var controls = $('<div></div>').addClass('lcc-tree-controls');
            controls.append($('<a href="javascript:;" class="dctree-prev">Back</a>'));
            container.append(controls);
        }
        
        elem.append(container);
    }
    
    function getNextCard(elem)
    {
        var e = $(elem);
        currentCard = e.parents('.' + settings.cardClass)[0];
        prevCard.push(currentCard.id);
        var nextCard = e.attr('data-dctree-targetid');    
        showCard(nextCard);
    }
    
    function showCard(id, backward)
    {
        var nextCard = $("#" + id);
        
        if (settings.animation == 'slide') {
            $(currentCard).slideUp(settings.animationSpeed, function(){
                nextCard.slideDown(settings.animationSpeed);
            });
        } else if (settings.animation == 'fade') {
            $(currentCard).fadeOut(settings.animationSpeed, function(){
                nextCard.fadeIn(settings.animationSpeed);
            });
        } else if (settings.animation == 'slide-left') {
            var left = {left: "-100%"};
            var card = $(currentCard);

            if (backward) {
                left = {left: "100%"};
            }
            card.animate(left, settings.animationSpeed, function(){
                card.hide();
            });

            if (nextCard.css('left') == "-100%" || nextCard.css('left') == "100%") {
                left.left = 0;
                nextCard.show().animate(left, settings.animationSpeed);
            } else {
                nextCard.fadeIn(settings.animationSpeed);
            }
        }
        
        currentCard = nextCard;
    }
    
    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }
 
// End of closure.
 
})( jQuery );

// Council tax - Changes to circumstances

var data = {
    message: '<h3>What type of a change do you want to tell us about?</h3>',
    decisions: [
        {
            answer: 'Address',
            message: '<h3>Are you a student?</h3>',
            decisions: [                
                {
                    answer: 'Yes',
                    message: '<h3>Changes to your student status</h3><p>Tell us about <a href="/council-tax/discounts-and-exemptions/students">changes to your student status</a>.</p>',                                
                },
                {
                    answer: 'No',
                    message: '<h3>Do you recieve benefits?</h3>',   
                    decisions: [                
                        {
                            answer: 'Yes',
                            message: '<h3>Changes to your benefits</h3><p>Tell us about <a href="/residents/council-tax-and-benefits/changes-in-circumstances">changes to your benefits</a>.</p>',                    
                        },
                        {
                            answer: 'No',
                            message: '<h3>Are you paying council tax for the first time?</h3>',     
                            decisions: [                
                                {
                                    answer: 'Yes',
                                    message: '<h3>Will you be renting or owning your new home in Leeds?</h3>',                    
                                    decisions: [                
                                        {
                                            answer: 'Rent',
                                            message: '<h3>Renting your home in Leeds</h3><p>You will need to pay council tax from when your tenancy starts.</p><p><a target="_blank" rel="external" href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/form.htm?_flowId=services%2Fchangeofaddress%2Fform&_flowExecutionKey=e1s1">Tell us about a change of address <span class="sr-only">(External link opens in a new window)</span></a>',
                                        },
                                        {
                                            answer: 'Own',
                                            message: '<h3>Owning your home in Leeds</h3><p>You will need to pay council tax from your completion date.</p><details class="details"><summary>New Build Properties</summary><div class="details__container"><p>If your property is a new build check that it has been banded before completing the change of address form.</p><p>If it hasn\'t been banded call our Council Tax service to tell us you are moving.</p><div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday 9am to 5pm)</span></p></div></div></details><ul class="list list-nav"><li><a target="_blank" rel="external" href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/form.htm?_flowId=services%2Fchangeofaddress%2Fform&_flowExecutionKey=e1s1">Tell us about a change of address <span class="sr-only">(External link opens in a new window)</span></a></li><li><a href="/council-tax/bands-and-charges">Check your property band</a></li></ul>',           
                                        },
                                    ]
                                },
                                {
                                    answer: 'No',
                                    message: '<h3>Where are you moving?</h3>',   
                                    decisions: [                
                                        {
                                            answer: 'Into Leeds',
                                            message: '<h3>Will you be renting or owning your new home in Leeds?</h3>',                    
                                            decisions: [                
                                                {
                                                    answer: 'Rent',
                                                    message: '<h3>Renting your home in Leeds</h3><p>You will need to pay council tax from when your tenancy starts.</p><p><a target="_blank" rel="external" href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/form.htm?_flowId=services%2Fchangeofaddress%2Fform&_flowExecutionKey=e1s1">Tell us about a change of address <span class="sr-only">(External link opens in a new window)</span></a>',
                                                },
                                                {
                                                    answer: 'Own',
                                                    message: '<h3>Owning your home in Leeds</h3><p>You will need to pay council tax from your completion date.</p><details class="details"><summary>New Build Properties</summary><div class="details__container"><p>If your property is a new build check that it has been banded before completing the change of address form.</p><p>If it hasn\'t been banded call our Council Tax service to tell us you are moving.</p><div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday 9am to 5pm)</span></p></div></div></details><ul class="list list-nav"><li><a target="_blank" rel="external" href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/form.htm?_flowId=services%2Fchangeofaddress%2Fform&_flowExecutionKey=e1s1">Tell us about a change of address <span class="sr-only">(External link opens in a new window)</span></a></li><li><a href="/council-tax/bands-and-charges">Check your property band</a></li></ul>',           
                                                },
                                            ]
                                        },
                                        {
                                            answer: 'Out of Leeds',
                                            message: '<h3>Tell us about the property you are leaving. Will anyone that you have been living with be staying there?</h3><p>For example housemates, family or friends.</p>',           
                                            decisions: [                
                                                {
                                                    answer: 'Yes',
                                                    message: '<h3>Leaving a property that will remain occupied</h3><p>We need to talk to you about this change. Call our Council Tax service to tell us you are moving.</p> <div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div>',
                                                },
                                                {
                                                    answer: 'No',
                                                    message: '<h3>Are you moving from a property you owned or rented?</h3>',     
                                                    decisions: [                
                                                        {
                                                            answer: 'Rented',
                                                            message: '<h3>Moving from a property you rented</h3><p>If you move before your tenancy ends you will still need to pay council tax until either your tenancy ends or a new tennant moves in.</p><p>If you are on a rolling tenancy you will need to pay council tax until you move.</p><a rel="external" href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm">Tell us about a change of address <span class="sr-only">(External link opens in a new window)</span></a>',
                                                        },
                                                        {
                                                            answer: 'Owned',
                                                            message: '<h3>Have you sold the property you are leaving?</h3>',       
                                                            decisions: [                
                                                                {
                                                                    answer: 'Sold',
                                                                    message: '<h3>Sold property you are leaving</h3><p>You will need to pay council tax until your completion date.</p><p>You will need to notify your new council that you are moving.</p><a rel="external" href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm">Tell us about a change of address <span class="sr-only">(External link opens in a new window)</span></a>',
                                                                },
                                                                {
                                                                    answer: 'Letting',
                                                                    message: '<h3>Letting the property you are leaving</h3><p>You will need to pay the council tax until your tenant moves in.</p><a rel="external" href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm">Tell us about a change of address <span class="sr-only">(External link opens in a new window)</span></a>',           
                                                                },
                                                                {
                                                                    answer: 'Unoccupied',
                                                                    message: '<h3>Leaving a propery unoccupied</h3><p>If you are leaving a property that you own and nobody else is moving in you will still need to pay council tax for it.</p><p>In some cases <a href="/council-tax/discounts-and-exemptions">exceptions may apply</a>.</p> We need to talk to you about this change. Call our Council Tax service to tell us you are moving.</p> <div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></div>',           
                                                                },
                                                            ]      
                                                        },
                                                    ]      
                                                },
                                            ]
                                        },
                                        {
                                            answer: 'Within Leeds',
                                            message: '<h3>Moving within Leeds</h3><p>You may recieve a closing bill for the address you are moving out of and an opening bill for your new address.</p><h3>Tell us about the property you are leaving. Will anyone that you have been living with be staying there?</h3><p>For example housemates, family or friends.</p>',           
                                            decisions: [                
                                                {
                                                    answer: 'Yes',
                                                    message: '<h3>Leaving a property occupied</h3><p>We need to talk to you about this change. Call our Council Tax service to tell us you are moving.</p><div class="text-block"><p>0113 222 4404<br> <span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div>',
                                                },
                                                {
                                                    answer: 'No',
                                                    message: '<h3>Tell us about the property you are moving in to. Will you be living with someone who is already paying council tax for the address?</h3>',
                                                    decisions: [
                                                        {
                                                            answer: 'Yes',
                                                            message: '<h3>Moving in with somebody who already pays council tax</h3><p>We need to talk to you about this change. Call our Council Tax service to tell us you are moving.</p><div class="text-block"><p>0113 222 4404<br> <span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div>',
                                                        },
                                                        {
                                                            answer: 'No',
                                                            message: '<h3>Are you moving from a property you rented or owned?</h3>',
                                                            decisions: [
                                                                {
                                                                    answer: 'Owned',
                                                                    message: '<h3>Have you sold the property you are leaving?</h3>',
                                                                    decisions: [
                                                                        {
                                                                            answer: 'Sold',
                                                                            message: '<h3>Will you be renting or owning your new home in Leeds?</h3>',
                                                                            decisions: [
                                                                                {
                                                                                    answer: 'Rent',
                                                                                    message: '<h3>Moving into a rented property</h3><p>You will need to pay council tax from when your tenancy starts.</p><a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm" rel="external">Tell us about a change of address <span class="sr-only">(External link)</span></a>',
                                                                                },
                                                                                {
                                                                                    answer: 'Own',
                                                                                    message: '<h3>Moving into a property you own</h3><p>You will need to pay council tax from your completion date</p><details class="details"><summary>New Build Properties</summary><div class="details__container"><p>If your property is a new build check that it has been banded before completing the change of address form.</p><p>If it hasn\'t been banded call our Council Tax service to tell us you are moving.</p><div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div></div></details><ul class="list list-nav"><li><a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm" rel="external">Tell us about a change of address <span class="sr-only">(External link)</span></a></li><li><a href="/council-tax/bands-and-charges">Check your property band</a></li></ul>',
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            answer: 'Letting',
                                                                            message: '<p>You will need to pay council tax until your tenant moves in.</p><h3>Will you be renting or owning your new home in Leeds?</h3>',
                                                                            decisions: [
                                                                                {
                                                                                    answer: 'Rent',
                                                                                    message: '<h3>Moving into a rented property</h3><p>You will need to pay council tax from when your tenancy starts.</p><a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm" rel="external">Tell us about a change of address <span class="sr-only">(External link)</span></a>',
                                                                                },
                                                                                {
                                                                                    answer: 'Own',
                                                                                    message: '<h3>Moving into a property you own</h3><p>You will need to pay council tax from your completion date</p><details class="details"><summary>New Build Properties</summary><div class="details__container"><p>If your property is a new build check that it has been banded before completing the change of address form.</p><p>If it hasn\'t been banded call our Council Tax service to tell us you are moving.</p><div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div></div></details><ul class="list list-nav"><li><a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm" rel="external">Tell us about a change of address <span class="sr-only">(External link)</span></a></li><li><a href="/council-tax/bands-and-charges">Check your property band</a></li></ul>',
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            answer: 'Unoccupied',
                                                                            message: '<h3>Leaving a property unoccupied</h3><p>If you are leaving a property that you own and nobody else is moving in you will still need to pay council tax for it.</p><p>In some cases <a href="/council-tax/discounts-and-exemptions">exceptions may apply</a>.</p><p>We need to talk to you about this change. Call our Council Tax service to tell us you are moving.</p><div class="text-block"><p>0113 222 4404<br> <span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div>',
                                                                        },
                                                                    ]
                                                                },
                                                                {
                                                                    answer: 'Rented',
                                                                    message: '<h3>Will you be renting or owning your new home in Leeds?</h3>',
                                                                    decisions: [
                                                                        {
                                                                            answer: 'Rent',
                                                                            message: '<h3>Moving into a rented property</h3><p>You will need to pay council tax from when your tenancy starts.</p><a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm" rel="external">Tell us about a change of address <span class="sr-only">(External link)</span></a>',
                                                                        },
                                                                        {
                                                                            answer: 'Own',
                                                                            message: '<h3>Moving into a property you own</h3><p>You will need to pay council tax from your completion date</p><details class="details"><summary>New Build Properties</summary><div class="details__container"><p>If your property is a new build check that it has been banded before completing the change of address form.</p><p>If it hasn\'t been banded call our Council Tax service to tell us you are moving.</p><div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div></div></details><ul class="list list-nav"><li><a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm" rel="external">Tell us about a change of address <span class="sr-only">(External link)</span></a></li><li><a href="/council-tax/bands-and-charges">Check your property band</a></li></ul>',
                                                                        },
                                                                    ]
                                                                },
                                                            ]
                                                        },
                                                    ]
                                                },
                                            ]
                                        }
                                    ]         
                                }
                            ]      
                        }
                    ]        
                }
            ]            
        },
        {
            answer: 'Name',
            message: '<h3>Change of name</h3><p>Tell us about <a href="/council-tax/report-a-change/change-of-name">changes to your name</a>.</p>',           
        },
        {
            answer: 'Circumstances',
            message: '<h3>Change of circumstances</h3>',
            decisions: [
                {
                    answer: 'Student',
                    message: '<h3>Changes to your student status</h3><p>Tell us about <a href="/council-tax/discounts-and-exemptions/students">changes to your student status</a>.</p>',                                
                },
                {
                    answer: 'Benefits',
                    message: '<h3>Changes to your benefits</h3><p>Tell us about <a href="/residents/council-tax-and-benefits/changes-in-circumstances">changes to your benefits</a>.</p>',                    
                },
                {
                    answer: 'Other',
                    message: '<h3>Tell us about a change</h3><p>If you wish to discuss anything else relating to a change in circumstances, for example if someone has died and left a property unoccupied, please call us.</p><div class="text-block"><p>0113 222 4404<br> <span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div>',
                }     
                
            ] 
        }
    ]
};

jQuery(document).ready(function() {
    jQuery('.lcc-council-tax-tree').decisionTree({data: data});
});