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
				et.vc = ctrl(et);
			}
			
		}
		else {
			console.error('ecoletree OR ETCONST is not valid. please check that common.js file was imported.');
		}
	}(this.ecoletree, function (et) {
		
		'use strict';
		
		var ctrl = {};
		
		ctrl.name = 'createEmp';
		ctrl.path = '/sample';
		
		// ============================== 화면 컨트롤 ==============================
		/**
		 * init VIEW
		 */
		ctrl.init = function (initData) {
			var self = et.vc;
			
			self.initData = initData;
			
			// [수정사항]
			// initData 가져와서 list 로 뿌려주기
			// ETService() 사용한 api 콜 줄이기
			
			// 직원 데이터 호출
			ETService()
				.setSuccessFunction(self.resultFunction)
				// .setErrorFunction(self.errorFunction)
				.callService(self.path + '/code', {});
			self.validation(); // 유효성 검사
			
			$('#btnAdd').click(self.btnAddClickHandler); // '추가' 버튼 클릭 이벤트
		};
		
		/**
		 * 서버에서 정상적으로 응답한 경우, 해당 응답을 처리합니다.
		 *
		 * @param {Object} response 서버 응답 (empData.properties 에서 가져온 데이터)
		 * */
		ctrl.resultFunction = function (response) {
			var self = et.vc;
			
			let empList = null;
			
			if (response.message === 'success') {
				empList = response.data;
				
				et.makeSelectOption(empList, {
					value: 'code_cd',
					text : 'code_name'
				}, '#selPosition', '전체');
			}
			// when error,
			else {
				// TBD
			}
		};
		// ============================== 동작 컨트롤 ==============================
		
		// ============================== 이벤트 리스너 ==============================
		/**
		 * 추가 버튼을 클릭했을 시, form 을 제출하는 함수를 호출합니다.
		 * */
		ctrl.btnAddClickHandler = function () {
			var self = et.vc;
			
			$('#addForm').submit();
		};
		
		// ============================== DataTables 생성, 이벤트들 ==============================
		
		// ============================== Form 리스너 ==============================
		
		/**
		 * form 데이터의 유효성을 검사합니다. 필수 조건 충족 여부, 길이 제한 등을 검사합니다.
		 *
		 * */
		ctrl.validation = function () {
			var self = et.vc;
			
			let addValidation
				= new ETValidate('#addForm', self.path + '/create')
				.setSubmitHandler(self.addSubmitHandler)
				.setShowErrors(et.setErrorFunction());
			
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
				const parsed = value.toString().trim();
				return et.common.REG_EXP.NUMBER_ONLY_NOT_REQUIRED.test(parsed);
			});
			// 커스텀 룰 - 핸드폰 형식 체크
			ETValidate.addMethod('phoneReg', function (value, element, param) {
				const parsed = value.toString()
					.trim()
					.replace(et.common.REG_EXP.WHITE_SPACE, '')
					.replace(et.common.REG_EXP.SPECIAL_CHAR_WO_HYPHEN, '');
				return et.common.REG_EXP.PHONE_NUMBER.test(parsed);
			});
			// 커스텀 룰 - 이메일 형식 체크
			ETValidate.addMethod('emailReg', function (value, element, params) {
				const parsed = value.toString().trim();
				return et.common.REG_EXP.EMAIL_ADDRESS.test(parsed);
			});
			// 커스텀 룰 - 생년월일 체크
			ETValidate.addMethod('birthDateReg', function (value, element, params) {
				const parsed = value.toString()
					.trim()
					.replace(et.common.REG_EXP.WHITE_SPACE, '')
					.replace(et.common.REG_EXP.SPECIAL_CHAR_WO_HYPHEN_AND_DOT, '');
				return et.common.REG_EXP.BIRTH_DATE.test(parsed);
			});
			// 커스텀 룰 - 영문이름 체크
			ETValidate.addMethod('engOnlyReg', function (value, element, params) {
				const parsed = value.toString()
					.trim()
					.replace(et.common.REG_EXP.WHITE_SPACE, '')
					.replace(et.common.REG_EXP.SPECIAL_CHAR, '');
				debugger
				return value.toString() !== '' ? et.common.REG_EXP.ENG_ONLY_NOT_REQUIRED.test(parsed) : true;
			});
			
			// (1) emp_name
			addValidation.validateRules(
				'emp_name',
				addValidation.REQUIRED,
				'이름은 필수값 입니다.'
			);
			// (2) department
			addValidation.validateRules(
				'department',
				addValidation.REQUIRED,
				'부서는 필수값 입니다.'
			);
			// (3) position
			addValidation.validateRules(
				'position',
				addValidation.REQUIRED,
				'직위는 필수값 입니다.'
			);
			
			// (4) email
			addValidation.validateRules(
				'email_1',
				addValidation.REQUIRED,
				'(abcd@nate.com) 메일은 필수값 입니다.'
			);
			// (5) phone_num
			addValidation.validateRules(
				'phone_num',
				'phoneReg',
				'(010-1234-1234) 전화번호 형식이 맞지 않습니다.'
			);
			// (6) emp_num
			addValidation.validateRules(
				'emp_num',
				'numberOnlyReg',
				'(숫자) 사번은 필수값 입니다.'
			);
			// (7) emp_engname
			addValidation.validateRules(
				'emp_engname',
				'engOnlyReg',
				'(영문) 영문만 입력해주세요'
			);
			
			addValidation.apply();
		};
		
		/**
		 * 유효성 검사를 통과한 form 데이터를 submit 합니다.
		 *
		 * */
		ctrl.addSubmitHandler = function () {
			var self = et.vc;
			
			let form = $('#addForm');
			// form 데이터 직렬화
			let formData = ETValidate.convertFormToObject(form, true, true);
			console.log('[/sample/create] formData 확인', formData);
			
			// new ETService()
			//     .setSuccessFunction(self.addSuccessHandler)
			//     .callService(self.path + "/create", formData);
		};
		
		/**
		 * form 제출 후, 서버에서 전송한 응답을 처리합니다.
		 *
		 * @param {Object} response 서버 응답
		 * */
		ctrl.addSuccessHandler = function (response) {
			var self = et.vc;
			
			// success 일 시, callView 호출해서 화면에 뿌려주기
			
		};
		
		return ctrl;
	})
);




