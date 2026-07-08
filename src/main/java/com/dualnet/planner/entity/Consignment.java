
package com.dualnet.planner.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;

@Entity
@Table(name="consignment")
public class Consignment {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
 private Long id;
 private String consignmentNo;
 private LocalDate deliveryDate;
 private String palletNetwork;
 private String status;

 @Column(columnDefinition = "JSON")
 private String details;

 public Long getId(){return id;}
 public void setId(Long id){this.id=id;}
 public String getConsignmentNo(){return consignmentNo;}
 public void setConsignmentNo(String v){this.consignmentNo=v;}
 public LocalDate getDeliveryDate(){return deliveryDate;}
 public void setDeliveryDate(LocalDate v){this.deliveryDate=v;}
 public String getPalletNetwork(){return palletNetwork;}
 public void setPalletNetwork(String v){this.palletNetwork=v;}
 public String getStatus(){return status;}
 public void setStatus(String v){this.status=v;}
 public String getDetails(){return details;}
 public void setDetails(String v){this.details=v;}
}
