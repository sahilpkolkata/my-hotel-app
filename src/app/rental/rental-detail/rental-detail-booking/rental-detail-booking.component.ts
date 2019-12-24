import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Rental } from '../../shared/rental.model';
import { Booking } from '../../../booking/shared/booking.model';
import { HelperService } from '../../../common/service/helper.service';
import { BookingService } from '../../../booking/shared/booking.service';
import { AuthService } from '../../../auth/shared/auth.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DaterangePickerComponent } from 'ng2-daterangepicker';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental
  @ViewChild(DaterangePickerComponent,{ static: false})
    private picker: DaterangePickerComponent;
  
  constructor( private helper: HelperService,
               private modalService: NgbModal,
               private bookingService: BookingService,
               public toastr: ToastrManager,
               public auth: AuthService) {
  
                }
  public daterange: any = {};
  modalRef: any;
  bookedOutDates: any[]= []
  newBooking: Booking
  errors: any[]= []
    

  public options: any = {
            locale: { format: Booking.BOOKING_FORMAT },
            alwaysShowCalendars: false,
            opens: "left",
            autoUpdateInput: false,
            isInvalidDate: this.checkForInvalidDates.bind(this)
        };


           ngOnInit() {
             this.newBooking = new Booking()
              this.getBookedOutDates()
            }

        private getBookedOutDates(){
          const bookings: Booking[] = this.rental.bookings
          if(bookings && bookings.length > 0){
            bookings.forEach((booking:Booking)=>{
              const dateRange = this.helper.getRangeOfDates(booking.startAt, booking.endAt, Booking.BOOKING_FORMAT)
              this.bookedOutDates.push(...dateRange)
            })
          }
        }

        private resetDatePicker(){
          this.picker.datePicker.setStartDate(moment())
          this.picker.datePicker.setEndDate(moment())
          this.picker.datePicker.element.val('')
        }
        private checkForInvalidDates(date){
          return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(),'days') < 0
        }

        private addNewBookedOutDates(bookingData){
              const dateRange = this.helper.getRangeOfDates(bookingData.startAt, bookingData.endAt, Booking.BOOKING_FORMAT)
              this.bookedOutDates.push(...dateRange)
        }

        public openConfirmModal(content){
          this.errors = []
          this.modalRef = this.modalService.open(content)
        }
        public createBooking(){
          this.newBooking.rental = this.rental
          this.bookingService.createBooking(this.newBooking).subscribe(
            (bookingData:any)=>{
              this.addNewBookedOutDates(bookingData)
              this.newBooking = new Booking()
              this.modalRef.close()
              this.resetDatePicker()
              this.toastr.successToastr('Booking has been successfully created, check your booking detail in manage section','Success',{
                showCloseButton: true
              })
            },
            (errResponse:any)=>{
              this.errors = errResponse.error.errors
            }
          )
        }
    
        public selectedDate(value: any, datepicker?: any) {
            this.options.autoUpdateInput = true
  
            this.newBooking.startAt = this.helper.formatBookingDate(value.start); 
            this.newBooking.endAt = this.helper.formatBookingDate(value.end);
            this.newBooking.days = -(value.start.diff(value.end, 'days'))
            this.newBooking.totalPrice = this.rental.dailyRate * this.newBooking.days

            this.daterange.start = value.start;
            this.daterange.end = value.end;
            this.daterange.label = value.label;

  
        }
  }
