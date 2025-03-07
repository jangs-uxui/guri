
(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {

        //프린트
        $('.sharebox .printbox .print').on('click',function() {
            var $contents = $('#contents'),
                ContentsClass = $contents.attr('class');
            let $head = $('head').clone();
            let $contentsClone = $contents.clone();    // 프린트 할 특정 영역 복사

            let headHtml = $head[0].innerHTML
            let innerHtml = $contentsClone[0].innerHTML
            let popupWindow = window.open("", "_blank", "width=910,height=800")
            popupWindow.document.write('<!DOCTYPE html>'+'<html style="overflow:hidden;">'+
                '<head>'+headHtml+'</head>'+
                '<body><div id="contents" class="'+ContentsClass+'">'+innerHtml+'</div></body>'+'</html>')
            popupWindow.document.close();
            popupWindow.focus();

            setTimeout(function(){
                popupWindow.print();         // 팝업의 프린트 도구 시작
                popupWindow.close();       // 프린트 도구 닫혔을 경우 팝업 닫기
            }, 400);
        });




        $window.on('screen:tablet screen:phone', function(event) {
            
        });
    });
})(jQuery);