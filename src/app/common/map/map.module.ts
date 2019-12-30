import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { MapService } from './map.service';


@NgModule({
    declarations:[
        MapComponent
    ],
    exports:[
        MapComponent
    ],
    imports:[
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyDhHYZYzE6S_5zTKY3XjIHyTWyRDQKH6bo",
            libraries: ["places", "geometry"]
        })
    ],
    providers:[
       MapService
    ]
})

export class MapModule{}