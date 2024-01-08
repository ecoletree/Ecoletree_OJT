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
			if (!et.vc || et.vc.name !== 'empList') {
				et.vc = ctrl(et)
			}
			
		}
		else {
			console.error('ecoletree OR ETCONST is not valid. please check that common.js file was imported.')
		}
	}(this.ecoletree, function (et) {
		
		'use strict'
		
		var ctrl = {}
		
		ctrl.name = 'empList'
		ctrl.path = '/sample'
		
		// ============================== 화면 컨트롤 ==============================
		/**
		 * init VIEW
		 */
		ctrl.init = function (initData) {
			var self = et.vc
			
			ETService()
			.setSuccessFunction(self.resultFunction)
			// .setErrorFunction(self.errorFunction)
			.callService(self.path + '/code', {})
			
			self.eventHandlers()
			
			et.setDataTableRowSelection('#tbList', self.rowSelectionHandler)
		}
		
		/**
		 * 테이블에서 '행'을 선택했을 때 발생하는 이벤트입니다.
		 *
		 * @param {object} $target 선택한 객체
		 * @param {number} row 선택한 행
		 * @param {number} col 선택한 열
		 * @param {boolean} columnVisible
		 * */
		ctrl.rowSelectionHandler = function ($target, row, col, columnVisible) {
			var self = et.vc
			
			if (col !== 0 && col !== undefined) {
				let rowData = et.getRowData('#tbList', $target.closest('tr'))
				ETService().callView('/emp/update', rowData)
			}
		}
		
		/**
		 * 서버에서 응답받은 결과를 처리하는 함수입니다.
		 *
		 * @param {object} response 서버 응답 결과
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
		 * 클릭 이벤트를 담당하는 이벤트 핸들러 모음
		 * */
		ctrl.eventHandlers = function () {
			var self = et.vc
			
			$('#btnSearch').click(self.btnSearchHandler)
			$('#cbAllClick').click(self.checkBoxClickHandler)
			$('#btnDelete').click(self.deleteBtnHandler)
			$('#tbList tbody input:checkbox').click(self.singleCheckBoxHandler)
		}
		
		// ============================== 동작 컨트롤 ==============================
		
		/**
		 * 헤더에 위치한 체크박스를 누르면 테이블에 존재하는 모든 행을 선택합니다. 혹은 선택을 해제합니다.
		 *
		 * */
		ctrl.checkBoxClickHandler = function () {
			var self = et.vc
			
			let checked = $('#cbAllClick').prop('checked')
			
			if (checked) {
				$('input:checkbox').prop('checked', true)
			}
			else {
				$('input:checkbox').prop('checked', false)
			}
			
		}
		
		// ============================== 이벤트 리스너 ==============================
		
		/**
		 * 검색 버튼을 눌렀을 때 서버에 요청을 보내는 함수에 검색값을 전달합니다.
		 *
		 * */
		ctrl.btnSearchHandler = function () {
			var self = et.vc
			
			let param = {}
			
			param.emp_name = $('#iptSearch').val()
			param.position = $('#selPosition').val()
			
			self.createDateTables(param)
		}
		
		/**
		 * 체크박스 하나를 클릭했을 때 이벤트를 처리합니다. 모든 항목을 체크하면 전체 목록를 선택하는 체크박스를 체크,
		 * 모든 항목이 체크되어 있는 상황에서 개별 체크박스를 선택해제 시키면 전체 목록를 선택하는 체크박스의 체크를 해제합니다.
		 *
		 * */
		ctrl.singleCheckBoxHandler = function () {
			let checks = $('input:checkbox:not(#cbAllClick)')
			let checked = $('input:checkbox:not(#cbAllClick):checked')
			
			if (checks.length === checked.length) {
				$('#cbAllClick').prop('checked', true)
			}
			else {
				$('#cbAllClick').prop('checked', false)
			}
		}
		
		/**
		 * 삭제 버튼을 눌렀을 때 선택한 행 데이터를 삭제합니다.
		 *
		 * */
		ctrl.deleteBtnHandler = function () {
			var self = et.vc
			
			let del = {}
			$('#tbList tbody input:checkbox:checked').each(function (index, element) {
				del[index] = (
					et.getRowData('#tbList', this.closest('tr'))
				)
			})
			
			// console.log(del)
			// {0 : { key : value }, 1 : { key : value },...}
			
			// 선택한 데이터가 존재하지 않는 경우
			if (del.length === 0) {
				alert('삭제할 데이터를 선택해주세요.')
			}
			else {
				// 아직 컨트롤러가 없는 관계로 주석처리
				// et.callService(self.path + "/delete", del);
			}
			
		}
		// ============================== DataTables 생성, 이벤트들 ==============================
		
		/**
		 * 서버에 데이터를 요청해서 받아온 결과를 테이블에 출력합니다.
		 *
		 * @param {object} searchParams 검색조건
		 * */
		ctrl.createDateTables = function (searchParams) {
			var self = et.vc
			
			let columns = [
				{
					// render is from library
					data: '', render: function (data, type, row, meta) {
						return '<input type="checkbox">'
					}
				},
				{ data: 'emp_num' },
				{ data: 'emp_name' },
				{ data: 'emp_engname' },
				{
					data: 'position', render: function (data, type, row, meta) {
						return row.position_name
					}
				},
				{ data: 'email_1' },
				{ data: 'phone_num' },
				{ data: 'birthday' }
			]
			
			let options = et.createDataTableSettings(
				columns,
				self.path + '/list',
				searchParams,
				self.dataTableCallback
			)
			
			// temporary disable paging option
			options.paging = false
			
			$('#tbList').DataTable(options)
		}
		
		/**
		 * !TBD, 동적 테이블의 콜백함수를 설정합니다.
		 *
		 * @param {object} settings         * */
		ctrl.dataTableCallback = function (settings) {
			var self = et.vc
			
		}
		
		// ============================== Form 리스너 ==============================
		
		return ctrl
	})
)