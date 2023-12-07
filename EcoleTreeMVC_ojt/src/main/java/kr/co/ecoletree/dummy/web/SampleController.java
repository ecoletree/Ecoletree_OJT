/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 * 
 * Author : kh201
 * Create Date : 2023. 12. 4.
 * File Name : DummyDataController.java
 * DESC : 
*****************************************************************/
package kr.co.ecoletree.dummy.web;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kr.co.ecoletree.common.base.web.ETBaseController;

@Controller
@RequestMapping("/sample")
public class SampleController extends ETBaseController {

private static final String JSP_PATH = ".service.body.sample";
	
	@RequestMapping("")
	public ModelAndView openSample(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(JSP_PATH + ".sample");
		return mav;
	}
	@RequestMapping("/call")
	public ModelAndView openServiceSample(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(JSP_PATH + ".serviceSample");
		return mav;
	}
	@RequestMapping("/select")
	public ModelAndView openSelectSample(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(JSP_PATH + ".selectSample");
		return mav;
	}
	@RequestMapping("/table")
	public ModelAndView openTableSample(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(JSP_PATH + ".tableSample");
		return mav;
	}
	@RequestMapping("/datePicker")
	public ModelAndView openDatePickerSample(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(JSP_PATH + ".datePickerSample");
		return mav;
	}
	@RequestMapping("/form")
	public ModelAndView openFormSample(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(JSP_PATH + ".formSample");
		return mav;
	}
}

