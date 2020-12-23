import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { URI } from '../config/url.config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { ModalComponent } from '../modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  publicacion = '';
  loadingImg = 0;
  idUser = localStorage.getItem('id');
  tk = localStorage.getItem('tk');
  textArea = '';
  img64: any;

  posts = [];

  constructor(private usuarioService: UsuariosService,
              private modal: MatBottomSheet,
              private toat: MatSnackBar) { this.formulario() }

  ngOnInit(): void {
    this.getPost()
  }

  formulario(){
    this.form = new FormGroup({
      posteo: new FormControl('', Validators.required)
    })
  }


  getPost(){
    this.usuarioService.event.next(true);
    this.form.controls['posteo'].reset()
    this.loadingImg = 0;
    this.img64 = null;
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

  fileInput(img){
    console.log(img)
    const files: File[] = img.srcElement.files;
    this.getBase64(files[0])
    
  }

  getBase64(event) {
    let me = this;
    let file = event;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
      me.img64 = reader.result
      me.loadingImg = 100;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
  publicar(){
    this.usuarioService.post(this.form.controls['posteo'].value, 397171, this.idUser, this.tk, this.img64)
      .subscribe(a => this.getPost())
  }

  editPost(post){
    let modal = this.modal.open(ModalComponent, {
      data: {description: post.description,
            option: 'Editar'},
            disableClose: true
    })
    modal.afterDismissed().subscribe(resp => {
      if(resp !== 'Sin cambios'){
        this.usuarioService.editPost(397171, post.idpost, this.tk, resp, null)
        .subscribe((a: any) => {
          if(a.code === 200){
            this.toat.open('Descripcion actualizada', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            })
            this.getPost()
          }
        })
      }
    })
  }

  eliminarPost(post){
    let modal = this.modal.open(ModalComponent, {
      data: {description: post.idpost, option: 'Eliminar'},
      disableClose: true
    })
    modal.afterDismissed().subscribe(resp => {
      if(resp !== 'Sin cambios'){
        this.usuarioService.deletePost(397171, post.idpost, this.tk)
            .subscribe((a: any) => {
              if(a.code === 200){
                this.toat.open('Post eliminado', 'Cerrar', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top'
                })
                this.getPost()
              }
            })
      }
    })
  }

  like(post){

    this.usuarioService.editPost(397171, post.idpost, this.tk, post.description, this.idUser)
        .subscribe((a: any) => {
          if(a.code === 200){
            this.getPost()
          }
        })

  }

  comentar(post){
    let modal = this.modal.open(ModalComponent, {
      data: {description: post.idpost, option: 'Comentar', comentarios: post.comentarios},
      disableClose: true
    })

    modal.afterDismissed()
      .subscribe((resp) => {
        console.log(resp);
        if(resp !== 'Sin cambios'){
          if(resp === 'Eliminado'){
            return this.getPost()
          }
          this.usuarioService.commentPost(397171, post.idpost, this.tk, this.idUser, resp)
            .subscribe(a => {
              this.getPost()
            })
        }
      })
  }
}
