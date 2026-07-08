
package com.dualnet.planner.service;

import com.dualnet.planner.entity.Consignment;
import com.dualnet.planner.repository.ConsignmentRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ConsignmentServiceImpl implements ConsignmentService{
 private final ConsignmentRepository repo;
 public ConsignmentServiceImpl(ConsignmentRepository repo){this.repo=repo;}

 public List<Consignment> getAll(){ return repo.findAll(Sort.by("id")); }
 public List<Consignment> filter(LocalDate date,String network){
   return repo.findByDeliveryDateAndPalletNetwork(date,network);
 }
 public Consignment get(Long id){ return repo.findById(id).orElseThrow(); }
 public Consignment updateStatus(Long id,String status){
   Consignment c=get(id);
   c.setStatus(status);
   return repo.save(c);
 }
}
