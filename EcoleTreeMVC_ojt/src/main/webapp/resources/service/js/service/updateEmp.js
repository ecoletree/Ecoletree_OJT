/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 *
 * @Author : kjj
 * @CreateDate : 2024. 01. 02.
 * @DESC : script sample
 ******************************************************************************/
(function (et, ctrl) {
    if (_.isObject(et) && et.name === ETCONST.PROJECT_NAME) {
        if (!et.vc || et.vc.name !== "empUpdate") {
            et.vc = ctrl(et);
        }

    } else {
        console.error("ecoletree OR ETCONST is not valid. please check that common.js file was imported.");
    }
}(this.ecoletree, function (et) {

    "use strict";

    var ctrl = {};

    ctrl.name = "updateEmp";
    ctrl.path = "/sample";


    // ============================== 화면 컨트롤 ==============================
    /**
     * init VIEW
     */
    ctrl.init = function (initData) {
        var self = et.vc;
        console.log("test");

        console.log(initData);

        // ETService().setSuccessFunction(self.resultFunction).callService(self.path + "/code", {});
        //
        // $("#btnSearch").click(self.btnSearchHandler);
        //
        // et.setDataTableRowSelection("#tbList", self.rowSelectionHandler);
    };

    // ============================== 동작 컨트롤 ==============================

    // ============================== 이벤트 리스너 ==============================

    // ============================== DataTables 생성, 이벤트들 ==============================


    // ============================== Form 리스너 ==============================


    return ctrl;
}));