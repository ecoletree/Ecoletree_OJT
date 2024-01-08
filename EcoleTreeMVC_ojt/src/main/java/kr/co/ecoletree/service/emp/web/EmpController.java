package kr.co.ecoletree.service.emp.web;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.co.ecoletree.common.base.web.ETBaseController;
import kr.co.ecoletree.service.emp.service.EmpService;
import net.sf.json.JSONObject;

@Controller
@RequestMapping("") //context path localhost:portnum/프로젝트명/{}
public class EmpController extends ETBaseController{
	
	@Autowired
	EmpService service;
	
	
	final static String INIT_DATA = "initdata";
	
	@RequestMapping(value = "/list") //context path localhost:portnum/프로젝트명/{1}/{2}
	public ModelAndView openMain(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(".service.body.empList"); //뷰의 경로 지정
		return mav;
	}
	
	//다른버전
	@RequestMapping(value = "/empList2") //context path localhost:portnum/프로젝트명/{1}/{2}
	public ModelAndView openMain(HttpServletRequest req) {
		ModelAndView mav = new ModelAndView();
		Map<String, Object> map = getParamToMap(req);
		
		if (!map.isEmpty()) {
//			Optional<String> opt = Optional.empty();
			
			if (map.containsKey("????")) {
				Map<String, Object> sessionMap = new HashMap<>();
				mav.addObject(INIT_DATA, JSONObject.fromObject(sessionMap));
			}
		}
		mav.setViewName(".service.body.empList"); //뷰의 경로 지정
		return mav;
	}
	
	@RequestMapping(value = "/getEmpList") //context path localhost:portnum/프로젝트명/{1}/{2}
	public @ResponseBody Map<String, Object> getEmpList(HttpServletRequest req) {
		Map<String, Object> map = getParamToMap(req);
		Map<String, Object> result = service.getEmpList(map);
		return result;
	}
	

	@RequestMapping(value = "/create") //context path localhost:portnum/프로젝트명/{1}/{2}
	public ModelAndView openCreate(ModelAndView mav, Map<String, Object> params) {
		mav.setViewName(".service.body.createEmp"); //뷰의 경로 지정
		return mav;
	}
	
}
