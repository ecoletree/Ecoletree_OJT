/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : 
 * @CreateDate : 2023. 12. 06.
 * @DESC : 
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
	/**
	 */
	ctrl.init = function(initData) {
		var self = et.vc;
		ETService().setSuccessFunction(self.codeSuccessResultFunciton).callService(self.path +"/code", {});
		$("#btnSearch").click(self.btnSearchHandler);
		
		et.setDataTableRowSelection("#tbList", self.rowClickHandler);
		
		
	};

//콜백함수
	ctrl.codeSuccessResultFunciton = function(result){
		var self = et.vc;
		var codeList = result.data;
		//et 는 common.js에서 찾으면 됩니다.
		et.makeSelectOption(codeList, {value:"code_cd", text:"code_name"}, "#selPosition", "전체");
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

	ctrl.createDateTables =function(postData){
		var self = et.vc;
		var columns = [
			{data:"emp_num",render:function(data,type,row,meta){
				return '<input type="checkbox" >'
			}},
			{data:"emp_num"},
			{data:"emp_name"},
			{data:"emp_engname"},
			{data:"position"}, //-> 과제 : 코드로 나오는거 이름으로 렌더해오기
			{data:"position"},
			{data:"position"},
			{data:"position"},
		];
		var option = et.createDataTableSettings(columns, self.path+"/list", postData, self.dataTableCallback);
		option.paging = false;
		
		$("#tbList").DataTable(option);
		
	}
	ctrl.dataTableCallback = function(settings){
		var self = et.vc;
	}
	
	ctrl.rowClickHandler = function($target,row,col){
		var self = et.vc;
		if(col === 0 || col === undefined){
		}else{
			var rowData = et.getRowData("#tbList", $target.closest("tr"));
			
			ETService().callView("/emp/update",rowData);
			
		}
	}
	// ============================== Form 리스너 ==============================

	
	return ctrl;
}));