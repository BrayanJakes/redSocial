import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URI } from '../config/url.config';
import { BehaviorSubject, Observable } from 'rxjs';

let headers = new HttpHeaders({
  'Content-Type':'application/x-www-form-urlencoded'});

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  event: BehaviorSubject<boolean> = new BehaviorSubject(false);
  event$: Observable<boolean> = this.event.asObservable();

  constructor(private http: HttpClient) { }

  agregarUsuario(usuario){
    let uri = `${URI}/users/create`;
    let user = new HttpParams();
    user = user.append('email', usuario.email);
    user = user.append('password', usuario.password);
    user = user.append('nickname', usuario.nickname);
    user = user.append('applicantcode', usuario.applicantcode);
    return this.http.post(uri, user, {headers})
  }

  loginUsuario(usuario){
    let uri = `${URI}/login`;
    let user = new HttpParams();
    user = user.append('email', usuario.email);
    user = user.append('password', usuario.password);
    user = user.append('applicantcode', usuario.applicantcode);
    return this.http.post(uri, user, {headers})
  }

  public postFile(file: File, nombreImagen: string, code: number, idUsuario: string) {
    let user = new HttpParams();
    const formData = new FormData();
    formData.append("media", file);


    const url = `${URI}/uploads/${code}/users/${idUsuario}/${nombreImagen}`;
    return this.http
      .post(url, formData, { headers, reportProgress: true, observe: "events" })
  }

  public post(postText: string, code: any, idUsuario: string, token: string, img64: any) {
    let user = new HttpParams();
    user = user.append('token', token);
    user = user.append('iduser', idUsuario);
    user = user.append('description', postText);
    user = user.append('applicantcode', code);
    if(img64){
      user = user.append('image', img64);
    }
    


    const url = `${URI}/posts/create`;
    return this.http
      .post(url, user, { headers})
  }

  public getPost(code: any, idUsuario: string, token: string) {
    let user = new HttpParams();
    user = user.append('token', token);
    user = user.append('iduser', idUsuario);
    user = user.append('applicantcode', code);
    


    const url = `${URI}/posts/viewbyiduser`;
    return this.http
      .post(url, user, { headers})
  }

  public getUser(code: any, idUsuario: string, token: string) {
    let user = new HttpParams();
    user = user.append('token', token);
    user = user.append('iduser', idUsuario);
    user = user.append('applicantcode', code);
    


    const url = `${URI}/users/viewbyid`;
    return this.http
      .post(url, user, { headers})
  }

  public editUser(code: any, idUsuario: string, token: string, userEdit: any) {
    let user = new HttpParams();
    user = user.append('token', token);
    user = user.append('iduser', idUsuario);
    user = user.append('applicantcode', code);
    user = user.append('fullname', userEdit.fullname);
    user = user.append('email', userEdit.email);
    user = user.append('birthdate', userEdit.birthdate);
    user = user.append('image', userEdit.image);
    user = user.append('nickname', userEdit.nickname);

    const url = `${URI}/users/edit`;
    return this.http
      .post(url, user, { headers})
  }

  public editPost(code: any, idpost: string, token: string, description: string, likes: string) {
    let user = new HttpParams();
    user = user.append('token', token);
    user = user.append('idpost', idpost);
    user = user.append('applicantcode', code);
    user = user.append('description', description);
    if(likes){
      user = user.append('likes', likes);
    }

    const url = `${URI}/posts/edit`;
    return this.http
      .post(url, user, { headers})
  }

  public deletePost(code: any, idpost: string, token: string) {
    let user = new HttpParams();
    user = user.append('token', token);
    user = user.append('idpost', idpost);
    user = user.append('applicantcode', code);

    const url = `${URI}/posts/delete`;
    return this.http
      .post(url, user, { headers})
  }

  public commentPost(code: any, idpost: string, token: string, iduser: string, description: string) {
    let user = new HttpParams();
    user = user.append('token', token);
    user = user.append('idpost', idpost);
    user = user.append('applicantcode', code);
    user = user.append('description', description);
    user = user.append('iduser', iduser);

    const url = `${URI}/comments/create`;
    return this.http
      .post(url, user, { headers})
  }

  public commentGet(code: any, idpost: string, token: string) {
    let user = new HttpParams();
    user = user.append('token', token);
    user = user.append('idpost', idpost);
    user = user.append('applicantcode', code);

    const url = `${URI}/comments/viewbyidpost`;
    return this.http
      .post(url, user, { headers})
  }

  public commentDelete(code: any, idcomment: string, token: string) {
    let user = new HttpParams();
    user = user.append('token', token);
    user = user.append('idcomment', idcomment);
    user = user.append('applicantcode', code);

    const url = `${URI}/comments/delete`;
    return this.http
      .post(url, user, { headers})
  }
}
