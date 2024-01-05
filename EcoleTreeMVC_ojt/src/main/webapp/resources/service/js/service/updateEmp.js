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
	};

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

	
	// ============================== DataTables 생성, 이벤트들 ==============================

	// ============================== Form 리스너 ==============================

	return ctrl;
}));