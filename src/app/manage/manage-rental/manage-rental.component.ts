import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../rental/shared/rental.service';
import { Rental } from '../../rental/shared/rental.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

  rentals: Rental[]
  rentalDeleteIndex: number
  constructor(private rentalService: RentalService,
              private toastr: ToastrManager) { }

  ngOnInit() {
    this.rentalService.getUserRentals().subscribe(
      (userRentals:Rental[])=>{
        this.rentals = userRentals
        console.log(this.rentals)
      },
      ()=>{
        
      }
    )
  }

  deleteRental(rentalId:string){
    this.rentalService.deleteRental(rentalId).subscribe(
      (status)=>{
        this.rentals.splice(this.rentalDeleteIndex,1)
        this.rentalDeleteIndex = undefined
        console.log(status)
      },
      (errResponse:HttpErrorResponse)=>{
        this.toastr.errorToastr(errResponse.error.errors[0].detail, 'Failed')
        this.rentalDeleteIndex = undefined

      }
    )
  }

}
