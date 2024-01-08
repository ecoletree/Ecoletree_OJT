<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<div style="width:1200px;">
    <h1> 사원추가 - jQuery form validation</h1> <br><br>

    <div>
        <form id="addForm" method="post" autocomplete="off">
            <fieldset>
                <div class="formWrap">
                    <label class="formLabel">사번<span class="require" style="color:red;">*</span></label>
                    <div class="formInput">
                        <input type="text" name="emp_num">
                    </div>
                </div>
                <div class="formWrap">
                    <label class="formLabel">이름<span class="require" style="color:red;">*</span></label>
                    <div class="formInput">
                        <input type="text" name="emp_name">
                    </div>
                </div>
                <div class="formWrap">
                    <label class="formLabel">영문 이름</label>
                    <div class="formInput">
                        <input type="text" name="emp_engname">
                    </div>
                </div>
                <div class="formWrap">
                    <label class="formLabel">부서<span class="require" style="color:red;">*</span></label>
                    <div class="formInput">
                        <input type="text" name="department">
                    </div>
                </div>
                <div class="formWrap">
                    <label class="formLabel">직급<span class="require" style="color:red;">*</span></label>
                    <div class="formInput">
                        <select id="selPosition" name="position">
                        </select>
                    </div>
                </div>
                <div class="formWrap">
                    <label class="formLabel">메일주소1<span class="require" style="color:red;">*</span></label>
                    <div class="formInput">
                        <input type="text" name="email_1">
                    </div>
                </div>
                <div class="formWrap">
                    <label class="formLabel">메일주소2</label>
                    <div class="formInput">
                        <input type="text" name="email_2">
                    </div>
                </div>
                <div class="formWrap">
                    <label class="formLabel">전화번호<span class="require" style="color:red;">*</span></label>
                    <div class="formInput">
                        <input type="text" name="phone_num">
                    </div>
                </div>
                <div class="formWrap">
                    <label class="formLabel">생년월일</label>
                    <div>
                        <input type="text" name="birthday">
                    </div>
                </div>
                <div class="formWrap">
                    <label class="formLabel">주소</label>
                    <div class="formInput">
                        <input type="text" name="address">
                    </div>
                </div>
                <br><br>
                <h5>긴급 연락망</h5>

                <div class="formWrap" style="margin-top : 7px ;">
                    <label class="formLabel">이름(관계)</label>
                    <div class="formInput">
                        <input type="text" name="emc_contact_point">
                    </div>
                    <label class="formLabel">전화번호</label>
                    <div class="formInput">
                        <input type="text" name="emc_phone_num">
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
    <div>
        <input id="btnAdd" type="button" value="추가">
    </div>
</div>

<!-- 끝: 작성하기 -->
<script type="text/javascript">
	$.getScript(getContextPath() + "/resources/service/js/service/createEmp.js").done(function (script, textStatus) {
		if (!!ecoletree.vc && ecoletree.vc.name === "createEmp") {
			var inter = setInterval(function () {
				ecoletree.promiseInit()
				.then(function () {
					clearInterval(inter);
					ecoletree.vc.init(${initData});
				}, function () {
				})
			}, 300);

		}
		else {
			console.log("vc's name is not index : " + ecoletree.vc.name);
		}
	}).fail(function (jqxhr, settings, exception) {
		console.log(arguments);
	});
</script>