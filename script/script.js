    
// $(function(){


    //============================== Setting undo Variable ==============================//
            
    var undo; // -> this only works for one deep undo

    //===========================================================================//
                            /* ~~~ Create quote structure ~~~ */ 
    //===========================================================================//

                
    // this function returns an object that contains all of the structural jquery objects I want to use -> won't have to copy(); a bunch of times as a result
    var elements = function(){ 

        var els =  {

            liC  : $('<li class="quote-container"></li>'),
            ul   : $('<ul class="quote-content"></ul>'),
            h3   : $('<h3 class="quote-title"></h3>'),
            p    : $('<p class="rating"></p>'),
            liQ  : $('<li class="quote-text"></li'),
            liA  : $('<li class="quote-author"></div>'),
        }

        return els;
    };

    // generate structure here
    var quoteItem = function(){

        // fresh batch of elements
        var newEls = elements();

        // new vars so we don't have to use dot notation all over the place -> could get messy since we will be chaining a lot of methods
        var ul = newEls.ul;
        var liC = newEls.liC;
        var h3 = newEls.h3;
        var p = newEls.p;
        var liQ = newEls.liQ;
        var liA = newEls.liA;

        // append title/h3 to container
        var qContain = liC.append(h3, p);

        // append li*2 to ul
        var qContent = ul.append(liQ, liA);

        // append content to container
        var whole = qContain.append(qContent);

        undo = whole;

        $('.all-quotes').append(whole)

        return whole;
    }



// })