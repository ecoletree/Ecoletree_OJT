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
			if (!et.vc || et.vc.name !== 'createEmp') {
				et.vc = ctrl(et)
			}
			
		}
		else {
			console.error('ecoletree OR ETCONST is not valid. please check that common.js file was imported.')
		}
	}(this.ecoletree, function (et) {
		
		'use strict'
		
		var ctrl = {}
		
		ctrl.name = 'createEmp'
		ctrl.path = '/sample'
		
		// ============================== 화면 컨트롤 ==============================
		/**
		 * init VIEW
		 */
		ctrl.init = function () {
			var self = et.vc
			
			ctrl.regExp = {}
			
			// 직원 데이터 호출
			ETService()
			.setSuccessFunction(self.resultFunction)
			.setErrorFunction(self.errorFunction)
			.callService(self.path + '/code', {})
			
			self.setRegExp()  // 정규식 등록
			self.validation()
			
			$('#btnAdd').click(self.btnAddClickHandler)
		}
		
		/**
		 * 서버에서 정상적으로 응답한 경우, 해당 응답을 처리합니다.
		 *
		 * @param {object} response 서버 응답 (직원 데이터)
		 * */
		ctrl.resultFunction = function (response) {
			var self = et.vc
			
			let empList = null
			
			if (response.message === 'success') {
				empList = response.data
				
				et.makeSelectOption(empList, {
					value: 'code_cd',
					text : 'code_name'
				}, '#selPosition', '전체')
			}
			// when error,
			else {
				// TBD
			}
		}
		
		/**
		 * 유효성 검사를 위한 정규식을 담고 있는 메서드
		 * */
		ctrl.setRegExp = function () {
			var self = et.vc
			
			// 숫자만 (사번)
			self.regExp['numberOnlyReg'] = /^\d+$/g
			// 핸드폰 번호
			self.regExp['phoneReg'] = /^\d{3}-\d{4}-\d{4}$/g
			// 이메일 확인
			self.regExp['emailReg'] = /^\w([-_.]?\w)*@\w([-_.]?\w)*\.[a-zA-Z]{2,3}$/i
			// 빈칸 확인
			self.regExp['whiteSpaceReg'] = /\s/g
			// 특수문자 확인
			self.regExp['irregularCharReg'] = /[!?@#$%^&*():;+-=~{}<>_[\]|\\"',./`₩]/g
			// 하이픈(-) 제외 특수문자 확인
			self.regExp['irregularCharRegWithoutHyphen'] = /[!?@#$%^&*():;+=~{}<>_[\]|\\"',./`₩]/g
			// 하이픈(-), 닷(.) 제외 특수문자 확인
			self.regExp['irregularCharRegWithoutHyphenAndDot'] = /[!?@#$%^&*():;+=~{}<>_[\]|\\"',/`₩]/g
			// 영문이름 && 2~6 글자 제한
			self.regExp['engOnlyReg'] = /^[a-zA-Z]?$/g
			// 생년월일
			// 1999.01.01, 1991.1.1, 1991-01-01, 1991-1-1
			self.regExp['birthDateReg'] = /^\d{4}[.|-]\d{1,2}[.|-]\d{1,2}$/g
			
		}
		// ============================== 동작 컨트롤 ==============================
		
		// ============================== 이벤트 리스너 ==============================
		/**
		 * 추가 버튼을 클릭했을 시, form 을 제출하는 함수를 호출합니다.
		 * */
		ctrl.btnAddClickHandler = function () {
			var self = et.vc
			
			$('#addForm').submit()
		}
		
		// ============================== DataTables 생성, 이벤트들 ==============================
		
		// ============================== Form 리스너 ==============================
		
		/**
		 * form 데이터의 유효성을 검사합니다. 필수 조건 충족 여부, 길이 제한 등을 검사합니다.
		 *
		 * */
		ctrl.validation = function () {
			var self = et.vc
			
			let addValidation
				= new ETValidate('#addForm', self.path + '/create')
			.setSubmitHandler(self.addSubmitHandler)
			.setShowErrors(et.setErrorFunction())
			
			
			// 커스텀 룰 - 숫자만 (사번)
			ETValidate.addMethod('numberOnlyReg', function (value, element, params) {
				return self.regExp.numberOnlyReg.test(value.toString().trim()) && !self.regExp.irregularCharReg.test(value.toString().trim())
			})
			// 커스텀 룰 - 핸드폰 형식 체크
			ETValidate.addMethod('phoneReg', function (value, element, param) {
				return self.regExp.phoneReg.test(value.toString().trim()) && !self.regExp.irregularCharRegWithoutHyphen.test(value.toString().trim())
			})
			// 커스텀 룰 - 이메일 형식 체크
			ETValidate.addMethod('emailReg', function (value, element, params) {
				return self.regExp.emailReg.test(value.toString().trim())
			})
			// 커스텀 룰 - 생년월일 체크
			ETValidate.addMethod('birthDateReg', function (value, element, params) {
				return self.regExp.birthDateReg.test(value.toString().trim()) && !self.regExp.irregularCharRegWithoutHyphenAndDot.test(value.toString().trim())
			})
			// 커스텀 룰 - 영문이름 체크
			ETValidate.addMethod('engOnlyReg', function (value, element, params) {
				return self.regExp.engOnlyReg.test(value.toString().trim()) && !self.regExp.irregularCharReg.test(value.toString().trim())
			})
	
			// (1) emp_name
			addValidation.validateRules(
				'emp_name',
				addValidation.REQUIRED,
				'이름은 필수값 입니다.'
			)
			// (2) department
			addValidation.validateRules(
				'department',
				addValidation.REQUIRED,
				'부서는 필수값 입니다.'
			)
			// (3) position
			addValidation.validateRules(
				'position',
				addValidation.REQUIRED,
				'직위는 필수값 입니다.'
			)
			
			// (4) email
			addValidation.validateRules(
				'email_1',
				addValidation.REQUIRED,
				'메일은 필수값 입니다.'
			)
			// (5) phone_num
			addValidation.validateRules(
				'phone_num',
				'phoneReg',
				'전화번호 형식이 맞지 않습니다.'
			)
			// (6) emp_num
			addValidation.validateRules(
				'emp_num',
				'numberOnlyReg',
				'(숫자) 사번은 필수값 입니다.'
			)
			// (7) emp_engname
			addValidation.validateRules(
				'emp_engname',
				'engOnlyReg',
				'(영문이름) 영문만 입력해주세요'
			)
			
			addValidation.apply()
		}
		
		/**
		 * 유효성 검사를 통과한 form 데이터를 submit 합니다.
		 *
		 * */
		ctrl.addSubmitHandler = function () {
			var self = et.vc
			
			let form = $('#addForm')
			// form 데이터 직렬화
			let formData = ETValidate.convertFormToObject(form, true, true)
			
			console.log('[/sample/create] formData 확인', formData)
			
			// new ETService()
			//     .setSuccessFunction(self.addSuccessHandler)
			//     .callService(self.path + "/create", formData);
		}
		
		/**
		 * form 제출 후, 서버에서 전송한 응답을 처리합니다.
		 *
		 * @param {object} response 서버 응답
		 * */
		ctrl.editSuccessHandler = function (response) {
			var self = et.vc
			
		}
		
		return ctrl
	})
)




