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
            // 화면에 뿌려주기
            showEmployeeData(initData);
            $("#btnEdit").click(self.btnEditHandler);
        };

        function showEmployeeData(data) {
            var self = et.vc;

            const rowData = data.rowData; // 클릭한 row 데이터
            const orgData = data.codeList; // 전체 원본 배열 데이터
            console.log(data);

            $("input[name='emp_num']").val(rowData.emp_num);
            $("input[name='emp_name']").val(rowData.emp_name);
            $("input[name='emp_engname']").val(rowData.emp_engname);
            $("input[name='department']").val(rowData.department);
            $("input[name='position']").val(rowData.position);
            $("input[name='email_1']").val(rowData.email_1);
            $("input[name='email_2']").val(rowData.email_2);
            $("input[name='birthday']").val(rowData.birthday);
            $("input[name='address']").val(rowData.address);
            $("input[name='phone_num']").val(rowData.phone_num);
            $("input[name='emc_contact_point']").val(rowData.emc_contact_point);
            $("input[name='emc_phone_num']").val(rowData.emc_phone_num);

            /*
            * 문제점 1.
            * (1) 직급 관련한 데이터를 불러오지 않는데, 하드 코딩으로 직접 넣어주는게 맞나?
            * (2) 혹은 rowData 받아올 때 직급 데이터를 param 으로 콜백함수에 전달해서 써야하나?
            * */


            // const positionList = ['사원', '인턴'];

            var options = {
                value: "code_cd",
                text : "code_name"
            }
            et.makeSelectOption(orgData, options, "#selPosition", data.rowData.position_name);

        }

        // ============================== 동작 컨트롤 ==============================


        // ============================== 이벤트 리스너 ==============================
        ctrl.btnEditHandler = function () {

            /*
            * 유효성 검사
            * 1. 빈칸 체크 (O)
            * 2. 이전 값과 동일한지 체크 (X)
            * 3. 데이터베이스의 제약 조건 부합하는지 체크 (X)
            * */
            let isValid = false;

            if ($("input[name='emp_num']").val() === "") {
                alert('사번이 빈칸일 수 없습니다.');
                return false;
            }
            if ($("input[name='emp_name']").val() === "") {
                alert('이름이 빈칸일 수 없습니다.');
                return false;
            }

            if ($("input[name='emp_engname']").val() === "") {
                alert('영문 이름이 빈칸일 수 없습니다.');
                return false;
            }
            if ($("input[name='department']").val() === "") {
                alert('부서가 빈칸일 수 없습니다.');
                return false;
            }

            if ($("input[name='phone_num']").val() === "") {
                alert('전화번호가 빈칸일 수 없습니다.');
                return false;
            }

            if ($("input[name='email_1']").val() === "") {
                alert('메일 주소가 빈칸일 수 없습니다.');
                return false;
            }

            if ($("input[name='birthday']").val() === "") {
                alert('생년월일이 빈칸일 수 없습니다.');
                return false;
            }
            if ($("input[name='address']").val() === "") {
                alert('주소가 빈칸일 수 없습니다.');
                return false;
            }
            if ($("input[name='emc_contact_point']").val() === "" ||
                $("input[name='emc_phone_num']").val() === "") {
                alert('긴급 연락망이 빈칸일 수 없습니다.');
                return false;
            }
            // 여기까지 왔으면 유효성 검사 통과
            isValid = true;

            // 2. form 제출
            // 유효성 검사를 다 통과한 경우에만 form 을 제출한다.
            if (!isValid) {
                const formData = new FormData($("#editForm")[0]);

                $.ajax({

                })
            }
        }
        // ============================== DataTables 생성, 이벤트들 ==============================


        // ============================== Form 리스너 ==============================
        $("#editForm").submit(function (e) {
            var self = et.vc;
            e.preventDefault();


        })


        return ctrl;
    })
);