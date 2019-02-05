import * as React from 'react'

import { PlayPause } from './PlayPause'
import { NextPrevious } from './NextPrevious'

export const DEFAULT_PLAYER_HEIGHT = 500
export const DEFAULT_PLAYER_WIDTH = 620

export interface IPlayerRootState {
  isPlaying: boolean
}
export interface IPlayerRootProps {
  width?: number
  height?: number
  videoUrl: string
  posterUrl?: string
  next: () => void
  previous: () => void
  autoPlay?: boolean
}

export class PlayerRoot extends React.Component<
  IPlayerRootProps,
  IPlayerRootState
> {
  player: React.RefObject<HTMLVideoElement> = React.createRef()

  state = {
    isPlaying: false,
  }

  playPauseVideo = (): void => {
    const { isPlaying } = this.state
    // using typescript type narrowing with ! because we know current will already be defined here
    const node = this.player.current!
    isPlaying ? node.play() : node.pause()
  }

  togglePlayPause = () => {
    this.setState(
      {
        isPlaying: !this.state.isPlaying,
      },
      this.playPauseVideo
    )
  }

  render() {
    const {
      videoUrl,
      posterUrl,
      height = DEFAULT_PLAYER_HEIGHT,
      width = DEFAULT_PLAYER_WIDTH,
      next,
      previous,
      autoPlay,
    } = this.props
    const { isPlaying } = this.state

    return (
      <section>
        <video
          ref={this.player}
          autoPlay={autoPlay}
          height={height}
          width={width}
          src={videoUrl}
          poster={posterUrl}
          onEnded={next}
        >
          Sorry your browser doesn't support HTML5 videos!
        </video>
        <div>
          <PlayPause
            isPlaying={isPlaying}
            togglePlayPause={this.togglePlayPause}
          />
          <NextPrevious type="next" onClick={next} />
          <NextPrevious type="prev" onClick={previous} />
        </div>
      </section>
    )
  }
}
