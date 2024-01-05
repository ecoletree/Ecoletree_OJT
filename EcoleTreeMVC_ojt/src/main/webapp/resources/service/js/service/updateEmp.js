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
      if (!et.vc || et.vc.name !== 'updateEmp') {
        et.vc = ctrl(et)
      }

    }
    else {
      console.error('ecoletree OR ETCONST is not valid. please check that common.js file was imported.')
    }
  }(this.ecoletree, function (et) {

    'use strict'

    var ctrl = {}

    ctrl.name = 'updateEmp'
    ctrl.path = '/sample'

    // ============================== 화면 컨트롤 ==============================
    /**
     * init VIEW
     */
    ctrl.init = function (initData) {
      var self = et.vc

      ctrl.initData = initData

      self.setSelect()
      self.setInputView('#editForm', initData.rowData)
      self.validation()

      // edit button click event
      $('#btnEdit').click(self.btnEditClickHandler)
    }

    /**
     * select 박스에 들어가는 데이터를 화면에 출력합니다.
     * */
    ctrl.setSelect = function () {
      var self = et.vc

      let options = {
        value: 'code_cd',
        text : 'code_name'
      }

      et.makeSelectOption(
        self.initData.codeList,
        options,
        '#selPosition',
        '전체'
      )
    }

    /**
     * empList.jsp 테이블에서 선택한 행 데이터를 화면에 보여줍니다. (select 에 들어가는 데이터 제외)
     *
     * @param {string} formId form 아이디
     * @param {object} rowData 이전화면에서 선택한 row 데이터
     * */
    ctrl.setInputView = function (formId, rowData) {
      var self = et.vc

      let triggerElement = []

      $(formId).find('input, select').each(function (index, element) {
        const name = $(element).prop('name')
        if ($(element).prop('localName') === 'select') {
          if (rowData[name] === undefined) {
            $(element).children('option:eq(0)').prop('selected', true)
          }
          else {
            $(element).val(rowData[name])
            triggerElement.push(element)
          }
        }
        else if ($(element).prop('localName') === 'input') {
          $(element).val(rowData[name] === undefined ? '' : rowData[name])
        }
      })

      $.each(triggerElement, function (index, element) {
        if ($(element).prop('localName') === 'select') {
          $(element).trigger('change')
        }
      })
    }

    // ============================== 동작 컨트롤 ==============================

    // ============================== 이벤트 리스너 ==============================

    /**
     * 수정 버튼을 클릭했을 시, form 을 제출하는 함수를 호출합니다.
     * */
    ctrl.btnEditClickHandler = function () {
      var self = et.vc

      $('#editForm').submit()
    }
    // ============================== DataTables 생성, 이벤트들 ==============================

    // ============================== Form 리스너 ==============================

    /**
     * form 데이터의 유효성을 검사합니다. 필수 조건 충족 여부, 길이 제한 등을 검사합니다.
     *
     * */
    ctrl.validation = function () {
      var self = et.vc

      let editValidation
        = new ETValidate('#editForm', self.path + '/update')
        .setSubmitHandler(self.editSubmitHandler)
        .setShowErrors(et.setErrorFunction())

      // 핸드폰 번호 확인 정규식
      const phoneReg = /^\d{3}-\d{4}-\d{4}$/ | /^\d{11}$/
      // 이메일 확인 정규식
      const emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      // 특수문자 확인 정규식
      const irregularCharReg = /[!?@#$%^&*():;+-=~{}<>_\[\]|\\"',.\/`₩]/g
      // 빈칸 확인 정규식 (ETValidate 에 trim
      const whiteSpaceReg = /\s/

      // 커스텀 룰 - 핸드폰 형식 체크
      ETValidate.addMethod('phoneReg', function (value, element, param) {
        return phoneReg.test(value.toString().trim()) || !whiteSpaceReg.test(value.toString())
      })
      // 커스텀 룰 - 이메일 형식 체크
      ETValidate.addMethod('emailReg', function (value, element, params) {
        return !emailReg.test(value.toString())
      })
      // 커스텀 규칙 - 특수문자 체크
      ETValidate.addMethod('irregularCharReg', function (value, element, params) {
        return irregularCharReg.test(value.toString())
      })

      // (1) emp_name
      editValidation.validateRules(
        'emp_name',
        'irregularCharReg',
        '이름은 필수값 입니다.'
      )
      // (2) department
      editValidation.validateRules(
        'department',
        editValidation.REQUIRED,
        '부서는 필수값 입니다.'
      )
      // (3) position
      editValidation.validateRules(
        'position',
        editValidation.REQUIRED,
        '직위는 필수값 입니다.'
      )

      // (4) email
      editValidation.validateRules(
        'email_1',
        'emailReg',
        '메일은 필수값 입니다.'
      )

      // (5) phone_num
      editValidation.validateRules(
        'phone_num',
        'phoneReg',
        '유효한 전화번호가 아닙니다.'
      )

      editValidation.apply()
    }

    /**
     * 유효성 검사를 통과한 form 데이터를 submit 합니다.
     *
     * @param {object} form HTMLFormElement
     * */
    ctrl.editSubmitHandler = function () {
      var self = et.vc
      let form = $('#editForm')
      // form 데이터 직렬화
      let formData = ETValidate.convertFormToObject(form, true, true)
      console.log(formData)

      // ! 현재 /sample/delete 생성 대기 중
      // new ETService()
      //     .setSuccessFunction(self.editSuccessHandler)
      //     .callService(self.path + "/delete", formData);
    }

    /**
     * form 제출 후, 서버에서 전송한 응답을 처리합니다.
     *
     * @param {object} result 서버 응답
     * */
    ctrl.editSuccessHandler = function (result) {
      var self = et.vc

    }

    return ctrl
  })
)