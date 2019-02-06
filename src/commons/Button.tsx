import * as React from 'react'
import cn from 'classnames'

import styles from './Button.module.css'

interface IButtonProps {
  type: 'button' | 'submit'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  label: string
  variant: 'raised' | 'flat'
  className?: string
}
export const Button: React.FunctionComponent<IButtonProps> = ({
  type,
  onClick,
  label,
  variant,
  className,
}) => {
  const variantClassName =
    variant === 'raised' ? styles.buttonRaised : styles.buttonFlat
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(variantClassName, className)}
    >
      {label}
    </button>
  )
}
