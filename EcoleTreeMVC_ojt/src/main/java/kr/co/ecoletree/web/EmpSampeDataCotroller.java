/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 * 
 * Author : kh201
 * Create Date : 2023. 12. 26.
 * File Name : EmpSampeDataCotroller.java
 * DESC : 
*****************************************************************/
package kr.co.ecoletree.web;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.ecoletree.common.base.web.ETBaseController;
import kr.co.ecoletree.common.util.PropertyUtil;
import kr.co.ecoletree.common.util.ResultUtil;
import kr.co.ecoletree.web.EmpSampeDataCotroller.SAMPLE_DATA_LIST;
import kr.co.ecoletree.web.EmpSampeDataCotroller.SAMPLE_DATA_SETTER;

@Controller
@RequestMapping("/sample")
public class EmpSampeDataCotroller extends ETBaseController {
	
	
	
	@RequestMapping("/code")
	public @ResponseBody Map<String,Object> getCodeList(@RequestBody Map<String,Object> params){
		if(SAMPLE_DATA_LIST.CODE_LIST.size() <= 0) {
			SAMPLE_DATA_SETTER sampleSet = new SAMPLE_DATA_SETTER();
			sampleSet.setEmpSampleData("codeData");
		}
		return ResultUtil.getResultMap(true, SAMPLE_DATA_LIST.CODE_LIST);
	}

	/** 샘플용 사원 리스트 가져오기
	 * @param request
	 * @return
	 */
	@RequestMapping("/list")
	public @ResponseBody Map<String,Object> getEmpList(HttpServletRequest request){
		
		Map<String, Object> map = new HashMap<>();
		Map<String, Object> param = getParamToMap(request);
		
		String search_name = param.get("emp_name").toString();
		String position = param.get("position").toString();
		
		List<Map<String,Object>> lists = new ArrayList<>();
		if(SAMPLE_DATA_LIST.EMP_LIST.size() != 0) {
			
			if(search_name.equals("") && position.equals("")) { 
				lists.addAll(SAMPLE_DATA_LIST.EMP_LIST);
				
			}else {
				
				List<Map<String,Object>> empLists = new ArrayList<>();
				
				if(search_name.equals("")) {
					empLists.addAll(SAMPLE_DATA_LIST.EMP_LIST);
				}else {
					for(Map<String,Object> emps : SAMPLE_DATA_LIST.EMP_LIST) {
						if(emps.get("emp_name").toString().matches("(.*)"+search_name+"(.*)")) {
							empLists.add(emps);
						}
					}
				}
				
				if(!position.equals("")) {
					for(Map<String,Object> vo : empLists) {
						if(vo.get("position").toString().equals(position)) {
							lists.add(vo);
						}
					}
				}else {
					lists.addAll(empLists);
				}
			}
			
			
		}
		map.put("data", lists);
		map.put("recordsTotal", lists.size());
		map.put("recordsFiltered", lists.size());
		
		return map;
	}
	
	public static class SAMPLE_DATA_LIST{

		public static List<Map<String, Object>> EMP_LIST = new ArrayList<>();;
		public static List<Map<String, Object>> CODE_LIST = new ArrayList<>();;
	}
	/** sample data
	 * @author kh201
	 *
	 */
	public static class SAMPLE_DATA_SETTER{
		
		/**
		 * 
		 */
		public void setEmpSampleData(String property_name) {
			try {
				final PropertyUtil propertyUtil = PropertyUtil.getInstance("data/"+property_name+".properties");
				String str = propertyUtil.getProperties("data_sample");
				List<Map<String, Object>> initList = new ObjectMapper().readValue(str, new TypeReference<List<Map<String, Object>>>(){});
				if(property_name.equals("empData")) {
					SAMPLE_DATA_LIST.EMP_LIST.addAll(initList);
				}else {
					SAMPLE_DATA_LIST.CODE_LIST.addAll(initList);
				}
				
			} catch (IOException e) {
				System.out.println(e.getMessage());
			}
			
		}
		/** 중복 제거
		 * @param initList
		 */
		private void distictLists(List<Map<String, Object>> initList) {
			List<Map<String, Object>> mapList = initList.stream().filter(distinctByKey(x -> Arrays.asList(x.get("emp_cd")))).collect(Collectors.toList());
		}
		public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
			Set<Object> set = ConcurrentHashMap.newKeySet();
			return t -> set.add(keyExtractor.apply(t));
		}
	}
}

