import { Entity } from './entity.model';

export interface Category extends Entity {
  id: number;
  name: string;
  icon?: string;
}
