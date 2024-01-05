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
            if (!et.vc || et.vc.name !== "updateEmp") {
                et.vc = ctrl(et);
            }

        }
        else {
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

            ctrl.initData = initData;


            let options = {
                value: "code_cd",
                text : "code_name"
            }

            et.makeSelectOption(
                self.initData.codeList,
                options,
                "#selPosition",
                "전체"
            );

            self.setInputView("#editForm", initData.rowData);

            // edit button click event
            $("#btnEdit").click(self.btnEditHandler);
        };


        /**
         * display the employee data from previous
         *
         * @param {string} formId form id
         * @param {object} rowData row data from employee list
         * */
        ctrl.setInputView = function (formId, rowData) {
            var self = et.vc;

            // contains the elements which need trigger event
            // such as select, radio
            let triggerElement = [];

            // iterate form element and find input, select tag
            $(formId).find("input, select").each(function (index, element) {
                // getting input tag in form, select element by name
                const name = $(element).prop("name");
                // with 'localName' property, we can get the name of the input tag
                if ($(element).prop("localName") === "select") {
                    // when form contains select tag
                    if (rowData[name] === undefined) {
                        // if there is no specific data to bind,
                        // select the first option in select box
                        $(element).children("option:eq(0)").prop("selected", true);
                    }
                    else {
                        // if there is related data to bind, put into a value
                        $(element).val(rowData[name]);
                        // add an element which needs trigger event, we handle that below
                        triggerElement.push(element);
                    }
                }
                else if ($(element).prop("localName") === "input") {
                    // if tag name is equal to input. node that in this tutorial, there are only input and select
                    // but consider the case containing check box, radio, etc.
                    $(element).val(rowData[name] === undefined ? "" : rowData[name]);
                }
            });

            // bind trigger event
            $.each(triggerElement, function (index, element) {
                // we would bind trigger event to enable select tag having change event
                if ($(element).prop("localName") === "select") {
                    // in this tutorial, there are only select tag,
                    // but consider that there could be radio button, checkboxes
                    $(element).trigger("change");
                }
            });
        }

        // ============================== 동작 컨트롤 ==============================
        ctrl.btnEditHandler = function() {
            var self = et.vc;


        }

        // ============================== 이벤트 리스너 ==============================

        // ============================== DataTables 생성, 이벤트들 ==============================


        // ============================== Form 리스너 ==============================
        $("#editForm").submit(function (e) {
            var self = et.vc;


            e.preventDefault();
        })


        return ctrl;
    })
);