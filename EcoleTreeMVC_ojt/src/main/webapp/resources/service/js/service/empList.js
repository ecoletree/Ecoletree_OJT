/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : jjy
 * @CreateDate : 2024. 1. 04.
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
		et.setDataTableRowSelection("#tbList", self.rowClickHandler);
		
    	$("#cbAllClick").click(self.checkAllBox);
    	$("#tbList tbody").on("change", "input:checkbox", self.allChk);
    	$("#btnDelete").click(self.btnDeleteListHandler);
    	
    	}
	
	ctrl.checkAllBox = function(){
		var self = et.vc;
		var checked = $(this).prop("checked");
        $("input:checkbox").prop("checked", checked);
	}
	
	ctrl.codeSuccessResultFunction = function(result){
		var self = et.vc;
		var codeList = result.data;
		et.makeSelectOption(codeList, {value:"code_cd", text:"code_name"}, "#selPosition", "전체");
	}
	
	ctrl.allChk = function(){
		var self = et.vc;
		var allChecked = true;
        $("#tbList tbody input:checkbox").each(function() {
            	if (!$(this).prop("checked")) {
                allChecked = false;
                return false;
            		}
        		});
        	$("#cbAllClick").prop("checked", allChecked);
    		}

	// ============================== 동작 컨트롤 ==============================

	// ============================== 이벤트 리스너 ==============================
	ctrl.btnSearchHandler = function(){
		var self = et.vc;
		var param = {};
		param.emp_name = $("#iptSearch").val();
		param.position = $("#selPosition").val();
		
		self.createDataTables(param);
		
		}
	
	ctrl.btnDeleteListHandler = function(){
		var self = et.vc;
		var dataList = [];
		
		$("#tbList tbody input:checkbox:checked").each(function() {
            	var rowData = [];
            	$(this).closest('tr').find('td').each(function(index, td){
					if(index > 0){
						rowData.push($(td).text());
					}
				});
				dataList.push(rowData);
        	});
		
		console.log(dataList);
		
	}


	
	// ============================== DataTables 생성, 이벤트들 ==============================
	
	ctrl.createDataTables = function(postData){
		var self = et.vc;
		var columns = [
			{data:"", render:function(data,type,row,meta){
				return '<input type = "checkbox">'
			}},
			{data:"emp_num"},
			{data:"emp_name"},
			{data:"emp_engname"},
			{data:"position_name"},
			{data:"email_1"},
			{data:"phone_num"},
			{data:"birthday"},
		]
		var option = et.createDataTableSettings(columns, self.path + "/list", postData, self.dataTableCallBack);
		option.paging = false;
		$("#tbList").DataTable(option);
	}
	
	ctrl.dataTableCallBack = function(settings){
		var self = et.vc;
		
	}
	
	ctrl.rowClickHandler = function($target, row, col, columnVisible){
		var self = et.vc;
		if(col === 0 || col === undefined){}
		else{
			var rowData = et.getRowData("#tbList", $target.closest("tr"));
			
			ETService().callView("/emp/update", rowData);
		
			
		}
	}


	// ============================== Form 리스너 ==============================

	
	return ctrl;
}));