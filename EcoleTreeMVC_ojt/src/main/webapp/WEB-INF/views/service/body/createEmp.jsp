<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div style="width:1200px;">
	<h1> 사원추가 - jQuery form validation</h1> <br><br>

<div>
<form id="addForm" method="post" autocomplete="off">
	<fieldset>
		<div class="formWrap">
			<label class="formLabel">이름<span class="require">*</span></label>
			<div class="formInput">
				<input type="text" >
			</div>
		</div>
		<div class="formWrap">
			<label class="formLabel">영문 이름<span class="require">*</span></label>
			<div class="formInput">
				<input type="text" >
			</div>
		</div>
		<div class="formWrap">
			<label class="formLabel">직급</label>
			<div class="formInput">
			<select >
			</select>
			</div>
		</div>
		<div class="formWrap">
			<label class="formLabel">이메일 주소<span class="require">*</span></label>
			<div class="formInput">
				<input type="text" >
			</div>
		</div>
		<div class="formWrap">
			<label class="formLabel">전화번호<span class="require">*</span></label>
			<div class="formInput">
				<input type="text" >
			</div>
		</div>
		<div class="formWrap">
			<label class="formLabel">생년월일</label>
			<div class="formInput">
				<input type="text" >
			</div>
		</div>
	</fieldset>
</form>
</div>
<div >
<input type="button" value ="추가">
</div>
</div>

