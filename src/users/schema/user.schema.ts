import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  autoIndex: true,
})
export class User {
  @Prop({
    required: true,
    index: {
      unique: true,
      collation: {
        locale: 'pl',
        strength: 2,
        caseLevel: false,
      },
    },
  })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Date, required: true })
  dateOfBirth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('scores', {
  ref: 'Score',
  localField: '_id',
  foreignField: 'user',
});
