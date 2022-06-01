import { City } from '~/types/Models/City';

export interface Branch {
  id: number;
  number: number;
  name: string;
  address: string;
  phone: string;
  CityId?: number;
  City?: Partial<City>;
  state: string;
  imgSketch: string;
  active: 0 | 1;
  mondayToFridaySchedule: string;
  saturdaySchedule: string;
  sundaySchedule: string;
  constancy: string;
  mapId: string;
  whatsapp: string;
  formattedSchedule: string;
  formattedWhatsApp: string;
  email: string;
  branchEmail: string;
  mondayToFridayOpeningTime: string;
  mondayToFridayClosingTime: string;
  saturdayOpeningTime: string;
  saturdayClosingTime: string;
  sundayOpeningTime: string;
  sundayClosingTime: string;
  latitud: number;
  longitud: number;
  slug?: string;
}
