package kr.co.ecoletree.service.emp.mapper;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface EmpMapper {

	public List<Map<String, Object>> selectEmpList(Map<String, Object> params);

	public int selectEmpListCnt(Map<String, Object> params);
	
	
	
}
