
package com.dualnet.planner.controller;

import com.dualnet.planner.entity.Consignment;
import com.dualnet.planner.service.ConsignmentService;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/consignments")
@CrossOrigin
public class ConsignmentController {

 private final ConsignmentService service;
 public ConsignmentController(ConsignmentService service){this.service=service;}

 @GetMapping
 public List<Consignment> all(){ return service.getAll(); }

 @GetMapping("/filter")
 public List<Consignment> filter(@RequestParam LocalDate deliveryDate,@RequestParam String network){
   return service.filter(deliveryDate,network);
 }

 @GetMapping("/{id}")
 public Consignment get(@PathVariable Long id){ return service.get(id); }

 @PutMapping("/{id}/status")
 public Consignment update(@PathVariable Long id,@RequestBody Map<String,String> req){
  System.out.println("ID = " + id);
  System.out.println("Status = " + req.get("status"));
   return service.updateStatus(id,req.get("status"));
 }
}
