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

        var checkedBoxCount = 0;

        ctrl.name = "empList";
        ctrl.path = "/sample";

        var allCheckBoxSelector = $("#cbAllClick");
        // ============================== 화면 컨트롤 ==============================
        /**
         * init VIEW
         */
        ctrl.init = function (initData) {
            var self = et.vc;
            ETService().setSuccessFunction(self.resultFunction).callService(self.path + "/code", {});

            $("#btnSearch").click(self.btnSearchHandler);

            // 체크박스 전체 선택 이벤트 핸들러
            allCheckBoxSelector.click(self.checkBoxClickHandler);

            // 개별 체크박스 이벤트 핸들러
            $("#tbList tbody").on("change", ctrl.singleCheckBoxHandler);

            et.setDataTableRowSelection("#tbList", self.rowSelectionHandler);
        };


        ctrl.rowSelectionHandler = function ($target, row, col, columnVisible) {
            var self = et.vc;
            if (col === 0 || col === undefined) {

            }
            else {
                const rowData = et.getRowData("#tbList", $target.closest("tr"));
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
            // 아무런 데이터도 받아오지 않은 경우
            else {
                // TBD
            }


        }

        // ============================== 동작 컨트롤 ==============================

        ctrl.checkBoxClickHandler = function () {
            var self = et.vc;
            var checked = allCheckBoxSelector.prop("checked");

            // 모든 체크 박스 상태를 반대로 바꾼다. (에러)
            // $(".ckb").prop("checked", (i, val) => {
            //     val = !!checked;
            // });
            if (checked) {
                $("input:checkbox").prop("checked", true);
            }
            else {
                $("input:checkbox").prop("checked", false);
            }
        }

        // ============================== 이벤트 리스너 ==============================
        ctrl.btnSearchHandler = function () {
            var self = et.vc;
            var param = {};

            param.emp_name = $("#iptSearch").val();
            param.position = $("#selPosition").val();

            self.createDateTables(param);
        }

        ctrl.singleCheckBoxHandler = function () {
            var allChecked = true; // 전체 선택 여부
            $("#tbList tbody input:checkbox").each(function () {
                if (!$(this).prop("checked")) {
                    allChecked = false;
                    return false; // 체크되지 않은 체크박스가 있으면 반복 중지
                }
            });
            // 모두 체크가 되어있는 경우, 전체 선택 체크박스 활성화
            $("#cbAllClick").prop("checked", allChecked);
        }
        // ============================== DataTables 생성, 이벤트들 ==============================

        ctrl.createDateTables = function (params) {
            var self = et.vc;
            const columns = [
                {
                    data: "", render: function (data, type, row, meta) {
                        return '<input type="checkbox">'
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
            var self = et.vc;

        }

        // ============================== Form 리스너 ==============================


        return ctrl;
    })
);