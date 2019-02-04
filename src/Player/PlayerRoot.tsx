import * as React from 'react'

export const DEFAULT_PLAYER_HEIGHT = 500
export const DEFAULT_PLAYER_WIDTH = 620

export interface IPlayerRootProps {
  width?: number
  height?: number
  videoUrl: string
  posterUrl?: string
  next?: () => void
}

export const PlayerRoot: React.FunctionComponent<IPlayerRootProps> = ({
  videoUrl,
  posterUrl,
  height = DEFAULT_PLAYER_HEIGHT,
  width = DEFAULT_PLAYER_WIDTH,
  next,
}) => (
  <video
    controls
    height={height}
    width={width}
    src={videoUrl}
    poster={posterUrl}
    onEnded={next}
  >
    Sorry your browser doesn't support HTML5 videos!
  </video>
)
