import { Component, OnInit } from '@angular/core';
import { Heroe } from "../../inferfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm }  from "@angular/forms";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  nuevo:boolean = false;
  guardado:boolean =false;
  actualizado:boolean =false;
  accion:string;
  parametro:string;

  heroe:Heroe = {
    nombre: "",
    bio: "",
    casa: "Marvel"
  }

  ngOnInit() {

  }
  constructor(private heroesService:HeroesService,
              private router:Router,
              private activatedRoute:ActivatedRoute) {

                this.activatedRoute.params.subscribe(params =>{
                  this.parametro = params['id'];
                  if ( this.parametro === "nuevo" ) {
                      this.nuevo = true;
                  }
                  else{

                    this.nuevo = false;
                    // para que cargue la información si pasa por paramtro el id
                    this.heroesService.getHeroe(this.parametro)
                                      .subscribe((data:Heroe)=>{
                                        this.heroe = data;

                                      })
                  }
                })

              }



  guardar(){

       if (this.nuevo) {

        this.heroesService.guardarHeroe(this.heroe)
                          .subscribe(
                            (data:any)=>{
                              this.router.navigate(['/heroe',data.name])
                              this.guardado = true;
                              this.accion = "guardado";
                              setTimeout( ()=>{
                                this.guardado = false;

                              },4500);
                              console.log(data)
                            },
                            error=>console.error(error) )
       }else{
            this.heroesService.actulizarHeroe(this.heroe,this.parametro)
                              .subscribe(data=>{
                                console.log(data);
                                this.actualizado = true;
                                this.accion = "actualizado";
                                setTimeout( ()=>{
                                  this.actualizado = false;

                                },4500);
                              })
       }
  }


  agregarNuevo(forma:NgForm){

    this.router.navigate(['/heroe','nuevo']);
    forma.reset({
      casa: "Marvel"  // Para que cuando se reincie la forma quede por default
    });

  }




}
