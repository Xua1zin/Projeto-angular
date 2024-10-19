// src/app/services/client.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../models/client';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientesSubject = new BehaviorSubject<Client[]>([]);
  clientes$ = this.clientesSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedClientes = localStorage.getItem('clientes');
      const clientes = storedClientes ? JSON.parse(storedClientes) : [];
      this.clientesSubject.next(clientes);
    }
  }

  addCliente(cliente: Client) {
    if (isPlatformBrowser(this.platformId)) {
      const currentClientes = this.clientesSubject.value;
      currentClientes.push(cliente);
      localStorage.setItem('clientes', JSON.stringify(currentClientes));
      this.clientesSubject.next(currentClientes);
    }
  }
}
