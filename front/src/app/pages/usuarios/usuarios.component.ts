import { Component, OnInit } from '@angular/core';
import { ClinicaService } from '../../services/clinica.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clinicas',
  imports:[FormsModule,CommonModule],
  styleUrls: ['./usuarios.component.scss'],
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  clinicas: any[] = [];
  search: string = '';
  currentPage = 1;
  totalPages = 1;

  constructor(private clinicaService: ClinicaService, private router: Router) {}

  ngOnInit() {
    this.loadClinicas();
  }

  loadClinicas() {
    this.clinicaService.getClinicas(this.currentPage, this.search).subscribe(
      (res: any) => {
        this.clinicas = res.data;
        this.totalPages = res.last_page;
      },
      (err) => console.error('Erro ao carregar clínicas', err)
    );
  }

  onSearch() {
    this.currentPage = 1;
    this.loadClinicas();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadClinicas();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadClinicas();
    }
  }

  visualizar(clinica: any) {
    this.router.navigate(['/clinicas', clinica.id]);
  }

  editar(clinica: any) {
    this.router.navigate(['/clinicas', clinica.id, 'editar']);
  }

  criarClinica() {
    this.router.navigate(['/clinicas/nova']);
  }
}
