// 오른쪽 공백 제거
function Rtrim( str ) {
	var src = new String(str);
	var tmp = new String();
	var i,lastnum, len = src.length;
	for(i = len;i >= 0;i--) {
		tmp = src.substring(i,i-1);
		if (tmp != ' ' ) {
			lastnum = i;
			break;
		}
	}
	tmp = src.substring(0,lastnum);
	return tmp;
}

// 왼쪽 공백 제거
function  Ltrim( str ) {
	var src = new String( str );
	var tmp = new String();
	var i,firstnum, len = src.length;
	for(i = 0;i < len ;i++) {
		tmp = src.substring(i,i+1);
		if (tmp != ' ' ) {
			firstnum = i;
			break;
		}
	}
	tmp = src.substring(firstnum);
	return tmp;
}

// 양쪽 공백 제거
//function Trim( str ) {
//	var src = new String(str);
//	var tmp = new String();
//	tmp = Ltrim(Rtrim(str));
//	return tmp;
//}

// 날짜 체크
function isYYYYMMDD(y, m, d) { 
	switch (m) { 
	case 2: 
		if (d > 29) return false; 
		if (d == 29)
			if ((y % 4 != 0) || (y % 100 == 0) && (y % 400 != 0)) return false; 
		break; 
	case 4: 
	case 6: 
	case 9: 
	case 11: 
		if (d == 31) return false; 
	} 
	return true; 
} 

// 숫자유무
function isNumeric(s) { 
	for (i=0; i<s.length; i++) { 
		c = s.substr(i, 1); 
		if (c < "0" || c > "9") return false; 
	} 
	return true; 
}

function fn_isRadioChecked( frm, fieldNm) {
	var flag = false;
	for( var LoopI=0; LoopI<frm[fieldNm].length; LoopI++ ) {
		if( frm[fieldNm][LoopI].checked == true ) {
			flag = true;
			break;
		}
	}
	return flag;
}

function fn_setFocus( frm, fieldNm ) {
	frm[fieldNm].focus();
}

function fn_getMessage( fieldType, label ) {
	var msg = "";
	if( fieldType == "SELECT" ) {
		msg = label + "(을)를 선택 해주세요.";
	} else if( fieldType == "INPUT" ) {
		msg = label + "(을)를 입력 해주세요.";
	}
	return msg;
}

function fn_isEmpty( frm, fieldNm ) {
	return ( !Trim(frm[fieldNm].value) ) ? true : false;
}

function fn_trim(str) {
  return str.replace(/(^\s*)|(\s*$)/gi, "");
}

function findDoro(){
	var pop = window.open("/common/juso/jusoPopup.jsp","pop","width=570,height=420, scrollbars=yes, resizable=yes");
}

function jusoCallBack(roadFullAddr, roadAddrPart1, addrDetail, roadAddrPart2, engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn){
	$('#zip').val(zipNo);
	$('#rdnmadr').val(roadAddrPart1 + ' ' + roadAddrPart2 + ' ' + addrDetail);
	$('#adres').val(jibunAddr + ' ' + addrDetail);
	$('#detailAdres').val(addrDetail);
}

function numberKeyPress(e) {
	var key;

	if(window.event)
		key = window.event.keyCode; //IE
	else
		key = e.which; //firefox
	
	// backspace or delete or tab
	var event;
	if (key == 0 || key == 8 || key == 46 || key == 9 || key == 13){
		event = e || window.event;
		if (typeof event.stopPropagation != "undefined") {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
		
		return;
	}
	
	if (key < 48 || (key > 57 && key < 96) || key > 105  || e.shiftKey) {
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
	}
}

function Trim(str) {
	str	+= '';
	return str.replace(/^\s*|\s*$/g, '');
}

function maxLengthCheck(object){
	if (object.value.length > object.maxLength){
		object.value = object.value.slice(0, object.maxLength);
	}   
}