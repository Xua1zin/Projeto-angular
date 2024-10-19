// client-list.component.ts
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
})
export class ClientListComponent {
  clientes: Client[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, private clientService: ClientService) {
    if (isPlatformBrowser(this.platformId)) {
      this.clientService.clientes$.subscribe(clientes => {
        this.clientes = clientes;
      });
    }
  }
}
