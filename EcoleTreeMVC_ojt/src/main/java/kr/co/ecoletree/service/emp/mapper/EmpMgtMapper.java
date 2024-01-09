/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 *
 * Author : Jeongjin Kim
 * Create Date : 2024. 01. 09.
 * File Name : EmpMgtMapper.java
 * DESC : Employee MyBatis Mapper
 *****************************************************************/
package kr.co.ecoletree.service.emp.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface EmpMgtMapper {
	int insertEmp(Map<String, Object> params);
	
	List<Map<String, Object>> selectEmpList(Map<String, Object> params);
	
	Integer selectEmpListCnt(Map<String, Object> params);
	
	Map<String, Object> updateEmpList(Map<String, Object> params);
	
	Integer deleteEmpList(Integer empNo);
	
	List<Map<String, Object>> searchEmpDataWithParams(Map<String, Object> params);
	
	
}
