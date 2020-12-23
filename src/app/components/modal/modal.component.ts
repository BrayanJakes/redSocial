import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  form: FormGroup;
  idUser = localStorage.getItem('id');
  tk = localStorage.getItem('tk');
  comentarios = [];

  constructor(public modalRef: MatBottomSheetRef,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private usuarioService: UsuariosService) { this.formulario() }

  ngOnInit(): void {
    console.log(this.data.comentarios);
    this.comentarios = this.data.comentarios
  }

  formulario(){
    this.form = new FormGroup({
      posteo: new FormControl('', Validators.required)
    })

    if(this.data.option === 'Editar'){
      this.form.controls['posteo'].setValue(this.data.description)
    }
  }

  deleteComment(comment){
    this.usuarioService.commentDelete(397171, comment.idcomment, this.tk)
      .subscribe((a: any) => {
        if(a.code === 200){
          
         this.modalRef.dismiss('Eliminado')
         
        }
      })
  }
}
