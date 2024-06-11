import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateScoreDto } from 'src/scores/dto/create-score.dto';
import { ScoreGuard } from 'src/scores/guards/scores.guard';
import { Score } from 'src/scores/schema/score.schema';
import { UserDocument } from 'src/users/schema/user.schema';
import { ScoresService } from 'src/scores/services/scores.service';

import { JwtAuthGuardScores } from 'src/auth/guards/jwt2-auth.guard';
import { JwtAuthGuardUsers } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import MongooseClassSerializerInterceptor from 'src/common/serializes/mongo-serializer';

@ApiTags('scores')
@ApiExtraModels(Score)
@Controller('scores')
export class ScoresController {
  constructor(private scoreService: ScoresService) {}

  @ApiForbiddenResponse({
    description: 'Appears when provided score is lower then 10.',
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Invalid body/token.' })
  @UseGuards(ScoreGuard, JwtAuthGuardScores)
  @UseInterceptors(MongooseClassSerializerInterceptor(Score))
  @Post()
  async addScore(
    @Req() req: Request,
    @Body() createScoreDto: CreateScoreDto,
  ): Promise<Score> {
    const score = await this.scoreService.createScore(
      createScoreDto,
      req.user as UserDocument,
    );
    return score;
  }

  @ApiUnauthorizedResponse({ description: 'Invalid token/username.' })
  @ApiBearerAuth()
  @ApiParam({ name: 'username', required: true })
  @UseInterceptors(MongooseClassSerializerInterceptor(Score))
  @UseGuards(JwtAuthGuardUsers)
  @Get(':username')
  async getUserScores(@Req() req: Request): Promise<Score[]> {
    const user = req.user as UserDocument;
    return await this.scoreService.getUserAllScores(user._id.toString());
  }

  @UseInterceptors(MongooseClassSerializerInterceptor(Score))
  @Get()
  async getAllScores(): Promise<Score[]> {
    return await this.scoreService.getAllScores();
  }
}
