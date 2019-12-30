import { Component, OnInit, Input } from '@angular/core';
import { MapService } from './map.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() location: string
  lat:number = 22.966361
  lng:number = 88.456280
  geocoder: any
  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  mapReadyHandler(){
    this.mapService.geoCodeLocation(this.location).subscribe(
      (coordinates)=>{
        console.log(coordinates)
        this.lat = coordinates.lat
        this.lng = coordinates.lng
      },
      (err)=>{
        console.log(err)
      }
    )
  }
 

}

