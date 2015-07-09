    
// $(function(){


    //============================== Setting Global Variables ==============================//
            

    var undo; // -> this only works for one deep undo

    var quoteArr = [];

    var delNum = 0;

    var idNum = 0;

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


    // generate objects here
    var quoteGen = function(qText, qAuthor, rating){

        // create object for the quote
        var quoteObject = { 

            qtext   : qText,
            author  : qAuthor,
            rating  : rating || null,
            deleted : delNum,
            id      : idNum,
        }

        quoteArr.push(quoteObject);

        idNum ++;

        // loop over quoteArr
        $('.all-quotes').html(quoteArr.map(function(obj) {

            return quoteStruc(obj);

        }).join('') )
    };













//============================== NEW STRUCTURE ==============================//
        
    var quoteStruc = function(obj){

        // fresh batch of elements
        var newEls = elements();

        // new vars so we don't have to use dot notation all over the place -> could get messy since we will be chaining methods
        var topC = newEls.topC;
        var del = newEls.del;
        var p = newEls.p;
        var liC = newEls.liC;
        var ul = newEls.ul;
        var liQ = newEls.liQ;
        var br = newEls.br;
        var liA = newEls.liA;

        // text will be dynamically added from $('.enter-quote').val() and $('add-author').val();
        liQ.text('"' + obj.qtext + '"');
        liA.text (" - " + obj.author);

        // rating content:
        var ratingText = ['*','*','*','*','*'].join('   ');
        p.text(ratingText);

        // top bar is the delete button and the rating
        var topBar = topC.append(del, p);

        // append title/h3 to container
        var qContain = liC.append(topBar);

        // append li*2 to ul
        var qContent = ul.append(liQ, br, liA);

        // append content to container
        var whole = qContain.append(qContent);

        // console.log(whole);

        // console.log(whole.html());

        // Need to use dummy div b/c .html() only returns the inner html, so we were losing the container for each quote. 
        return $('<div>').append(whole).html();
    };









//============================== Dynamically add quotes ==============================//
        
    $('.submit-btn').on('click', function(event) {

        event.preventDefault();

        var quoteText = $('.enter-quote').val();
        var quoteAuthor = $('.add-author').val();

        quoteGen(quoteText, quoteAuthor);
    });


//============================== undo last action ==============================//

    $('.undo-btn').on('click', function(event) {

        event.preventDefault();

        // if( undo.hasClass('created') ) {

        //     undo.remove();

        //     undo.removeClass('created');

        // } else if ( !undo.hasClass('created') ) {

        //     $('.all-quotes').append(undo);

        //     undo.addClass('created');
        // }
    });
        

//============================== Delete ==============================//

    // This function will delete the parent container of the anchor we click

    // $('.all-quotes').on('click', '.delete-btn', function(event) {

    //     event.preventDefault();
        
    //     var whatWeDeleted = $(this).closest('.quote-container');

    //     whatWeDeleted.removeClass('created');

    //     console.log(whatWeDeleted);

    //     undo = whatWeDeleted;

    //     whatWeDeleted.remove();
    // })
        
    // NOT LOOKING AT JQUERY OBJECTS ANYMORE FOR DELETEING --> LOOK AT THE OBJECTS ARRAY AND FIND THE OBJECT IDNUM THAT CORRESPONDS TO WHICHEVER DELETE BUTTON WE PRESSED
        


// });