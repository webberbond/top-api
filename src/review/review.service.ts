import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel, ReviewModelDocument } from './review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private reviewModel: Model<ReviewModelDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    const resultReview = await this.reviewModel.create(dto);
    return resultReview.save();
  }

  async delete(id: string): Promise<ReviewModel | null> {
    return await this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewModel[]> {
    return await this.reviewModel.find({ productId: productId }).exec();
  }

  async getAllReviews(): Promise<ReviewModel[]> {
    return await this.reviewModel.find({}).exec();
  }

  async deleteAll(productId: string) {
    return await this.reviewModel
      .deleteMany({
        productId: new Types.ObjectId(productId),
      })
      .exec();
  }
}
