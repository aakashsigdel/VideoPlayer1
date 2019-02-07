import * as React from 'react'

import { Next, Previous } from '../icons'

export interface INextPreviousProps {
  type: 'next' | 'prev'
  onClick: () => void
}
export const NextPrevious: React.FunctionComponent<INextPreviousProps> = ({
  type,
  onClick,
}) => <div onClick={onClick}>{type === 'next' ? <Next /> : <Previous />}</div>
