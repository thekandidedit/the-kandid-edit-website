import * as React from 'react';
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' };
export const Button: React.FC<Props> = ({ variant='primary', className='', ...props }) => {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-outline';
  return <button className={`${base} ${className}`} {...props} />;
};
