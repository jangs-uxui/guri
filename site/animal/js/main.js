
(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {

        var $body = $('body'),
            $wrapper = $('#wrapper'),
            $container = $('#container');

        var LayoutType = $body.attr('data-layouttype');
        setTimeout(function(){
            //console.log(mode);
        }, 1);

        var scrollTop = $window.scrollTop(),
            ContainerOffset = $container.offset(),
            wrapperOffset = $wrapper.offset();
        if(LayoutType==='normal'){
            if(scrollTop > wrapperOffset.top) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            }
        } else if(LayoutType==='visualtype'){
            if(scrollTop > ContainerOffset.top-150) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            }
        }
        $window.on('scroll', function(event) {
            var scrollTop = $window.scrollTop(),
                ContainerOffset = $container.offset(),
                wrapperOffset = $wrapper.offset(),
                headerIsActive = $wrapper.is('[data-nowtop="top"]');
            if(LayoutType==='normal'){
                if(scrollTop > wrapperOffset.top) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    }
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                }
            } else if(LayoutType==='visualtype'){
                if(scrollTop > ContainerOffset.top-150) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    }
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                }
            }
        });



        //메인 팝업
        const $mainPopup = $('.main_popup .main_slide .slide_list');
        $mainPopup.slick({
            autoplay: true,
            autoplaySpeed: 4000,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            fade: true,
            speed: 600,
            arrows: false,
            pauseOnDotsHover: true,
            swipe: true,
            draggable: true,
            zIndex: 10,
            //추가 기능
            autoArrow: $('.main_slide .slide_control .auto'),
            isRunOnLowIE: false,
            pauseOnArrowClick: true,
            pauseOnDirectionKeyPush: true,
            pauseOnSwipe: true,
            pauseOnDotsClick: true,
            pauseText: '정지',
            playText: '재생',
            total: $('.main_slide .slide_control .total'),
            current: $('.main_slide .slide_control .current'),
        });

        // 바로가기 슬라이드(모바일)
        const $shortcutSlide = $('.shortcut .shortcut_list');
        $shortcutSlide.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            swipe: true,
            draggable: true,
            arrows: false,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 561,
                    settings: {
                        slidesToShow: 3,
                    }
                }, {
                    breakpoint: 421,
                    settings: {
                        slidesToShow: 2,
                    }
                }]
        });


        // adopt slide
        const $conItem = $('.adopt .right .con_item'),
            conItemIndex = $conItem.index(),
            $slide_control = $('.adopt .left .control_box .slide_control');
        $conItem.each(function () {
            let $this = $(this),
                thisIndex = $this.index(),
                $thisAdoptSlide = $this.find('.adopt_slide .slide_list'),
                $thisControlBox = $slide_control.eq(thisIndex);
            $thisAdoptSlide.slick({
                autoplay: false,
                dots: false,
                slidesToShow: 2,
                slidesToScroll: 1,
                variableWidth: true,
                infinite: true,
                arrows: true,
                prevArrow: $thisControlBox.find('.prev'),
                nextArrow: $thisControlBox.find('.next'),
                pauseOnDotsHover: true,
                swipe: true,
                draggable: true,
                //추가 기능
                isRunOnLowIE: false,
                pauseOnArrowClick: true,
                pauseOnDirectionKeyPush: true,
                pauseOnSwipe: true,
                pauseOnDotsClick: true,
                pauseText: '정지',
                playText: '재생',
                total: $('.adopt_slide .countbox .total'),
                current: $('.adopt_slide .countbox .current'),
                responsive: [
                    {
                        breakpoint: 1001,
                        settings: {
                            slidesToShow: 2,
                            variableWidth: false
                        }
                    }, {
                        breakpoint: 481,
                        settings: {
                            slidesToShow: 1,
                            variableWidth: false
                        }
                    }]
            });

        });

        // adopt tab
        const $adoptTabBtn = $('.adopt .tab_item .tab_btn');
        $adoptTabBtn.on('click', function () {
            let $thisBtn = $(this),
                $thisItem = $thisBtn.closest('.tab_item'),
                thisIndex = $thisItem.index(),
                IsActive = $thisItem.hasClass('active'),
                $otherItems = $thisItem.siblings('.tab_item'),
                $otherBtn = $otherItems.find('.tab_btn'),
                $thisConItem = $('.adopt .tab_con .con_item').eq(thisIndex),
                $thisAdoptSlide = $thisConItem.find('.slide_list'),
                $otherConItems = $thisConItem.siblings('.con_item'),
                $thisControl = $('.adopt .left .control_box .slide_control').eq(thisIndex),
                $otherControl = $thisControl.siblings('.slide_control');
            if (!IsActive) {
                $thisItem.addClass('active');
                $otherItems.removeClass('active');
                $thisBtn.attr('title', '선택됨');
                $otherBtn.removeAttr('title');
                $thisConItem.addClass('active');
                $otherConItems.removeClass('active');
                $thisControl.addClass('active');
                $otherControl.removeClass('active');
                $thisAdoptSlide.slick('setPosition');
            }
        });

        //스크롤컨텐츠
        const $scrollContent = $('.scroll_content');
        $scrollContent.each(function () {
            let $this = $(this),
                scrollTop = $window.scrollTop(),
                scrollBottom = scrollTop + $window.height(),
                contentOffset = $this.offset();
            if (scrollBottom > contentOffset.top + 20) {
                $this.addClass('active');
            }
        });
        $window.on('scroll', function (event) {
            $scrollContent.each(function () {
                let $this = $(this),
                    scrollTop = $window.scrollTop(),
                    scrollBottom = scrollTop + $window.height(),
                    contentOffset = $this.offset();
                if (scrollBottom > contentOffset.top + 20) {
                    $this.addClass('active');
                } else {
                    // $this.removeClass('active');
                }
            });
        });











        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);