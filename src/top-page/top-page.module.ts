import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { TopPageModel, TopPageModelSchema } from './top-page.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TopPageModel.name,
        schema: TopPageModelSchema,
        collection: 'TopPage',
      },
    ]),
  ],
  controllers: [TopPageController],
})
export class TopPageModule {}
