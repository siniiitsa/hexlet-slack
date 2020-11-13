/* eslint-disable no-template-curly-in-string */
import * as yup from 'yup';
import i18n from 'i18next';

yup.setLocale({
  string: {
    min: i18n.t('errors.invalid_length'),
    max: i18n.t('errors.invalid_length'),
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
    .matches(/[\p{L}\d]/u, i18n.t('errors.required_chars')),
};

export default (schemaName) => validationSchemas[schemaName];
