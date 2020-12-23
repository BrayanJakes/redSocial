import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  form: FormGroup
  msgError = '';

  constructor(private usuarioService: UsuariosService,
              public modalRef: MatDialogRef<RegisterComponent>,
              private toat: MatSnackBar) { this.formulario() }

  ngOnInit(): void {
  }


  formulario(){
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      nick: new FormControl('', Validators.required),
    })
  }

  crearUsuario(){
    this.msgError = '';
    let user = {
      email: this.form.controls['email'].value,
      password: this.form.controls['pass'].value,
      nickname: this.form.controls['nick'].value,
      applicantcode: 397171
    }

    this.usuarioService.agregarUsuario(user)
      .subscribe((resp: any) => {
        if(resp.code === 411 || resp.code === 412){
          return this.toat.open(resp.msg, 'Cerrar', {duration: 3000})
        }
        this.toat.open('Cuenta creada con exito', 'Cerrar', {duration: 3000})
        this.modalRef.close();
      })
  }

}
