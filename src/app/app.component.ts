import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //atributos
  isAuthenticated: boolean = false;

  loginUsuario: string | null = '';

  ngOnInit(): void {

    this.isAuthenticated = localStorage.getItem("access_token") != null && localStorage.getItem("login_usuario") != null;

    if(this.isAuthenticated){
      this.loginUsuario = localStorage.getItem("login_usuario");
    }
  }

  //funcao para fazer o logout do usuario

  logout() : void {
    if(window.confirm('Deseja realmente sair do sistema?')){

     //apagar as informacoes gravadas na local storage
     localStorage.removeItem('access_token');
    localStorage.removeItem('login_usuario');
    
    

     //redirecionar para a pagina inicial do projeto (login)
     window.location.href = '/';

    }
  }


}
