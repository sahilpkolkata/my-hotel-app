import { Rental } from '../../rental/shared/rental.model'
export class Booking{
    
    static readonly BOOKING_FORMAT = 'YYYY-MM-DD'
    _id: string
    startAt: string
    endAt: string
    totalPrice: number
    guests: number
    days: number
    createdAt: string
    rental: Rental
}