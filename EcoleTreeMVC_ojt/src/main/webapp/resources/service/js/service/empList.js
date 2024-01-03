/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 *
 * @Author : kjj
 * @CreateDate : 2024. 01. 02.
 * @DESC : script sample
 ******************************************************************************/
(
    function (et, ctrl) {
        if (_.isObject(et) && et.name === ETCONST.PROJECT_NAME) {
            if (!et.vc || et.vc.name !== "empList") {
                et.vc = ctrl(et);
            }

        }
        else {
            console.error("ecoletree OR ETCONST is not valid. please check that common.js file was imported.");
        }
    }(this.ecoletree, function (et) {

        "use strict";

        var ctrl = {};

        ctrl.name = "empList";
        ctrl.path = "/sample";


        // ============================== 화면 컨트롤 ==============================
        /**
         * init VIEW
         */
        ctrl.init = function (initData) {
            var self = et.vc;
            ETService().setSuccessFunction(self.resultFunction).callService(self.path + "/code", {});

            $("#btnSearch").click(self.btnSearchHandler);

            // 체크박스 전체 선택
            $("#cbAllClick").click(self.checkBoxClickHandler);

            et.setDataTableRowSelection("#tbList", self.rowSelectionHandler);
        };

        ctrl.checkBoxClickHandler = function () {
            var checked = $("#cbAllClick").prop("checked");
            if (checked) {
                $("input:checkbox").prop("checked", true);
            } else {
                $("input:checkbox").prop("checked", false);
            }
        }

        ctrl.rowSelectionHandler = function ($target, row, col, columnVisible) {
            var self = et.vc;
            if (col === 0 || col === undefined) {

            }
            else {
                var rowData = et.getRowData("#tbList", $target.closest("tr"));
                console.log('rowData', rowData);
                debugger;
                ETService().callView("/emp/update", rowData);
            }
        }

        ctrl.resultFunction = function (result) {
            var self = et.vc;
            var empList = null;
            if (result.message === "success") {
                empList = result.data;

                var options = {
                    value: "code_cd",
                    text : "code_name"
                }

                et.makeSelectOption(empList, options, "#selPosition", "전체");
            }

        }

        // ============================== 동작 컨트롤 ==============================

        // ============================== 이벤트 리스너 ==============================
        ctrl.btnSearchHandler = function () {
            var self = et.vc;
            var param = {};

            param.emp_name = $("#iptSearch").val();
            param.position = $("#selPosition").val();
            // debugger;
            self.createDateTables(param);

        }
        // ============================== DataTables 생성, 이벤트들 ==============================

        ctrl.createDateTables = function (params) {
            var self = et.vc;
            const columns = [
                {
                    data: "", render: function (data, type, row, meta) {
                        return '<input type="checkbox" class="ckb">'
                    }
                },
                {data: "emp_num"},
                {data: "emp_name"},
                {data: "emp_engname"},
                {data: "position_name"},
                {data: "email_1"},
                {data: "phone_num"},
                {data: "birthday"}
            ];

            const option = et.createDataTableSettings(
                columns,
                self.path + "/list",
                params,
                self.dataTableCallback
            )

            option.paging = false;

            $("#tbList").DataTable(option);
        }

        ctrl.dataTableCallback = function (settings) {

        }

        // ============================== Form 리스너 ==============================


        return ctrl;
    })
);