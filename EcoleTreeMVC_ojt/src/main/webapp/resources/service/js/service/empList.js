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

            ETService()
                // if successed, do something
                .setSuccessFunction(self.resultFunction)
                // if failed, do something
                .setErrorFunction(self.errorFunction)
                // request data from '/sample/code'
                // note: why order is important here?
                .callService(self.path + "/code", {});



            // search button event handler
            $("#btnSearch").click(self.btnSearchHandler);

            // check all event handler
            $("#cbAllClick").click(self.checkBoxClickHandler);

            // indivisual check box event handler
            $("#tbList tbody").on("change", "input:checkbox", ctrl.singleCheckBoxHandler);

            // delete button event handler
            $("#btnDelete").click(self.deleteBtnHandler);

            // row select event handler
            et.setDataTableRowSelection("#tbList", self.rowSelectionHandler);
        };

        ctrl.rowSelectionHandler = function ($target, row, col, columnVisible) {
            var self = et.vc;

            if (col !== 0 && col !== undefined) {
                // data we need to pass to corresponding page
                let rowData = et.getRowData("#tbList", $target.closest("tr"));
                // using pre-defined callback function
                ETService().callView("/emp/update", rowData);
            }
        }

        ctrl.resultFunction = function (result) {
            var self = et.vc;
            let empList = null;
            // when HTTP response status is 200 (OK)
            if (result.message === "success") {
                empList = result.data; // hold fetched data from '/sample/code'

                let options = {
                    value: "code_cd",
                    text : "code_name"
                }

                et.makeSelectOption(empList, options, "#selPosition", "전체");
            }
            // when error,
            else {
                // TBD
            }
        }


        /*
         * when error, how to display the error message?
         * */
        ctrl.errorFunction = function () {
            var self = et.vc;

        }

        // ============================== 동작 컨트롤 ==============================

        ctrl.checkBoxClickHandler = function () {
            var self = et.vc;
            let checked = $("#cbAllClick").prop("checked");

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

            let param = {};

            param.emp_name = $("#iptSearch").val();
            param.position = $("#selPosition").val();

            self.createDateTables(param);
        }

        ctrl.singleCheckBoxHandler = function () {
            // all checkboxes
            let checks = $("input:checkbox:not(#cbAllClick)");
            // checked checkboxes among all checkboxes
            let checked = $("input:checkbox:not(#cbAllClick):checked");

            // all check box is checked
            if (checks.length === checked.length) {
                $("#cbAllClick").prop("checked", true);
            }
            // not all check box is checked
            else {
                $("#cbAllClick").prop("checked", false);
            }
        }

        ctrl.deleteBtnHandler = function () {
            var self = et.vc;
            // store the element which should be deleted
            let del = [];
            // get the data from the row which check box is checked
            $("#tbList tbody input:checkbox:checked").each(function () {
                del.push(et.getRowData("#tbList", this.closest("tr")));
            });
            // PENDING: remove the checked row data from the screen
            console.log("======== 삭제 대상 콘솔 출력 ========");
            del.forEach((v, i) => {
                console.log(v);
            })

        }
        // ============================== DataTables 생성, 이벤트들 ==============================

        /**
         * @param {object} searchParams search parameters
         * */
        ctrl.createDateTables = function (searchParams) {
            var self = et.vc;
            let columns = [
                {
                    // render is from library
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

            let option = et.createDataTableSettings(
                columns,
                self.path + "/list",
                searchParams,
                self.dataTableCallback
            )

            // temporary disable paging option
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