
package com.dualnet.planner.repository;

import com.dualnet.planner.entity.Consignment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ConsignmentRepository extends JpaRepository<Consignment,Long>{
 List<Consignment> findByDeliveryDateAndPalletNetwork(LocalDate deliveryDate,String palletNetwork);
}
