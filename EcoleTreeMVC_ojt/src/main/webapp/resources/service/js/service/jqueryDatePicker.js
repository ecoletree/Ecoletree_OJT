(function(et, ctrl) {
	if (_.isObject(et) && et.name === ETCONST.PROJECT_NAME) {
		if (!et.vc || et.vc.name !== "jqueryDatePicker") {
			et.vc= ctrl(et);
		}
	} else {
		console.error("ecoletree OR ETCONST is not valid. please check that common.js file was imported.");
	}
}(this.ecoletree, function(et) {
	"use strict";
	
	var ctrl = {};
	
	ctrl.name = "jqueryDatePicker";
	ctrl.path = "/";
	ctrl.groupList= null;
	ctrl.optionList = {};
	
	
	// ============================== 화면 컨트롤 ==============================
	/**
	 * init VIEW
	 */
	ctrl.init = function(initData) {
		var self = et.vc;
		
		//single
		new DateRangePicker("#divJQueryRange0",true).setInitDate('2023.05.25').setPicker(); // single
		// range
		new DateRangePicker("#divJQueryRange1").setMaxDate(7).setInitDate('2023.05.21','2023.05.28').setPicker();
		new DateRangePicker("#divJQueryRange2").setMaxDate(7).setInitDate(new Date(),5).setPicker();
		new DateRangePicker("#divJQueryRange3").setExtendsCalendar(true).setDisableSelectForward().setPicker();
		new DateRangePicker("#divJQueryRange4").setExtendsCalendar(true).setDisableSelectBackward().setPicker();
	};
	// ==================== 4. jQuery Date Range Picker ======================
	
	
	
	
	
	// ======================================================================
	
	
	return ctrl;
}));