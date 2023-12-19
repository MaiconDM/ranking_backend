import { Jogador } from './Interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
export declare class JogadoresService {
    private jogadores;
    private readonly logger;
    criarAtualizarJogador(criaJogadorDto: CriarJogadorDto): Promise<void>;
    consultarTodosJogadores(): Promise<Jogador[]>;
    consultadorJogadorPeloEmail(email: string): Promise<Jogador>;
    deletarJogador(email: string): Promise<void>;
    private criar;
    private atualizar;
}
