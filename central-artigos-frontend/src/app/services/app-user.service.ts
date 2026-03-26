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

  constructor(private httpClietn:HttpClient) { }

  login(data:any){
    return this.httpClietn.post(this.url+
      "/appUser/login",data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }
}
