import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { URI } from '../config/url.config';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;

  idUser = localStorage.getItem('id');
  tk = localStorage.getItem('tk');

  user = {};

  img: any;

  constructor(private usuarioService: UsuariosService,
              private toat: MatSnackBar) { this.formulario() }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(){
    this.usuarioService.getUser(397171, this.idUser, this.tk)
      .subscribe((a: any) => {
        this.user = a.data
        this.img = a.data.image
        if(a.data.image){
          this.img = `${URI}/uploads/397171/users/${a.data.iduser}/${a.data.image}`
        }
        this.form.controls['email'].setValue(a.data.email);
        this.form.controls['fullname'].setValue(a.data.fullname);
        this.form.controls['nickname'].setValue(a.data.nickname);
      })
  }

  formulario(){
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      fullname: new FormControl(''),
      birthdate: new FormControl(''),
      nickname: new FormControl('', Validators.required),
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
      me.img = reader.result
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

 guardar(){
   let a = new Date(this.form.controls['birthdate'].value)
   let mes = String(a.getUTCMonth() + 1);
   let dia = String(a.getUTCDate());
   let user = {
    email: this.form.controls['email'].value,
    fullname: this.form.controls['fullname'].value,
    birthdate: `${a.getFullYear()}/${mes.length === 1 ? '0'+ mes : mes}/${dia.length === 1 ? '0'+dia : dia}`,
    nickname: this.form.controls['nickname'].value,
    image: this.img
   }
   this.usuarioService.editUser(397171, this.idUser, this.tk, user)
        .subscribe((a: any) => {
          if(a.code === 200){
            this.toat.open('Datos guardados con exitos', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'right',
              verticalPosition: 'top'
            })
          }
        })
 }

}
