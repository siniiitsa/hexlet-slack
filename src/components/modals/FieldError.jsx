import React from 'react';
import PropTypes from 'prop-types';

const FieldError = ({ children }) => (
  <div className="invalid-feedback">{children}</div>
);

FieldError.defaultProps = {
  children: '',
};

FieldError.propTypes = {
  children: PropTypes.string,
};

export default FieldError;
