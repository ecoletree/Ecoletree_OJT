/*****************************************************************
 * Copyright (c) 2017 EcoleTree. All Rights Reserved.
 * 
 * Author : kh201
 * Create Date : 2023. 12. 6.
 * File Name : SampleService.java
 * DESC : 
*****************************************************************/
package kr.co.ecoletree.service.dummy.service;

import java.util.List;
import java.util.Map;

public interface SampleDataService {

	public List<Map<String,Object>> getCategoryData(Map<String, Object> param);


}

