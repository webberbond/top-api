import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserModelDocument = HydratedDocument<UserModel>;

@Schema({ timestamps: true, _id: true })
export class UserModel {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;
}

export const UserModelSchema = SchemaFactory.createForClass(UserModel);
