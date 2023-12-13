/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 * 
 * Author : kh201
 * Create Date : 2023. 12. 6.
 * File Name : SampleMapper.java
 * DESC : 
*****************************************************************/
package kr.co.ecoletree.service.dummy.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface SampleDataMapper {

	public List<Map<String, Object>> selectCodeList(Map<String, Object> param);

}

