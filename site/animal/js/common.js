
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
        setTimeout(function () {
            //console.log(mode);
        }, 1);

        var scrollTop = $window.scrollTop(),
            ContainerOffset = $container.offset(),
            wrapperOffset = $wrapper.offset();
        if (LayoutType === 'normal') {
            if (scrollTop > wrapperOffset.top) {
                $wrapper.attr('data-nowtop', 'nontop');
            } else {
                $wrapper.attr('data-nowtop', 'top');
            }
        } else if (LayoutType === 'visualtype') {
            if (scrollTop > ContainerOffset.top - 250) {
                $wrapper.attr('data-nowtop', 'nontop');
            } else {
                $wrapper.attr('data-nowtop', 'top');
            }
        }
        $window.on('scroll', function (event) {
            var scrollTop = $window.scrollTop(),
                ContainerOffset = $container.offset(),
                wrapperOffset = $wrapper.offset(),
                headerIsActive = $wrapper.is('[data-nowtop="top"]');
            if (LayoutType === 'normal') {
                if (scrollTop > wrapperOffset.top) {
                    if (headerIsActive) {
                        $wrapper.attr('data-nowtop', 'nontop');
                    }
                } else {
                    $wrapper.attr('data-nowtop', 'top');
                }
            } else if (LayoutType === 'visualtype') {
                if (scrollTop > ContainerOffset.top - 250) {
                    if (headerIsActive) {
                        $wrapper.attr('data-nowtop', 'nontop');
                    }
                } else {
                    $wrapper.attr('data-nowtop', 'top');
                }
            }
        });









        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);