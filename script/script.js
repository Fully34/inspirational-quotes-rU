    
$(function(){


    //============================== Setting undo Variable ==============================//
            

    //===========================================================================//
                            /* ~~~ Create quote structure ~~~ */ 
    //===========================================================================//

                
    // this function returns an object that contains all of the structural jquery objects I want to use -> won't have to copy(); a bunch of times as a result
    var elements = function(){ 

        var els =  {

            del  : $('<div class="btn delete-btn"></div>'),
            liC  : $('<li class="quote-container"></li>'),
            ul   : $('<ul class="quote-content"></ul>'),
            p    : $('<p class="rating"></p>'),
            liQ  : $('<li class="quote-text"></li'),
            liA  : $('<li class="quote-author"></div>'),
        }

        return els;
    };

    var undo; // -> this only works for one deep undo

    // generate structure here
    var quoteItem = function(qText, qAuthor){

        // fresh batch of elements
        var newEls = elements();

        // new vars so we don't have to use dot notation all over the place -> could get messy since we will be chaining a lot of methods
        var del = newEls.del
        var ul = newEls.ul;
        var liC = newEls.liC;
        var p = newEls.p;
        var liQ = newEls.liQ;
        var liA = newEls.liA;

        // text will be dynamically added from $('.enter-quote').val() and $('add-author').val();
        liQ.text(qText);
        liA.text (qAuthor);

        // rating content:
        var ratingText = ['*','*','*','*','*'].join('   ');
        p.text(ratingText)

        // append title/h3 to container
        var qContain = liC.append(del, p);

        // append li*2 to ul
        var qContent = ul.append(liQ, liA);

        // append content to container
        var whole = qContain.append(qContent);

        // set equal to undo variable so we can remove it if we want to
        undo = whole;

        $('.all-quotes').append(whole)

        return whole;
    }


//============================== Dynamically add quotes ==============================//
        
    $('.submit-btn').on('click', function(event) {

        event.preventDefault();

        var quoteText = $('.enter-quote').val();
        var quoteAuthor = $('.add-author').val();

        quoteItem(quoteText, quoteAuthor);
    })


//============================== undo last action ==============================//

    $('.undo-btn').on('click', function(event) {

        event.preventDefault();
        undo.remove();
    })
        

})