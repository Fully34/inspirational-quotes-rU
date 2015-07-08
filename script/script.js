    
$(function(){


    //============================== Setting undo Variable ==============================//
            

    //===========================================================================//
                            /* ~~~ Create quote structure ~~~ */ 
    //===========================================================================//

                
    // this function returns an object that contains all of the structural jquery objects I want to use -> won't have to copy(); a bunch of times as a result
    var elements = function(){ 

        var els =  {

            topC : $('<div class="top clearfix"></div>'),
            del  : $('<a href="#" class="delete-btn">DELETE THIS HERE QUOTE! ARGGHHHH! </a>'),
            p    : $('<p class="rating"></p>'),
            liC  : $('<li class="quote-container"></li>'),
            ul   : $('<ul class="quote-content"></ul>'),
            liQ  : $('<li class="quote-text"></li'),
            br   : $('<br>'),
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
        var topC = newEls.topC;
        var del = newEls.del
        var p = newEls.p;
        var liC = newEls.liC;
        var ul = newEls.ul;
        var liQ = newEls.liQ;
        var br = newEls.br;
        var liA = newEls.liA;

        // create object for the quote
        var quoteObject = { 

            qtext    : qText,
            author  : qAuthor,
            deleted : delNum,
        }

        // text will be dynamically added from $('.enter-quote').val() and $('add-author').val();
        liQ.text('"' + quoteObject.qtext + '"');
        liA.text (" - " + quoteObject.author);

        // rating content:
        var ratingText = ['*','*','*','*','*'].join('   ');
        p.text(ratingText);

        // make a big X for del
        del.val("X");


        //======================= New function to create structure ==============================//
                
        // top bar is the delete button and the rating
        var topBar = topC.append(del, p);

        // append title/h3 to container
        var qContain = liC.append(topBar);

        // append li*2 to ul
        var qContent = ul.append(liQ, br, liA);

        // append content to container
        var whole = qContain.append(qContent);

        // set equal to undo variable so we can remove it if we want to
        // undo = whole.addClass('created'); // created class will be used for our undo function

        // push quote object into array
        quoteArr.push(quoteObject);
        
        // 
        $('.all-quotes').append(whole);

    };


//============================== Dynamically add quotes ==============================//
        
    $('.submit-btn').on('click', function(event) {

        event.preventDefault();

        var quoteText = $('.enter-quote').val();
        var quoteAuthor = $('.add-author').val();

        quoteItem(quoteText, quoteAuthor);
    });


//============================== undo last action ==============================//

    // $('.undo-btn').on('click', function(event) {

    //     event.preventDefault();

    //     if( undo.hasClass('created') ) {

    //         undo.remove();

    //         undo.removeClass('created');

    //     } else if ( !undo.hasClass('created') ) {

    //         $('.all-quotes').append(undo);

    //         undo.addClass('created');
    //     }
    // });
        

//============================== Delete ==============================//

    // This function will delete the parent container of the anchor we click

    $('.all-quotes').on('click', '.delete-btn', function(event) {

        event.preventDefault();
        
        var whatWeDeleted = $(this).closest('.quote-container');

        whatWeDeleted.removeClass('created');

        console.log(whatWeDeleted);

        undo = whatWeDeleted;

        whatWeDeleted.remove();
    })
        

});