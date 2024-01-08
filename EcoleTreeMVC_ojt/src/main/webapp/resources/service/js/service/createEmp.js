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
			
			ctrl.regExp = {} // 정규식을 전역변수에 담는다.
			
			// 직원 데이터 호출
			ETService()
				.setSuccessFunction(self.resultFunction)
				// .setErrorFunction(self.errorFunction)
				.callService(self.path + '/code', {})
			
			self.setRegExp()  // 정규식 등록
			self.validation() // 유효성 검사
			
			$('#btnAdd').click(self.btnAddClickHandler) // '추가' 버튼 클릭 이벤트
		}
		
		/**
		 * 서버에서 정상적으로 응답한 경우, 해당 응답을 처리합니다.
		 *
		 * @param {Object} response 서버 응답 (empData.properties 에서 가져온 데이터)
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
		 * 유효성 검사를 위한 정규식을 담고 있는 메서드입니다. 전역 객체에 정규식을 담습니다.
		 * */
		ctrl.setRegExp = function () {
			var self = et.vc
			
			// 숫자만 (사번)
			self.regExp['numberOnlyReg'] = /^\d+$/g
			// 핸드폰 번호
			// 하이픈(-) 에 ? 를 붙여 010-1234-1234, 01012341234 모두 통과시킵니다.
			self.regExp['phoneReg'] = new RegExp(/^\d{3}-?\d{4}-?\d{4}$/g)
			// 이메일 확인
			self.regExp['emailReg'] = new RegExp(/^\w([-_.]?\w)*@\w([-_.]?\w)*\.[a-zA-Z]{2,3}$/ig)
			// 빈칸 확인
			self.regExp['whiteSpaceReg'] = new RegExp(/\s/g)
			// 특수문자 확인
			self.regExp['specialCharReg'] = new RegExp(/[!?@#$%^&*():;+-=~{}<>_[\]|\\"',./`₩]/g)
			// 하이픈(-) 제외 특수문자 확인
			self.regExp['specialCharRegWithoutHyphen'] = new RegExp(/[!?@#$%^&*():;+=~{}<>_[\]|\\"',./`₩]/g)
			// 하이픈(-), 닷(.) 제외 특수문자 확인
			self.regExp['specialCharRegWithoutHyphenAndDot'] = new RegExp(/[!?@#$%^&*():;+=~{}<>_[\]|\\"',/`₩]/g)
			// 영문이름
			self.regExp['engOnlyReg'] = new RegExp(/^[a-zA-Z]*$/g)
			// 생년월일
			// 1999.01.01, 1991.1.1, 1991-01-01, 1991-1-1
			self.regExp['birthDateReg'] = new RegExp(/^\d{4}[.|-]\d{1,2}[.|-]\d{1,2}$/g)
			// 한글 + 영어 + 숫자
			self.regExp['koreanReg'] = new RegExp(/^[ㄱ-ㅎ가-힣a-zA-Z]*$/g)
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
			
			/*
			 * 정규식을 사용한 커스텀 룰을 추가하다보니, 너무 장황하게 길어짐 && 중복발생 문제가 생깁니다.
			 * 정규식으로 유효성 검사를 하는 것은 파일을 분리해서 관리해야 합니다. 굳이 가독성 떨어지는
			 * 정규식을 로직단에서 확인 해야할 이유는 없기 때문입니다.
			 * 하지만 common 으로 관리되는 공통 파일을 손댈 수 없어 이렇게 둡니다.
			 *
			 * 또한 실수로 특수문자가 입력된 경우
			 * (1) request 를 제한하고 정규식으로 아예 입력 자체를 막을지,
			 * (2) request 를 허용하고 특수문자 자체를 replace 시킬 지
			 * */
			
			/*
			 * (ex) ETValidate 객체에 메서드를 추가하는 예시
			 * 리턴값이 true 면 통과, false 면 예외 발생
			 * ETValidate.addMethod("any-name", function (value, element, params) {
			 *   return value.length > 10
			 * })
			 *
			 * */
			
			// 커스텀 룰 - 숫자만 (사번)
			ETValidate.addMethod('numberOnlyReg', function (value, element, params) {
				const parsed = value.toString().trim()
				return self.regExp.numberOnlyReg.test(parsed)
			})
			// 커스텀 룰 - 핸드폰 형식 체크
			ETValidate.addMethod('phoneReg', function (value, element, param) {
				const parsed = value.toString()
					.trim()
					.replace(self.regExp.whiteSpaceReg, '')
					.replace(self.regExp.specialCharRegWithoutHyphen, '')
				return self.regExp.phoneReg.test(parsed)
			})
			// 커스텀 룰 - 이메일 형식 체크
			ETValidate.addMethod('emailReg', function (value, element, params) {
				const parsed = value.toString().trim()
				return self.regExp.emailReg.test(parsed)
			})
			// 커스텀 룰 - 생년월일 체크
			ETValidate.addMethod('birthDateReg', function (value, element, params) {
				const parsed = value.toString()
					.trim()
					.replace(self.regExp.whiteSpaceReg, '')
					.replace(self.regExp.specialCharRegWithoutHyphenAndDot, '')
				return self.regExp.birthDateReg.test(parsed)
			})
			// 커스텀 룰 - 영문이름 체크
			ETValidate.addMethod('engOnlyReg', function (value, element, params) {
				const parsed = value.toString()
					.trim()
					.replace(self.regExp.whiteSpaceReg, '')
					.replace(self.regExp.specialCharReg, '')
				return value.toString() !== '' ? self.regExp.engOnlyReg.test(parsed) : true
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
				'(abcd@nate.com) 메일은 필수값 입니다.'
			)
			// (5) phone_num
			addValidation.validateRules(
				'phone_num',
				'phoneReg',
				'(010-1234-1234) 전화번호 형식이 맞지 않습니다.'
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
				'(영문) 영문만 입력해주세요'
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




