import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { LabService } from '../../services/lab';



@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario implements OnInit {

  formulario!: FormGroup;
  tipo = "";
  id: number | null = null;
  modoEdicao = false;

  constructor (
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private labService: LabService
  ) {}

  ngOnInit(): void {
      this.tipo = this.route.snapshot.paramMap.get('tipo') ?? '';
      const idParam = this.route.snapshot.paramMap.get('id');
      this.id = idParam ? Number(idParam): null;
      this.modoEdicao = this.id !== null;

      this.criarFormulario();

      if(this.modoEdicao) {
        this.preencherFormulario();
      }
  }

  criarFormulario(): void {
    if(this.tipo === 'investigador') {
      this.formulario = this.fb.group({
        titulo: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        especialidade: ['', Validators.required],
        activo: [true, Validators.required],
        dataCriacao: ['', Validators.required]
      });
    } else if (this.tipo === 'projeto') {
      this.formulario = this.fb.group({
        titulo: ['', [Validators.required, Validators.minLength(3)]],
        descricao: ['', [Validators.required, Validators.minLength(10)]],
        area: ['', Validators.required],
        estado: ['Em curso', Validators.required],
        dataInicio: ['', Validators.required],
        investigadorId: ['', [Validators.required, this.validarIdPositivo]]
      });
    } else if (this.tipo === 'equipamento') {
      this.formulario = this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        tipo: ['', Validators.required],
        estado: ['Disponivel', Validators.required],
        localizacao: ['', [Validators.required], this.validarLocalizacao],
        dataAquisicao: ['', Validators.required]
      });
    }
  }

  validarIdPositivo (control: AbstractControl): ValidationErrors | null {
    const valor = Number(control.value);
    if(isNaN(valor) || valor <= 0) {
      return { idInvalido: true};
    }
    return null;
  }

  validarLocalizacao(control: AbstractControl): ValidationErrors | null {
    const valor = control.value as string;
    if (valor && !valor.toLowerCase().includes('sala')) {
      return { localizacaoInvalida: true };
    }
    return null;
  }

  preencherFormulario():void {
    if (this.tipo === 'investigador' && this.id) {
      const inv = this.labService.getInvestigadoresById(this.id);
      if(inv) {
        this.formulario.patchValue({
          ...inv,
          dataCriacao: this.formatarDataParaInput(new Date(inv.dataCriacao))
        });
      }
    } else if (this.tipo === 'projeto' && this.id) {
      const proj = this.labService.getProjetosById(this.id);
      if(proj) {
        this.formulario.patchValue({
          ...proj,
          dataInicio: this.formatarDataParaInput(new Date(proj.dataInicio))
        });
      }
    } else if (this.tipo === 'equipamento' && this.id) {
      const equip = this.labService.getEquipamentosById(this.id);
      if(equip) {
        this.formulario.patchValue({
          ...equip,
          dataAquisicao: this.formatarDataParaInput(new Date(equip.dataAquisicao))
        })
      }
    }
  }

  formatarDataParaInput(data:Date): string {
    return data.toISOString().split('T')[0];
  }

  submeter (): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.value;

    if (this.tipo === 'investigador') {
      const dados = {...valores, dataCriacao: new Date(valores.dataCriacao)};
      if (this.modoEdicao && this.id) {
        this.labService.editarInvestigadores({ id: this.id, ...dados})
      } else {
        this.labService.adicionarInvestigadores(dados);
      }
      this.router.navigate(['/investigadores']);

    } else if (this.tipo === 'projeto') {
      const dados = { ...valores, dataInicio: new Date(valores.dataInicio), investigadorId: Number (valores.investigadorId)};
      if (this.modoEdicao && this.id) {
        this.labService.editarProjetos( { id: this.id, ...dados})
      } else {
        this.labService.adicionarProjetos(dados);
      }
      this.router.navigate(['/projetos']);

    } else if (this.tipo === 'equipamento') {
      const dados = { ...valores, dataAquisicao: new Date(valores.dataAquisicao)};
      if (this.modoEdicao && this.id) {
        this.labService.editarEquipamentos( {id: this.id, ...dados})
      } else {
        this.labService.adicionarEquipamentos(dados);
      }
      this.router.navigate(['/equipamentos']);
    }
  }

  cancelar(): void {
    if (this.tipo === 'investigador') this.router.navigate(['investigadores']);
    if (this.tipo === 'projeto') this.router.navigate(['projetos']);
    if (this.tipo === 'equipamento') this.router.navigate(['equipamentos']);
  }


}

