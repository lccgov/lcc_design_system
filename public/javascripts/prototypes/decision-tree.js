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
    message: '<h3>Do you want to tell us about a change?</h3>',
    decisions: [
        {
            answer: 'Yes',
            message: '<h3>Do you want to tell us about a move?</h3>',
            decisions: [                
                {
                    answer: "Yes",
                    message: '<h3>Are you a student?</h3>',     
                    decisions: [                
                        {
                            answer: "Yes",
                            message: '<h3>Council tax for students</h3><p>Visit our <a href="/council-tax/discounts-and-exemptions/students">Student discounts and exemptions</a> page to apply for student discount or to let us know about a change to your student status.</p>',                     
                        },
                        {
                            answer: 'No',
                            message: '<h3>Do you recieve benefits?</h3>',
                            decisions: [
                                {
                                    answer: 'Yes',
                                    message: '<h3>Council tax for people with benefits</h3><p>If you receive Housing Benefit, Council Tax Support or Free School meals you must tell us about any changes in your family\'s circumstances by visiting the <a href="/residents/council-tax-and-benefits/changes-in-circumstances">Council Tax Benefits Changes in Circumstances</a> page.</p>'
                                },
                                {
                                    answer: "No",
                                    message: '<h3>Where are you moving?</h3>',
                                    decisions: [                
                                        {
                                            answer: "Out of Leeds",
                                            message: '<h3>Are you moving out of a propery that will remain occupied?</h3>',  
                                            decisions: [                
                                                {
                                                    answer: "Yes",
                                                    message: '<h3>Moving out of a property that will remain occupied</h3><p>You will need to call our Council Tax Service to notify them you are moving (phone number to be confirmed).</p><p>Make sure you are removed from any tenancy agreement as you may still be liable.</p><p>You will need to notify your new council that you are moving.</p>',                     
                                                },
                                                {
                                                    answer: 'No',
                                                    message: '<h3>Are you currently a homeowner or renter?</h3>',
                                                    decisions: [    
                                                        {
                                                            answer: 'Homeowner',
                                                            message: '<h3>Homeowner moving out of Leeds</h3><p>You will be charged up until the date the sale completes.</p><p>You will need to notify your new council that you are moving.</p><p><h3>Have you sold the property you are leaving?</h3>',
                                                                decisions: [
                                                                    {
                                                                        answer: 'Yes',
                                                                        message: '<h3>Sold the property you are leaving</h3><p><a rel="external" class="btn btn-primary" href="#">Change of address form</a>'
                                                                    },
                                                                    {
                                                                        answer: 'No',
                                                                        message: '<h3>Empty properties</h3><p>You will need to notify us if your property becomes empty by visiting <a href="/council-tax/discounts-and-exemptions/empty-properties">Empty properties</a>.</p>',
                                                                    }
                                                                ]
                                                        },        
                                                        {
                                                            answer: "Renter",
                                                            message: '<h3>Are you currently on a rolling tenancy?</h3>', 
                                                            decisions: [                
                                                                {
                                                                    answer: "Yes",
                                                                    message: '<h3>Moving out of Leeds and still on a rolling tenancy</h3><p>If you are on a rolling tenancy you will be charged until you move.</p><p>You will need to notify your new council that you are moving.</p><p><a class="btn btn-primary" href="#" rel="external">Change of address form</a></p>',                     
                                                                },
                                                                {
                                                                    answer: 'No',
                                                                    message: '<h3>Moving out of Leeds and not on a rolling tenancy</h3><p>If you move out before your tenancy ends you will still be liable.</p><p>You will need to notify your new council that you are moving.</p><p><a class="btn btn-primary" href="#" rel="external">Change of address form</a></p>',
                                                                }
                                                            ]                     
                                                        }                                                        
                                                    ] 
                                                }
                                            ]                   
                                        },
                                        {
                                            answer: 'Within Leeds',
                                            message: '<h3>Moving within Leeds</h3><p>You will get a closing bill for the address you are moving out of and an opening bill for your new address.</p><h3>Are you moving out of a property that will remain occupied?</h3>',
                                            decisions: [
                                                {
                                                    answer: 'Yes',
                                                    message: '<h3>Moving out of a property that will remain occupied</h3><p>You will need to call our Council Tax service to notify them you are moving.</p><p>Make sure you are removed from any tenancy agreement as you may still be liable (number to be confirmed).</p>',
                                                },
                                                {
                                                    answer: 'No',
                                                    message: '<h3>Are you moving into a property occupied by an existing bill payer?</h3>',
                                                    decisions: [
                                                        {
                                                            answer: 'Yes',
                                                            message: '<h3>Moving into a property occupied by an existing bill payer</h3><p>You will need to call our Council Tax service to notify them you are moving.</p><p>Make sure you are removed from any tenancy agreement as you may still be liable (number to be confirmed).</p>',
                                                        },
                                                        {
                                                            answer: 'No',
                                                            message: '<h3>Recently built properties</h3><p>If you are moving into a property that has recently been built you may need to check that this has been banded.</p> <a href="https://www.leeds.gov.uk/council-tax/bands-and-charges" rel="external">Check your property band</a> <h3>Are you moving from a property you rented or owned?</h3>',
                                                            decisions: [
                                                                {
                                                                    answer: 'Rented',
                                                                    message: '<h3>Moving from a rented property</h3><p><a class="btn btn-primary" href="#" rel="external">Change of address form</a>'
                                                                },
                                                                {
                                                                    answer: 'Owned',
                                                                    message: '<h3>Have you sold the property you are leaving?</h3>',
                                                                    decisions: [
                                                                        {
                                                                            answer: 'Yes',
                                                                            message: '<h3>Sold the property you are leaving</h3><p><a rel="external" class="btn btn-primary" href="#">Change of address form</a>'
                                                                        },
                                                                        {
                                                                            answer: 'No',
                                                                            message: '<h3>Empty properties</h3><p>You will need to notify if your property becomes empty by visiting <a href="/council-tax/discounts-and-exemptions/empty-properties">Empty properties</a>.</p>',
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
                                            answer: 'Into Leeds',
                                            message: '<h3>Will you be renting or owning your home in Leeds?</h3>',
                                            decisions: [                
                                                {
                                                    answer: "Renting",
                                                    message: '<h3>Moving into Leeds and renting</h3><p>You will be charged from when your tenancy starts.</p><p><a class="btn btn-primary" href="#" rel="external">Change of address form</a></p>'                                                                      
                                                },
                                                {
                                                    answer: 'Homeowner',
                                                    message: '<h3>Moving into Leeds and will be a homeowner</h3><p>You will be charged from your completion date.</p><p>If your property is a new build you will need to check that this has been banded.<p><a href="https://www.leeds.gov.uk/council-tax/bands-and-charges" rel="external">Check your bands property</a></p><p><a class="btn btn-primary" href="#" rel="external">Change of address form</a></p>',
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
                    answer: 'No',
                    message: '<h3>Report a different change</h3><p>Visit our <a href="/council-tax/report-a-change">Report a change</a> page to amend a direct debit, tell us about a change of name or circumstance or report any other changes.</p>'
                }
            ]            
        },
        {
            answer: 'No',
            message: '<h3>Report a different change</h3><p>Visit our <a href="/council-tax/report-a-change">Report a change</a> page to amend a direct debit, tell us about a change of name or circumstance or report any other changes.</p>'
            
        }            
    ]
};

jQuery(document).ready(function() {
    jQuery('.lcc-council-tax-tree').decisionTree({data: data});
});