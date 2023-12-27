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
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.ecoletree.common.ETCommonConst;
import kr.co.ecoletree.common.base.web.ETBaseController;
import kr.co.ecoletree.common.util.PropertyUtil;
import kr.co.ecoletree.common.util.ResultUtil;

@Controller
@RequestMapping("/sample")
public class EmpSampeDataCotroller extends ETBaseController {
	
	
	
	/** 샘플용 코드 리스트 가져오기
	 * @param params
	 * @return
	 */
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
			lists = searchEmpDatasWithParams(search_name,position);
		}
		map.put("data", lists);
		map.put("recordsTotal", lists.size());
		map.put("recordsFiltered", lists.size());
		
		return map;
	}
	
	/** 추가
	 * @param params
	 * @return
	 */
	@RequestMapping("/create")
	public @ResponseBody Map<String,Object> createEmpSample(@RequestBody Map<String,Object> params){
		String resultMsg = ETCommonConst.FAILED;
		try {
			List<Map<String,Object>> dupList = SAMPLE_DATA_LIST.EMP_LIST.stream().filter(t -> t.get("emp_cd").equals(params.get("emp_cd"))).collect(Collectors.toList());
			System.out.println(dupList.size());
			if(dupList.size() <= 0) { // 중복 아님
				resultMsg = ETCommonConst.SUCCESS;
				String position_name = getCodeName(params.get("position").toString()); // 직위 코드 네임
				params.put("position_name", position_name);
				params.put("emp_cd", params.get("emp_num"));
				params.put("delete_yn", "N");
				
				SAMPLE_DATA_LIST.EMP_LIST.add(params);
			}
			
		} catch (Exception e) {
			logInfo(e.getMessage());
		}
		return ResultUtil.getResultMap(true,resultMsg);
	}
	

	/** 수정
	 * @param params
	 * @return
	 */
	@RequestMapping("/update")
	public @ResponseBody Map<String,Object> updateEmpSample(@RequestBody Map<String,Object> params){
		String resultMsg = ETCommonConst.SUCCESS;
		List<Map<String,Object>> resultList = new ArrayList<>();
		for(Map<String,Object> emp : SAMPLE_DATA_LIST.EMP_LIST) {
			if(emp.get("emp_cd").equals(params.get("emp_cd"))) {
				String position_name = getCodeName(params.get("position").toString()); // 직위 코드 네임
				params.replace("position_name", position_name);
				resultList.add(params);
			}else {
				resultList.add(emp);
			}
		}
		return ResultUtil.getResultMap(true,resultMsg);
	}
	
	/**삭제
	 * @param params
	 * @return
	 */
	@RequestMapping("/delete")
	public @ResponseBody Map<String,Object> deleteEmpSample(@RequestBody Map<String,Object> params){
		String resultMsg = ETCommonConst.SUCCESS;
		
		List<Map<String,Object>> empList = SAMPLE_DATA_LIST.EMP_LIST.stream().filter(emp -> !emp.get("emp_cd").equals(params.get("emp_cd"))).collect(Collectors.toList());
		SAMPLE_DATA_LIST.EMP_LIST = empList;
		return ResultUtil.getResultMap(true,resultMsg);
	}
	
	/** 조건으로 데이터 검색
	 * @param search_name
	 * @param position
	 * @return
	 */
	private List<Map<String,Object>> searchEmpDatasWithParams(String search_name, String position) {
		List<Map<String,Object>> lists = new ArrayList<>();
		if(search_name.equals("") && position.equals("")) { 
			lists.addAll(SAMPLE_DATA_LIST.EMP_LIST);
			
		}else {
			lists = searchEmpDatasWithParams(search_name,position);
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
		return lists;
	}
	
	/** 코드 리스트에서 코드 네임 검색
	 * @param position
	 * @return
	 */
	private String getCodeName(String position) {
		Map<String, Object> code = null;
		try {
			code = SAMPLE_DATA_LIST.CODE_LIST.stream().filter(t -> t.get("code_cd").equals(position)).findFirst().orElseThrow(()-> new Exception());
		} catch (Exception e) {
			e.printStackTrace();
		}
		String position_name = code.get("code_name").toString();
		return position_name;
	}
//==================================================================================================================	
	/** 샘플 데이터
	 * @author kh201
	 *
	 */
	public static class SAMPLE_DATA_LIST{

		public static List<Map<String, Object>> EMP_LIST = new ArrayList<>();;
		public static List<Map<String, Object>> CODE_LIST = new ArrayList<>();;
	}
	
	/** 샘플 데이터 가져오기
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

