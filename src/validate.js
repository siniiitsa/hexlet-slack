/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';

yup.setLocale({
  string: {
    min: 'Too short, must be 3 to 20 characters long',
    max: 'Too short, must be 3 to 20 characters long',
  },
});

const validationSchemas = {
  chatMessage: yup
    .string()
    .required()
    .trim(),

  channelName: yup
    .string()
    .required()
    .trim()
    .min(3)
    .max(20)
    .matches(/[\p{L}\d]/u, 'Must have letters or numbers'),
};

export default (schemaName) => validationSchemas[schemaName];
