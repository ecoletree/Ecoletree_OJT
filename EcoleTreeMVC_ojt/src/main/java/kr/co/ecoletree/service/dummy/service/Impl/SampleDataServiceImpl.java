/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 * 
 * Author : kh201
 * Create Date : 2023. 12. 6.
 * File Name : SampleServiceImpl.java
 * DESC : 
*****************************************************************/
package kr.co.ecoletree.service.dummy.service.Impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.ecoletree.common.base.service.ETBaseService;
import kr.co.ecoletree.service.dummy.mapper.SampleDataMapper;
import kr.co.ecoletree.service.dummy.service.SampleDataService;

@Service
public class SampleDataServiceImpl extends ETBaseService implements SampleDataService  {

	@Autowired
	SampleDataMapper mapper;
	
	/**
	 * 직급 코드 가져오기
	 */
	@Override
	public List<Map<String, Object>> getCategoryData(Map<String, Object> param) {
		List<Map<String,Object>> grpList = mapper.selectCodeList(param);
		return grpList;
		
	}




}



