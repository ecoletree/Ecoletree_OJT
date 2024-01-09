// ******************************************************************************
// * Copyright (c) 2017 Ecoletree. All Rights Reserved.
// * 
// * Author : sgKim
// * Create Date : 2016. 6. 24.
// * DESC : 프로젝트 최상위 객체 정의
// ******************************************************************************

/* common utils */
(
	function (g, ctrl) {
		if (g.ecoletree) { // [OK] create ecoletree object
			g.ecoletree.common = ctrl(g.ecoletree);
		}
		
	}(this, function (et) {
		
		var ctrl = {}; // g.ecoletree
		
		ctrl.RULL_CLASS = {
			IS_WRITE             : 'is_write'
			, IS_DELETE          : 'is_delete'
			, IS_UPDATE          : 'is_update'
			, IS_SEARCH          : 'is_search'
			, IS_UPLOAD          : 'is_upload'
			, IS_DOWNLOAD        : 'is_download'
			, IS_REC_DOWNLOAD    : 'is_rec_download'
			, IS_TRANSFER        : 'is_transfer'
			, IS_ENCRYPT_DOWNLOAD: 'is_encrypt_download'
			, IS_PLAY            : 'is_play'
			, IS_COLUMN          : 'is_column'
			, IS_SEARCH_OPTION   : 'is_search_option'
			, IS_CERTIFICATION   : 'is_certification'
		};
		
		/**
		 * !주의사항: flags 로 'g' 를 사용하면 안됨
		 * js 에서 global 옵션 부여 시, lastIndex 가 가장 마지막으로 매칭된 문자열을 가리키게 된다.
		 * lastIndex 는 정규식으로 match 를 시도하는 시작 지점을 나타내는 포인터이다.
		 * 정규식을 한번 더 실행하면 정규식을 만족하는 문자열의 가장 마지막 이후부터 다시 검출을 시도하게 된다.
		 * 따라서, 정규식에 해당하는 문자열은 존재할 수 없으므로 false 가 나오게 된다. 이 시점에서 정규식에 match 되는 문자열이 없다고 간주하고
		 * lastIndex 를 0 으로 초기화한다. 이 이유로 한번 더 실행시키면 정규식이 제대로 동작한다.
		 *
		 *(출처): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex
		 * */
		ctrl.REG_EXP = {
			// (필수 조건) 오로지 숫자
			NUMBER_ONLY_REQUIRED: new RegExp(/^\d+$/)
			// (필수 조건이 아닌 경우) 오로지 숫자
			, NUMBER_ONLY_NOT_REQUIRED      : new RegExp(/^\d*$/)
			// 핸드폰 번호 (예시: 010-1234-5678, 01012345678)
			, PHONE_NUMBER                  : new RegExp(/^\d{3}-?\d{4}-?\d{4}$/)
			// 이메일 (abcd@nate.com, abcd@
			, EMAIL_ADDRESS                 : new RegExp(/^\w([-_.]?\w)*@\w([-_.]?\w)*\.[a-zA-Z]{2,3}$/, 'i')
			// 공백 확인 (사용예시: replace 로 공백 제거)
			, WHITE_SPACE                   : new RegExp(/\s/)
			// 특수문자 검출
			, SPECIAL_CHAR                  : new RegExp(/[!?@#$%^&*():;+-=~{}<>_[\]|\\"',./`₩]/)
			// 하이픈('-') 을 제외한 특수문자 검출
			, SPECIAL_CHAR_WO_HYPHEN        : new RegExp(/[!?@#$%^&*():;+=~{}<>_[\]|\\"',./`₩]/)
			// 하이픈('-'), 점('.') 을 제외한 특수문자 검출
			, SPECIAL_CHAR_WO_HYPHEN_AND_DOT: new RegExp(/[!?@#$%^&*():;+=~{}<>_[\]|\\"',/`₩]/)
			// (필수 조건이 아닌 경우) 오로지 영문
			, ENG_ONLY_NOT_REQUIRED         : new RegExp(/^[a-zA-Z]*$/)
			// (필수 조건) 오로지 영문
			, ENG_ONLY_REQUIRED             : new RegExp(/^[a-zA-Z]+$/)
			// (필수 조건이 아닌 경우) 오로지 한글과 영문
			, KOR_ENG_ONLY_NOT_REQUIRED     : new RegExp(/^[ㄱ-ㅎ가-힣a-zA-Z]*$/)
			// (필수 조건) 오로지 한글과 영문
			, KOR_ENG_ONLY_REQUIRED         : new RegExp(/^[ㄱ-ㅎ가-힣a-zA-Z]+$/)
			// 생년월일 (허용 예시: 2024.01.09,2024-01-09)
			, BIRTH_DATE                    : new RegExp(/^\d{4}[.|-]\d{1,2}[.|-]\d{1,2}$/)
		};
		ctrl.CODE_LIST = [];
		/**
		 * code : p_code_cd
		 */
		ctrl.getCodeList = function (code) {
			var list = [];
			
			$.each(et.common.CODE_LIST, function (index, item) {
				if (item.code_cd !== undefined && item.code_cd === code) {
					list = item.children;
				}
			});
			
			return list;
		};
		
		ctrl.groupByJs = function (data, key) {
			return data.reduce(function (carry, el) {
				var group = el[key];
				
				if (carry[group] === undefined) {
					carry[group] = [];
				}
				
				carry[group].push(el);
				return carry;
			}, {});
		};
		
		return ctrl;
	})
);
