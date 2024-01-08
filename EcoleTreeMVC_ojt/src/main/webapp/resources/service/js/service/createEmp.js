/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : jjy
 * @CreateDate : 2024. 01. 08.
 * @DESC : 사원 생성
 ******************************************************************************/
(function(et, ctrl) {
	if (_.isObject(et) && et.name === ETCONST.PROJECT_NAME) {
		if (!et.vc || et.vc.name !== "createEmp") {
			et.vc= ctrl(et);
		}
		
	} else {
		console.error("ecoletree OR ETCONST is not valid. please check that common.js file was imported.");
	}
}(this.ecoletree, function(et) {
	
	"use strict";
	
	var ctrl = {};
	
	ctrl.name = "createEmp";
	ctrl.path = "/sample";
	
	// ============================== 화면 컨트롤 ==============================
	/**
	 * init VIEW
	 */
	ctrl.init = function(initData) {
		var self = et.vc;
		ETService().setSuccessFunction(self.codeSuccessResultFunction).callService(self.path + "/code", {});
		self.setValidation();
		$("#btnAdd").click(self.btnCreateClickHandler);
	};

	/**
	 * codeList 값 호출
	 */
	ctrl.codeSuccessResultFunction = function(result) {
	    var self = et.vc;
	    if (result.message === "success") {
	        var codeList = result.data;
	        et.makeSelectOption(codeList, {value: "code_cd", text: "code_name"}, "#selPosition", "전체");
	    }
	}

	// ============================== 동작 컨트롤 ==============================
	// ============================== 이벤트 리스너 ==============================
	/**
	 * 생성 버튼 클릭 핸들러
	 */
	ctrl.btnCreateClickHandler = function(){
		var self = et.vc;
		$("#addForm").submit();
	}
	// ============================== DataTables 생성, 이벤트들 ==============================
	// ============================== Form 리스너 ==============================
	
	/**
	 * 유효성 검사 셋팅
	 */
	ctrl.setValidation = function(){
		var self = et.vc;
		var editValidation = new ETValidate("addForm").setSubmitHandler(self.createSubmitHandler).setShowErrors(et.setErrorFunction());
		
		//전화번호 유효성 검사(3자리 - 3or4자리 - 4자리), 빈값은 허용
		ETValidate.addMethod("validPhoneNumber", function(value, element, params) {
			if(value === undefined || value.length == 0){
				return true;
			}
			var phonePattern = /^\d{3}-\d{3,4}-\d{4}$/;
			return phonePattern.test(value);
		});
		
		//생년월일 유효성 검사(YYYY.MM.DD or YYYY-MM-DD), MM에 1자리, 2자리 둘 다 허용(1월생이면 01 또는 1)
		ETValidate.addMethod("validBirthDay", function(value, element, params) {
			if(value === undefined || value.length == 0){
				return true;
			}
			var birthDayPattern = /^\d{4}[.|-]\d{1,2}[.|-]\d{1,2}$/g;
			return birthDayPattern.test(value);
		});
		
		//한글 이름 유효성 검사(한글만 입력 가능)
		ETValidate.addMethod("validKorName", function(value, element, params) {
			var korNamePattern = /^[가-힣]+$/;
			return korNamePattern.test(value);
		});
		
		//영문 이름 유효성 검사(영어만 입력 가능)
		ETValidate.addMethod("validEngName", function(value, element, params) {
			if(value === undefined || value.length == 0){
				return true;
			}
			var engNamePattern = /^[A-Za-z]+$/;
			return engNamePattern.test(value);
		});
		
		editValidation.validateRules("emp_name", editValidation.REQUIRED, "이름은 필수입니다.");
		editValidation.validateRules("emp_name", validKorName, "이름은 한글만 입력 가능합니다.");
		editValidation.validateRules("emp_engname", "validEngName", "영문 이름은 영어만 입력해주세요.");
		editValidation.validateRules("department", editValidation.REQUIRED, "부서는 필수입니다.");
		editValidation.validateRules("position", editValidation.REQUIRED, "직급은 필수입니다.");
		editValidation.validateRules("email_1", editValidation.REQUIRED, "메일주소1은 필수입니다.");
		editValidation.validateRules("email_1", editValidation.EMAIL, "메일주소1을 이메일 형식으로 입력하세요.");
		editValidation.validateRules("email_2", editValidation.EMAIL, "메일주소2를 이메일 형식으로 입력하세요.");
		editValidation.validateRules("phone_num", editValidation.REQUIRED, "전화번호는 필수입니다.");
		editValidation.validateRules("phone_num", "validPhoneNumber", "전화번호 형식은 XXX-XXXX-XXXX입니다.");
		editValidation.validateRules("birthday", "validBirthDay", "생년월일의 형식은 YYYY.MM.DD 또는 YYYY-MM-DD 입니다.");
		editValidation.validateRules("emc_phone_num", "validPhoneNumber", "전화번호 형식은 XXX-XXXX-XXXX입니다.");
		editValidation.apply();
	}

	/**
	 * 생성 제출 콜백 핸들러
	 */
	ctrl.createSubmitHandler = function(form){
		var self = et.vc;
		var formData = ETValidate.convertFormToObject(form, true, true);
		console.log(formData); // 
		//new ETService().setSuccessFunction(self.createSuccessSubmitHandler).callService(self.path + "/create", {});
	}
	
	/**
	 * 제출 성공 콜백 핸들러
	 */
	ctrl.createSuccessSubmitHandler = function(result){
		var self = et.vc;
		if(result.message === "success"){
			
		}
	} 
	return ctrl;
	}));
