import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoresController } from 'src/scores/controllers/scores.controller';
import { Score, ScoreSchema } from 'src/scores/schema/score.schema';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { ScoresService } from 'src/scores/services/scores.service';
import { UserModule } from 'src/users/user.module';
import { AuthenticationModule } from 'src/auth/authentication.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserModule,
    forwardRef(() => AuthenticationModule),
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
  exports: [ScoresService],
})
export class ScoresModule {}
