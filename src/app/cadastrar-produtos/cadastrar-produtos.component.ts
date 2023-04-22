import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthHelper } from '../_helpers/auth_helper';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent {

  //atributo
  mensagem: string = '';
  exibirPagina: boolean = false;


  constructor(   
    private httpClient: HttpClient,
    private authHelper: AuthHelper
  ) {  

  } 

  //montando a estrutura do formulário
  formCadastro = new FormGroup({
  
    //campos do formulário
    nome : new FormControl('', [Validators.required]),
    preco : new FormControl('', [Validators.required]),
    quantidade : new FormControl('', [Validators.required]),
    descricao : new FormControl('', [Validators.required]),
  });

  //acessando o formulario/campos na pagina html
  get form(): any {
    return this.formCadastro.controls
  }

  ngOnInit(): void {

    if(this.authHelper.isAuthenticated()){
      this.exibirPagina = true;
     
     
   } else{
     //redirecionamento
    window.location.href = "/";
    }

  }

  //funcao para fazer a chamada do cadastro na API
  onSubmit(): void {
    this.httpClient.post('http://localhost:8080/api/produtos', this.formCadastro.value, { responseType : 'text'}).subscribe(
      data => {
        this.mensagem = data;
        this.formCadastro.reset();
      },
      e => {
        this.mensagem = "Ocorreu um erro, o cadastro não foi realizado.";
        console.log(e);
      }
    )
  }

}
