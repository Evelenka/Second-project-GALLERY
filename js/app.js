$(document).ready(function () {
    
        var next = $('.arrow-right');
        var prev = $('.arrow-left');              
        
    // ------ small slider ------
        var ul = $('.photo-wrap-small');
        var li = ul.find('li');
//        var width = 0;

    // ------ large slider ------
        var ulLarge = $('.slider-wrap');
        var liLarge = ulLarge.find('li');
//        var widthLarge = 0; 
    
        var indexSmall = 1;
        var indexLarge = 1;
    
    function resizeSlider() {
        console.log('resizeSlider');
        
        width = $('.photo-wrap-container').width(); 
        widthLarge = $('.site-right').width();
        widthTitle = $('.title-sec-pagin').width();
        
        console.log(width, widthLarge);
        
        ul.css('left', -(indexSmall * width)).width(width * 6);
        
        ulLarge.css('left', -(indexLarge * widthLarge)).width(widthLarge * 6);        
    }   
    
    function slider() {
                
        resizeSlider(); 
        
        //klonowanie pierwszego elem sliderow w celu plynnego przejscia miedzy ostatnim elementem a pierwszym
        var el = li.eq(0).clone(true);
        el.appendTo(ul);
        console.log(li.length);  
        
        var elLarge = liLarge.eq(0).clone(true);
        elLarge.appendTo(ulLarge);
        console.log(liLarge.length);
        
        //klonowanie ostatniego elem sliderow
        var elLast = li.eq(3).clone(true);
        elLast.prependTo(ul);
        
        var elLargeLast = liLarge.eq(3).clone(true);
        elLargeLast.prependTo(ulLarge);
        
        //ustawianie szerokosci ul rownej szerokosci wszystkich li
        ul.width((li.length+2) * width);
        ul.css('left', -width);
        
        ulLarge.width((liLarge.length+2) * widthLarge);
        ulLarge.css('left', -widthLarge);
        
        next.on('click', function () {
            ++indexSmall;
            ++indexLarge;
            console.log(width);
            
            if (indexSmall > li.length) {
                indexSmall = 0;
            }
            
            if (indexLarge > liLarge.length) {
                indexLarge = 0;
            }

            ul.animate({
                left: -(indexSmall * width)
            }, 1200, function(){
//                console.log(indexSmall);
                if (indexSmall == li.length) {
                    ul.css('left', 0);
                    indexSmall = 0;
                }
            });
            
            ulLarge.animate({
                left: -(indexLarge * widthLarge)
            }, 1200, function() {
//                console.log(indexLarge);
                if (indexLarge == liLarge.length) {
                    ulLarge.css('left', 0);
                    indexLarge = 0;
                }
            });
            
        });

        prev.on('click', function () {
            --indexSmall;
            --indexLarge;
            
            if (indexSmall < 0) {
                indexSmall = li.length - 1;
            }
            
            if (indexLarge < 0) {
                indexLarge = liLarge.length - 1;
            }

            ul.animate({
                left: -(indexSmall * width)
            }, 1200, function(){
                console.log(indexSmall);
                if (indexSmall == 0) {
                    indexSmall = 4;
                    ul.css('left', -(indexSmall * width)+'px');
                    
                }
            });
            
            ulLarge.animate({
                left: -(indexLarge * widthLarge)
            }, 1200, function(){
                console.log(indexLarge);
                if (indexLarge == 0) {
                    indexLarge = 4;
                    ulLarge.css('left', -(indexLarge * widthLarge)+'px');
                }
            });
        });
        
        }

    $(window).on('load', function () {
        slider();
        
        $(window).on('resize', function () {    
            resizeSlider();
            
        });
        
    });
});