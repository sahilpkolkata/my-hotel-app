import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class MapService{
    private geocoder 

    public geoCodeLocation(location:string): Observable<any> {
        this.geocoder = new (<any>window).google.maps.Geocoder()
        return new Observable((observer)=>{
            debugger
            this.geocoder.geocode({address:location}, (result, status)=>{
                if(status === 'OK'){
                    const geometry = result[0].geometry.location
                    observer.next({lat:geometry.lat(), lng:geometry.lng()})
                }else{
                    observer.error('Location could not be geocoded')
                }
            })
        })
    }
}