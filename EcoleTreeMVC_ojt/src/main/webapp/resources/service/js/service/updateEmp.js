/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : 
 * @CreateDate : 2023. 12. 06.
 * @DESC : 
 ******************************************************************************/
(function(et, ctrl) {
	if (_.isObject(et) && et.name === ETCONST.PROJECT_NAME) {
		if (!et.vc || et.vc.name !== "updateEmp") {
			et.vc= ctrl(et);
		}
		
	} else {
		console.error("ecoletree OR ETCONST is not valid. please check that common.js file was imported.");
	}
}(this.ecoletree, function(et) {
	
	"use strict";
	
	var ctrl = {};
	
	ctrl.name = "updateEmp";
	ctrl.path = "/sample";

	
	// ============================== 화면 컨트롤 ==============================
	/**
	 * init VIEW
	 */
	ctrl.init = function(initData) {
		var self = et.vc;
		
		var codeList = initData.codeList;
		var rowData = initData.rowData;
	
		et.makeSelectOption(codeList, {value:"code_cd", text:"code_name"}, "#selPosition", "전체");
		
		self.setFormData("#editForm",rowData);
		
		// validation setting 
		self.setValidaion();
		
		// btnEdit click function
		$("#btnEdit").click(self.btnEditClickHanlder);
		
	};
	
	/**
	 * 수정화면일때 기존 데이터가 폼에 셋팅 
	 */
	ctrl.setFormData = function(formId,rowData){
		var self = et.vc;
		var triggerElement = [];
		$(formId).find("input,select").each(function(index,element){
			var name = $(element).prop("name");
			if($(element).prop("localName") === "select"){
				if(rowData[name] === undefined){
					$(element).children("option:eq(0)").prop("selected",true);
				}else{
					$(element).val(rowData[name]);
				} 	
				//element 자체를 triggerElement에 넣고, change trigger 걸기
			}else{ //input
				$(element).val(rowData[name]=== undefined? "":rowData[name]);
			}
			
		}); //form each

		// trigger;
		$.each(triggerElement,function(index,elemt){
			if ($(elemt).prop("localName") === "select") {
				$(elemt).trigger("change");
			}
		});		
	}

	// ============================== 이벤트 리스너 ==============================
	
	/**
	 * 버튼 클릭 핸들러 ---> submit
	 */
	ctrl.btnEditClickHanlder = function(){
		var self = et.vc;
		$("edtiForm").submit();
	}

	// ============================== Form 리스너 ==============================
	
	/**
	 * 폼 밸리데이터 셋팅 (빨간색 * 표시 있는 항목들 모두 등록) 
	 * https://github.com/jquery-validation/jquery-validation 기조로 생성
	 * ecoletreeLibraryJS 에 validationUtil.js 로 저장되어 있음
	 */
	 ctrl.setValidaion = function(){
		var self = et.vc;
		
		//만들어서 쓸때 
		ETValidate.addMethod("fourNumber",function(value, element, params) {
			return value.length > 5;
		});	
		
		var editValidation = new ETValidate().setSubmitHandler(self.editSubmitHandler).setShowErrors(et.setErrorFunction());
		editValidation.validateRules("emp_name",editValidation.REQUIRED,"이름은 필수입니다."); 
		editValidation.apply();
		
	}


	/**	
	 * 제출 콜백 핸들러 convert form to Object
	 */
	 ctrl.editSubmitHandler = function(form){
		var self = et.vc;
		var formData = ETValidate.convertFormToObject(form,true,true);
		console.log("데이터 형태 확인:"+formdata);
//		new ETService().setSuccessFunction(self.editSubmitSuccessHandler).callService(self.path+"/delete", formData);
		
	}
	/**	
	 * 제출 후 response 콜백 핸들러 
	 */
	 ctrl.editSubmitSuccessHandler = function(result){
		var self = et.vc;
		if(result.message ==="success"){
		
		}
	}
	 
	
	return ctrl;
}));