<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div style="width:1200px;">
	<h1> 사원관리 </h1> <br><br>

<div style="height:100px; border: 1px solid gray; padding:30px 60px;">
	이름<input type="text" id="iptSearch" value="" style="margin-left:30px;">
	<select id="selPosition"  style="margin-left:8px; width: 150px;"></select>
	<input type="button" id="btnSearch" value="조회">
</div>
<div  style="padding: 20px 30px;float: right;">
	<input type="button" id="btnDelete" style="" value="삭제">
</div>

</div>
<div style="width:1200px;">
	<table id="tbList" class = "ecoleTable ecoleTableFixed table table-hover dataTable">
		<thead>
			<tr>
				<th><input type="checkbox" id="cbAllClick"></th>
				<th>사번</th>
				<th>이름</th>
				<th>영문이름</th>
				<th>직급</th>
				<th>이메일주소</th>
				<th>전화번호</th>
				<th>생년월일</th>
			</tr>
	</table>

</div>

