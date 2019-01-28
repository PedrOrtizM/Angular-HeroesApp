import { Component, OnInit } from '@angular/core';
import { HeroesService } from "../../services/heroes.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  eliminado:boolean;
  heroes:any[] = [];
  loading:boolean = true;

  constructor(private heroesService:HeroesService) {

    this.heroesService.getHeroes().subscribe((data:any)=>{
      console.log(data);
      this.heroes = data
      this.loading = false;
    })
  }

  ngOnInit() {
  }

  eliminarHeroe(key:string){
    this.heroesService.eliminarHeroe(key)
                      .subscribe(data=>{
       // Si retorna algo está mal, sino retorna null y está bien
       if (data) {
           console.error(data)
       }else{
         // para que se actualice automaticamente la pagina hay que eliminar
         // del arreglo de objetos lo que se eliminó y para que el ngForm esté
         // pendiente de los cambios o mejor el pipe hay que agregarle pure: true
        delete this.heroes[key];
        this.eliminado = true;
       }

    });
  }

}
