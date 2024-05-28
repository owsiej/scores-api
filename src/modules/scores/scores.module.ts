import { Module } from '@nestjs/common';
import { ScoresController } from 'src/controllers/scores/scores.controller';

@Module({
  controllers: [ScoresController],
})
export class ScoresModule {}
