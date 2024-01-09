/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 *
 * Author : kh201
 * Create Date : 2023. 12. 8.
 * File Name : EmpMgtController.java
 * DESC : 
 *****************************************************************/
package kr.co.ecoletree.service.emp.web;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.ecoletree.common.util.ResultUtil;
import kr.co.ecoletree.common.util.StringUtil;
import kr.co.ecoletree.service.emp.service.EmpMgtService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.co.ecoletree.common.base.web.ETBaseController;
import kr.co.ecoletree.common.util.MapBuilder;
import net.sf.json.JSONObject;

/**
 * The type Emp mgt controller.
 */
@Controller
@RequestMapping("")
public class EmpMgtController extends ETBaseController {
	
	/**
	 * The Service.
	 */
	@Autowired
	EmpMgtService service;
	
	/**
	 * Open page model and view.
	 *
	 * @param mav    the mav
	 * @param params the params
	 * @return the model and view
	 */
	@RequestMapping("/list")
	public ModelAndView openPage(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(".service.body.empList");
		
		// System.out.println("###" + StringUtil.getUUID("EMP"));
		// 실행예시: EMP2024010917130974665ac44c2f441588ef51771e5a0cf4
		
		// 과제1. TB_CODE 테이블에서 직급 데이터 가져와서 화면에 출력하기 -> 해결 O
		mav.addObject("initData", JSONObject.fromObject(MapBuilder.of("codeList", service.getPositionList())));
		return mav;
	}
	
	/**
	 * 직원 검색결과를 리턴한다.
	 *
	 * @param req 검색값
	 * @return 검색 조건을 만족하는 직원 리스트
	 */
	@RequestMapping("/getEmpList")
	public @ResponseBody Map<String, Object> getEmpList(HttpServletRequest req) {
		Map<String, Object> result = getParamToMap(req);
		return service.getEmpList(result);
	}
	
	/**
	 * Open create emp model and view.
	 *
	 * @param mav    the mav
	 * @param params the params
	 * @return the model and view
	 */
	@RequestMapping("/create")
	public ModelAndView openCreateEmp(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(".service.body.createEmp");
		// 직급에 데이터 뿌려주기
		mav.addObject("initData", JSONObject.fromObject(MapBuilder.of("codeList", service.getPositionList())));
		return mav;
	}
	
	/**
	 * Create emp map.
	 *
	 * @param params the params
	 * @return the map
	 */
	@RequestMapping("/createEmp")
	public Map<String, Object> createEmp(@RequestBody Map<String, Object> params) {
		Map<String, Object> map = service.createEmp(params);
		
		
		// * ResultUtil 은 @Controller 에서만 사용
		return ResultUtil.getResultMap(true, map, "success");
	}
	
	
	//@RequestMapping("/update")
	//public ModelAndView openUpdateEmp(ModelAndView mav, HttpServletRequest req) {
	//	Map<String, Object> params = getParamToMap(req);
	//	mav.setViewName(".service.body.updateEmp");
	//	mav.addObject("initData", JSONObject.fromObject(MapBuilder.of("rowData", params, "codeList", SAMPLE_DATA_LIST.CODE_LIST)));
	//	return mav;
	//}
	
}

