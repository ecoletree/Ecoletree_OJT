/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : kkh
 * @CreateDate : 2023. 12. 06.
 * @DESC : update emp
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
	ctrl.path = "";
	
	// ============================== 화면 컨트롤 ==============================
	/**
	 * init VIEW
	 */
	ctrl.init = function(initData) {
		var self = et.vc;
		new ETService().setSuccessFunction(self.getCodeListHandler).callService("/sample/code", {});
		self.setValidation();
		self.addEventListener();
		
	};

	ctrl.getCodeListHandler = function(result){
		var self = et.vc;
		var codeList = result.data;
		et.makeSelectOption(codeList, {value:"code_cd",text:"code_name"}, "#selPosition", "전체");
	}
	// ============================== 동작 컨트롤 ==============================

	ctrl.setValidation = function(){
		var self = et.vc;
		var addValidate = new ETValidate("#addForm").setSubmitHandler(self.addSubmitCallbackHandler).setShowErrors(et.setErrorFunction());
		addValidate.validateRules("emp_num", addValidate.REQUIRED, "사번은 필수입니다.");
		addValidate.validateRules("emp_name", addValidate.REQUIRED, "이름은 필수입니다.");
		addValidate.validateRules("position", addValidate.REQUIRED, "직급은 필수입니다.");
		addValidate.apply();
	}
	

	// ============================== 이벤트 리스너 ==============================
	ctrl.addEventListener = function(){
		var self = et.vc;
		$("#btnAdd").click(self.btnAddClickHandler);
	}
	ctrl.btnAddClickHandler = function(){
		var self = et.vc;
		$("#addForm").submit();
	}
	
	// ============================== Form 리스너 ==============================

	ctrl.addSubmitCallbackHandler = function(form){
		var self = et.vc;
		var formData = ETValidate.convertFormToObject(form, true, true);
		new ETService().setSuccessFunction(self.addSubmitSuccessHandler).callService("/sample/create", formData);
		
	}
	
	ctrl.addSubmitSuccessHandler = function(result){
		 var self = et.vc;
		 console.log(result);
		debugger;
		
	}
	
	
	return ctrl;
}));