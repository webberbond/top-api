import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModel, ProductModelSchema } from './product.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductModel.name,
        schema: ProductModelSchema,
        collection: 'Products',
      },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
