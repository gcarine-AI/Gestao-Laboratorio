import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Supabase } from '../services/supabase';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth implements OnInit {
  isLoginMode = true; // toggle entre login e registo
  isLoading = false;
  errorMessage: string | null = null;
  currentUser: string | null = null;

  form = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private supaBase: Supabase) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.updateFormValidators();
  }

  // Alterna entre login e registo e ajusta validadores
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null;
    this.form.reset();
    this.updateFormValidators();
  }

  // O campo "nome" só é obrigatório no registo
  updateFormValidators() {
    const nomeControl = this.form.get('nome');
    if (this.isLoginMode) {
      nomeControl?.clearValidators();
    } else {
      nomeControl?.setValidators([Validators.required, Validators.minLength(3)]);
    }
    nomeControl?.updateValueAndValidity();
  }

  // Submete consoante o modo atual
  async onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    this.errorMessage = null;

    if (this.isLoginMode) {
      await this.signIn();
    } else {
      await this.signUp();
    }

    this.isLoading = false;
  }

  // Registo
  private async signUp() {
    const nome = this.form.get('nome')?.value!;
    const email = this.form.get('email')?.value!;
    const password = this.form.get('password')?.value!;

    const { error } = await this.supaBase.getClient().auth.signUp({
      email,
      password,
      options: { data: { nome } }
    });

    if (error) {
      this.errorMessage = 'Erro ao criar conta: ' + error.message;
    } else {
      alert('Conta criada! Verifica o teu email para confirmar.');
      this.toggleMode(); // volta para login após registo
    }
  }

  // Login
  private async signIn() {
    const email = this.form.get('email')?.value!;
    const password = this.form.get('password')?.value!;

    const { error } = await this.supaBase.getClient().auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      this.errorMessage = 'Email ou palavra-passe incorretos.';
    } else {
      await this.getCurrentUser();
    }
  }

  // Logout
  async signOut() {
    const { error } = await this.supaBase.getClient().auth.signOut();
    if (error) {
      this.errorMessage = 'Erro ao fazer logout: ' + error.message;
    } else {
      this.currentUser = null;
    }
  }

  // Utilizador atual — corrigido para async/await
  async getCurrentUser() {
    const { data } = await this.supaBase.getClient().auth.getUser();
    this.currentUser = data.user?.email ?? null;
  }
}
