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
import { JwtAuthGuardUsers } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import MongooseClassSerializerInterceptor from 'src/common/serializes/mongo-serializer';
import {
  CreateErrorResponseDto,
  JwtCreateErrorResponseDto,
} from 'src/common/dto/create-response-error.dto';

@ApiTags('scores')
@ApiExtraModels(Score)
@Controller('scores')
export class ScoresController {
  constructor(private scoreService: ScoresService) {}

  @ApiBadRequestResponse({
    description: 'Invalid body properties',
    type: CreateErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'Appears when provided score is lower then 10.',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid body/token.',
    type: JwtCreateErrorResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(ScoreGuard, JwtAuthGuardUsers)
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

  @ApiUnauthorizedResponse({
    description: 'Invalid token/username.',
    type: JwtCreateErrorResponseDto,
  })
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
