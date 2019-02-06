import * as React from 'react'

import styles from './ProgressBar.module.css'

export interface IProgressBarProps {
  seek: number
}

export const ProgressBar: React.FunctionComponent<IProgressBarProps> = ({
  seek,
}) => (
  <div className={styles.progressBar}>
    <span className={styles.seek} style={{ width: `${seek}%` }} />
  </div>
)
