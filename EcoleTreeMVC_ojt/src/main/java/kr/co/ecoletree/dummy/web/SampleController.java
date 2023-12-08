/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 * 
 * Author : kh201
 * Create Date : 2023. 12. 4.
 * File Name : DummyDataController.java
 * DESC : 
*****************************************************************/
package kr.co.ecoletree.dummy.web;

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
import kr.co.ecoletree.dummy.service.SampleService;

@Controller
@RequestMapping("/sample")
public class SampleController extends ETBaseController {

	private static final String JSP_PATH = ".service.body.sample";
	
	@Autowired
	SampleService service;
	
	/////////////////////////////////////////////////////////////////////////////////
	
	/** 대중소 분류 페이지 오픈
	 * @param mav
	 * @param params
	 * @return
	 */
	@RequestMapping("/select")
	public ModelAndView openSelectSample(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(JSP_PATH + ".selectSample");
		return mav;
	}
	/** 대중소 분류 가져오기
	 * @param param
	 * @return
	 */
	@RequestMapping("/select/category")
	public @ResponseBody Map<String,Object> selectSampleData(@RequestBody Map<String,Object> param){
		List<Map<String,Object>> result = service.getCategoryData(param);
		return ResultUtil.getResultMap(result.size()<=0,result); 
	}
		
	/////////////////////////////////////////////////////////////////////////////////
	
	/** 테이블 페이지 오픈
	 * @param mav
	 * @param params
	 * @return
	 */
	@RequestMapping("/table")
	public ModelAndView openTableSample(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(JSP_PATH + ".tableSample");
		return mav;
	}
	
	/** 테이블 리스트 가져오기
	 * @param param
	 * @return
	 */
	@RequestMapping("/table/getList")
	public @ResponseBody Map<String,Object> getSampleData(HttpServletRequest request){
		Map<String, Object> param = getParamToMap(request);
		Map<String, Object> map = service.getFormDataList(param);
		return map;
	}
	/////////////////////////////////////////////////////////////////////////////////
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
	
	/////////////////////////////////////////////////////////////////////////////////
	/** 폼 밸리데이션 추가 페이지 오픈
	 * @param mav
	 * @param params
	 * @return
	 */
	@RequestMapping("/create")
	public ModelAndView openCreateFormSample(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(JSP_PATH + ".formCreateSample");
		return mav;
	}
	/** 폼 - 추가
	 * @param param
	 * @return
	 */
	@RequestMapping("/create/submit")
	public @ResponseBody Map<String,Object> createSampleData(@RequestBody Map<String,Object> param){
		int i = service.setSampleData(param,"I");
		return ResultUtil.getResultMap(i<=0); 
	}
	/** 폼 밸리데이션 수정 페이지 오픈
	 * @param mav
	 * @param params
	 * @return
	 */
	@RequestMapping("/update")
	public ModelAndView openUpdateFormSample(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(JSP_PATH + ".formUpdateSample");
		return mav;
	}
	/** 폼 - 수정
	 * @param param
	 * @return
	 */
	@RequestMapping("/update/submit")
	public @ResponseBody Map<String,Object> updateSampleData(@RequestBody Map<String,Object> param){
		int i = service.setSampleData(param,"U");
		return ResultUtil.getResultMap(i<=0); 
	}
	
}

