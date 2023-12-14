// ******************************************************************************
// * Copyright (c) 2017 Ecoletree. All Rights Reserved.
// * 
// * Author : sgKim
// * Create Date : 2016. 6. 24.
// * DESC : 프로젝트 최상위 객체 정의
// ******************************************************************************

/* common utils */
(function(g, ctrl) {
	if (g.ecoletree) { // [OK] create ecoletree object
		g.ecoletree.common = ctrl(g.ecoletree);
	}
	
	
}(this, function(et) {
	
	var ctrl = {}; // g.ecoletree
	
	ctrl.RULL_CLASS = {
			IS_WRITE : "is_write"
			, IS_DELETE : "is_delete" 
			, IS_UPDATE : "is_update" 
			, IS_SEARCH : "is_search" 
			, IS_UPLOAD : "is_upload" 
			, IS_DOWNLOAD : "is_download" 
			, IS_REC_DOWNLOAD : "is_rec_download" 
			, IS_TRANSFER : "is_transfer" 
			, IS_ENCRYPT_DOWNLOAD : "is_encrypt_download" 
			, IS_PLAY : "is_play" 
			, IS_COLUMN : "is_column" 
			, IS_SEARCH_OPTION : "is_search_option" 
			, IS_CERTIFICATION : "is_certification"
	}
	
	ctrl.CODE_LIST = [];
	/**
	 * code : p_code_cd
	 */
	ctrl.getCodeList = function (code) {
		var list = [];
		
		$.each(et.common.CODE_LIST, function (index, item) {
			if (item.code_cd !== undefined && item.code_cd === code) {
				list = item.children;
			}
		});
		
		return list;
	};
	
	ctrl.groupByJs = function (data,key) {
		return data.reduce(function (carry, el) {
	        var group = el[key];

	        if (carry[group] === undefined) {
	            carry[group] = []
	        }

	        carry[group].push(el)
	        return carry
	    }, {})
	}
	
	
	return ctrl;
}));
