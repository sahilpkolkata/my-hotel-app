import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Booking } from '../../booking/shared/booking.model'

@Injectable()

export class HelperService{

public getRangeOfDates(startAt, endAt, dateFormat){

    const tempDates =[]
     
    const mEnd = moment(endAt)
    let mStart = moment(startAt)
   
   
    while(mStart < mEnd){
        tempDates.push(mStart.format(dateFormat))
        mStart = mStart.add(1,'day')
    }

    tempDates.push(moment(startAt).format(dateFormat))
    tempDates.push(mEnd.format(dateFormat))

    return tempDates;
  }

  private formatDate(date, dateFormat){
    return moment(date).format(dateFormat)
 }
  
 public formatBookingDate(date){
      return this.formatDate(date, Booking.BOOKING_FORMAT)
  }


  //public getBookingRangeOfDates(startAt, endAt){
   //   this.getRangeOfDates(startAt, endAt, Booking.BOOKING_FORMAT)
   //}
}