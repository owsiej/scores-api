import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date } from 'mongoose';

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ type: Date, required: true })
  dateOfBirth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
