import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) => {
  const classes = [
    styles.btnBase,
    styles[variant],
    styles[size],
    className
  ].join(' ');
  
  return (
    <button className={classes} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
