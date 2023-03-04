import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultar-produtos',
  templateUrl: './consultar-produtos.component.html',
  styleUrls: ['./consultar-produtos.component.css']
})
export class ConsultarProdutosComponent {

//atributo para armazenar os dados do produto
produtos: any[] = [];

//injecao de dependecia 
constructor(
  private httpClient: HttpClient
) {}

//metodo executado quando o componente é aberto
ngOnInit(): void {
  this.httpClient.get('http://localhost:8080/api/produtos').subscribe(
     (data) => {
    this.produtos = data as any[];
     },
     (e) => {
      console.log(e);
     } 
  )
}

//funcao para fazer a exclusao do produto na api
excluir(idProduto: number): void {
  if(window.confirm('Deseja realmente excluir o produto selecionado?')){
    this.httpClient.delete('http://localhost:8080/api/produtos' + idProduto, { responseType : 'text'}).subscribe(
      (data) => {
        alert(data); // exibir mensagen em uma janela pop up
        this.ngOnInit(); //recarrgar a consulta de produtos
         },
         (e) => {
          console.log(e);
         } 
    )
  }
}

}
