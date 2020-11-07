import * as yup from 'yup';

const validationSchemas = {
  chatMessage: yup
    .string()
    .required()
    .trim(),

  channelName: yup
    .string()
    .required()
    .trim()
    .min(3, 'Too short, must be 3 to 20 characters long')
    .max(20, 'Too long, must be 3 to 20 characters long')
    .matches(/[\p{L}\d]/u, 'Must have letters or numbers'),
};

export default (schemaName) => validationSchemas[schemaName];
