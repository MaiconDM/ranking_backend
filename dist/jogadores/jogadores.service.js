"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JogadoresService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JogadoresService = void 0;
const injectable_decorator_1 = require("@nestjs/common/decorators/core/injectable.decorator");
const services_1 = require("@nestjs/common/services");
const uuid = require("uuid");
const common_1 = require("@nestjs/common");
let JogadoresService = JogadoresService_1 = class JogadoresService {
    constructor() {
        this.jogadores = [];
        this.logger = new services_1.Logger(JogadoresService_1.name);
    }
    async criarAtualizarJogador(criaJogadorDto) {
        const { email } = criaJogadorDto;
        const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);
        if (jogadorEncontrado) {
            this.atualizar(jogadorEncontrado, criaJogadorDto);
        }
        else {
            this.criar(criaJogadorDto);
        }
    }
    async consultarTodosJogadores() {
        return this.jogadores;
    }
    async consultadorJogadorPeloEmail(email) {
        const jogadorEncontrado = await this.jogadores.find((jogador) => jogador.email === email);
        if (!jogadorEncontrado) {
            throw new common_1.NotFoundException(`Jogador com e-mail ${email} não encontrado`);
        }
        return jogadorEncontrado;
    }
    async deletarJogador(email) {
        const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);
        this.jogadores = this.jogadores.filter((jogador) => jogador.email !== jogadorEncontrado.email);
    }
    criar(criarJogadorDto) {
        const { nome, telefoneCelular, email } = criarJogadorDto;
        const jogador = {
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
    atualizar(jogadorEncontrado, criarJogadorDto) {
        const { nome } = criarJogadorDto;
        jogadorEncontrado.nome = nome;
    }
};
exports.JogadoresService = JogadoresService;
exports.JogadoresService = JogadoresService = JogadoresService_1 = __decorate([
    (0, injectable_decorator_1.Injectable)()
], JogadoresService);
//# sourceMappingURL=jogadores.service.js.map