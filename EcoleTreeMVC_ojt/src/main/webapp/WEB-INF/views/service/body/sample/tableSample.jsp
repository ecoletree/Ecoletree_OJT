<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div style="width:1200px;">
	<h1> 나라 이름 조회 </h1> <br><br>

<div style="height:100px; border: 1px solid gray; padding:30px 60px;">
	소분류 이름<input type="text" id="iptSearch" value="" style="margin-left:30px;">
	<select id="selPosition"  style="margin-left:8px; width: 150px;"></select>
	<input type="button" id="btnSearch" value="조회">
</div>

</div>
<div style="width:1200px;">
	<table id="tbList" class = "ecoleTable ecoleTableFixed table table-hover dataTable">
		<thead>
			<tr>
				<th><input type="checkbox" id="cbAllClick"></th>
				<th>대분류</th>
				<th>중분류</th>
				<th>소분류</th>
			</tr>
	</table>

</div>



