/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 *
 * Author : Jeongjin Kim
 * Create Date : 2024. 01. 09.
 * File Name : EmpMgtServiceImpl.java
 * DESC : Employee Service Implements
 *****************************************************************/
package kr.co.ecoletree.service.emp.serviceImpl;

import kr.co.ecoletree.common.base.service.ETBaseService;
import kr.co.ecoletree.common.base.web.ETBaseController;
import kr.co.ecoletree.service.emp.mapper.EmpMgtMapper;
import kr.co.ecoletree.service.emp.service.EmpMgtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class EmpMgtServiceImpl extends ETBaseService implements EmpMgtService {
	
	@Autowired
	EmpMgtMapper mapper;
	
	@Override
	public Map<String, Object> getEmpList(Map<String, Object> params) {
		Map<String, Object> map = new HashMap<>();
		
		List<Map<String, Object>> list = mapper.selectEmpList(params);
		int count = mapper.selectEmpListCnt(params);
		
		map.put("recordsTotal", count);
		map.put("recordFiltered", count);
		map.put("data", list);
		
		System.out.println("[service] " + map);
		
		return map;
	}
	
	@Override
	public Map<String, Object> createEmp(Map<String, Object> params) {
		Map<String, Object> map = new HashMap<>();
		int count = mapper.insertEmp(params);
		
		
		return map;
	}
	
	@Override
	public Map<String, Object> selectEmpList() {
		return null;
	}
	
	@Override
	public Map<String, Object> updateEmpList() {
		return null;
	}
	
	@Override
	public Integer deleteEmpList() {
		return null;
	}
	
	@Override
	public List<Map<String, Object>> searchEmpDataWithParams(String searchName, String position) {
		return null;
	}
}
