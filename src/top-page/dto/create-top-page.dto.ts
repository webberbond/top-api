import { TopLevelCategory } from '../top-page.model';

export class HhDataDto {
  count: number;
  juniorSalary: number;
  middleSalary: number;
  seniorSalary: number;
}

export class TopPageAdvantageDto {
  title: string;
  description: string;
}

export class CreateTopPageDto {
  firstCategory: TopLevelCategory;
  secondCategory: string;
  alias: string;
  title: string;
  category: string;
  hh?: HhDataDto;
  advantages: TopPageAdvantageDto[];
  seoText: string;
  tagsTitle: string;
  tagList: string[];
}
