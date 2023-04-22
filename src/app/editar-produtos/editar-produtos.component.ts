import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthHelper } from '../_helpers/auth_helper';

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent  {

  //atributo
  mensagem: string = ''
  exibirPagina: boolean = false;
//injecao de dependecia 
constructor(
  private httpClient: HttpClient,
  private activatedRoute: ActivatedRoute,
  private authHelper: AuthHelper
) {}


  //metodo executado quando a página é aberta
ngOnInit(): void {
    if(this.authHelper.isAuthenticated()){
      this.exibirPagina = true;
     
     
   } else{
     //redirecionamento
    window.location.href = "/";
    }

//capturar o id enviado pela url
const idProduto = this.activatedRoute.snapshot.paramMap.get('id') as string;

//consultar o produto na API atraves do id

this.httpClient.get('http://localhost:8080/api/produtos/' + idProduto).subscribe(
  (data: any) => {
    //preenchendo os campos do formulário com os dados do produto
    this.formEdicao.controls.idProduto.setValue(data.idProduto);
    this.formEdicao.controls.nome.setValue(data.nome);
    this.formEdicao.controls.preco.setValue(data.preco);
    this.formEdicao.controls.quantidade.setValue(data.quantidade);
    this.formEdicao.controls.descricao.setValue(data.descricao);
  },
  (e) => {
    console.log(e);
  }
)
 
}
  //montando a estrutura do formulário
  formEdicao = new FormGroup({
  
    //campos do formulário
    idProduto: new FormControl(''),  
    nome : new FormControl('', [Validators.required]),
    preco : new FormControl('', [Validators.required]),
    quantidade : new FormControl('', [Validators.required]),
    descricao : new FormControl('', [Validators.required]),
  });

  //acessando o formulario/campos na pagina html
  get form(): any {
    return this.formEdicao.controls
  }

  //funcao para fazer a chamada da edicao na API
  onSubmit(): void {
    this.httpClient.put('http://localhost:8080/api/produtos', this.formEdicao.value, { responseType : 'text'}).subscribe(
      data => {
        this.mensagem = data;
        
      },
      e => {
        this.mensagem = "Ocorreu um erro, a edicao não foi realizada.";
        console.log(e);
      }
    )
  }


}
