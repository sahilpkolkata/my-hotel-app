import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

import { JwtHelperService } from "@auth0/angular-jwt";
const jwt = new JwtHelperService();

@Injectable()

class DecodedToken{
  exp: number = 0;
  username: string = '';
}

export class AuthService{
     
  private decodedToken;

  constructor(private http: HttpClient){
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken()
  }
     public register(userData:any):Observable<any>{
         return this.http.post('/api/v1/users/register',userData)
     }

     public login(userData:any):Observable<any>{
       return this.http.post('/api/v1/users/auth',userData).map(
         (token: any)=>{
           return this.saveToken(token)
         }
       )
     }

     private saveToken(token:string):string{
       this.decodedToken = jwt.decodeToken(token)
       localStorage.setItem('bwm_auth',token)
       localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken))

       return token;
     }

     public logout(){
       localStorage.removeItem('bwm_auth')
       localStorage.removeItem('bwm_meta')

       this.decodedToken = new DecodedToken()
     }

     public getAuthToken():string{
      return localStorage.getItem('bwm_auth')
     }

     public isAuthenticated():boolean{
       return  moment().isBefore(moment.unix(this.decodedToken.exp))
     }
     
}
