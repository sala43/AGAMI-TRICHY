
package com.dualnet.planner.service;
import com.dualnet.planner.entity.Consignment;
import java.time.LocalDate;
import java.util.List;

public interface ConsignmentService{
 List<Consignment> getAll();
 List<Consignment> filter(LocalDate date,String network);
 Consignment get(Long id);
 Consignment updateStatus(Long id,String status);
}
