import { Component, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthHelper } from '../_helpers/auth_helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  mensagem_erro: string = '';
  exibirPagina: boolean = false;
  

  constructor(private httpClient: HttpClient,
    private authHelper: AuthHelper) { }

  //montando a estrutura do formulário
  formLogin = new FormGroup({
    login: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required])
  });

  //acessando o formulário/campos na pagina html
  get form(): any {
    return this.formLogin.controls;
  }

  ngOnInit(): void {
   
    if(this.authHelper.isAuthenticated()){

      //redirecionamento
      window.location.href = "/consultar-produtos";
   } else{
     this.exibirPagina = true;
    }

  }

  onSubmit(): void {

    
    this.mensagem_erro = '';

    this.httpClient.post('http://localhost:8080/api/login', this.formLogin.value, { responseType: 'text' }).subscribe(data => {



      //salvar o token na local storage
      localStorage.setItem('access_token', data);
      //salvar o login do usuario na local storage
      localStorage.setItem('login_usuario', this.formLogin.value.login ?? "");

      //limpar o formulario
      this.formLogin.reset(); 

      //redirecionamento
      window.location.href = "/consultar-produtos";
    },
      e => {
        this.mensagem_erro = e.error;
        console.log(e.error);
      }
    );

    

  }

}
