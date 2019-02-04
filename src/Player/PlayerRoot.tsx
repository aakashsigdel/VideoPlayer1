import * as React from 'react'

const DEFAULT_PLAYER_HEIGHT = 500
const DEFAULT_PLAYER_WIDTH = 620

export interface IPlayerRootProps {
  width?: number
  height?: number
  videoUrl: string
  posterUrl: string
}

export const PlayerRoot: React.FunctionComponent<IPlayerRootProps> = ({
  videoUrl,
  posterUrl,
  height = DEFAULT_PLAYER_HEIGHT,
  width = DEFAULT_PLAYER_WIDTH,
}) => (
  <video height={height} width={width} src={videoUrl} poster={posterUrl}>
    Sorry your browser doesn't support HTML5 videos!
  </video>
)
