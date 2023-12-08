/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 * 
 * Author : kh201
 * Create Date : 2023. 12. 6.
 * File Name : SampleServiceImpl.java
 * DESC : 
*****************************************************************/
package kr.co.ecoletree.dummy.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.ecoletree.common.base.service.ETBaseService;
import kr.co.ecoletree.dummy.mapper.SampleMapper;
import kr.co.ecoletree.dummy.service.SampleService;

@Service
public class SampleServiceImpl extends ETBaseService implements SampleService  {

	@Autowired
	SampleMapper mapper;
	
	/**
	 * 대중소 분류 가져오기
	 */
	@Override
	public List<Map<String, Object>> getCategoryData(Map<String, Object> param) {
		List<Map<String,Object>> selectGrpList = mapper.selectCategoryList(param);
		List<Map<String,Object>> grpList = getCategoryList(selectGrpList);
		return grpList;
		
	}
	/**
	 * 테이블 데이터 가져오기 
	 */
	@Override
	public Map<String, Object> getFormDataList(Map<String, Object> param) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		
		try {
			List<Map<String, Object>> list = mapper.selectFormData(param);
			int totalCount = list.size();
			
			resultMap.put("recordsTotal", totalCount);
			resultMap.put("recordsFiltered", totalCount);
			resultMap.put("data", list);
		} catch (Exception e) {
			logError(e.getMessage(),e);
			throw e;
		}
		
		return resultMap;
	}
	/**
	 * 폼밸리데이션 정보 추가/수정
	 */
	@Override
	public int setSampleData(Map<String, Object> param, String type ) {
		return type.equals("I") ? mapper.insertFormData(param) : mapper.updateFormData(param);
	}
	
	
	/**
	 * @param selectGrpList
	 * @return
	 */
	private List<Map<String, Object>> getCategoryList(List<Map<String, Object>> selectGrpList) {
		List<Map<String,Object>> grpList = setGroupListHierarchy(selectGrpList,"main_id","middle_id");
		for(Map<String,Object> map : grpList) {
			List<Map<String, Object>> list = new ArrayList<Map<String,Object>>();
			if(map.containsKey("children")) {
				list = setGroupListHierarchy((List<Map<String, Object>>) map.get("children"),"middle_id","sub_id");
				if(!list.isEmpty()) {
					map.replace("children", list);
				}
			}
			
		}
		return grpList;
	}
	/** 정보를 트리형으로 변경
	 * @param selectGrpList
	 * @param pcd
	 * @param cd
	 * @return
	 */
	public static List<Map<String, Object>> setGroupListHierarchy(List<Map<String, Object>> selectGrpList, String pcd, String cd) {
		
		List<Map<String,Object>> grpList = new ArrayList<Map<String,Object>>();
		
		for(Map<String, Object> vo1 : selectGrpList) {
			if(vo1.get(cd) == null) {
				grpList.add(vo1);
			}
		}
		
		for(Map<String, Object> vo1 : grpList) {
			List<Map<String,Object>> child = new ArrayList<Map<String,Object>>(); 
			for(Map<String,Object> vo2 : selectGrpList) {
				if(vo1.get(pcd).equals(vo2.get(pcd)) && vo2.get(cd) != null) {
					child.add(vo2);
				}
			}
			if(!child.isEmpty()) {
				vo1.put("children", child);				
			}
		}
		
		return grpList;
	}




}



