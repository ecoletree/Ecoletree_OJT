package kr.co.ecoletree.service.emp.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.co.ecoletree.service.emp.mapper.EmpMapper;
import kr.co.ecoletree.service.emp.service.EmpService;


@Service
@Transactional //쿼리를 순차적으로 진행 --> 어떠한 오류 --> 다시 rollback db에 적재 x
public class EmpServiceImpl implements EmpService {

	
	@Autowired
	EmpMapper mapper;
	
	@Override
	public Map<String, Object> getEmpList(Map<String, Object> params) {
		Map<String, Object> resultMap = new HashMap<>(); //nullpointException
//		8.0 이후로 나온 Optional<T> --> t라는 타입은 모든 객체를 받는다
//		Optional<String> opt = Optional.empty();
		
		List<Map<String, Object>> list = mapper.selectEmpList(params);
		int count = mapper.selectEmpListCnt(params);
		
		resultMap.put("recordsTotal", count);
		resultMap.put("recordsFiltered", count);
		resultMap.put("data", list);
		
		
		
		return resultMap;
	}

	
	
	
	
}
