/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : kkh
 * @CreateDate : 2023. 12. 06.
 * @DESC : script sample
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
	ctrl.path = "/sample";

	
	// ============================== 화면 컨트롤 ==============================
	/**
	 * init VIEW
	 */
	ctrl.init = function(initData) {
		var self = et.vc;
		ETService().setSuccessFunction(self.codeSuccessResultFunction).callService(self.path + "/code", {});
		$("#btnSearch").click(self.btnSearchHandler);
		//$("#cbAllClick").click(self.checkboxHandler);
		$("#cbAllClick").change(self.checkboxHandler);
		et.setDataTableRowSelection("#tbList", self.rowClickHandler);

	};
	
	ctrl.codeSuccessResultFunction = function(result) {
	    var self = et.vc;
	    if (result.message === "success") {
	        var codeList = result.data;
	        
	        et.makeSelectOption(codeList, {value: "code_cd", text: "code_name"}, "#selPosition", "전체");
	    }
	}

	// ============================== 동작 컨트롤 ==============================

	// ============================== 이벤트 리스너 ==============================
	
	ctrl.btnSearchHandler = function(){
		var self = et.vc;
		var param = {};
		param.emp_name = $("#iptSearch").val();
		param.position = $("#selPosition").val();
		
		console.log(param);
		self.createDateTables(param);
	}
	
	// ============================== DataTables 생성, 이벤트들 ==============================

	ctrl.createDateTables = function(postData){
		var self = et.vc;
		var columns = [
			{data:"emp_num",render:function(data, type, row, meta){
				 return '<input type="checkbox", name="checkBox">'
			 }},
			{data:"emp_num"},
			{data:"emp_name"},
			{data:"emp_engname"},
			{data:"position_name"},
			{data:"email_1"},
			{data:"phone_num"},
			{data:"birthday"}
		];
		var option = et.createDataTableSettings(columns, self.path + "/list", postData, self.dataTableCallback);
		option.paging = false;
		$("#tbList").DataTable(option);
	}
	
	ctrl.dataTableCallback = function(settings){
		var self = et.vc;
	}
	
	ctrl.rowClickHandler = function($target, row, col, columnVisible){
		var self = et.vc;
		if(col === 0 || col === undefined){}
		else{
			var rowData = et.getRowData("#tbList", $target.closest("tr"));
			ETService().callView("/emp/update", rowData);
			console.log('rowData', rowData);
		}
	}
	
	ctrl.checkboxHandler = function() {
	    var checkAll = $("#cbAllClick");
	    var checkboxes = $("input[name='checkBox']");
	    
	    checkboxes.prop('checked', checkAll.prop('checked'));
	}
	
	
	// ============================== Form 리스너 ==============================

	
	return ctrl;
}));