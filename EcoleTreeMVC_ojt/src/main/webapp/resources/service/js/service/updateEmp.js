/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : jsw
 * @CreateDate : 2023. 12. 06.
 * @DESC : script sample
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
		self.setInputView("#editForm",rowData);
		self.setValidation();
		$("#btnEdit").click(self.btnEditClickHandler);
		
	};


	/**
	 * rowData 값을 각 element에 맞게 보여주기
	 */
	ctrl.setInputView = function(formId,rowData){
		var self = et.vc;
		var triggerElement = []; //form의 각 요소를 담아두는 배열 나중에 트리거로 뽑아서 입력하기 위함
		$(formId).find("input,select").each(function(index,element){
			var name = $(element).prop("name"); //element -> ex) <input type="text name="department"> name -> department 
			if($(element).prop("localName") === "select"){ //localName -> ex)input, select
				if(rowData[name] === undefined){
					$(element).children("option:eq(0)").prop("selected",true);
				}
			}
			triggerElement.push(element); //input, select의 element 배열에 저장
		});

		$.each(triggerElement,function(index,elemt){
			var name = $(elemt).prop("name");
			$(elemt).val(rowData[name]).trigger("change"); //element마다 해당 값 넣어주기 트리거
		});		
	}
	
	
	// ============================== 동작 컨트롤 ==============================

	// ============================== 이벤트 리스너 ==============================

	/**
	 * 수정 버튼 클릭시 핸들러
	 */
    ctrl.btnEditClickHandler = function(){
		var self = et.vc;
		$("#editForm").submit();
	}
	
	// ============================== DataTables 생성, 이벤트들 ==============================

	// ============================== Form 리스너 ==============================

	/**
	 * 데이터의 유효성 검사(필수로 들어가야하는 데이터 검증)
	 */
	ctrl.setValidation = function(){
		var self = et.vc;
		var editValidation = new ETValidate("editForm").setSubmitHandler(self.editSubmitHandler).setShowErrors(et.setErrorFunction());
		
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
		
		editValidation.validateRules("phone_num", "validPhoneNumber", "올바른 전화번호 형식이 아닙니다.");
		editValidation.validateRules("birthday", "validBirthDayFormat", "생년월일의 형식은 yyyy-mm-dd 입니다.");
		editValidation.validateRules("department", "twoNumber", "부서는 두글자로 이루어집니다.");
		
		editValidation.validateRules("emp_engname", editValidation.REQUIRED, "영문 이름은 필수입니다.");
		editValidation.validateRules("department", editValidation.REQUIRED, "부서는 필수입니다.");
		editValidation.validateRules("position", editValidation.REQUIRED, "직급은 필수입니다.");
		editValidation.validateRules("email_1", editValidation.REQUIRED, "메일주소1은 필수입니다.");
		editValidation.validateRules("email_1", editValidation.EMAIL, "메일1의 이메일 형식을 맞춰주세요.");
		editValidation.validateRules("email_2", editValidation.REQUIRED, "메일주소2는 필수입니다.");
		editValidation.validateRules("email_2", editValidation.EMAIL, "메일2의 이메일 형식을 맞춰주세요.");
		editValidation.validateRules("phone_num", editValidation.REQUIRED, "전화번호는 필수입니다.");
		editValidation.validateRules("birthday", editValidation.REQUIRED, "생년월일은 필수입니다.");
		editValidation.validateRules("address", editValidation.REQUIRED, "주소는 필수입니다.");
		editValidation.validateRules("emc_contact_point", editValidation.REQUIRED, "이름(관계)는 필수입니다.");
		editValidation.validateRules("emc_phone_num", editValidation.REQUIRED, "전화번호는 필수입니다.");
		editValidation.validateRules("emc_phone_num", "validPhoneNumber", "올바른 (긴급)전화번호 형식이 아닙니다.");
		editValidation.apply();
	}
	
	/**
	 * 제출 후 콜백 핸들러
	 */
	ctrl.editSubmitHandler = function(formId){
		var self = et.vc;
		var formData = ETValidate.convertFormToObject(formId, true, true);
		console.log(formData); //formData 어떤 형태로 오는지 확인 과제
		//new ETService().setSuccessFunction(self.editSuccessSubmitHandler).callService(self.path + "/update", {});
	}
	
	/**
	 * 제출 성공 콜백 핸들러
	 */
	ctrl.editSuccessSubmitHandler = function(result){
		var self = et.vc;
		if(result.message === "success"){
			
		}
	} 
	return ctrl;
}));