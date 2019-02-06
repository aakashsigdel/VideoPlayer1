import * as React from 'react'

import styles from './Button.module.css'

interface IButtonProps {
  type: 'button' | 'submit'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  label: string
}
export const Button: React.FunctionComponent<IButtonProps> = ({
  type,
  onClick,
  label,
}) => (
  <button type={type} onClick={onClick} className={styles.button}>
    {label}
  </button>
)
