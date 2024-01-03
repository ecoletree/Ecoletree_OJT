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
		console.log("test");
		
		ETService().setSuccessFunction(self.codeSuccessResultFunction).callService(self.path + "/code", {});
		
	};
	
	ctrl.codeSuccessResultFunction = function(result) {
	    var self = et.vc;
        var codeList = result.data;
	    console.log(codeList);
	    debugger;    
	   
	}
	// ============================== 동작 컨트롤 ==============================

	// ============================== 이벤트 리스너 ==============================
	
	// ============================== DataTables 생성, 이벤트들 ==============================

	// ============================== Form 리스너 ==============================

	
	return ctrl;
}));