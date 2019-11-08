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
    message: '<h2>Do you recieve benefits?</h2>',
    decisions: [
        {
            answer: 'Yes',
            message: '<p>If you receive benefits you can tell us about your change of address by post or in person.</p><p>Visit our <a href="https://www.leeds.gov.uk/council-tax/discounts-and-exemptions/council-tax-support/report-a-change">report a change</a> page to find out more.</p>',                                         
        },
        {
            answer: 'No',
            message: '<h2>Are you paying council tax in Leeds for the first time?</h2>',                                
            decisions: [
                {
                    answer: 'Yes',
                    message: '<h2>Will you be renting or owning your new home in Leeds?</h2>',                                        
                    decisions: [
                        {
                            answer: 'Renting',
                            message: '<p>You will need to pay council tax from when your tenancy starts.</p><p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/form.htm?_flowId=services%2Fchangeofaddress%2Fform&_flowExecutionKey=e1s1">change of address</a>.</p>',                                        
                        },
                        {
                            answer: 'Owning',
                            message: '<p>You will need to pay council tax from your completion date.</p><p>If your property is a new build you can still use the change of address form even if it hasn\'t been banded yet.</p><p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/form.htm?_flowId=services%2Fchangeofaddress%2Fform&_flowExecutionKey=e1s1">change of address</a>.</p>',                                     
                        }
                    ]
                },
                {
                    answer: 'No',
                    message: '<h2>Where are you moving?</h2>', 
                    decisions: [
                        {
                            answer: 'Into Leeds',
                            message: '<h2>Will you be renting or owning your new home in Leeds?</h2>',                                        
                            decisions: [
                                {
                                    answer: 'Renting',
                                    message: '<p>You will need to pay council tax from when your tenancy starts.</p><p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/form.htm?_flowId=services%2Fchangeofaddress%2Fform&_flowExecutionKey=e1s1">change of address</a>.</p>',                                        
                                },
                                {
                                    answer: 'Owning',
                                    message: '<p>You will need to pay council tax from your completion date.</p><p>If your property is a new build you can still use the change of address form even if it hasn\'t been banded yet.</p><p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/form.htm?_flowId=services%2Fchangeofaddress%2Fform&_flowExecutionKey=e1s1">change of address</a>.</p>',                                     
                                }
                            ]
                        },
                        {
                            answer: 'Out of Leeds',
                            message: '<p>Tell us about the property you are leaving.</p> <h2 class="top">Will anyone that you have been living with be staying there?</h2><p>For example housemates, family or friends.</p>',                                        
                            decisions: [
                                {
                                    answer: 'Yes',
                                    message: '<p>We need to talk to you about this change. Call our Council Tax service to tell us you are moving.</p> <p><strong>Phone</strong></p><div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div>',                                        
                                },
                                {
                                    answer: 'No',
                                    message: '<h2>Are you moving from a property you owned or rented?</h2>',   
                                    decisions: [
                                        {
                                            answer: 'Owned',
                                            message: '<h2>What is happening to the property you are leaving?</h2>',
                                            decisions: [
                                                {
                                                    answer: 'I\'ve sold it',
                                                    message: '<p>You will need to pay council tax until your completion date.</p><p>You will need to notify your new council that you are moving.</p> <p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm;jsessionid=027129AF7C8563E06A485FEF8F07CAB8">change of address</a>.</p>',                                        
                                                },
                                                {
                                                    answer: 'I\'m letting it out',
                                                    message: '<p>You will need to pay the council tax for your old home until your tenant moves in.</p> <p>You will need to notify your new council that you are moving.</p> <p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm;jsessionid=027129AF7C8563E06A485FEF8F07CAB8">change of address</a>.</p>',                                     
                                                },
                                                {
                                                    answer: 'It\'s empty',
                                                    message: '<p>If you are leaving a property that you own and nobody else is moving in you will still need to pay council tax for it.</p> <p>In some cases <a href="https://www.leeds.gov.uk/council-tax/discounts-and-exemptions">exceptions may apply</a>.</p> <p>We need to talk to you about this change. Call our Council Tax service to tell us you are moving.</p> <p><strong>Phone</strong></p><div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></div>',                                     
                                                }
                                            ]                                          
                                        },
                                        {
                                            answer: 'Rented',
                                            message: '<p>You will need to pay council tax for your old home until either your tenancy ends or a new tenant moves in.</p><p>You will need to notify your new council that you are moving.</p><p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm;jsessionid=027129AF7C8563E06A485FEF8F07CAB8">change of address</a>.</p>',                                     
                                        }
                                    ]                                  
                                }
                            ]
                        },
                        {
                            answer: 'Within Leeds',
                            message: '<p>Tell us about the property you are leaving.</p> <h2 class="top">Will anyone that you have been living with be staying there?</h2><p>For example housemates, family or friends.</p>',                                        
                            decisions: [
                                {
                                    answer: 'Yes',
                                    message: '<p>We need to talk to you about this change. Call our Council Tax service to tell us you are moving.</p> <p><strong>Phone</strong></p><div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div>',                                     
                                },
                                {
                                    answer: 'No',
                                    message: '<p>Tell us about the property you are moving into.</p> <h2 class="top">Will you be living with someone who is already paying council tax for the address?</h2>',
                                    decisions: [
                                        {
                                            answer: 'Yes',
                                            message: '<p>We need to talk to you about this change. Call our Council Tax service to tell us you are moving.</p> <p><strong>Phone</strong></p><div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div>',                                     
                                        },
                                        {
                                            answer: 'No',
                                            message: '<h2>Are you moving from a property you rented or owned?</h2>',
                                            decisions: [
                                                {
                                                    answer: 'Rented',
                                                    message: '<h2>Will you be renting or owning your new home in Leeds?</h2>',        
                                                    decisions: [
                                                        {
                                                            answer: 'Rent',
                                                            message: '<p>You may receive a closing bill for the address you are moving out of and an opening bill for your new address.</p><p>You will need to pay council tax for your old home until either your tenancy ends or a new tenant moves in.</p><p>You will need to pay council tax for your new home from when your tenancy starts.</p><p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm;jsessionid=027129AF7C8563E06A485FEF8F07CAB8">change of address</a>.</p>',                                     
                                                        },
                                                        {
                                                            answer: 'Own',
                                                            message: '<p>You may receive a closing bill for the address you are moving out of and an opening bill for your new address.</p><p>You will need to pay council tax for your old home until either your tenancy ends or a new tenant moves in.</p><p>You will need to pay council tax from your completion date.</p><p>If your property is a new build you can still use the change of address form even if it hasn\'t been banded yet.</p><p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm;jsessionid=027129AF7C8563E06A485FEF8F07CAB8">change of address</a>.</p>',
                                                        }
                                                    ]                             
                                                },
                                                {
                                                    answer: 'Owned',
                                                    message: '<h2>What is happening to the property you are leaving?</h2>',
                                                    decisions: [
                                                        {
                                                            answer: 'It\'s empty',
                                                            message: '<p>If you are leaving a property that you own and nobody else is moving in you will still need to pay council tax for it.</p> <p>In some cases <a href="https://www.leeds.gov.uk/council-tax/discounts-and-exemptions">exceptions may apply</a>.</p> <p>We need to talk to you about this change. Call our Council Tax service to tell us you are moving.</p> <p><strong>Phone</strong></p> <div class="text-block"><p>0113 222 4404 <br><span class="font-xsmall">(Monday to Friday, 9am to 5pm)</span></p></div>',        
                                                                                       
                                                        },
                                                        {
                                                            answer: 'I\'m letting it out',
                                                            message: '<h2>Will you be renting or owning your new home in Leeds?</h2>',
                                                            decisions: [
                                                                {
                                                                    answer: 'Renting',
                                                                    message: '<p>You may receive a closing bill for the address you are moving out of and an opening bill for your new address.</p><p>You will need to pay the council tax for your old home until your tenant moves in.</p><p>You will need to pay council tax at your new home from when your tenancy starts.</p><p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm;jsessionid=027129AF7C8563E06A485FEF8F07CAB8">change of address</a>.</p>',        
                                                                },
                                                                {
                                                                    answer: 'Owning',
                                                                    message: '<p>You may receive a closing bill for the address you are moving out of and an opening bill for your new address.</p><p>You will need to pay the council tax for your old home until your tenant moves in.</p><p>You will need to pay council tax for your new home from your completion date.</p><p>If your property is a new build you can still use the change of address form even if it hasn\'t been banded yet.</p><p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm;jsessionid=027129AF7C8563E06A485FEF8F07CAB8">change of address</a>.</p>',
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            answer: 'I\'ve sold it',
                                                            message: '<h2>Will you be renting or owning your new home in Leeds?</h2>',        
                                                            decisions: [
                                                                {
                                                                    answers: 'Renting',
                                                                    message: '<p>You may receive a closing bill for the address you are moving out of and an opening bill for your new address.</p> <p>You will need to pay the council tax for your old home until your completion date.</p> <p>You will need to pay council tax at your new home from when your tenancy starts.</p> <p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm;jsessionid=027129AF7C8563E06A485FEF8F07CAB8">change of address</a>.</p>',
                                                                },
                                                                {
                                                                    answers: 'Owning',
                                                                    message: '<p>You may receive a closing bill for the address you are moving out of and an opening bill for your new address.</p> <p>You will need to pay the council tax for your old home until your completion date.</p> <p>You will need to pay council tax for your new home from your completion date.</p> <p>If your property is a new build you can still use the change of address form even if it hasn\'t been banded yet.</p> <p>Tell us about your <a href="https://youraccount.leeds.gov.uk/publicaccesslive/selfservice/services/changeofaddress/coastart.htm;jsessionid=027129AF7C8563E06A485FEF8F07CAB8">change of address</a>.</p>',
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]                                    
                }
            ]         
        }
    ]
};

jQuery(document).ready(function() {
    jQuery('.lcc-council-tax-tree').decisionTree({data: data});
});