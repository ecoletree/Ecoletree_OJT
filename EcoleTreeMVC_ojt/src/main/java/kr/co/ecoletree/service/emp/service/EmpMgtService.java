/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 *
 * Author : Jeongjin Kim
 * Create Date : 2024. 01. 09.
 * File Name : EmpMgtService.java
 * DESC : Employee Service
 *****************************************************************/
package kr.co.ecoletree.service.emp.service;

import java.util.List;
import java.util.Map;

public interface EmpMgtService {
	
	Map<String, Object> getEmpList(Map<String, Object> params);
	
	Map<String, Object> createEmp(Map<String, Object> params);
	
	Map<String, Object> selectEmpList();
	
	Map<String, Object> updateEmpList();
	
	Integer deleteEmpList();
	
	List<Map<String, Object>> searchEmpDataWithParams(String searchName, String position);


}
