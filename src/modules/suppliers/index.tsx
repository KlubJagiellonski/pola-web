import { getGuid, guid } from 'utils/data/random-number';

export interface ISurveyOption {
  name: string;
  score?: number;
}

export interface ISurveyQuestion {
  categoryId: string;
  order: number;
  title: string;
  options: ISurveyOption[];
}
