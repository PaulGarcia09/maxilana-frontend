import { Branch } from '~/types/Models';
import { Sucursal } from '~/types/Responses';

export default function normalizeBranch(sucursal: Sucursal): Branch {
  return {
    id: sucursal?.id,
    number: sucursal?.numero,
    name: sucursal?.nombre,
    address: sucursal?.direccion,
    phone: sucursal?.telefono,
    CityId: sucursal?.codigociudad || sucursal?.ciudad,
    state: sucursal?.estado,
    imgSketch: sucursal?.img_croquis,
    active: sucursal?.activo,
    mondayToFridaySchedule: sucursal?.HorarioLV,
    saturdaySchedule: sucursal?.HorarioS,
    sundaySchedule: sucursal?.HorarioD,
    constancy: sucursal?.constancia,
    mapId: sucursal?.identifcadorparamapa,
    whatsapp: sucursal?.whatsapp,
    formattedSchedule: sucursal?.HorarioConFormato,
    formattedWhatsApp: sucursal?.whatsappConFormato,
    email: sucursal?.correoelectronicooficial,
    branchEmail: sucursal?.correoelectronico,
    mondayToFridayOpeningTime: sucursal?.HoraAperturaLV,
    mondayToFridayClosingTime: sucursal?.HoraCierreLV,
    saturdayOpeningTime: sucursal?.HoraAperturaS,
    saturdayClosingTime: sucursal?.HoraCierreS,
    sundayOpeningTime: sucursal?.HoraAperturaD,
    sundayClosingTime: sucursal?.HoraCierreD,
    latitud: sucursal?.latitud < sucursal?.longitud ? sucursal?.longitud : sucursal?.latitud,
    longitud: sucursal?.latitud < sucursal?.longitud ? sucursal?.latitud : sucursal?.longitud,
    slug: sucursal?.slug,
  };
}
