import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {EnviosService} from '../../services/envios.service';
import {LoginService} from '../../services/login.service';
import {SucursalesService} from '../../services/sucursales.service';
import {Subscription} from 'rxjs/subscription'
//para poder usar los metodos de la api
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  origen: any;
  destino: any;

  fooSub: Subscription;
  fooSub2: Subscription;
  fooSub3: Subscription;
  

  current_user:any = {id:null, nombre: null, estado: null, sucursal: null,coneccion: null, fecha: null};
  envio_tomado:any = {envio_id:null, cadete_id: null};


  constructor(public sucursalesService: SucursalesService, public loginService: LoginService, public enviosService: EnviosService, public navParams: NavParams, public navCtrl: NavController) {
    

                            this.current_user=this.loginService.getSession();

                            this.fooSub3 = this.loginService.getEnviosTomados().subscribe(tomados =>{

                                                                                for(let e=0; e < tomados.length; e++ ){
                                                                
                                                                                                                                          this.fooSub2 = this.enviosService.getEnvios()
                                                                                                                                          .subscribe(envios => {
                                                                                                                          
                                                                                                                          
                                                                                                                                                          for(let x=0; x < envios.length; x++ ){


                                                                                                                                                                          if(envios[x]['cadete'] == tomados[e]['cadete_id']){
                                                                                                                                                    
                                                                                                                                                                                          
                                                                                                                                                                  
                                                                                                                                                                                          
                                                                                                                                                                                          this.fooSub = this.sucursalesService.getSucursales().subscribe(sucursales =>{

                                                                                                                                                                                                  for(let t=0; t < sucursales.length; t++){

                                                                                                                                                                                                        if(sucursales[t]['id'] == envios[x]['sucursal']){
                                                                                                                                                                                                          this.origen = "Argentina, Cordoba, "+sucursales[t]['name']+", "+sucursales[t]['address'];
                                                                                                                                                                                                          this.destino = "Argentina, Cordoba, "+sucursales[t]['name']+", "+envios[x]['destino'];
                                                                                                                                                                                                          
                                                                                                                                                                                                          var directionsService = new google.maps.DirectionsService;
                                                                                                                                                                                                          var directionsDisplay = new google.maps.DirectionsRenderer;
                                                                                                                                                                                                          var map = new google.maps.Map(document.getElementById('map'), {
                                                                                                                                                                                                            zoom: 7,
                                                                                                                                                                                                            center: {lat: 41.85, lng: -87.65}
                                                                                                                                                                                                          });
                                                                                                                                                                                                          directionsDisplay.setMap(map);
                                                                                                                                                                                                                              directionsService.route({
                                                                                                                                                                                                                                origin: this.origen,
                                                                                                                                                                                                                                destination:this.destino,
                                                                                                                                                                                                                                travelMode: 'DRIVING'
                                                                                                                                                                                                                              }, function(response, status) {
                                                                                                                                                                                                                                if (status === 'OK') {
                                                                                                                                                                                                                                  directionsDisplay.setDirections(response);
                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                  window.alert('Directions request failed due to ' + status);
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                              });   
                    
                        
                        


 
                                                                                                                                                                                                          
                                                                                                                                                                                                        }
                                                                                                                                                                                                       
                                                                                                                                                                                                  }
                                                                                                                                                                  
                                                                                                                                                                                          });
                                                                                                                                                    
                                                                                                                                                                          }
                                                                                                                                    
                                                                                                                                                          }
                                                                                                                     
                                                                                                                                          });

                                                                                                                              

                                                                                                                        
                                                                                 }
                        });

                     
  }

  ionViewDidLeave() {
    this.fooSub.unsubscribe();
    this.fooSub2.unsubscribe();
    this.fooSub3.unsubscribe();
  }
} 
