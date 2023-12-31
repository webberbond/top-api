import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageModel, TopLevelCategory } from './top-page.model';
import { addDays } from 'date-fns';
import { Types } from 'mongoose';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private topPageModel: Model<TopPageModel>,
  ) {}
  async create(dto: CreateTopPageDto) {
    return await this.topPageModel.create(dto);
  }

  async findById(id: string) {
    return await this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return await this.topPageModel.find({ alias }).exec();
  }

  async findAll() {
    return await this.topPageModel.find({}).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return await this.topPageModel
      .aggregate()
      .match({
        firstCategory,
      })
      .group({
        _id: { secondCategory: '$secondCategory' },
        pages: {
          $push: {
            alias: '$alias',
            title: '$title',
            _id: '$_id',
            category: '$category',
          },
        },
      })
      .exec();
  }

  async findByText(text: string) {
    return await this.topPageModel
      .find({
        $text: { $search: text, $caseSensitive: false },
      })
      .exec();
  }

  async deleteById(id: string) {
    return await this.topPageModel.findByIdAndRemove(id).exec();
  }

  async updateById(id: string | Types.ObjectId, dto: CreateTopPageDto) {
    return await this.topPageModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
  }

  async findForHhUpdate(date: Date) {
    return this.topPageModel
      .find({
        firstCategory: 0,
        $or: [
          { 'hh.updatedAt': { $lt: addDays(date, -1) } },
          { 'hh.updatedAt': { $exists: false } },
        ],
      })
      .exec();
  }
}
