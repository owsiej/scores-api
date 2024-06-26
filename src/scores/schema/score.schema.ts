import * as mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schema/user.schema';
import { Exclude, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export type ScoreDocument = mongoose.HydratedDocument<Score>;

@Schema({
  timestamps: true,
})
export class Score {
  @Transform((params) => params.obj._id.toString())
  @Exclude()
  _id: mongoose.ObjectId;

  @Exclude()
  __v: number;

  @ApiProperty()
  @Prop({ required: true })
  score: number;

  @Exclude()
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  @Type(() => User)
  user: User;

  @ApiProperty({
    type: String,
  })
  @Prop()
  username: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
