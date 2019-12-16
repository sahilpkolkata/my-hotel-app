import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../../shared/rental.model';

@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() price: number

  constructor() { }

  ngOnInit() {
  }

      public daterange: any = {};
    
        public options: any = {
            locale: { format: 'DD-MM-YYYY' },
            alwaysShowCalendars: false,
            opens: "left"
        };
    
        public selectedDate(value: any, datepicker?: any) {
          
            console.log(value);
  
            datepicker.start = value.start;
            datepicker.end = value.end;

            this.daterange.start = value.start;
            this.daterange.end = value.end;
            this.daterange.label = value.label;

  
        }
  }
