import { Injectable } from '@angular/core';
import { Heroe }  from "../inferfaces/heroe.interface";
import {HttpClient ,HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})


export class HeroesService {

  urlBD = 'https://heroesapp-5b513.firebaseio.com/heroes';

  constructor(private http:HttpClient) {

  }


  guardarHeroe(heroe:Heroe){

    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded");
    return this.http.post(this.urlBD+'.json',body,{headers});

  }

  actulizarHeroe(heroe:Heroe,key$:string){

    let url = `${ this.urlBD }/${ key$ }.json`
    let body = JSON.stringify(heroe);
    let headers = new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded");
    return this.http.put(url,body,{headers});
  }



  getHeroe(key$:string){
    let url = this.urlBD + '/' + key$ + '.json';
    return this.http.get(url);

  }


  getHeroes(){
    let url = this.urlBD +'.json';
    return this.http.get(url);

  }

  eliminarHeroe(key:string){
    let url = this.urlBD +'/'+ key + '.json';
    return this.http.delete(url);


  }

}
