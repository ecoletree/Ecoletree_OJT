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
	ctrl.path = "/";

	
	// ============================== 화면 컨트롤 ==============================
	/**
	 * init VIEW
	 */
	ctrl.init = function(initData) {
		var self = et.vc;
//		ETService().setSuccessFunction(self.codeSuccessResultFunction).callService(self.path + "/code", {});
		$("#btnSearch").click(self.btnSearchHandler);
		et.setDataTableRowSelection("#tbList", self.rowClickHandler);
		
    	$("#cbAllClick").click(self.checkAllBox);
    	$("#tbList tbody").on("change", "input:checkbox", self.allChk);
    	$("#btnDelete").click(self.btnDeleteListHandler);
    	
    	}
	
	/**
	 * 체크박스 전체 선택
	 */
	ctrl.checkAllBox = function(){
		var self = et.vc;
		var checked = $(this).prop("checked");
        $("input:checkbox").prop("checked", checked);
	}
	
	/**
	 * 사원 코드 정보 불러오기 성공 함수
	 */
	ctrl.codeSuccessResultFunction = function(result){
		var self = et.vc;
		var codeList = result.data;
		et.makeSelectOption(codeList, {value:"code_cd", text:"code_name"}, "#selPosition", "전체");
	}
	
	
	/**
	 * 체크박스가 전체 선택됐는지 확인 후, 전체 선택 상태가 아니라면 전체 선택버튼 체크해제
	 */
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
	
	/**
	 * 조회 버튼 핸들러
	 */
	ctrl.btnSearchHandler = function(){
		var self = et.vc;
		var param = {};
		param.emp_name = $("#iptSearch").val();
		param.position = $("#selPosition").val();
		
		self.createDataTables(param);
	
		}
	
	
	/**
	 * 삭제 버튼 핸들러
	 */
	ctrl.btnDeleteListHandler = function($target){
		var self = et.vc;
		var chkboxes = [];
		
		$("#tbList tbody input:checked").each(function(index){
			var rowData = et.getRowData("#tbList", $(this).parents("tr"));
			chkboxes.push(rowData);
		});
		
		if (chkboxes.length === 0) {
    		alert("삭제할 데이터를 선택해주세요");
		}
		
		//ETService().setSuccessFunction(self.deleteSuccessHandler).callService(self.path + "/delete");
		
	}
	
	/**
	 * 삭제 버튼 성공 함수 
	 */
	ctrl.deleteSuccessHandler = function(result){
		var self = et.vc;
		alert("삭제 완료되었습니다.");
		location.reload();
	}


	
	// ============================== DataTables 생성, 이벤트들 ==============================
	
	/**
	 * 데이터테이블 생성 함수
	 */
	ctrl.createDataTables = function(postData){
		var self = et.vc;
		var columns = [
			{data:"user_cd", render:function(data,type,row,meta){
				return '<input type = "checkbox">'
			}},
			{data:"num"},
			{data:"type"},
			{data:"name"},
//			{data:"position", render:function(data,type,row,meta){
//				return row.position_name;
//			}},
//			{data:"email_1"},
//			{data:"phone_num"},
//			{data:"birthday"},
		]
		var option = et.createDataTableSettings(columns, self.path + "/getEmpList", postData, self.dataTableCallBack);
		option.paging = false;
		$("#tbList").DataTable(option);
	}
	
	
	/**
	 * 데이터테이블 콜백 함수
	 */
	ctrl.dataTableCallBack = function(settings){
		var self = et.vc;
		
	}
	
	/**
	 * 데이터 클릭 시 수정 화면으로 넘어가는 기능
	 */

	ctrl.rowClickHandler = function($target, row, col, columnVisible){
		var self = et.vc;
		if(col === 0 || col === undefined){}
		else{
			var rowData = et.getRowData("#tbList", $target.closest("tr"));
			
			ETService().callView("/detail", rowData);
		
			
		}
	}


	// ============================== Form 리스너 ==============================

	
	return ctrl;
}));