import * as React from 'react'

import styles from './TextField.module.css'

export interface ITextFieldProps {
  id: string
  label: string
  type: 'text' | 'url'
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const TextField: React.FunctionComponent<ITextFieldProps> = ({
  id,
  label,
  type,
  onChange,
}) => (
  <div className={styles.inputContainer}>
    <label htmlFor={id}>{label}</label>
    <input
      type={type}
      id={id}
      onChange={onChange}
      required
      className={styles.input}
    />
  </div>
)
