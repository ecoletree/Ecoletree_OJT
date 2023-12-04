/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : sgKim
 * @CreateDate : 2018. 06. 12.
 * @DESC : [관리자웹] 팝업창
 ******************************************************************************/
(function(et, ctrl) {
	if (_.isObject(et) && et.name === ETCONST.PROJECT_NAME) {
		if (!et.alert || et.alert.name !== "ETAdminAlert") {
			et.alert = ctrl(et);
		}
	} else {
		console.error("ecoletree OR ETCONST is not valid. please check that common.js file was imported.");
	}
}(this.ecoletree, function(et) {
	
	"use strict";
	
	var ctrl = {};
	
	ctrl.name = "ETAdminAlert";
	ctrl.alertId = "#popAlert";
	
	ctrl.isBtnClose = false;
	ctrl.actionFn = null;
	ctrl.postData = null;
	
	// ============================== 동작 컨트롤 ==============================
	/**
	 * alert 호출
	 * 
	 * @param {string} msgType 메시지 타입. ETCONST.ALERT_TYPE 값 사용.
	 * @param {string} title 팝업 타이틀
	 * @param {string} message 팝업에 출력할 메시지
	 * @param {function|string} actionFn 확인 버튼을 클릭하면 동작할 함수를 등록. 문자열일 경우 dom id로
	 * 판별하여 해당 dom에 focus
	 * @param {} postData actionFn이 함수일 경우, 함수의 arguments로 전달할 값.
	 */
	ctrl.show = function(type, title, message, actionFn, postData) {
		var self = this;
		var isConfirm = type === ETCONST.ALERT_TYPE_CONFIRM;
		
		self.actionFn = actionFn;
		self.postData = postData;
		
		$("#popAlert_title").html(title);
		$("#popAlert_message").html(message);
		$("#popAlert_btnPrimary").one("click", self.btnPrimary_clickEventListner);
		$("#popAlert_btnDefault").toggle(isConfirm);
		
		$(self.alertId).modal({
			backdrop : isConfirm ? "static" : true,
			show : true
		}).one("shown.bs.modal", self.popup_shownEventListner).one("hidden.bs.modal", self.popup_hiddenEventListner);
	};
	
	/**
	 * alert 호출
	 * 
	 * @param {string} msgType 메시지 타입. ETCONST.ALERT_TYPE 값 사용.
	 * @param {string} title 팝업 타이틀
	 * @param {string} message 팝업에 출력할 메시지
	 * @param {array} btnNames 팝업에 출력할 버튼 레이블
	 * @param {function|string} actionFn 확인 버튼을 클릭하면 동작할 함수를 등록. 문자열일 경우 dom id로
	 * 판별하여 해당 dom에 focus
	 * @param {} postData actionFn이 함수일 경우, 함수의 arguments로 전달할 값.
	 */
	ctrl.showCustomBtn = function(type, title, message, btnNames, actionFn, postData) {
		var self = this;
		var isConfirm = type === ETCONST.ALERT_TYPE_CONFIRM;
		
		self.actionFn = actionFn;
		self.postData = postData;
		
		$("#popAlert_title").html(title);
		$("#popAlert_message").html(message);
		if (btnNames != null) {
			$("#popAlert_btnPrimary").html(btnNames[0]);
			$("#popAlert_btnDefault").html(btnNames[1]);
		}
		$("#popAlert_btnPrimary").one("click", self.btnPrimary_clickEventListner);
		$("#popAlert_btnDefault").toggle(isConfirm);
		
		$(self.alertId).modal({
			backdrop : isConfirm ? "static" : true,
					show : true
		}).one("shown.bs.modal", self.popup_shownEventListner).one("hidden.bs.modal", self.popup_hiddenEventListner);
	};
	
	// ============================== 이벤트 리스너 ==============================
	/**
	 * 팝업이 화면에 등장한 뒤 동작
	 */
	ctrl.popup_shownEventListner = function(e) {
		var self = ecoletree.alert;
		$("#popAlert_btnPrimary").focus();
	};
	
	/**
	 * 팝업이 닫힌 뒤 동작, actionFn이 있으면 관련 동작을 수행.
	 */
	ctrl.popup_hiddenEventListner = function(e) {
		var self = ecoletree.alert;
		
		if (self.isBtnClose) { // 확인 버튼 클릭시
			if (_.isFunction(self.actionFn)) { // 동작시킬 함수
				self.actionFn(self.postData);
			} else if (_.isString(self.actionFn)) { // 특정 dom id
				$(self.actionFn).focus();
			}
		}
		
		// 팝업 지역변수 초기화
		self.isBtnClose = false;
		self.actionFn = null;
		self.postData = null;
		$("#popAlert_btnPrimary").html("확인");
		$("#popAlert_btnDefault").html("취소");
	};
	
	/**
	 * 확인 버튼 클릭시 동작, isBtnClose을 true로 변경하고 팝업을 닫는다.
	 */
	ctrl.btnPrimary_clickEventListner = function(e) {
		var self = ecoletree.alert;
		self.isBtnClose = true;
		$(self.alertId).modal("hide");
	};
	
	return ctrl;
}));