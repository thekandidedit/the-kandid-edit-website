import * as React from 'react';
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className='', ...props }) =>
  <div className={`card ${className}`} {...props} />;
