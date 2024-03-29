import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

	formData = {
    id: '',
	 	name: '',    
    gender: ''
   
	 	
	 }

  constructor(private apiService: ApiService, private alertController: AlertController, private route: ActivatedRoute, private router: Router) { 


      this.route.queryParams.subscribe(params => {
      console.log(this.router.getCurrentNavigation().extras.state);
       if (this.router.getCurrentNavigation().extras.state) {
        this.formData.id = this.router.getCurrentNavigation().extras.state.formDataParams.id;
        this.formData.name = this.router.getCurrentNavigation().extras.state.formDataParams.name;
        this.formData.gender = this.router.getCurrentNavigation().extras.state.formDataParams.gender;
      }
    });




  }

  ngOnInit() {
  }

  async formSubmit(){

    if(this.formData.id){ //Atualizar

      await this.apiService.sendPutRequest(this.formData.id, this.formData).subscribe((data)=>{
        console.log(data);
      }, error => {
        console.log(error);
      });


    }
    else{ //Criar

      await this.apiService.sendPostRequest(this.formData).subscribe((data)=>{
        console.log(data);
      }, error => {
        console.log(error);
      });

    }

    //await this.apiService.sendPostRequest(this.dadosPessoa).subscribe((data)=>{
      //console.log(data);
   // }, error => {
   //   console.log(error);
   // });

  
    const alert = await this.alertController.create({
      header: 'Alerta!',
      subHeader: 'Cliente API',
      message: 'Cliente cadastrado com Sucesso.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
