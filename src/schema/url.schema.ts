import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

@Schema({ timestamps: true })
export class Url extends Document {
  @Prop({ required: true, unique: true })
  url: string;

  @Prop()
  status: string;

  @Prop({ type: Types.ObjectId, required: true })
  createdBy: Types.ObjectId | User;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
