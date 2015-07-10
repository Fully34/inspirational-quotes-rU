    
// $(function(){


    //============================== Setting Global Variables ==============================//

    //> will house all of the Quote objects currently rendered on screen, or 'undefined'(in which case, they will not render)
    var quoteArr = [];

    //> will house all of the Quote objects that we've deleted in ascending order of deletion
    var deleted = [];

    //> array of last action objects (the last position will be occupied by the most recent action -> 'create' or 'delete')
    var lastAction = [];

    //> only increments if the object hasn't been deleted yet
    var delNum = 0;

    //> increments each time we create a new Quote object and is bound to that object (all Quote objects have a unique ID)

    var idNum = 0; //> WORTHLESS -> THE INDEX IS ALREADY THE ID NUMBER -> BUT NEEDED FOR UNDO BUTTON!!!

    //===========================================================================//
                            /* ~~~ Create quote structure ~~~ */ 
    //===========================================================================//

                
    // this function returns an object that contains all of the structural jquery objects I want to use -> won't have to copy(); a bunch of times as a result
    var elements = function(){ 

        var els =  {

            liC  : $('<li class="quote-container"></li>'),
            topC : $('<div class="top clearfix"></div>'),
            del  : $('<a href="#" class="delete-btn">DELETE THIS HERE QUOTE! ARGGHHHH! </a>'),
            divR : $('<div class="rating"></div>'),
            ul   : $('<ul class="quote-content"></ul>'),
            liQ  : $('<li class="quote-text"></li'),
            br   : $('<br>'),
            liA  : $('<li class="quote-author"></div>'),
        }

        return els;
    };


    //============================== Quote Constructor ==============================//
        
    var Quote = function(qText, qAuthor){

        this.qtext   = qText;
        this.author  = qAuthor;
        this.rating  = null;
        this.delNum = null;
        this.idNum   = idNum;
    }


    //============================== Generate quotes to page ==============================//
            
    // quoteGen is used to create an object for each quote 
        // --> then pushes that obj to an array of objects (idNum prop should match its index)
        // --> then we map over the array of quote objects and call quoteStruc(); on each element
        // --> quoteStruc then nukes and re-paves the quote section with the new quote added at the end. 
    var quoteGen = function(qText, qAuthor){

        // create object for the quote
        var quoteObject = new Quote(qText, qAuthor);

        quoteArr.push(quoteObject);

        idNum ++;

        quoteMap(quoteArr);
    };



    // loop over quoteArr -> call quoteStruc on each element to display it
    var quoteMap = function(arr) {

        $('.all-quotes').html(arr.map(function(obj) {

            // if we deleted the Quote object, it won't render since the index for that quote object will be undefined now
            if ( (obj !== undefined) ) {

            return quoteStruc(obj);

            }

        }).join('') );
    };

//============================== NEW STRUCTURE ==============================//

    // returns the quote information in the structure we specify
    var quoteStruc = function(obj){

        // fresh batch of elements
        var newEls = elements();

        // new vars so we don't have to use dot notation all over the place -> could get messy since we will be chaining methods
        var topC = newEls.topC;
        var del = newEls.del;
        var divR = newEls.divR;
        var liC = newEls.liC;
        var ul = newEls.ul;
        var liQ = newEls.liQ;
        var br = newEls.br;
        var liA = newEls.liA;

        // text will be dynamically added from $('.enter-quote').val() and $('add-author').val();
        liQ.text(obj.qtext);
        liA.text (obj.author);

        // create star container / star
        var star = $('<div class="stars"> &#9760 </div>');

        // append 5 of the star containers to the rate container
        var rate = divR.append(star.addClass('1'), star.clone().removeClass('1').addClass('2'), star.clone().removeClass('1').addClass('3'), star.clone().removeClass('1').addClass('4'), star.clone().removeClass('1').addClass('5') );


        // Adding data attribute to delete button --> UNIQUE TO EACH OBJECT
        del.attr('data-id', obj.idNum);

        // top bar is the delete button and the rating
        var topBar = topC.append(del, rate);

        // append topBar to container
        var qContain = liC.append(topBar);

        // append li*2 to ul
        var qContent = ul.append(liQ, br, liA);

        // append content to container --> will be appended below the topBar
        var whole = qContain.append(qContent);

        // console.log(whole.html());

        // Need to use dummy div b/c .html() only returns the inner html, so we were losing the container for each quote. 
        return $('<div></div>').append(whole).html();
    };







//===========================================================================//
                        /* ~~~ DYNAMIC BABY! ~~~ */ 
//===========================================================================//



//============================== Dynamically add quotes ==============================//
        
    // Click handler on submit-btn to add quotes
    $('.submit-btn').on('click', function(event) {

        event.preventDefault();

        //create the text I want (from input/textArea) as variables to pass into quoteGen();
        var quoteText = $('.enter-quote').val();
        var quoteAuthor = $('.add-author').val();

        if ( (quoteText.length !== 0) && (quoteAuthor.length !== 0) ) {

            //> last action is a create object --> need this here so it only gets called once
            lastAction.push({action : "create"});

            // remove text from the input/textarea
            $('.enter-quote').val('');
            $('.add-author').val('');

            // call quoteGen(); --> function is above here
            quoteGen(quoteText, quoteAuthor);

        } else if ( (quoteText.length === 0) || (quoteAuthor.length === 0) ) {

            if ( (quoteText.length === 0) && (quoteAuthor.length === 0) ) {

                $('input').addClass('red');
                $('textarea').addClass('red');

                setTimeout(function(){

                    $('input').removeClass('red');
                    $('textarea').removeClass('red');
                }, 1000);

            } else if ( quoteAuthor.length === 0 )  {

                $('input').addClass('red');

                setTimeout(function(){

                    $('input').removeClass('red');
                }, 1000);

            } else if ( quoteText.length === 0 ) {

                $('textarea').addClass('red');

                setTimeout(function(){

                    $('textarea').removeClass('red');
                }, 1000);
            }
        }
    });



    //===========================================================================//
                            /* ~~~ RATING ~~~ */ 
    //===========================================================================//
        
    // This is DOM element Driven -> Need to make it DATA DRIVEN 


//============================== HOVERING ==============================//
        
    //mouse over functionality
    $('.all-quotes').on('mouseover', '.stars', function() {

        var currentStar = findStarNum( $(this));

        var siblings = $(this).siblings();

        forEachStars(siblings, currentStar, starsAddHovered );
    });

    //mouse out functionality
    $('.all-quotes').on('mouseout', '.stars', function() {

        var currentStar = findStarNum( $(this));

        var siblings = $(this).siblings();

        forEachStars( siblings, currentStar, starsRemoveHovered );
    });

    // map thru stars array
    function forEachStars(arr, current, callback ) {

        // REMEMBER THIS > IS AWESOME > ALL HAIL RAPHAEL
            // forcing the context of the native forEach() method to be jquery array
            // siblings is a jquery array
        [].forEach.call(arr, function(el) {

            var $el = $(el);

            // treating our rating container div as an array of sorts
                // each have a numbered class on a sub-div (1-5)
            if ( findStarNum($el) < current ) {

                callback($el);
            }
        });
    }

    //addClass in forEachStars
    var starsAddHovered = function(jqEl) {

        jqEl.addClass('hovered');
    }

    // removeClass in forEachStars
    var starsRemoveHovered = function(jqEl) {

        jqEl.removeClass('hovered')
    }

    //addClass in forEachStars
    var starsAddClicked = function(jqEl) {

        jqEl.addClass('clicked');
    }

    // ---- NOT USED
    // var starsRemoveClicked = function(jqEl) {
    //     jqEl.removeClass('clicked');
    // }

    var findStarNum = function( obj ) {

        // returns the numeric class number as an int
        return parseInt( obj.attr('class').split(/\s+/)[1] );
    };

//============================== CLICKING AND RATING ==============================//


    //click handler for keeping ratings red and setting rating on our data object in quoteArr
    $('.all-quotes').on('click', '.stars', function() {

        var container = $(this).closest( $('.quote-container') )

        // this is the text in the <li class="quote-text"> that's associated with the star we click
        var quoteText = container.find('.quote-text').text();

        var rating = findStarNum( $(this) ); 

        // same as rating, but renamed for semantics
        var currentStar = findStarNum( $(this) );

        var siblings = $(this).siblings();

        // if we click on any skull that has the class clicked, remove clicked from this and all its sibling elements
        if ( $(this).hasClass('clicked') ) {

            $(this).removeClass('clicked');

            $(this).siblings('.stars').removeClass('clicked');

            resetRating(quoteText);

        // if we click on a skull that doesn't have the class clicked, we add clicked to this and all sibling elements that come before it
        } else if ( !( $(this).hasClass('clicked') ) ) {

            $(this).addClass('clicked');

            forEachStars(siblings, currentStar, starsAddClicked);

            // only set rating if the rating hasn't been set
            setRating(quoteText, rating);
        }
    });
        
    // set rating if the skull clicked doesn't have .clicked class
    var setRating = function(text, rating) {

        // call map on quoteArr and change rating if the qText prop is the same as the quoteText variable we set above
        [].map.call(quoteArr, function(el){

            for (key in el) {

                if ( el[key] === text ) {

                    // set rating to our rating variable    
                    el['rating'] = rating;
                }
            }
        });
    }

    // reset rating if the skull clicked has .clicked class
    var resetRating = function(text) {

        [].map.call(quoteArr, function(el){

            for (key in el) {

                if ( el[key] === text ) {

                    // set rating to null    
                    el['rating'] = null;
                }
            }
        });
    }

//============================== undo last action ==============================//

    $('.undo-btn').on('click', function(event) {

        event.preventDefault();

        //> need to bind all of this to the condition that we are not at our initial state or the page will crash

        if (lastAction.length >= 1){
            //> set variable to last element in lastAction array and also remove the action object from the array
            var last = lastAction.pop();

            if (last.action === 'create') {

                //> Need to decrement the idNum variable to reflect said non-existence of the object
                idNum --;

                //> Completely take the object out of the picture > as if it never existed
                quoteArr.pop();

                //> Need to re-run the map function to render the updated quoteArr
                quoteMap(quoteArr);

            } else if ( last.action === 'delete') {

                //> decrementing delNum var for consistency
                delNum --;

                //> set variable to last element in deleted array (will be a Quote object) and also remove the object from that array
                var lastDel = deleted.pop();

                //> set variable to the index it should have in quoteArr
                var quoteIndex = lastDel.idNum;

                //> if the last action was 'delete' then, the element at the quoteArr[quoteIndex] should be undefined > so we set it to whatever lastDel Quote object
                quoteArr[quoteIndex] = lastDel;

                //> re-run the map function with the new quoteArr
                quoteMap(quoteArr);
            }
        }
    });
        

//============================== Delete ==============================//

    // This will set our array index to undefined at the index of the quoteArr that corresponds to the data-it attribute of the unique delete-btn anchor
        // data-id should always reflect the order that the elements were created in the quoteArr
    $('.all-quotes').on('click', '.delete-btn', function(event) {

        event.preventDefault();

        var ident = parseInt( $(this).attr('data-id'), 10); // -> returns the index of the Quote object in the quoteArr AS  !!!

        // console.log("identity" + ident);

        var takingOut = quoteArr[ident]; // -> set takingOut variable to Quote object we are taking out

        // prevent the delNum assignment if the object already has one:
        if ( takingOut.delNum === null ) {

            takingOut['delNum'] = delNum; // -> set delNum prop on the object we take out

            delNum ++ // --> increment the delNum so we know which was the last deleted object
        }

        deletePush(takingOut);

        quoteArr[ident] = undefined; // -> remove the Quote object from the quoteArr

        quoteMap(quoteArr); //-> repopulate the array into the quote section

        lastAction.push({action : 'delete'}); //> make an array that stores a last action object in the last position of lastAction array
    });

    // push and sort
    var deletePush = function(obj) {

        deleted.push(obj); //> push the object into deleted array

        deleted.sort(function(a,b) { //> sort the deleted array in ascending order by delNum

            if (a.delNum > b.delNum) {

                return 1;

            } else if (a.delNum < b.delNum) {

                return -1;
            }
        });

    }

//===========================================================================//
                        /* ~~~ SORT BY RATING - NEW PAGE~~~ */ 
//===========================================================================//

    // will be a copy of the quoteArr, but sorted by rating instead
        // maybe have it link to a new page that is always sorted by rating
        // switching back and forth on the fly will be a pain in the ass 
    var ratingArr = [];

    var sortByRating = function() {

        debugger;

        ratingArr = quoteArr.slice(); 

        ratingArr = ratingArr.sort(function(a,b) {

            if (a.rating > b.rating) {

                return -1;

            } else if (a.rating < b.rating) {

                return 1;

            } else if (a.rating === b.rating) {

                if(a.idnum > b.idnum) {

                    return 1;

                } else if ( a.idnum < b.idnum ) {

                    return -1;

                } 
            }
        })

        quoteMap(ratingArr)
    }










// });