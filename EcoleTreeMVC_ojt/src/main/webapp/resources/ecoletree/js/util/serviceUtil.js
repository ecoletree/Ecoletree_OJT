/*******************************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * Author : dongsuk Create Date : 2016. 5. 24.
 * 
 * Amender : sgKim Update Date : 2016. 6. 28.
 * 
 * DESC : 서버 통신 서비스 유틸
 ******************************************************************************/
if (!$) { // check jQuery Plugin
	console.error("jQuery is null or jQuery's namespace is crashed. This Util need jQuery plugin.");
} else if (!_) { // check lodash
	console.error("lodash util plugin is null or '_' overwrite other value. This Util need lodash plugin.");
} else { // all clear
	"use strict";
	
	/**
	 * 서비스 유틸 클래스
	 * 
	 * @class ETService
	 * @constructor
	 * @param {string} dataType 서버에서 반환되는 데이터 형식 지정. 기본값은 "text"
	 * @param {boolean} async 비동기방식으로 처리 여부. 기본값은 true.
	 * @param {boolean || string} contentType 서버에 데이터를 보낼 떄 사용되는 content-type 헤더
	 * 값. 기본값은 "application/json; chaETet=UTF-8"
	 * @param {string} method http 전송방식. 기본값은 "post"
	 */
	function ETService(dataType, async, contentType, method) {
		var _fn_isString;
		
		if (!(this instanceof ETService)) {
			return new ETService(dataType, async, contentType, method);
		}
		
		_fn_isString = this.__private._isString;
		if (_fn_isString(dataType)) {
			this.dataType = dataType;
		}
		if (_.isBoolean(async)) {
			this.async = async;
		}
		if (_.isBoolean(contentType) || _fn_isString(contentType)) {
			this.contentType = contentType;
		}
		if (_fn_isString(method)) {
			this.method = method;
		}
	}
	
	// ****************************** CLASS MEMBERS ******************************
	ETService.constructor = ETService;
	
	// ****************************** INSTANCE MEMBERS ******************************
	ETService.prototype = {
		constructor : ETService,
		
		// ============================== properties ==============================
		/**
		 * http 전송방식.
		 * 
		 * @type {string}
		 * @defalut "post"
		 */
		method : "post",
		
		/**
		 * 서버에 데이터를 보낼 떄 사용되는 content-type 헤더 값.
		 * 
		 * @type {boolean|string}
		 * @defalut "application/json; charset=UTF-8"
		 */
		contentType : "application/json; charset=UTF-8",
		
		/**
		 * 서버에서 반환되는 데이터 형식 지정.
		 * 
		 * @type {string}
		 * @default "text"
		 */
		dataType : "text",
		
		/**
		 * 비동기방식 플래그.
		 * 
		 * @type {boolean}
		 * @default true.
		 */
		async : true,
		
		/**
		 * 성공처리용 함수
		 * 
		 * @public
		 * @type {function}
		 * @param {Object} data
		 */
		successFunction : function(data) {
		},
		
		/**
		 * 에러처리용 함수
		 * 
		 * @type {function}
		 * @param {Object} data
		 */
		errorFunction : function(data) {
			console.error(data);
			location.href = getContextPath()+"/open404Error";
		},
		
		// ============================== private function ==============================
		__private : (function() {
			/**
			 * 문자열인가를 확인
			 * 
			 * @param {string} value 확인할 값
			 * @param {boolean} allowEmptyValue "" 값을 유효값으로 판정할것인가 여부. 기본값 false
			 * @returns {boolean}
			 */
			var isString = function(value, allowEmptyValue) {
				var result = _.isString(value);
				
				if (allowEmptyValue !== true && value === "") {
					result = false;
				}
				
				return result;
			};
			
			/**
			 * null, undefined인지 확인.
			 * 
			 * @param {string} value 확인할 값
			 * @param {boolean} isEmptyString 빈 문자열 확인 여부
			 * @param {boolean} isEmptyObject 빈 오브젝트 및 배열 확인 여부
			 * @returns {boolean}
			 */
			var isNil = function(value, isEmptyString, isEmptyObject) {
				var result = _.isNil(value);
				
				if (!!isEmptyString && value === "") {
					result = true;
				}
				
				if (!!isEmptyObject && typeof value === "object" && _.isEmpty(value)) {
					result = true;
				}
				
				return result;
			};
			
			/**
			 * 유효한 URL인지 체크합니다.
			 * 
			 * @param {string} value 체크할 url "/url"
			 * @returns {boolean}
			 */
			var isUrl = function(value) {
				var urlRegEx = /^(\/[a-zA-Z0-9_]+)+$/g;
				return isString(value) && (urlRegEx.test(value) || value === "/");
			};
			
			/**
			 * 성공 처리용 함수
			 * 
			 * @private
			 * @param {Object} data
			 */
			var successHandler = function(self, data) {
				var firstChar;
				
				if (isNil(data, true, true)) { // no data
					data = {};
					data.error = "NO_DATA";
					data.errorMessage = "데이터가 없습니다";
				} else if (isString(data, true)) { // parsing json
					firstChar = data.charAt(0);
					if (firstChar === "{" || firstChar === "[") {
						try {
							data = JSON.parse(data);
						} catch (e) {
							console.error(e);
							data = {};
							data.error = "JSON_PARSE_ERROR";
							data.errorMessage = e.message;
						}
					}
				}
				
				var errorPage = false;
				if (isString(data) && (data.indexOf("404ERROR") > -1)) { // send html document string
					errorPage = true;
					location.href = getContextPath()+"/open404Error";
				} else if (isString(data) && (data.indexOf("SESSIONERROR") > -1)) {
					errorPage = true;
					location.href = getContextPath()+"/sessionTimeout";
				} else if (isString(data) && (data.indexOf("500ERROR") > -1)) {
					errorPage = true;
					location.href = getContextPath()+"/open500Error";
				}
				
				if (!errorPage) {
					if (isString(data) && data.indexOf("<!DOCTYPE html") > -1) { // send html document string
						//document.write(data);
						$("#content").html(data);
					} else if (data === "500" || data === "404") { // show 500, 404 page
						setErrorPage(data);
					} else if (data === "error") { // error string
						self.errorFunction(data);
					} else if (_.isObject(data) && (!!data.error || data.result === "error")) { // error map
						self.errorFunction(data);
					} else { // success
						self.successFunction(data);
					}
				}
			};
			
			var setErrorPage = function() {
				var gotoURL = getContextPath();
				var thisURL = window.location.href;
				if (-1 < thisURL.indexOf("/admin/")) {
					gotoURL = getContextPath() + '/admin';
					
				}
				
				// set styleshseet
				if ($("head").children("#cssEcoletreeHome").length == 0) {
					$('head').append('<link id="cssEcoletreeHome" rel="stylesheet" href="' + getContextPath() + '/resources/ecoletree/css/ecoletree_home.css" type="text/css" />');
				}
				
				$("body").addClass("ecoleLanding ecoleMsgWrap");
				
				var header = '<div class="container"><div class="ecoleHeader"><a class="logo" href="';
				header += getContextPath() + '"><img src="';
				header += getContextPath() + '/resources/ecoletree/img/kr/home/imgLogo.png" alt="CosmeticZone"></a></div></div>';
				$("header").empty().append(header);
				
				var html = '<div id="wrapper">';
				
				// start .container
				html += '<div class="container ecoleMsgInHome"><div class="ecoleMsg"><div>';
				html += '<img src="' + getContextPath() + '/resources/ecoletree/img/kr/home/icon500.png" alt="500" />';
				html += '<h4 class="bxMBottom35"><strong>사용자가 많아 문제가 발생했습니다.</strong></h4>';
				html += '<p>사용자가 많아 페이지를 표시함에 문제가 발생했습니다.<br>F5를 눌러 페이지를 새로고침 하거나 메인페이지로 이동합니다.<br><br>지속적으로 이 메시지가 보인다면 관리자에게 문의 부탁드립니다.</p>';
				html += '<div><a href="' + gotoURL + '" class="btn btn-default">메인 페이지로</a></div>';
				html += '</div></div></div>';
				// end .container
				
				html += '</div>';
				// end #wrapper
				
				$("#content").html(html);
			};
			
			/**
			 * 에러 처리용 함수
			 * 
			 * @private
			 * @param xhr
			 * @param ajaxOptions
			 * @param thrownError
			 */
			var errorHandler = function(self, xhr, ajaxOptions, thrownError) {
				var data = {};
				
				// data.error 발생시 기본셋 구성
				data.error = "SYS_ERROR";
				data.status = xhr.status;
				data.errorMessage = thrownError;
				data.errorDetail = xhr.responseText;
				
				self.errorFunction(data);
			};
			
			/**
			 * dataType이 json일 경우, 전송 데이터를 JSON으로 파싱한다.
			 * 
			 * @param {Object} data 전송할 데이터
			 * @param {String} contentType 데이터타입
			 * @returns {Object} 정제 결과.
			 */
			var convertData = function(data, contentType) {
				if (isString(contentType) && contentType.toLowerCase().indexOf("json") >= 0) { // string json 변환 필요
					if (isNil(data, false, false)) {
						data = {};
					} else if (!_.isObject(data)) {
						data = {
							data : data,
						};
					}
					data = JSON.stringify(data);
				}
				return data;
			};
			
			/**
			 * form을 생성해서 submit으로 서버에 전달한다
			 * 
			 * @param {string} url 파일 다운로드 url
			 * @param {string} method 전달방식
			 * @param {object} postData 전달할 데이터
			 */
			var submitForm = function(url, method, postData) {
				var $form;
				
				if (!isUrl(url)) {
					return false;
				}
				
				$form = $("<form />").prop("method", method).prop("action", getContextPath() + url).hide().appendTo("body"); // IE는 form이 화면에 있어야 submit 가능
				if (_.isObject(postData)) {
					_.forEach(postData, function(value, key) {
						if (_.isObject(value)) { //  객체일 경우 json string으로 변환
							value = JSON.stringify(value);
						}
						$("<input />").prop("name", key).prop("value", value).appendTo($form);
					});
				}
				$form.submit().remove();
				return true;
			};
			
			return {
				successHandler : successHandler,
				errorHandler : errorHandler,
				_isString : isString,
				_isNil : isNil,
				_isUrl : isUrl,
				_convertData : convertData,
				_submitForm : submitForm,
			}
		}()),
		
		// ============================== setter ==============================
		/**
		 * 성공 처리용 함수 등록
		 * 
		 * @param successFunction 성공 처리용 함수. argument는 1개만 받아야 한다.
		 * @returns {ETService}
		 */
		setSuccessFunction : function(successFunction) {
			var self = this;
			self.successFunction = successFunction;
			return self;
		},
		
		/**
		 * 에러 처리용 함수 등록
		 * 
		 * @param errorFunction 에러 처리용 함수. argument는 1개만 받아야 한다.
		 * @returns {ETService}
		 */
		setErrorFunction : function(errorFunction) {
			var self = this;
			self.errorFunction = errorFunction;
			return self;
		},
		
		// ============================== public function ==============================
		/**
		 * 서비스를 호출한다.
		 * 
		 * @param {String} url 호출할 URL. 기본값 ""
		 * @param {Object} postData 서버로 전달할 데이터.
		 * @param {Object} ajaxOptions $.ajax에 별개로 등록할 옵션. ajaxOptions.data보다 해당
		 * 값이 더 우선시됩니다.
		 * @returns {Boolean}
		 */
		callService : function(url, postData, ajaxOptions) {
			var self = this;
			var _fn = self.__private;
			var defaultOptions;
			
			if (!_fn._isUrl(url)) {
				return false;
			}
			
			defaultOptions = self.getDefaultOption();
			if (_.isObject(ajaxOptions)) {
				$.extend(defaultOptions, ajaxOptions);
			}
			
			// 기본 성공 함수 등록
			if (!_.isFunction(defaultOptions.success)) {
				defaultOptions.success = function(data) {
					_fn.successHandler(self, data);
				};
			}
			
			// 기본 실패 함수 등록
			if (!_.isFunction(defaultOptions.error)) {
				defaultOptions.error = function(xhr, ajaxOptions, thrownError) {
					_fn.errorHandler(self, xhr, ajaxOptions, thrownError);
				};
			}
			
			defaultOptions.url = getContextPath() + url;
			
			if (!_fn._isNil(postData, false, false)) {
				defaultOptions.data = _fn._convertData(postData, defaultOptions.contentType);
			} else {
				defaultOptions.data = _fn._convertData(defaultOptions.data, defaultOptions.contentType);
			}
			
			$.ajax(defaultOptions);
			return true;
		},
		
		/**
		 * 화면을 호출합니다.
		 * 
		 * @param url 호출할 화면 URL
		 * @param postData 전달할 데이터
		 * @returns {Boolean}
		 */
		callView : function(url, postData) {
			var self = this;
			var _fn = self.__private;
			
			return _fn._submitForm(url, self.method, postData);
		},
		
		/**
		 * 클래스에 설정된 ajax option값을 획득
		 * 
		 * @returns {Object}
		 */
		getDefaultOption : function() {
			var self = this;
			var opt = {};
			
			opt.method = self.method;
			opt.contentType = self.contentType;
			opt.dataType = self.dataType;
			opt.async = self.async;
			
			return opt;
		},
		
		/**
		 * 파일만 업로드
		 * 
		 * @param url 파일 업로드 url
		 * @param file <input type="file"> dom
		 */
		fileUpload : function(url, file) {
			var self = this;
			var formData, opt;
			
			if (!file.files && !!file[0]) { // jquery 임시대응책. 수정필요 TODO
				file = file[0];
			}
			
			if (!file.files || !file.files[0]) {
				return false;
			}
			
			formData = new FormData();
			formData.append("file_data", file.files[0]);
			
			opt = {};
			opt.data = formData;
			opt.contentType = false;
			opt.processData = false;
			
			return self.callService(url, null, opt);
		},
		
		/**
		 * 폼으로 파일, 데이터 업로드
		 * 
		 * @param url 서버 url
		 * @param form jquery.form 객체
		 */
		fileUploadWithForm : function(url, form) {
			var self = this;
			var $form;
			var formData, opt;
			
			if (!url || !form) {
				return false;
			}
			
			$form = $(form);
			formData = new FormData();
			
			$form.find("input").each(function(index) {
				var $ipt = $(this);
				if ($ipt.attr("type") == "file") {
					formData.append($ipt.attr("name"), $ipt[0].files[0]);
				} else {
					formData.append($ipt.attr("name"), $ipt.val());
				}
			});
			
			opt = {};
			opt.data = formData;
			opt.contentType = false;
			opt.processData = false;
			
			return self.callService(url, null, opt);
		},
		
		/**
		 * 파일을 다운
		 * 
		 * @param url 파일 다운로드 url
		 * @param postData 전달할 데이터
		 */
		fileDownload : function(url, postData) {
			var self = this;
			var _fn = self.__private;
			return _fn._submitForm(url, self.method, postData);
		},
	};
}