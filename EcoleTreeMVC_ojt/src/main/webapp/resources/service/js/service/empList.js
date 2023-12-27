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
	ctrl.path = "/emp";
	
	// ============================== 화면 컨트롤 ==============================
	/**
	 * init VIEW
	 */
	ctrl.init = function(initData) {
		var self = et.vc;
		
		new ETService().setSuccessFunction(self.getCodeListHandler).callService("/sample/code", {});

		self.btnClickHandler();
		
		et.setDataTableRowSelection("#tbList",self.tbListRowClickHandler);
		
		
	};

	// ============================== 동작 컨트롤 ==============================

	ctrl.btnClickHandler = function(){
		var self = et.vc;
		
		$("#btnSearch").click(self.btnSearchClickHandler);
		
		$("#btnSearch").trigger("click");
		
		et.setEnterKeyDownEvent("#iptSearch",self.btnSearchClickHandler);
	}
	
	ctrl.getCodeListHandler = function(result){
		var self = et.vc;
		var codeList = result.data;
		et.makeSelectOption(codeList, {value:"code_cd",text:"code_name"}, "#selPosition", "전체");
	}
	
	// ============================== 이벤트 리스너 ==============================
	
	ctrl.btnSearchClickHandler = function(){
		var self = et.vc;
		var params = {};
		params.emp_name = $("#iptSearch").val();
		params.position = $("#selPosition").val();
		self.createDataTables(params);
	}
	// ============================== DataTables 생성, 이벤트들 ==============================
	
	ctrl.createDataTables = function(postData){
		var self = et.vc;
		var columns = [
			{data : "emp_cd", render:function(data,type,row,meta){
				return '<input type="checkbox">';
			}}
			,{data : "emp_num"}
			,{data : "emp_name"}
			,{data : "emp_engname"}
			,{data : "position",render:function(data,type,row){
				return row.position_name;
			}}
			,{data : "email_1"}
			,{data : "phone_num"}
			,{data : "birthday"}
		]
		
		var option = et.createDataTableSettings(columns,"/sample/list", postData, self.dataTableDrawCallback);
		option.paging = false;
		
		$("#tbList").DataTable(option);
	}
	
	ctrl.dataTableCallback = function(settings){
		var self = et.vc;
		console.log("data table list");
	}
	
	ctrl.tbListRowClickHandler = function($target, row, col){
		var self = et.vc;
		var rowData = et.getRowData("#tbList",$target.closest("tr"));
		new ETService().callView(self.path+"/update",rowData);
		
	}

	
	// ============================== Form 리스너 ==============================

	
	return ctrl;
}));