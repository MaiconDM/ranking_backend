import { Controller } from '@nestjs/common';
import {
  Delete,
  Get,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  Body,
  Query,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { Jogador } from './Interfaces/jogador.interface';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }

  @Get()
  async consultarJogadores(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadoresService.consultadorJogadorPeloEmail(email);
    } else {
      return await this.jogadoresService.consultarTodosJogadores();
    }
  }

  @Delete()
  async deletarJogar(@Query('email') email: string): Promise<void> {
    this.jogadoresService.deletarJogador(email);
  }
}
