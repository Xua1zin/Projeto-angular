import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientService } from '../services/client.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from '../models/client';

@Component({
  selector: 'app-cadastro-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './cadastro-form.component.html',
  styleUrl: './cadastro-form.component.scss',
  providers: [provideNgxMask()],
})
export class CadastroFormComponent {
  cliente: Client = new Client();
  tipos = ['Física', 'Jurídica'];

  constructor(
    private modalService: NgbModal,
    private clienteService: ClientService
  ) {}

  //função que busca o endereço de acordo com o cep colocado, pensei em fazer
  //cep correto obrigatório, mas acho pouco funcional, pois se o cep mudar, a API
  //demora um pouco para atualizar, então não acho que seja ruim poder colocar a mão
  buscarEndereco() {
    const cep = this.cliente.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            this.cliente.endereco = data.logradouro;
            this.cliente.bairro = data.bairro;
            this.cliente.cidade = data.localidade;
          }
        });
    }
  }

  //função que valida se os campos obrigatórios foram preenchidos
  validarCampos() {
    return {
      nome: !!this.cliente.nome,
      documento: !!this.cliente.documento,
      email: !!this.cliente.email,
      endereco: !!this.cliente.endereco,
      cep: !!this.cliente.cep,
    };
  }

  //criei esse submitted para verificar se quando salva, os campos foram preenchidos,
  //e assim poder alterar a classe
  submitted!: boolean;

  // Função para validar CPF
  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    let soma = 0;
    let resto: number;

    // Valida o primeiro dígito
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
      return false;
    }

    soma = 0;

    // Valida o segundo dígito
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    return resto === parseInt(cpf.charAt(10));
  }

  //função que salva os clientes chamada quando aperta o botão, ela verifica se os
  //campos estão preenchidos e se o e-mail está dentro do padrão,
  //então retorna um alerta caso não, e caso sim, cria um objeto de cliente
  salvarCliente() {
    this.submitted = true;
    const camposValidos = this.validarCampos();

    if (
      camposValidos.nome &&
      camposValidos.documento &&
      camposValidos.email &&
      camposValidos.endereco &&
      camposValidos.cep
    ) {
      if (!this.validarCPF(this.cliente.documento)) {
        alert('Por favor, insira um CPF válido.');
        return;
      }

      const emailInput = document.querySelector('input[name="email"]');
      if (emailInput && emailInput.classList.contains('ng-invalid')) {
        alert('Por favor, insira um e-mail válido.');
        return;
      }

      this.clienteService.addCliente(this.cliente);
      this.cliente = new Client();
      this.submitted = false;
      this.cliente.tipoCliente = this.tipos[0];
    } else {
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  //função que abre o modal
  openModal(content: any) {
    this.cliente.tipoCliente = this.tipos[0];
    this.modalService.open(content);
  }
}
