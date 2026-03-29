/*
 * Copyright (c) 2026 ruan Marcelo Ramacioti Luz.
 * Todos os direitos reservados.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  login(data:any){
    return this.httpClient.post(this.url+
      "/appuser/login",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }

   addNewAppUser(data:any){
    return this.httpClient.post(this.url+
      "/appuser/addNewAppUser",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }
  getAllAppUsers(){
    return this.httpClient.get(this.url+
      "/appuser/getAllAppUsers",{
      }
    )
  }

  updateAppUser(data:any){
    return this.httpClient.post(this.url+
      "/appuser/updateAppUser",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }

   updateAppUserStatus(data:any){
    return this.httpClient.post(this.url+
      "/appuser/updateAppUserStatus",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }
}
