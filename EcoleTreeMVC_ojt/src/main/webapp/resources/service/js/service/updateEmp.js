/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * @Author : kkh
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
		showEmployeeData(initData);
		$("#btnEdit").click(self.btnEditHandler);
	};	
	
	function showEmployeeData(data){
		var self = et.vc;
		const employeeData = data.rowData;
		const employeeList = data.codeList;		
		var employeePositionName = employeeData.position_name;
		
		$("input[name='emp_num']").val(employeeData.emp_num);
		$("input[name='emp_name']").val(employeeData.emp_name);
		$("input[name='emp_engname']").val(employeeData.emp_engname);
		$("input[name='department']").val(employeeData.department);
		
		et.makeSelectOption(employeeList, {value: "code_cd", text: "code_name"}, "#selPosition", employeePositionName);
		
		$("input[name='email_1']").val(employeeData.email_1);
		$("input[name='email_2']").val(employeeData.email_2);
		$("input[name='phone_num']").val(employeeData.phone_num);
		$("input[name='birthday']").val(employeeData.birthday);
		$("input[name='address']").val(employeeData.address);
		
		$("input[name='emc_contact_point']").val(employeeData.emc_contact_point);
		$("input[name='emc_phone_num']").val(employeeData.emc_phone_num);
		
	}
	
	
	
	// ============================== 동작 컨트롤 ==============================

	// ============================== 이벤트 리스너 ==============================
	ctrl.btnEditHandler = function(){
		var self = et.vc;
		$("#editForm").submit();
		//ETService().fileUploadWithForm(self.path + "/update", editForm);
		
	}
	
	// ============================== DataTables 생성, 이벤트들 ==============================

	// ============================== Form 리스너 ==============================

	return ctrl;
}));