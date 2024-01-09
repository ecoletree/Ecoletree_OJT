/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 *
 * Author : kh201
 * Create Date : 2023. 12. 8.
 * File Name : EmpMgtController.java
 * DESC : 
 *****************************************************************/
package kr.co.ecoletree.service.emp.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import kr.co.ecoletree.common.util.ResultUtil;
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

@Controller
@RequestMapping("")
@RequiredArgsConstructor
public class EmpMgtController extends ETBaseController {
	
	
	private final EmpMgtService service;
	
	@RequestMapping("/list")
	public ModelAndView openPage(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(".service.body.empList");
		
		// mav.addObject("initData", JSONObject.fromObject(MapBuilder.of("rowData", params, "codeList", SAMPLE_DATA_LIST.CODE_LIST)));
		
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
	
	@RequestMapping("/create")
	public ModelAndView openCreateEmp(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(".service.body.createEmp");
		return mav;
	}
	
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

