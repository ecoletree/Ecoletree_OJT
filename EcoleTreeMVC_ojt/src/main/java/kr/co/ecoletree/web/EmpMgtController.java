/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 * 
 * Author : kh201
 * Create Date : 2023. 12. 8.
 * File Name : EmpMgtController.java
 * DESC : 
*****************************************************************/
package kr.co.ecoletree.web;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import kr.co.ecoletree.common.base.web.ETBaseController;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("/emp")
public class EmpMgtController extends ETBaseController{

	@RequestMapping("/list")
	public ModelAndView openEmpList(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(".service.body.empList");
		return mav;
	}
	@RequestMapping("/create")
	public ModelAndView openCreateEmp(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(".service.body.createEmp");
		return mav;
	}
	@RequestMapping("/update")
	public ModelAndView openUpdateEmp(ModelAndView mav,HttpServletRequest req) {
		Map<String, Object> params = getParamToMap(req);
		mav.setViewName(".service.body.updateEmp");
		mav.addObject("initData", JSONObject.fromObject(params));
		return mav;
	}
}

