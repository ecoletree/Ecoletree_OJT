<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div style="width:1200px;">

<button></button>

</div>

	<!-- 끝: 작성하기 -->
	<script type="text/javascript">
		$.getScript(getContextPath() + "/resources/service/js/service/sample.js").done(function(script, textStatus) {
			if (!!ecoletree.vc && ecoletree.vc.name === "sample") {
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
