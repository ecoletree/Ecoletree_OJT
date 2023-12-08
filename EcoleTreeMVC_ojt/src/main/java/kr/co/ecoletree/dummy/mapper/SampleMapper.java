/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 * 
 * Author : kh201
 * Create Date : 2023. 12. 6.
 * File Name : SampleMapper.java
 * DESC : 
*****************************************************************/
package kr.co.ecoletree.dummy.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface SampleMapper {

	public List<Map<String, Object>> selectCategoryList(Map<String, Object> param);

	public int insertFormData(Map<String, Object> param);

	public int updateFormData(Map<String, Object> param);

	public List<Map<String, Object>> selectFormData(Map<String, Object> param);

}

