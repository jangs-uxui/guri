

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
		if(LayoutType=='normal'){
			if(scrollTop > wrapperOffset.top) {
				$wrapper.attr('data-nowtop', 'nontop');
			}else{
				$wrapper.attr('data-nowtop', 'top');
			};
		} else if(LayoutType=='visualtype'){
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
			if(LayoutType=='normal'){
				if(scrollTop > wrapperOffset.top) {
					if(headerIsActive){
						$wrapper.attr('data-nowtop', 'nontop');
					}
				}else{
					$wrapper.attr('data-nowtop', 'top');
				}
			} else if(LayoutType=='visualtype'){
				if(scrollTop > ContainerOffset.top-150) {
					if(headerIsActive){
						$wrapper.attr('data-nowtop', 'nontop');
					}
				}else{
					$wrapper.attr('data-nowtop', 'top');
				}
			}
		});

		//사이드
		var $side = $container.find('.side'),
			$sideDepthItem = $side.find('.depth_item'),
			$sideSpy = $side.find('.spy:last');

		$sideDepthItem.on('click.menu', function(event) {
			var $this = $(this),
				$depthText = $this.children('.depth_text'),
				eventTarget = event.target;

			if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
				if($this.hasClass('depth1_item')) {
					if($this.hasClass('active')) {
						$html.removeClass('side_open');
					}else{
						$html.addClass('side_open');
					}
				}

				if($this.children('.depth').length) {
					$this.toggleClass('active').siblings('.depth_item').removeClass('active');
					event.preventDefault();
				}
			}

			event.stopPropagation();
		}).each(function(index, element) {
			var $element = $(element);

			if($element.children('.depth').length) {
				$element.addClass('has');
			}else{
				$element.addClass('solo');
			}
		});

		if($sideSpy.length) {
			$html.addClass('side_open');
			$sideSpy.parents('.depth_item').addClass('active');
		}

		//여기서부터 코드 작성해주세요
		var $Pathbox = $('.contain_top .pathbox'),
			ListLength = $Pathbox.find('li.list').length;
		$Pathbox.attr('data-length', ListLength);
		$('.contain_top').attr('data-path', ListLength);
		$('.contain_top .pathbox .path ul li.list button').on('mouseenter focusin', function() {
			var $this = $(this),
				$MyParent = $this.parent('li.list'),
				$OtherParents = $MyParent.siblings('li.list'),
				$MyLayer = $this.siblings('.layer'),
				$OtherBtn = $OtherParents.find('button'),
				$OtherLayer = $OtherParents.find('.layer'),
				IsActive = $MyParent.is('.active');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$OtherBtn.attr('title', '목록열기');
				$OtherLayer.slideUp();
				$MyParent.addClass('active');
				$this.attr('title', '목록닫기');
				$MyLayer.slideDown();
			}
		});
		// $('.contain_top .pathbox .path ul li.list .layer').on('mouseleave', function() {
		// 	var $this = $(this),
		// 		$MyParent = $this.parent('li.list'),
		// 		$myBtn = $MyParent.find('>button');
		// 	$MyParent.removeClass('active');
		// 	$myBtn.attr('title', '목록열기');
		// 	$this.slideUp();
		// });
		$('.contain_top .pathbox .path ul li.list button').on('click', function() {
			var $this = $(this),
				$MyParent = $this.parent('li.list'),
				$OtherParents = $MyParent.siblings('li.list'),
				$MyLayer = $this.siblings('.layer'),
				$OtherBtn = $OtherParents.find('button'),
				$OtherLayer = $OtherParents.find('.layer'),
				IsActive = $MyParent.is('.active');
			if(IsActive){
				$MyParent.removeClass('active');
				$this.attr('title', '목록열기');
				$MyLayer.slideUp();
			}
		});
		//sns
		$('.sharebox .share_btn').on('click', function(){
			var $this = $(this),
				$share = $this.parent('.share'),
				$layer = $this.siblings('.layer'),
				OnOff = $share.is('.active'),
				NowState = $.screen.settings.state[0];
			if(!OnOff){
				$this.attr('title', 'sns 공유 닫기').text('sns 공유 닫기');
				$layer.slideDown();
				$share.addClass('active');
			} else{
				$share.removeClass('active');
				$this.attr('title', 'sns 공유 열기').text('sns 공유 열기');
				$layer.slideUp();
			};
		});

		//qr코드
		$('.sharebox .qr_btn').on('click', function(){
			var $this = $(this),
				$QRBox = $this.parent('.qrbox'),
				$layer = $this.siblings('.layer'),
				OnOff = $QRBox.is('.active'),
				NowState = $.screen.settings.state[0];
			if(!OnOff){
				$this.attr('title', 'qr코드 닫기').text('qr코드 닫기');
				$layer.slideDown();
				$QRBox.addClass('active');
			} else{
				$QRBox.removeClass('active');
				$this.attr('title', 'qr코드 열기').text('qr코드 열기');
				$layer.slideUp();
			};
		});

		$('.tab_menu').not($('.prettyprint').children()).each(function() {
			var li_length = $(this).find('ul.tab_list').find('li.tab_item').length;
			$(this).addClass('divide'+li_length);
		});

		$('table.responsive').not($('.prettyprint').children()).each(function() {
			var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
				TheadExist = $(this).find('thead').length;
			if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
				$(this).children('tbody').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
				$(this).children('tfoot').children('tr').find('th, td').each(function() {
					var ThisIndex = $(this).index(),
						TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
					$(this).attr('data-content', TheadText);
				});
			};
		});

		$('.temp_selectbox:not(.disabled) .select_btn').on('click', function(){
			var $this = $(this),
				$MyParent = $this.parent('.temp_selectbox'),
				IsActive = $MyParent.is('.active'),
				$Layer = $this.siblings('.layer');
			if(!IsActive){
				$MyParent.addClass('active');
				$Layer.slideDown();
				$this.attr('title', '하위메뉴닫기');
			} else{
				$MyParent.removeClass('active');
				$Layer.slideUp();
				$this.attr('title', '하위메뉴열기');
			}
		});
		$('.temp_selectbox .layer ul li button.select_item').on('click', function(){
			var $this = $(this),
				$MyParent = $this.parent('li'),
				IsActive = $MyParent.is('.active'),
				ThisText = $this.text(),
				$OtherParents = $MyParent.siblings('li'),
				$SelectBox = $this.parents('.temp_selectbox'),
				$Layer = $this.parents('.layer'),
				$SelectBtn = $Layer.siblings('.select_btn');
			$SelectBox.removeClass('active');
			$SelectBtn.text(ThisText).attr('title', '하위메뉴열기');
			$Layer.slideUp();
		});

		$('.tab_menu.scripttab .tab_list .tab_item button.tab_anchor').on('click', function(){
			var $this = $(this),
				$MyParent = $this.parent('li'),
				IsActive = $MyParent.is('.active'),
				ThisIndex = $MyParent.index(),
				$tab_panel = $this.parents('.tab_panel'),
				$tab_select = $tab_panel.siblings('.tab_select').find('.tablebox').find('span'),
				ThisText = $this.find('.tablebox').find('span').text(),
				$OtherParents = $MyParent.siblings('li'),
				$OtherBtns = $OtherParents.find('.tab_anchor'),
				$tab_content = $tab_panel.siblings('.tab_content'),
				$MyItem = $tab_content.find('.tabcon').eq(ThisIndex),
				$OtherItems = $MyItem.siblings('.tabcon');
			if(!IsActive){
				$OtherParents.removeClass('active');
				$OtherBtns.removeAttr('title');
				$MyParent.addClass('active');
				$this.attr('title', '선택됨');
				$OtherItems.removeClass('active');
				$MyItem.addClass('active');
				$tab_select.text(ThisText);
			}
		});
		
		//FAQ
		$('.temp_accordion .accordion_item button.accordion_btn').on('click', function() {
			var $this = $(this),
				$MyParent = $this.parent('.accordion_item'),
				IsActive = $MyParent.is('.active'),
				$MyLayer = $this.siblings('.accordion_con');
			if(!IsActive){
				$MyParent.addClass('active');
				$MyLayer.slideDown();
				$this.attr('title', '내용닫기');
			} else{
				$MyParent.removeClass('active');
				$MyLayer.slideUp();
				$this.attr('title', '내용열기');
			}
		});

		$window.on('screen:wide screen:web screen:tablet', function(event) {
			$('.temp_step').not($('.prettyprint').children()).each(function(){
				var $this = $(this),
					$li = $this.find('>ol>li');
				for (var i = 0; i < $li.length; i += 4) {
					$li.slice(i, i + 4).attr('data-slice', (i/4));
				}
				
			});
        });
		
        $window.on('screen:phone', function(event) {
			$('.temp_step').not($('.prettyprint').children()).each(function(){
				var $this = $(this),
					$li = $this.find('>ol>li');
				for (var i = 0; i < $li.length; i += 2) {
					$li.slice(i, i + 2).attr('data-slice', (i/2));
				}
				
			});
        });
		
		/* 스텝 자동 높이 */
		function stepAutoHeight(){
			var $step = $container.find('.temp_step'),
				$stepList = $step.find('.step_list'),
				$stepItem = $stepList.find('.step_item');

			$stepList.each(function (index, element) {
				var $element = $(element),
					$elementStepItem = $element.find('.step_item'),
					height = 0,
					width = 0,
					count;

				if($element.parent().hasClass('type3')){
					$($elementStepItem, element).each(function (index) {
						var $this = $(this),
							$thisStepBox = $this.parents('.step_box'),
							$thisboxHeight = $thisStepBox.find('.step_process').height();

						if ($thisboxHeight > height) {
							$this.eq(0).height($thisboxHeight);
						}

					});

				} else if(!$element.parent().hasClass('type3')){
					$($elementStepItem, element).each(function (index) {
						var $this = $(this),
							thisWidth = $this.find('.step_content').width(),
							thisHeight = $this.find('.step_content').height();

						if (thisWidth > width){
							width = thisWidth;
						}

						if (thisHeight > height) {
							height = thisHeight;
						}

						count = index + 1;
					}).height(height);
				}

			});
		}
		//stepAutoHeight();

		$window.on('screen', function(event) {
			//stepAutoHeight();
        });

		/*박스 자동 높이*/
		function boxAutoHeight(){
			var $colboxList = $container.find('.col_box'),
				$colboxItem = $colboxList.find('.col_item');

			$colboxList.each(function (index, element) {
				var $element = $(element),
					$elementcolboxItem = $element.find('.col_item'),
					height = 0,
					width = 0,
					count;
				$($elementcolboxItem, element).each(function (index) {
					var $this = $(this),
						$conbox = $this.find('.conbox');
					$conbox.removeAttr('style');
					var thisHeight = $conbox.height();
					if (thisHeight > height) {
						height = thisHeight;
					}

					count = index + 1;
				}).find('.conbox').height(height);

				$element.closest('.col_box').addClass('length' + count);
			});
		}
		function boxHeightClear(){
			var $colboxList = $container.find('.col_box');
			$colboxList.each(function (index, element) {
				var $element = $(element),
					$elementcolboxItem = $element.find('.col_item');
				$($elementcolboxItem, element).each(function (index) {
					var $this = $(this),
						$conbox = $this.find('.conbox');
					$conbox.removeAttr('style');
				});
			});
		}
		boxAutoHeight();
		$window.on('screen', function(event) {
			var NowState = $.screen.settings.state[0];
			if(NowState!='phone'){
				boxAutoHeight();
			}
		});
		$window.on('screen:phone', function(event) {
			boxHeightClear();
		});

		//템플릿탭버튼클릭시
		$('.template_tabmenu li:nth-child(8) a').on('click', function(){
			setTimeout(function(){
				boxAutoHeight();
			}, 1);
		});

		$('.temp_contact').not($('.prettyprint').children()).each(function(){
			var $This = $(this),
				$thisItems = $This.find('li.item'),
				IsMulti = $This.is('.multidoc');
			for (var i = 0; i < $thisItems.length; i += 2) {
				$thisItems.slice(i, i + 2).attr('data-slice', (i/2));
			}
			$thisItems.each(function(){
				var $this = $(this),
					$ThisBtnbox = $this.find('.btnbox'),
					$ThisBtns = $ThisBtnbox.find('.btns'),
					BtnsLength = $ThisBtns.length;
				if(!IsMulti){
					$this.attr('data-btnlength', BtnsLength);
				} else{
					var $attach_list = $this.find('.attach_list'),
						$attach_items = $attach_list.find('.attach_item');
					$attach_items.each(function(){
						var $thisItem = $(this),
							$ItemBtnbox = $thisItem.find('.btnbox'),
							$ItemBtns = $ItemBtnbox.find('.btns'),
							ItemBtnsLength = $ItemBtns.length;
						$thisItem.attr('data-btnlength', ItemBtnsLength);
					});
				}
			});
		});

		/*연락처박스 자동 높이*/
		function contactboxAutoHeight(){
			var $colboxList = $container.find('.temp_contact.divide2'),
				$colboxItem = $colboxList.find('.item');

			$colboxList.each(function (index, element) {
				var $element = $(element),
					$elementcolboxItem = $element.find('.item'),
					heightarray = [],
					ItemLength = $elementcolboxItem.length,
					ceilItemLength = Math.ceil(ItemLength/2);//올림(개수÷분할)
				for (var i = 0; i < ceilItemLength; i++) {
					heightarray.push(0);
				}
				$($elementcolboxItem, element).each(function (index) {
					var $this = $(this),
						ThisSlice = $this.attr('data-slice'),
						$conbox = $this.find('.conbox');
					$conbox.removeAttr('style');
					var thisHeight = $conbox.height();
					if (thisHeight > heightarray[ThisSlice]) {
						heightarray[ThisSlice] = thisHeight;
					}
				});
				for (var i = 0; i < ceilItemLength; i++) {
					$element.find('.item[data-slice="'+i+'"]').find('.conbox').height(heightarray[i]);
				}
				
			});
		}
		function contactboxAutoHeightClear(){
			var $colboxList = $container.find('.temp_contact.divide2'),
				$colboxItem = $colboxList.find('.item');
			$colboxList.each(function (index, element) {
				var $element = $(element),
					$elementcolboxItem = $element.find('.item');//올림(개수÷분할)
				$($elementcolboxItem, element).each(function (index) {
					var $this = $(this),
						$conbox = $this.find('.conbox');
					$conbox.removeAttr('style');
				});
			});
		}
		setTimeout(function(){
			contactboxAutoHeight();
		}, 200);
		$window.on('screen', function(event) {
			var NowState = $.screen.settings.state[0];
			if(NowState!='phone'){
				contactboxAutoHeight();
			}
		});
		$window.on('screen:phone', function(event) {
			contactboxAutoHeightClear();
		});

		//템플릿탭버튼클릭시
		$('.template_tabmenu li:nth-child(10) a, .template_tabmenu li:nth-child(13) a').on('click', function(){
			setTimeout(function(){
				contactboxAutoHeight();
			}, 1);
		});
		
		//초기로딩시 map 제거
		$('.tab_obj.n13 .temp_locationbox').each(function () {
			var $location_map = $(this).find('.location_map');
			setTimeout(function(){
				//$location_map.empty();
			}, 100);
		});
		$('.template_tabmenu li:not(:nth-child(13)) a').on('click', function(){
			$('.tab_obj.n13 .temp_locationbox').each(function () {
				var $location_map = $(this).find('.location_map');
				$location_map.empty();
			});
		});
		$('.template_tabmenu li:nth-child(13) a').on('click', function(){
			$('.tab_obj.n13 .temp_locationbox').not($('.tabcon:not(.active)').children()).each(function () {
				var $this = $(this),
					$location_map = $this.find('.location_map'),
					ThisLat = $location_map.attr('data-lat'),
					ThisLng = $location_map.attr('data-lng'),
					Thismarkersrc = $location_map.attr('data-markersrc'),
					ThismarkerSize = $location_map.attr('data-markersize'),
					Thismarkerpoint = $location_map.attr('data-markerpoint');
				$location_map.empty();
				setTimeout(function(){
					$location_map.checkMap({
						lat : ThisLat,
						lng : ThisLng,
						markersrc : Thismarkersrc,
						markerSize : ThismarkerSize,
						markerpoint : Thismarkerpoint
					});
				}, 10);
			});
		});

		$('.tab_menu.apitab .tab_anchor').on('click', function(){
			var $thisBtn = $(this),
				$ThisTabpannel = $thisBtn.parents('.tab_panel'),
				$ThisParent = $thisBtn.parent('.tab_item'),
				IsActive = $ThisParent.is('.active'),
				ParentIndex = $ThisParent.index(),
				$tab_content = $ThisTabpannel.siblings('.tab_content'),
				$ThisCon = $tab_content.find('.tabcon').eq(ParentIndex),
				$OtherConBox = $ThisCon.siblings('.tabcon');
			if(IsActive){
				$OtherConBox.find('.location_map').empty();
				$ThisCon.find('.temp_locationbox').each(function () {
					var $this = $(this),
						$location_map = $this.find('.location_map'),
						ThisLat = $location_map.attr('data-lat'),
						ThisLng = $location_map.attr('data-lng'),
						Thismarkersrc = $location_map.attr('data-markersrc'),
						ThismarkerSize = $location_map.attr('data-markersize'),
						Thismarkerpoint = $location_map.attr('data-markerpoint');
					$location_map.empty();
					setTimeout(function(){
						$location_map.checkMap({
							lat : ThisLat,
							lng : ThisLng,
							markersrc : Thismarkersrc,
							markerSize : ThismarkerSize,
							markerpoint : Thismarkerpoint
						});
					}, 10);
				});
			}
		});

		//레이어팝업
		$(".popup_btn").click(function () {
			var $popup = $(this).siblings('.popup');
			$popup.addClass('on');
		});
		$(".popup_close").click(function () {
			$('.popup').removeClass('on');
		})

		//레이어팝업 type2
		$(".popup_btn_type2").click(function () {
			var $popup = $(this).siblings('.popup_type2');
			$popup.addClass('on');
		});
		$(".popup_close_type2").click(function () {
			$('.popup_type2').removeClass('on');
		})

		//맨위로
		var $htmlBody = $('html, body'),
			$wrapper = $('#wrapper'),
			$footer = $('#footer'),
			$footerCon = $('.footer_con'),
			$up = $footerCon.find('.up'),
			$upButton = $up.find('.up_button');

		$upButton.click(function (event) {
			$htmlBody.animate({
				scrollTop : $wrapper.offset().top
			},{
				duration : 250
			});
			event.preventDefault();
		});

		$window.scroll(function(){
			var scrollTop = $window.scrollTop();
			if(scrollTop > 1){
				$upButton.addClass('active');
			}else{
				$upButton.removeClass('active');
			}
		});


		//3개짜리 본문강조 높이 맞추기
		function iconboxAutoHeight(){
			var $colboxList = $container.find('.temp_iconlistbox.divide3'),
				$colboxItem = $colboxList.find('.listitem');

			$colboxList.each(function (index, element) {
				var $element = $(element),
					$elementcolboxItem = $element.find('.listitem'),
					height = 0,
					width = 0,
					count;
				$($elementcolboxItem, element).each(function (index) {
					var $this = $(this),
						$conbox = $this.find('.box_wrap');
					$conbox.removeAttr('style');
					var thisHeight = $conbox.height();
					if (thisHeight > height) {
						height = thisHeight;
					}

					count = index + 1;
				}).find('.box_wrap').height(height);

				$element.closest('.temp_iconlistbox.divide3').addClass('length' + count);
			});
		}
		function iconboxHeightClear(){
			var $colboxList = $container.find('.temp_iconlistbox.divide3');
			$colboxList.each(function (index, element) {
				var $element = $(element),
					$elementcolboxItem = $element.find('.listitem');
				$($elementcolboxItem, element).each(function (index) {
					var $this = $(this),
						$conbox = $this.find('.box_wrap');
					$conbox.removeAttr('style');
				});
			});
		}
		iconboxAutoHeight();
		$window.on('screen', function(event) {
			var NowState = $.screen.settings.state[0];
			if(NowState!='phone'){
				iconboxAutoHeight();
			}
		});
		$window.on('screen:phone', function(event) {
			iconboxHeightClear();
		});
    });
})(jQuery);