/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : kkh
 * @CreateDate : 2023. 12. 06.
 * @DESC : 사원관리
 ******************************************************************************/
(function(et, ctrl) {
	if (_.isObject(et) && et.name === ETCONST.PROJECT_NAME) {
		if (!et.vc || et.vc.name !== "empList") {
			et.vc= ctrl(et);
		}
		
	} else {
		console.error("ecoletree OR ETCONST is not valid. please check that common.js file was imported.");
	}
}(this.ecoletree, function(et) {
	"use strict";
	
	var ctrl = {};
	
	ctrl.name = "empList";
	ctrl.path = "";
	ctrl.empData_sample = JSON.parse(JSON.stringify(EmpSamples));
	ctrl.codeData_sample = JSON.parse(JSON.stringify(CodeSamples));
	
	// ============================== 화면 컨트롤 ==============================
	/**
	 * init VIEW
	 */
	ctrl.init = function(initData) {
		var self = et.vc;
		
		self.btnClickHandler();
		self.createDataTables();
		et.setDataTableRowSelection("#tbList",self.tbListRowClickHandler);
		et.makeSelectOption(self.codeData_sample, {value:"code_cd",text:"code_name"}, "#selPosition", "전체");
	};

	// ============================== 동작 컨트롤 ==============================

	ctrl.btnClickHandler = function(){
		var self = et.vc;
		$("#btnSearch").click(self.btnSearchClickHandler);
	}
	// ============================== 이벤트 리스너 ==============================
	
	ctrl.btnSearchClickHandler = function(){
		var self = et.vc;
		var sel = $("#selPosition").val();
		console.log(sel);
		debugger;
	}
	// ============================== DataTables 생성, 이벤트들 ==============================
	
	ctrl.createDataTables = function(){
		var self = et.vc;
		var columns = [
			{data : "emp_cd", render:function(data,type,row,meta){
				return '<input type="checkbox">';
			}}
			,{data : "emp_num"}
			,{data : "emp_name"}
			,{data : "emp_engname"}
			,{data : "position"}
			,{data : "email_1"}
			,{data : "phone_num"}
			,{data : "birthday"}
		]
		
		let empData_sample = JSON.parse(JSON.stringify(EmpSamples));
//		(columns, self.path+"/list", param, drawCallback, typeValue, info, dataSet)
		var option = et.createDataTableSettings(columns, null, {}, self.dataTableDrawCallback,"",false,empData_sample);
		option.paging = false;
		
		$("#tbList").DataTable(option);
	}
	
	ctrl.dataTableCallback = function(settings){
		var self = et.vc;
		console.log("data table list");
	}
	
	ctrl.tbListRowClickHandler = function($target, row, col){
		var self = et.vc;
		var rowData = et.getRowData("#tbList",target.closest("tr"));
		
	}

	
	// ============================== Form 리스너 ==============================

	
	return ctrl;
}));