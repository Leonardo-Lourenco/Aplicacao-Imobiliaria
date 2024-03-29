import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { AlertController} from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
   public posts: any;
  public results: any;
  public count: any;
  public next: any;

  
   //public page:any;
  // public total_page:any;

  constructor(private apiService: ApiService, private modalController: ModalController, private alertController: AlertController, private router: Router) {

    this.next = 1;

    this.apiService.getPosts(this.next).subscribe((results:any)=>{
      console.log(results);
      this.count = results.count;
      this.posts = results.results;
      });
 
    }

  loadMoreData(event) {

    this.count++;

    this.apiService.getPosts(this.next).subscribe((results:any)=>{
      this.posts = this.posts.concat(results.results);

      event.target.complete();
      if (this.count == this.next) {
        event.target.disabled = true;
      }
    });
  }

  async presentModal(post) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'name': post.name,
        'email': post.email,
        'modalController': this.modalController
      }
    });
    return await modal.present();
  }



  async edit(post) {

    let navigationExtras: NavigationExtras = {
      state: {
        formDataParams: post
      }
    };
    this.router.navigate(['/formulario'], navigationExtras);
  }

  


    async delete(post){

      await this.apiService.sendDeleteRequest(post.id).subscribe((results)=>{
      console.log(results);
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
    }, error => {
      console.log(error);
    });

    
    
    const alert = await this.alertController.create({
      header: 'Alerta!',
      subHeader: 'Cliente API Deletado!',
      message: 'Cliente removido com sucesso.',
      buttons: ['OK']
    });

        await alert.present();

  
  }

  ngOnInit(){

  }
}
