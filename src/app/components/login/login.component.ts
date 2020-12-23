import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { UsuariosService } from '../services/usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(
    private modal: MatDialog,
    private usuarioService: UsuariosService,
    private toat: MatSnackBar,
    private router: Router
  ) { this.formulario() }

  ngOnInit(): void {
  }

  formulario(){
    this.form = new FormGroup({
      email: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    })
  }

  modalRegister(){
    this.modal.open(RegisterComponent, {
      width: '300px',
    })
  }

  login(){
    let user = {
      email: this.form.controls['email'].value,
      password: this.form.controls['pass'].value,
      applicantcode: 397171
    }

    this.usuarioService.loginUsuario(user)
      .subscribe((a: any) => {
        console.log(a);
        if(a.code === 405){
          return this.toat.open(a.msg, 'Cerrar', {duration: 3000})
        }
        localStorage.setItem('tk', a.data.token)
        localStorage.setItem('id', a.data.iduser)
        localStorage.setItem('nick', a.data.nickname)
        this.toat.open(`Bienvenido ${a.data.nickname}`, 'Cerrar', {duration: 5000})
        this.router.navigateByUrl('home')
      })
  }

}
