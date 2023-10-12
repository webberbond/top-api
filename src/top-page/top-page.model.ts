import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopPageModelDocument = HydratedDocument<TopPageModel>;

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

@Schema()
export class HhData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;

  @Prop()
  updatedAt: Date;
}
export const HhDataSchema = SchemaFactory.createForClass(HhData);

@Schema()
export class TopPageAdvantege {
  @Prop()
  title: string;

  @Prop()
  description: string;
}
export const TopPageAdvantegeSchema =
  SchemaFactory.createForClass(TopPageAdvantege);

@Schema({ timestamps: true })
export class TopPageModel {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({ type: HhDataSchema })
  hh?: HhData;

  @Prop({ type: [TopPageAdvantegeSchema] })
  advantages: TopPageAdvantege[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop([String])
  tags: string[];

  @Prop({ type: Date })
  updatedAt: Date;
}

const TopPageModelSchema = SchemaFactory.createForClass(TopPageModel);
TopPageModelSchema.index({ '$**': 'text' });

export { TopPageModelSchema };
