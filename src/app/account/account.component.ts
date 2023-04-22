import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthHelper } from '../_helpers/auth_helper';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  mensagem_sucesso: string = '';
  mensagem_erro: string = '';

  exibirPagina: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private authHelper: AuthHelper
  ) { }

  //montando a estrutura do formulário
  formCadastro = new FormGroup({
  
    //campos do formulário
    nome : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    login : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    senha : new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
    
  });

  //acessando o formulario/campos na pagina html
  get form(): any {
    return this.formCadastro.controls
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

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    this.httpClient.post('http://localhost:8080/api/account', this.formCadastro.value, { responseType: 'text'}).subscribe( data => {
      this.mensagem_sucesso = data;
      this.formCadastro.reset();
    }, 
    e => {
      this.mensagem_erro = e.error;
      console.log(e.error);
    }
    );
  }

}




