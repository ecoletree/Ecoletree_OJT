/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : kkh
 * @CreateDate : 2023. 12. 06.
 * @DESC : update emp
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
	ctrl.path = "";

	
	// ============================== 화면 컨트롤 ==============================
	/**
	 * init VIEW
	 */
	ctrl.init = function(initData) {
		var self = et.vc;
		var rowData = initData.rowData;
		var codeList = initData.codeList;
		et.makeSelectOption(codeList, {value:"code_cd",text:"code_name"}, "#selPosition", "전체");
		self.setViewData("#editForm",rowData);
		
	};

	// ============================== 동작 컨트롤 ==============================
	
	// ============================== 이벤트 리스너 ==============================
	ctrl.setViewData = function(formId,data){
		var self = et.vc;
		var triggerElement = [];
		$(formId).find("input,select").each(function(index,elemt){
			var name = $(elemt).prop("name");
			if($(elemt).prop("localName") === "select"){
				if(data[name] === undefined){
					$(elemt).children("option:eq(0)").prop("selected",true)
				}else{
					$(elemt).val(data[name]);
				}
				triggerElement.push(elemt);
			}else{
				$(elemt).val(data[name] === undefined ? "" : data[name]);
			}
		});
		
		$.each(triggerElement,function(index,elemt){
			if ($(elemt).prop("localName") === "select") {
				$(elemt).trigger("change");
			}
		});
		
		
	}
	
	
	// ============================== DataTables 생성, 이벤트들 ==============================

	// ============================== Form 리스너 ==============================

	
	return ctrl;
}));