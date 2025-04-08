import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClinicaService } from '../../services/clinica.service';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-clinica',
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './clinica.component.html'
})
export class ClinicaComponent implements OnInit {
  clinicaForm!: FormGroup;
  modoVisualizacao = false;
  clinicaId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clinicaService: ClinicaService
  ) {}

  ngOnInit(): void {
    this.clinicaId = this.route.snapshot.paramMap.get('id');
    this.modoVisualizacao = this.router.url.includes('visualizar');

    this.clinicaForm = this.fb.group({
      nome: [''],
      responsavel: [''],
      regiao: [''],
      cnpj: [''],
      email: [''],
      telefone: [''],
      data_criacao: [''],
      ativa: [false]
    });

    if (this.clinicaId) {
      this.carregarClinica();
    }

    if (this.modoVisualizacao) {
      this.clinicaForm.disable();
    }
  }

  carregarClinica() {
    this.clinicaService.getClinicaById(this.clinicaId!).subscribe((clinica) => {
      this.clinicaForm.patchValue(clinica);
    });
  }

  salvar() {
    if (this.clinicaForm.valid) {
      const data = this.clinicaForm.value;
      if (this.clinicaId) {
        this.clinicaService.updateClinica(this.clinicaId, data).subscribe(() => {
          this.router.navigate(['/clinicas']);
        });
      } else {
        this.clinicaService.createClinica(data).subscribe(() => {
          this.router.navigate(['/clinicas']);
        });
      }
    }
  }

  cancelar() {
    this.router.navigate(['/clinicas']);
  }
}
