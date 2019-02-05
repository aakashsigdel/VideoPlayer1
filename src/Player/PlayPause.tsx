import * as React from 'react'

import { Play, Pause } from '../icons'

export interface IPlayPauseProps {
  togglePlayPause: () => void
  isPlaying: boolean
}

export const PlayPause: React.FunctionComponent<IPlayPauseProps> = ({
  togglePlayPause,
  isPlaying,
}) => <div onClick={togglePlayPause}>{isPlaying ? <Pause /> : <Play />}</div>
