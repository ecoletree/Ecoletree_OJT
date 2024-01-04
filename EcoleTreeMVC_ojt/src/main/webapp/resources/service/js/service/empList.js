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

        var allCheckBox = $("#cbAllClick");


        // ============================== 화면 컨트롤 ==============================
        /**
         * init VIEW
         */
        ctrl.init = function (initData) {
            var self = et.vc;
            ETService().setSuccessFunction(self.resultFunction).callService(self.path + "/code", {});

            $("#btnSearch").click(self.btnSearchHandler);

            // 체크박스 전체 선택 이벤트 핸들러
            allCheckBox.click(self.checkBoxClickHandler);



            // 체크박스 1개 클릭 이벤트
            const checkBoxes = $("input.ckb:checkbox")
            checkBoxes.click(self.singleCheckBoxClickHandler);

            et.setDataTableRowSelection("#tbList", self.rowSelectionHandler);
        };


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
            // 아무런 데이터도 받아오지 않은 경우
            else {
                // TBD
            }


        }

        // ============================== 동작 컨트롤 ==============================

        ctrl.checkBoxClickHandler = function () {
            var self = et.vc;
            var checked = allCheckBox.prop("checked");

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

        ctrl.singleCheckBoxClickHandler = function () {
            alert('1');
            var self = et.vc;
            // 이미 전체 선택이 되어 있는 경우
            var checked = allCheckBox.prop("checked");
            console.info("checked", checked);
            // 전체 선택이 된 경우, 하나를 클릭하면
            // 전체선택된 체크박스를 해제한다.
            if (checked) {
                allCheckBox.prop("checked", false);
            }
            // 모든 박스가 다 채워져 있다면, 전체선택 박스를 활성화 시킨다.


        }
        // ============================== 이벤트 리스너 ==============================
        ctrl.btnSearchHandler = function () {
            var self = et.vc;
            var param = {};

            param.emp_name = $("#iptSearch").val();
            param.position = $("#selPosition").val();

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
            var self = et.vc;

        }

        // ============================== Form 리스너 ==============================


        return ctrl;
    })
);