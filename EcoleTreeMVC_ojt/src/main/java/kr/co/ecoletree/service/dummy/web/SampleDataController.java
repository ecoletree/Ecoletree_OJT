/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 * 
 * Author : kh201
 * Create Date : 2023. 12. 4.
 * File Name : DummyDataController.java
 * DESC : 
*****************************************************************/
package kr.co.ecoletree.service.dummy.web;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.co.ecoletree.common.base.web.ETBaseController;
import kr.co.ecoletree.common.util.ResultUtil;
import kr.co.ecoletree.service.dummy.service.SampleDataService;

@Controller
@RequestMapping("/sample")
public class SampleDataController extends ETBaseController {

	private static final String JSP_PATH = ".service.body.sample";
	
	@Autowired
	SampleDataService service;
	
	/////////////////////////////////////////////////////////////////////////////////
	
	/** 직급 코드 가져오기
	 * @param param
	 * @return
	 */
	@RequestMapping("/code")
	public @ResponseBody Map<String,Object> selectSampleData(@RequestBody Map<String,Object> param){
		List<Map<String,Object>> result = service.getCategoryData(param);
		return ResultUtil.getResultMap(result.size()<=0,result); 
	}
		
	/** 데이트 피커 페이지 오픈
	 * @param mav
	 * @param params
	 * @return
	 */
	@RequestMapping("/datePicker")
	public ModelAndView openDatePickerSample(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(JSP_PATH + ".datePickerSample");
		return mav;
	}
	
	
}

