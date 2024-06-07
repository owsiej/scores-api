import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schema/user.schema';

export type ScoreDocument = mongoose.HydratedDocument<Score>;

@Schema({
  timestamps: true,
})
export class Score {
  @Prop({ required: true })
  score: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
