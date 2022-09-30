import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})

export class AppService {
  hostname:string = window.location.hostname;

  constructor(private http:HttpClient) { }
  getAppServiceName():string {
    if(isDevMode()){
      return `http://${window.location.hostname}:5002`;
    } else {
      let protocol:string = window.location.protocol;
      let nameArray:string[] = window.location.host.split("."); 

      return `${protocol}//forex-service.${nameArray[1]}.${nameArray[2]}`;
    }
  }
}