/*****************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * Amender : sgKim
 * Update Date : 2016. 6. 30.
 * 
 * DESC : $.validate support 또는 각종 유효성 체크용 util
*****************************************************************/
if (!$) { // check jQuery Plugin
	console.error("jQuery is null or jQuery's namespace is crashed. This Util need jQuery plugin.");
} else if (!_) { // check lodash
	console.error("lodash util plugin is null or '_' overwrite other value. This Util need lodash plugin.");
} else if (!$.validator) { // check jQuery validator Plugin
	console.error("$.validator plugin is null. This Util need jQuery validator plugin.");
} else { // all clear
	"use strict";
	
	if ((window.navigator.userAgent.indexOf("MSIE ") != -1) || (window.navigator.userAgent.indexOf("Trident") != -1)) {
		console.log("Thie browser is IE");
		/**
		 * yyyy.mm.dd 형태의 날짜를 IE에서 인식 가능하도록 변경
		 */
		$.validator.addMethod("date", function(value, element, params) {
			var nv = value.replace(/\./g, "-");
			return this.optional(element) || !/Invalid|NaN/.test(new Date(nv).toString());
		}, "날짜를 입력해 주세요");
	}
	
	/**
	 * 공백값을 허용하지 않는, 필수 문자열값 method 추가
	 */
	$.validator.addMethod("requiredText", function(value, element, params) {
		return value.trim() != "";
	}, "문자열을 입력해 주세요");
	
	/**
	 * textarea등 maxlength만으로 길이 제한을 둘 수 없는, 필수 문자열값 method 추가
	 */
	$.validator.addMethod("requiredMaxlengthText", function(value, element, params) {
		value = (value + "").trim().replace(/(\r)*\n/g, '<br>');
		return value != "" && value.length <= $(element).prop("maxlength");
	}, "값이 입력되지 않았거나, 길이가 너무 깁니다");
	
	/**
	 * textarea등 maxlength만으로 길이 제한을 둘 수 없는 문자열값 method 추가
	 */
	$.validator.addMethod("maxlengthText", function(value, element, params) {
		return (value + "").trim().replace(/(\r)*\n/g, '<br>').length <= $(element).prop("maxlength");
	}, "문자열의 길이가 너무 깁니다");
	
	/**
	 * 값이 입력되어있고, 필수 길이만큼 입력되었는지 여부 체크용 method 추가
	 */
	//	$.validator.addMethod("requiredFixSizeText", function(value, element, params) {
	//		var tv = value.trim();
	//		var $elem = $(element);
	//		return !!tv && (tv.length === $elem.prop("maxlength") || tv.length === $elem.data("minlength"));
	//	}, "필수 길이만큼 문자열을 입력해 주세요");
	/**
	 * 필수 길이만큼 입력되었는지 여부 체크용 method 추가
	 */
	//	$.validator.addMethod("fixSizeText", function(value, element, params) {
	//		var tv = value.trim();
	//		var $elem = $(element);
	//		return !tv || (tv.length === $elem.prop("maxlength") || tv.length === $elem.data("minlength"));
	//	}, "필수 길이만큼 문자열을 입력해 주세요");
	/**
	 * $.validate 서포트 클래스
	 * 
	 * @class ETValidate
	 * @constructor
	 * @param {string} formId form의 id. required.
	 * @param {string} url submit 할 경우 사용될 URL.
	 * @param {string} method http 전송방식. 기본값은 "post"
	 * @param {boolean} onfocusout 포커스를 잃을 때 해당 항목의 유효성 체크를 진행할 것인지 여부. 기본값은 true
	 * @param {boolean} onkeyup 키를 뗄 때 해당 항목의 유효성 체크를 진행할 것인지 여부. 기본값은 true
	 * @param {boolean} debug submit 버튼 클릭시 submit 수행 여부. 기본값은 false
	 */
	function ETValidate(formId, url, method, onfocusout, onkeyup, debug) {
		if (!(this instanceof ETValidate)) {
			return new ETValidate(formId, url, method, onfocusout, onkeyup, debug);
		}
		
		this.__private.init(formId, url, method, onfocusout, debug);
	};
	
	// ****************************** CLASS MEMBERS ******************************
	ETValidate.constructor = ETValidate;
	
	/**
	 * validator에 신규 조건(정규식)을 추가
	 * 
	 * @param {string} type 신규 조건명
	 * @param {string} strReg 정규식 형태의 문자열
	 * @param {string} defaultMessage 기본 메시지
	 */
	ETValidate.addType = function(type, strReg, defaultMessage) {
		$.validator.addMethod(type, function(value, element, params) {
			return this.optional(element) || new RegExp(strReg, "g").test(value);
		}, defaultMessage);
	};
	
	/**
	 * validator에 신규 조건 및 validator 함수를 추가
	 * 
	 * @param {string} type 신규 조건명
	 * @param {function(value, element, params)} method
	 * @param {string} defaultMessage 기본 메시지
	 * @param {boolean} usingFormat 기본 메시지에 $.validator.format 적용 여부. true면 적용한다.
	 */
	ETValidate.addMethod = function(type, method, defaultMessage, usingFormat) {
		if (usingFormat === true) {
			defaultMessage = $.validator.format(defaultMessage);
		}
		$.validator.addMethod(type, method, defaultMessage);
	};
	
	/**
	 * 문자열인가를 확인합니다.
	 * 
	 * @param {string} value 확인할 값
	 * @param {boolean} allowEmptyValue "" 값을 유효값으로 판정할것인가 여부. true 설정시 ""도 유효한 값으로 판정. 기본값 false.
	 * @returns {boolean} 문자열일 경우 true
	 */
	ETValidate.isString = function(value, allowEmptyValue) {
		var result = _.isString(value);
		if (allowEmptyValue !== true && value === "") {
			result = false;
		}
		return result;
	};
	
	/**
	 * 폼 데이터를 object로 변환한다.
	 * 
	 * @param {} form
	 * @param {boolean} isTrim form 값 세팅시 trim 처리 여부. (validate 결과와 달라질 수 있으므로 주의 필요.)
	 * @param {boolean} isReplaceEnter "\r\n"값을 "<br>"로 변경
	 * @returns {Object}
	 */
	ETValidate.convertFormToObject = function(form, isTrim, isReplaceEnter) {
		var arr = $(form).serializeArray();
		var result;
		
		isTrim = isTrim === true;
		
		result = _.transform(arr, function(output, item) {
			var value = item.value;
			if (isTrim) {
				value = value.trim();
			}
			if (isReplaceEnter) {
				value = value.replace(/(\r)*\n/g, '<br>');
			}
			_.set(output, item.name, value);
		}, {});
		
		return result;
	};
	
	/**
	 * 폼 데이터를 FormData로 변환한다.
	 * 
	 * @param {} form
	 * @param {boolean} isTrim form 값 세팅시 trim 처리 여부. (validate 결과와 달라질 수 있으므로 주의 필요.)
	 * @param {boolean} isReplaceEnter "\r\n"값을 "<br>"로 변경
	 * @returns {Object}
	 */
	ETValidate.convertFormToFormData = function(form, isTrim, isReplaceEnter) {
		var arr = $(form).serializeArray();
		var result = new FormData();
		
		isTrim = isTrim === true;
		$.each(arr, function(index, item) {
			var value = item.value;
			if (isTrim) {
				value = value.trim();
			}
			if (isReplaceEnter) {
				value = value.replace(/(\r)*\n/g, '<br>');
			}
			result.append(item.name, value);
		});
		
		return result;
	};
	
	/**
	 * <br>태그를 \r\n으로 변경
	 * @param value
	 * @return
	 */
	ETValidate.brToRN = function(value) {
		if (!value) {
			return "";
		}
		return (value + "").replace(/\<br\>/g, '\r\n');
	};
	
	/**
	 * 에러 메시지를 표시할 dom을 생성하거나 탐색하여 해당 dom에 메시지를 출력합니다.
	 * 
	 * @param {string|jQuery} message 출력할 메시지 dom.
	 * @param {string|jQuery} targetElem dom or dom id. 에러 메시지를 출력할 자리의 기준이 될 element의 id.
	 */
	ETValidate.showErrorMessage = function(message, targetElem) {
		var $target;
		//var $target, $pDiv, $errorDiv;
		/*
		
		// 부모 div 탐색
		if (ETValidate.isString(targetElem) && targetElem.charAt(0) !== "#") {
			targetElem = "#" + targetElem;
		}
		*/
		$target = $(targetElem);
		/*
		if ($pDiv = $target.closest(".form-inline"), $pDiv.length !== 0) {
			$pDiv = $pDiv.parent("div");
		} else if ($pDiv = $target.closest(".input-group"), $pDiv.length !== 0) {
			$pDiv = $pDiv.parent("div");
		} else {
			$pDiv = $target.closest("div,section");
		}
		
		// 에러메시지를 추가하기 위한 div를 탐색 또는 생성.
		$errorDiv = $pDiv.find(".showErrorMessage");
		if ($errorDiv.length === 0) {
			$errorDiv = $("<div />").addClass("showErrorMessage").appendTo($pDiv);
		}
		
		// 에러메시지 세팅
		$errorDiv.html(message);
		*/
		message.insertAfter($target.parent());
	};
	
	/**
	 * 모든 에러 메시지를 제거
	 */
	ETValidate.removeAllMessage = function() {
		$(".showErrorMessage").remove();
	};
	
	// ****************************** INSTANCE MEMBERS ******************************
	ETValidate.prototype = {
		constructor : ETValidate,
		
		// ============================== const ==============================
		TYPE_TEXT : "text",
		TYPE_REQUIRED_TEXT : "requiredText",
		TYPE_REQUIRED_MAXLENGTH_TEXT : "requiredMaxlengthText",
		TYPE_MAXLENGTH_TEXT : "maxlengthText",
		// TYPE_REQUIRED_FIX_SIZE_TEXT : "requiredFixSizeText",
		// TYPE_FIX_SIZE_TEXT : "fixSizeText",
		TYPE_EMAIL : "email",
		TYPE_URL : "url",
		TYPE_DATE : "date",
		TYPE_DATEISO : "dateISO",
		TYPE_NUMBER : "number",
		TYPE_DIGITS : "digits",
		TYPE_CREDITYPE_TCARD : "creditcard",
		
		// ============================== private function ==============================
		__private : (function() {
			var _$form, _validate;
			
			/**
			 * 클래스 초기화
			 */
			var init = function(formId, url, method, onfocusout, onkeyup, debug) {
				var contextUrl;
				_validate = {};
				
				if (!ETValidate.isString(formId)) {
					formId = "form";
				} else if (formId.charAt(0) !== "#") {
					formId = "#" + formId;
				}
				
				_validate.ignore = ":disabled"; // hidden type이 유효성 검사에 포함된다.
				_validate.onfocusout = onfocusout !== false ? undefined : false;
				_validate.onkeyup = onkeyup !== false ? undefined : false;
				_validate.debug = (debug === true);
				_validate.rules = {};
				_validate.messages = {};
				
				contextUrl = ETValidate.isString(url) ? getContextPath() + url : "";
				method = (method === "post" || method === "get") ? method : "post";
				
				_$form = $(formId).prop("method", method).prop("action", contextUrl);
				_$form.find("input,textarea,select").each(function(index) {
					var domName = $(this).attr("name");
					if (!!domName) {
						_validate.rules[domName] = {};
						_validate.messages[domName] = {};
					}
				});
			};
			
			/**
			 * 각 옵션 설정
			 * 
			 * @param {string} name 폼 내부 input의 name
			 * @param {string} option validator의 rule 하위 파라미터명
			 * @param {object} rule rule에 설정될 설정값
			 * @param {string} message 해당 rule에 위배될 경우 출력될 메시지
			 * @param {boolean} needFormat message가 validator.format이 적용되어야 할 경우 true
			 */
			var _setItemOption = function(name, option, rule, message, needFormat) {
				var obj;
				
				if (_.isObject(_validate.rules[name])) {
					obj = {};
					obj[option] = rule;
					$.extend(_validate.rules[name], obj);
					
					if (_.isObject(_validate.messages[name])) {
						if (ETValidate.isString(message)) {
							obj = {};
							if (needFormat === true) {
								message = $.validator.format(message);
							}
							obj[option] = message;
							$.extend(_validate.messages[name], obj);
						} else if (_.isFunction(message)) {
							obj = {};
							obj[option] = message;
							$.extend(_validate.messages[name], obj);
						}
					}
				}
			};
			
			return {
				init : init,
				setItemOption : _setItemOption,
				
				/**
				 * _validate option 값을 설정하고 교체
				 * 
				 * @param {string} optionName 옵션명.
				 * @param {object} handler 옵션에 적용할 값 또는 함수
				 * @param {boolean} disallowTrue true 값을 적용할 수 없음.
				 */
				setOption : function(optionName, handler, disallowTrue) {
					if (!!disallowTrue && handler === true) {
						handler = undefined;
					}
					_validate[optionName] = handler;
				},
				
				/**
				 * 타입(문자열, 이메일, url, 날짜, 숫자 등) 설정
				 * 
				 * @param {string} name 폼 내부 input의 name
				 * @param {string} type 타입값.
				 * @param {boolean} value 해당 type을 on/off 여부
				 * @param {string} errorMessage 에러로 출력될 메시지
				 */
				setType : function(name, type, value, errorMessage) {
					if (type === "text" || (value === false && _.isNil(_validate.rules[type]))) {
						return;
					}
					_setItemOption(name, type, value, errorMessage);
				},
				
				/**
				 * validator의 rules를 직접 작성하여 교체
				 * 
				 * @param {object} rules
				 */
				setRules : function(rules) {
					_validate.rules = rules;
				},
				
				/**
				 * validator의 messages를 직접 작성하여 교체
				 * 
				 * @param {object} messages
				 */
				setMessages : function(messages) {
					_validate.messages = messages;
				},
				
				/**
				 * 인스턴스 생성시 등록한 form 객체를 획득
				 */
				getForm : function() {
					return _$form;
				},
				
				/**
				 * 현재 설정되어있는 validator 옵션객체를 획득
				 */
				getValidate : function() {
					return _validate;
				},
			};
		}()),
		
		// ============================== public function ==============================
		/**
		 * $.validate의 rules을 한번에 설정합니다.<br>
		 * 함수 호출 전에 설정된 rule이 있을 경우 해당 룰을 덮어씌웁니다. (기존 룰이 유지되지 않습니다.)
		 * 
		 * @param {Object} rule
		 * @returns {ETValidate}
		 */
		setRules : function(rules) {
			var self = this;
			
			self.__private.setRules(rules);
			self.apply();
			
			return self;
		},
		
		/**
		 * $.validate의 messages를 한번에 설정합니다.<br>
		 * 함수 호출 전에 설정된 message가 있을 경우 해당 메시지를 덮어씌웁니다. (기존 메시지가 유지되지 않습니다.)
		 * 
		 * @param {Object} messages
		 * @returns {ETValidate}
		 */
		setMessages : function(messages) {
			var self = this;
			
			self.__private.setMessages(messages);
			self.apply();
			
			return self;
		},
		
		/**
		 * submitHandler를 설정합니다. <br>
		 * submitHandler는 form의 submit 버튼을 클릭하여 form 내부 inputs의 유효성을 검사, 모두 ok되면 수행될 함수입니다.
		 * 
		 * @param {function(form)} handler
		 * @returns {ETValidate}
		 */
		setSubmitHandler : function(handler) {
			var self = this;
			self.__private.setOption("submitHandler", handler);
			return self;
		},
		
		/**
		 * invalidHandler를 설정합니다<br>
		 * invalidHandler는 validation 실패시 동작하는 함수입니다.
		 * 
		 * @param {function(form, validator)} handler
		 * @returns {ETValidate}
		 */
		setInvalidHandler : function(handler) {
			var self = this;
			self.__private.setOption("invalidHandler", handler);
			return self;
		},
		
		/**
		 * errorPlacement를 설정합니다.<br>
		 * errorPlacement는 에러가 표시될 위치를 설정하기 위한 함수입니다.
		 * 
		 * @param {function(error, element)} handler
		 * @returns {ETValidate}
		 */
		setErrorPlacement : function(handler) {
			var self = this;
			self.__private.setOption("errorPlacement", handler);
			return self;
		},
		
		/**
		 * debug 모드를 on/off 합니다.
		 * 
		 * @param {boolean} value
		 * @returns {ETValidate}
		 */
		setDebug : function(value) {
			var self = this;
			self.__private.setOption("debug", value === true);
			return self;
		},
		
		/**
		 * 포커스에서 빠져나올때의 동작을 설정합니다.
		 * 
		 * @param {boolean|function(element,event)} handler
		 * @returns {ETValidate}
		 */
		setOnfocusout : function(handler) {
			var self = this;
			self.__private.setOption("onfocusout", handler, true);
			return self;
		},
		
		/**
		 * 키를 뗄 때의 동작을 설정합니다.
		 * 
		 * @param {boolean|function(element,event)} handler
		 * @returns {ETValidate}
		 */
		setOnkeyup : function(handler) {
			var self = this;
			self.__private.setOption("onkeyup", handler, true);
			return self;
		},
		
		/**
		 * validate 타입 설정
		 * 
		 * @param {string} name
		 * @param {string} type
		 * @returns {ETValidate}
		 */
		setType : function(name, type, errorMessage) {
			var self = this;
			var _fn = self.__private;
			var key;
			
			// 기존 설정 false 처리
			for (key in self.TYPE) {
				_fn.setType(name, self.TYPE[key], false);
			}
			_fn.setType(name, type, true, errorMessage);
			
			return self;
		},
		
		/**
		 * 입력 필수 항목 설정
		 * 
		 * @param {string} name
		 * @param {boolean|string|function(element)} required t/f, css selector, 체크 함수를 등록한다.
		 * @param {string} errorMessage 에러 출력 메시지
		 * @returns {ETValidate}
		 */
		setRequired : function(name, required, errorMessage) {
			var self = this;
			self.__private.setItemOption(name, "required", required, errorMessage);
			return self;
		},
		
		// setRemote : function() {}, // TODO setRemote
		
		/**
		 * 다른 Form 항목과 동일한 값인지 체크.
		 * 
		 * @param {string} name
		 * @param {string} equalTo 비교할 항목 selector
		 * @param {string} errorMessage 에러 출력 메시지
		 * @returns {ETValidate}
		 */
		setEqualTo : function(name, equalTo, errorMessage) {
			var self = this;
			self.__private.setItemOption(name, "equalTo", equalTo, errorMessage);
			return self;
		},
		
		// setMinlength : function() {}, // TODO minlength 최소 길이 
		setMaxlength : function(name, maxlength, errorMessage, useFormatMessage) {
			var self = this;
			self.__private.setItemOption(name, "maxlength", maxlength, errorMessage, useFormatMessage !== false);
			_fn.getForm().find('[name="' + name + '"]').prop("maxlength", maxlength);
			return self;
		},
		
		/**
		 * 길위 범위 체크.
		 * 
		 * @param {string} name
		 * @param {Array<integer>} rangelength 길이 범위 설정 [최소, 최대]
		 * @param {string} errorMessage 에러 출력 메시지
		 * @param {boolean} useFormatMessage true 등록시 errorMessage를 $.validator.format으로 처리. 기본값 true
		 * @returns {ETValidate}
		 */
		setRangelength : function(name, rangelength, errorMessage, useFormatMessage) {
			var self = this;
			var _fn = self.__private;
			var $elem;
			
			if (_.isArray(rangelength) && rangelength.length == 2) {
				_fn.setItemOption(name, "rangelength", rangelength, errorMessage, useFormatMessage !== false);
				$elem = _fn.getForm().find('[name="' + name + '"]');
				$elem.prop("maxlength", rangelength[1]);
				// $elem.data("minlength", rangelength[0]);
			} else {
				console.error("rangelength is not Array or rangelength.length is not 2");
			}
			
			return self;
		},
		
		// setMin : function() {}, // TODO min 수치 최소값
		// setMin : function() {}, // TODO min 수치 최대값
		
		/**
		 * 수치 범위 체크
		 * 
		 * @param {string} name
		 * @param {Array<integer>} range 수치 범위 설정 [최소, 최대]
		 * @param {string} errorMessage 에러 출력 메시지
		 * @param {boolean} useFormatMessage true 등록시 errorMessage를 $.validator.format으로 처리, 기본값 true
		 * @returns {ETValidate}
		 */
		setRange : function(name, range, errorMessage, useFormatMessage) {
			var self = this;
			self.__private.setItemOption(name, "range", range, errorMessage, useFormatMessage, useFormatMessage !== false);
			return self;
		},
		
		/**
		 * 변경된 validation 설정을 적용합니다.
		 * 
		 * @returns {ETValidate}
		 */
		apply : function() {
			var self = this;
			var _fn = self.__private;
			_fn.getForm().validate(_fn.getValidate());
			return self;
		},
		
		/**
		 * validation을 수행합니다.
		 */
		run : function() {
			var self = this;
			self.__private.getForm().valid();
		},
		
		/**
		 * form에 설정된 validator를 획득한다.
		 * 
		 * @returns {$.validator}
		 */
		getValidator : function() {
			var self = this;
			return self.__private.getForm().validate();
		},
	};
}