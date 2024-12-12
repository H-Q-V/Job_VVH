import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
@Schema()
export class Comment {
  @Prop()
  userid: string;

  @Prop()
  name: string;

  @Prop()
  comments: string;

  @Prop({ default: Date.now })
  create_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
