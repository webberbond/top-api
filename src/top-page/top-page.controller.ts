import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {}

  @Get(':id')
  async findById(@Param('id') id: string) {}

  @Get('/byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {}

  @Delete(':id')
  async delete(@Param('id') id: string) {}

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto) {}

  @Post('find')
  async find(@Body() dto: FindTopPageDto) {}

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {}
}
