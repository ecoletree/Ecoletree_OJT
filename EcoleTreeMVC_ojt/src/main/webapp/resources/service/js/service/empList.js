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
	ctrl.path = "/";
	
	// ============================== 화면 컨트롤 ==============================
	/**
	 * init VIEW
	 */
	ctrl.init = function(initData) {
		var self = et.vc;
		
//		new ETService().setSuccessFunction(self.getCodeListHandler).callService("/sample/code", {});

//		self.btnClickHandler();

		$("#btnSearch").click(self.btnSearchClickHandler);
		$("#cbAllClick").click(self.cbAllClickHandler);
		$("#btnDelete").click(self.btnclickListHandler);
//		$("#btnSearch").trigger("click");
		
		// 엔터키 이벤트 핸들러(검색 핸들러 function 넣으시면 됩니다)
		et.setEnterKeyDownEvent("#iptSearch",self.btnSearchClickHandler);

		et.setDataTableRowSelection("#tbList",self.tbListRowClickHandler);
		
		
	};

	// ============================== 동작 컨트롤 ==============================

	/**
	 * 코드 리스트 가져오기
	 */
	ctrl.getCodeListHandler = function(result){
		var self = et.vc;
		var codeList = result.data;
		et.makeSelectOption(codeList, {value:"code_cd",text:"code_name"}, "#selPosition", "전체");
	}
	
	// ============================== 이벤트 리스너 ==============================
	/**
	 * 검색버튼 클릭 핸들러
	 */	
	ctrl.btnSearchClickHandler = function(){
		var self = et.vc;
		var params = {};
		params.emp_name = $("#iptSearch").val();
		params.position = $("#selPosition").val();
		self.createDataTables(params);
	}
	
	/**
	 * 체크박스 전체 선택 핸들러
	 */
	ctrl.cbAllClickHandler = function(){//체크박스 전체 선택
		if ($("#cbAllClick").is(':checked')) {
			$("input[type=checkbox]").prop("checked",true);
		}else {
			$("input[type=checkbox]").prop("checked",false);
		}
	}
	// ============================== DataTables 생성, 이벤트들 ==============================
	
	/**
	 * 테이블 생성
	 */
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
	
	/**
	 * 테이블 생성 후 콜백
	 */
	ctrl.dataTableCallback = function(settings){
		var self = et.vc;
		console.log("data table list");
	}
	
	/**
	 * 테이블 로우 클릭 핸들러
 	 * et.getRowData = function(tableId, row)
	 * rowClickAction($target, cell.row, cell.column, cell.columnVisible);
	 */
	ctrl.tbListRowClickHandler = function($target, row, col){
		var self = et.vc;
		if(column === 0 || column === undefined){}else{
				var rowData = et.getRowData("#tbList",$target.closest("tr"));
				new ETService().callView(self.path+"/update",rowData);
		}
		
		
	}
	/**
	 * 테이블 로우 선택 삭제 delete
	 */
	ctrl.btnclickListHandler = function() {
		var self = et.vc;
		
		var paramArr = [];
		$("#tbList tbody input:checked").each(function(index){
			var chkData = et.getRowData("#tbList", $(this).parents("tr"));
			paramArr.push(chkData);
		});
		var chkParam = {};
		chkParam.paramKey = paramArr;
		
		if (chkParam.paramKey.length === 0) {
			alert("삭제할 데이터를 체크해 주세요.");
			return;
		}else {
			console.log(chkParam);
//			new ETService().setSuccessFunction(self.userDeleteSuccessHandler).callService(self.path+"/delete", chkParam);
		}
	}
	/**
	 * 테이블 로우 선택 삭제 delete 콜백
	 */
	ctrl.userDeleteSuccessHandler = function (result) {
		var self = et.vc;
		alert("삭제 완료");
		location.reload();
	}
	
	// ============================== Form 리스너 ==============================

	
	return ctrl;
}));