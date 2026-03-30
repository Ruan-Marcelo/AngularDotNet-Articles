import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  addNewArtigo(data: any){
    return this.httpClient.post(this.url + '/artigo/addNewArtigo', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

   updateArtigo(data: any){
    return this.httpClient.post(this.url + '/artigo/updateArtigo', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getAllArtigos(){
    return this.httpClient.get(this.url + '/artigo/getAllArtigo');
  }
  getAllPublicadoArtigo(){
    return this.httpClient.get(this.url + '/artigo/getAllPublicadoArtigo');
  }
  deleteArtigo(id: any){
    return this.httpClient.delete(this.url + '/artigo/deleteArtigo/' + id);
  }

}
