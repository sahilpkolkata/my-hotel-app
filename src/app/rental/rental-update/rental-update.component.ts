import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {

  rental: Rental
  rentalCategories = Rental.CATEGORIES

  constructor(private route: ActivatedRoute,
              private rentalService: RentalService,
              public toastr: ToastrManager ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params)=>{
        this.getRentals(params['rentalId'])
      }
    ) 
  }

  getRentals(rentalId:string){
    this.rentalService.getRentalById(rentalId).subscribe(
      (rental:Rental)=>{
        this.rental = rental
    })
  }

  updateRental(rentalId:string, rentalData:any){
    this.rentalService.updateRental(rentalId, rentalData).subscribe(
      (updatedRental:Rental)=>{
        this.rental = updatedRental
      },
      (errResponse: HttpErrorResponse)=>{
        this.getRentals(rentalId)
        this.toastr.errorToastr(errResponse.error.errors[0].detail,'Error')
      }
    )
  }

  countBedroomAssets(assetsNum:number){
    return parseInt(<any>this.rental.bedrooms,10) + assetsNum
  }

  
}
