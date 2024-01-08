<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<c:import url="/include.commonHeader.sp" charEncoding="UTF-8" />
<title>Insert title here</title>
<c:import url="/include.commonPlugin.sp" charEncoding="UTF-8" />

<!-- <script  src="http://code.jquery.com/jquery-latest.min.js"></script> -->
<!-- 4.jQuery Date Range Picker -->
<!-- <link rel="stylesheet" href="/date_range_picker/jquery-date-range-picker/dist/daterangepicker.min.css"> -->
<!-- <script type="text/javascript" src="/date_range_picker/moment/min/moment.min.js"></script> -->
<!-- <script type="text/javascript" src="/date_range_picker/jquery-date-range-picker/src/jquery.daterangepicker.js"></script> -->
<!-- <script type="text/javascript"  src="/util/dateRangePicker.js"></script> -->
<!--  -->


</head> 
<body>
<br><br>
<div style="margin-left : 20px ">
	<h4>4. jQuery Date Range Picker</h4>
	<br><br>
	<ul style="list-style-type: circle; margin-left : 20px ;">
	<li><a href="https://github.com/longbill/jquery-date-range-picker">https://github.com/longbill/jquery-date-range-picker</a></li>
	<li>사용법 : <a href="https://longbill.github.io/jquery-date-range-picker/"> https://longbill.github.io/jquery-date-range-picker/</a></li>
	<br>
	<li>사용된 파일명</li>
	<li>jqueryDatePicker.jsp</li>
	<li>/service/jqueryDatePicker.js</li>
	<li>/util/dateRangePicker.js</li>
	
	</ul>
	<br><br>
	<div>
		<div>
			<ul style="list-style-type: circle; margin-left : 20px ;">
			<li>single ipt</li>
			</ul>
		</div>
		<div id="divJQueryRange0" style="margin-top : 15px ;">
		calendar :
		<input type="text" id="iptJQueryRange3"/>
		</div>

	</div>
<br><br>
	<div>
		<div>
			<ul style="list-style-type: circle; margin-left : 20px ;">
			<li>double ipt</li>
			<li>시작일 : 2023.05.21, 종료일 : 2023.05.28</li>
			</ul>
		</div>
		<div id="divJQueryRange1" style="margin-top : 15px ;">
		calendar :
		<input type="text" id="iptJQueryRange1"/>-
		<input type="text" id="iptJQueryRange2"/>
		</div>

	</div>
<br><br>
	<div>
		<div>
			<ul style="list-style-type: circle; margin-left : 20px ;">
			<li>double ipt</li>
			<li>시작일 : 오늘 , 종료일 : 5일 후</li>
			</ul>
		</div>
		<div id="divJQueryRange2" style="margin-top : 15px ;">
		calendar :
		<input type="text" id="iptJQueryRange1"/>-
		<input type="text" id="iptJQueryRange2"/>
		</div>

	</div>
<br><br>
	<div>
		<div>
			<ul style="list-style-type: circle; margin-left : 20px ;">
			<li>double ipt</li>
			<li>달력 페어 삭제</li>
			<li>오늘 이후로 선택 불가 .setDisableSelectForward()</li>
			<li>'2023.05.28' 이후로 선택 불가 .setDisableSelectForward('2023.05.28')</li>
			</ul>
		</div>
		<div id="divJQueryRange3" style="margin-top : 15px ;">
		calendar :
		<input type="text" id="iptJQueryRange1"/>-
		<input type="text" id="iptJQueryRange2"/>
		</div>

	</div>
<br><br>
	<div>
		<div>
			<ul style="list-style-type: circle; margin-left : 20px ;">
			<li>double ipt</li>
			<li>달력 페어 삭제</li>
			<li>오늘 이전은 선택 불가 .setDisableSelectBackward()</li>
			<li>'2023.05.01' 이전은 선택 불가 .setDisableSelectBackward('2023.05.01')</li>
			</ul>
		</div>
		<div id="divJQueryRange4" style="margin-top : 15px ;">
		calendar :
		<input type="text" id="iptJQueryRange1"/>-
		<input type="text" id="iptJQueryRange2"/>
		</div>

	</div>

</div>
	
<!-- 끝: 작성하기 -->
<script type="text/javascript">
	$.getScript(getContextPath() + "/resources/service/js/service/jqueryDatePicker.js").done(function(script, textStatus) {
		if (!!ecoletree.vc && ecoletree.vc.name === "jqueryDatePicker") {
			var inter = setInterval(function(){
				 ecoletree.promiseInit()
				.then(function(){
					clearInterval(inter);
					ecoletree.vc.init(${initData});
				}, function (){})
			},300);

		} else {
			console.log("vc's name is not index : " + ecoletree.vc.name);
		}
	}).fail(function(jqxhr, settings, exception) {
		console.log(arguments);
	});
</script>
</body>

</html>