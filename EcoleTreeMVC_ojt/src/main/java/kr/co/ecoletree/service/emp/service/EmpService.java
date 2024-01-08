package kr.co.ecoletree.service.emp.service;

import java.util.Map;

public interface EmpService {

	
	/**
	 * 사원 리스트 정보를 가져온다.
	 *
	 * @param params
	 * @return map
	 */
	public Map<String, Object> getEmpList(Map<String, Object> params);

	
	
	
}
