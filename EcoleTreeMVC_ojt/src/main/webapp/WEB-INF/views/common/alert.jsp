<!-- 
/*****************************************************************
 * Copyright (c) 2017 Ecoletree. All Rights Reserved.
 * 
 * Author :  
 * Create Date : 2018. 06. 12.
 * DESC : [관리자웹] 팝업창
*****************************************************************/
-->
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- 시작 : 팝업 -->
<div id="popAlert" class="modal fade in" style="z-index:10000;">
	<div class="modal-dialog" style="max-width: 300px">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="popAlert_btnClose">×</button>
				<h4 id="popAlert_title" class="modal-title"></h4>
			</div>
			<!-- /.modal-header -->

			<div class="modal-body bxCenter">
				<p id="popAlert_message" class="txt16"></p>
			</div>
			<!-- /.modal-body -->

			<div class="modal-footer bxCenter">
				<button id="popAlert_btnPrimary" type="button" class="btnMain"><span id="userMsg">확인</span></button>
				<button id="popAlert_btnDefault" type="button" class="btnGray" data-dismiss="modal">취소</button>
			</div>
			<!-- /.modal-footer -->
		</div>
		<!-- /.modal-content -->
	</div>
	<!-- /.modal-dialog -->
</div>
<!-- 끝 : 팝업 -->

<!-- Popup Controller -->
<script type="text/javascript">
	$.getScript(getContextPath() + "/resources/service/js/common/alert.js");
</script>