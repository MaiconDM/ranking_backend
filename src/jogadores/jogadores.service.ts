import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Logger } from '@nestjs/common/services';
import { Jogador } from './Interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import * as uuid from 'uuid';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);
  async criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criaJogadorDto;
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, criaJogadorDto);
    } else {
      this.criar(criaJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async consultadorJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${email} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, telefoneCelular, email } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuid.v1(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'https://www.urlimagem.com',
    };
    this.logger.log(`criarJogadorDto:${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): void {
    const { nome } = criarJogadorDto;

    jogadorEncontrado.nome = nome;
  }
}
