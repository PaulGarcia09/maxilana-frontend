const typeTemplate = "'${name}' no es un ${type} válido";

const defaultValidateMessages = {
  default: "Error de validación en '${name}'",
  required: 'Campo requerido',
  enum: "El campo '${name}' debe ser de una opción: [${enum}]",
  whitespace: "El campo '${name}' no puede estar vacío",
  date: {
    format: "'${name}' tiene un formato de fecha inválida",
    parse: "'${name}' no puede ser parseada como fecha",
    invalid: "'${name}' es una fecha inválida",
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: "'${name}' debe tener exactamente ${len} caracteres",
    min: "'${name}' debe tener al menos ${min} caracteres",
    max: "'${name}' no puede tener máximo ${max} caracteres",
    range: "'${name}' debe tener entre ${min} y ${max} caracteres",
  },
  number: {
    len: "'${name}' debe ser igual a ${len}",
    min: "'${name}' no puede ser menor a ${min}",
    max: "'${name}' no puede ser mayor a ${max}",
    range: "'${name}' debe estar entre ${min} y ${max}",
  },
  array: {
    len: "'${name}' debe tener solo ${len} elementos",
    min: "'${name}' no puede tener menos de ${min} elementos",
    max: "'${name}' no puede tener más de ${max} elementos",
    range: "'${name}' debe tener entre ${min} y ${max} elementos",
  },
  pattern: {
    mismatch: "'${name}' no coincide con ${pattern}",
  },
};

export default defaultValidateMessages;
