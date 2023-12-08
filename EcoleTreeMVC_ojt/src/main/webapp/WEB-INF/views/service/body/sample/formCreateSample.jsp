<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div style="width:1200px;">
	<h1>jQuery form validation - 추가</h1> <br><br>

<div>
<form id="addForm" method="post" autocomplete="off">
	<fieldset>
		<div class="formWrap">
			<label class="formLabel">축제이름<span class="require">*</span></label>
			<div class="formInput">
				<input type="text" >
			</div>
		</div>
		<div class="formWrap"><!-- addMethod로 @과.없으면 false -->
			<label class="formLabel">담당자 이메일</label>
			<div class="formInput">
				<input type="text" >
			</div>
		</div>
		<div class="formWrap"><!-- nuber only , four number -->
			<label class="formLabel">담당자 연락처<span class="require">*</span></label>
			<div class="formInput">
				<input type="text" >-<input type="text" >-<input type="text" >
			</div>
		</div>
		<div class="formWrap">
			<label class="formLabel">축제기간<span class="require">*</span></label>
			<div class="formInput">
				<input type="text" >~<input type="text" >
			</div>
		</div>
		
	</fieldset>
</form>
</div>
<div >
<input type="button" value ="추가">
</div>
</div>

