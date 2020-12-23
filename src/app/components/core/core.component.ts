import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';
import { URI } from '../config/url.config';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  idUser = localStorage.getItem('id');
  tk = localStorage.getItem('tk');

  changeText = false;

  posts = [];

  constructor(private router: Router,
              private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.usuarioService.event$.subscribe(resp => {
      if(resp){
        this.getPost()
        this.usuarioService.event.next(false);
      }
    })
    

  }

  getPost(){
    this.usuarioService.getPost(397171, this.idUser, this.tk)
      .subscribe((a: any) => {
        console.log(a)
        if(a.code === 200){
          this.posts = a.data
          this.posts.forEach(a => {
            if(a.image){
              a.image = `${URI}/uploads/397171/posts/${a.idpost}/${a.image}`
            }
            if(a.userimage){
              a.userimage = `background-image: url(${URI}/uploads/397171/users/${this.idUser}/${a.userimage})`
            }else{
              a.userimage = `background-image: url('./assets/sinImg.png')`
            }

            this.usuarioService.commentGet(397171, a.idpost, this.tk)
              .subscribe((f: any) => {
                console.log('commetn',f);
                if(f.code === 200){
                  a.comentarios = f.data
                  console.log(this.posts);
                }
              })
          })
          console.log(this.posts);
        }
      })
  }

  salir(){
    localStorage.clear();
    return this.router.navigateByUrl('login');
  }

}
