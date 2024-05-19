import { Component, OnInit } from '@angular/core';
import { IonicModule} from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
declare var google:any;


@Component({
  selector: 'app-geolocation1',
  templateUrl: './geolocation1.page.html',
  styleUrls: ['./geolocation1.page.scss'],
})

export class Geolocation1Page implements OnInit {
  latitude:number;
  longitude:number;
  map:any;
  mapElementRef:any;
 
  constructor() {
    this.latitude=0;
    this.longitude=0;
  }
  async getPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude=coordinates.coords.latitude;
    this.longitude=coordinates.coords.longitude;
  }
  async loadMap(){
    await this.getPosition();
    let mapOptions = {
      center:{lat:this.latitude, lng:this.longitude},
      zoom:15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.mapElementRef = document.getElementById('map');
    this.map = new google.maps.Map(this.mapElementRef, mapOptions);
    let marker = this.addMarker(this.latitude,this.longitude);
  }
  addMarker(latitude:number, longitude:number){
    const marker = new google.maps.Marker({
      position: {lat:latitude, lng:longitude},
      map:this.map,
    });
    return marker;
  }
 
 
  ngOnInit() {
    this.loadMap();
  }
  
}