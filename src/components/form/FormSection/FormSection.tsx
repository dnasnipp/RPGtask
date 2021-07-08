import React from 'react';

import './FormSection.scss';

const FormSection: React.FC = ({children}) => {
    return <div className="form-section">{children}</div>
}

export default FormSection;