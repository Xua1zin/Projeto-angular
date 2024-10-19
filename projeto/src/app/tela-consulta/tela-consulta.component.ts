import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientListComponent } from "../client-list/client-list.component";
import { CadastroFormComponent } from "../cadastro-form/cadastro-form.component";

@Component({
  selector: 'app-tela-consulta',
  standalone: true,
  imports: [CommonModule, ClientListComponent, CadastroFormComponent],
  templateUrl: './tela-consulta.component.html',
  styleUrl: './tela-consulta.component.scss'
})
export class TelaConsultaComponent {

}
