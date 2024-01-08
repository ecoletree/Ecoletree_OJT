/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : jsw
 * @CreateDate : 2023. 12. 06.
 * @DESC : script sample
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
		self.setValidation();
		$("#btnAdd").click(self.btnCreateClickHandler);
	};
	
	
	// ============================== 동작 컨트롤 ==============================

	// ============================== 이벤트 리스너 ==============================
	/**
	 * 생성 버튼 클릭시 핸들러
	 */
	ctrl.btnCreateClickHandler = function(){
		var self = et.vc;
		$("#addForm").submit();
	}
	// ============================== DataTables 생성, 이벤트들 ==============================

	// ============================== Form 리스너 ==============================
	
	/**
	 * 데이터의 유효성 검사(필수로 들어가야하는 데이터 검증)
	 */
	ctrl.setValidation = function(){
		var self = et.vc;
		var editValidation = new ETValidate("addForm").setSubmitHandler(self.createSubmitHandler).setShowErrors(et.setErrorFunction());
		
		ETValidate.addMethod("validPhoneNumber", function(value, element, params) {
		    var phoneNumber = value.replace(/[\s-]/g, '');
		    var phoneNumberLength = phoneNumber.length;
		    
		    return (phoneNumberLength === 11) && /^\d+$/.test(phoneNumber);
		});
		
		ETValidate.addMethod("validBirthDayFormat", function(value, element, params) {
			var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
		    if ( !regex.test(value)) {
       			 return false;
    		}
		});
		
		ETValidate.addMethod("twoNumber", function(value, element, params){
			return value.length === 2;
		});
		
		editValidation.validateRules("phone_num", "validPhoneNumber", "전화번호 형식은 010-XXXX-XXXX입니다.");
		editValidation.validateRules("birthday", "validBirthDayFormat", "생년월일의 형식은 yyyy-mm-dd 입니다.");
		editValidation.validateRules("department", "twoNumber", "부서는 두글자로 이루어집니다.");
		
		editValidation.validateRules("emp_name", editValidation.REQUIRED, "이름은 필수입니다.");
		editValidation.validateRules("emp_engname", editValidation.REQUIRED, "영문 이름은 필수입니다.");
		editValidation.validateRules("department", editValidation.REQUIRED, "부서는 필수입니다.");
		editValidation.validateRules("position", editValidation.REQUIRED, "직급은 필수입니다.");
		editValidation.validateRules("email_1", editValidation.REQUIRED, "메일주소1은 필수입니다.");
		editValidation.validateRules("email_2", editValidation.REQUIRED, "메일주소2는 필수입니다.");
		editValidation.validateRules("phone_num", editValidation.REQUIRED, "전화번호는 필수입니다.");
		editValidation.validateRules("birthday", editValidation.REQUIRED, "생년월일은 필수입니다.");
		editValidation.validateRules("address", editValidation.REQUIRED, "주소는 필수입니다.");
		editValidation.validateRules("emc_contact_point", editValidation.REQUIRED, "이름(관계)는 필수입니다.");
		editValidation.validateRules("emc_phone_num", editValidation.REQUIRED, "전화번호는 필수입니다.");
		editValidation.apply();
	}
	
	/**
	 * 생성 제출 콜백 핸들러
	 */
	ctrl.createSubmitHandler = function(formId){
		var self = et.vc;
		var formData = ETValidate.convertFormToObject(formId, true, true);
		console.log(formData); //formData 어떤 형태로 오는지 확인 과제
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