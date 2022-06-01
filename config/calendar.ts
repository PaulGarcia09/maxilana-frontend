const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const WEEKDAYS_LONG = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const WEEKDAYS_SHORT = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];

const LOCALE = {
  lang: {
    locale: 'es-MX',
    placeholder: 'Selecciona la fecha',
    rangePlaceholder: ['Fecha inicio', 'Fecha fin'],
    today: 'Hoy',
    now: 'Ahora',
    backToToday: 'Vuelta a hoy',
    ok: 'Ok',
    clear: 'Limpiar',
    month: 'Mes',
    year: 'Año',
    timeSelect: 'Seleccionar tiempo',
    dateSelect: 'Seleccionar fecha',
    monthSelect: 'Elegir un mes',
    yearSelect: 'Elegir un año',
    decadeSelect: 'Elegir una década',
    yearFormat: 'YYYY',
    dateFormat: 'DD/MM/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Mes previo (PageUp)',
    nextMonth: 'Mes siguiente (PageDown)',
    previousYear: 'Año anterior (Control + left)',
    nextYear: 'Año siguiente (Control + right)',
    previousDecade: 'Década pasada',
    nextDecade: 'Década siguiente',
    previousCentury: 'Siglo pasado',
    nextCentury: 'Siglo siguiente',
  },
  timePickerLocale: {
    placeholder: 'Seleccionar hora',
  },
  dateFormat: 'YYYY-MM-DD',
  dateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
  weekFormat: 'YYYY-wo',
  monthFormat: 'YYYY-MM',
};

export { LOCALE };
