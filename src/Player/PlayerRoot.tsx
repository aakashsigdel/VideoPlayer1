import * as React from 'react'

import { PlayPause } from './PlayPause'
import { NextPrevious } from './NextPrevious'
import { ProgressBar } from './ProgressBar'

import styles from './PlayerRoot.module.css'

export const DEFAULT_PLAYER_HEIGHT = 338
export const DEFAULT_PLAYER_WIDTH = 600

export interface IPlayerRootState {
  isPlaying: boolean
  seek: number
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
    seek: 0,
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

  updateSeek = () => {
    const node = this.player.current!
    if (node.currentTime > 0) {
      this.setState({
        seek: Math.floor((100 / node.duration) * node.currentTime),
      })
    }
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
    const { isPlaying, seek } = this.state

    return (
      <section className={styles.root}>
        <video
          ref={this.player}
          autoPlay={autoPlay}
          height={height}
          src={videoUrl}
          poster={posterUrl}
          onTimeUpdate={this.updateSeek}
          onEnded={next}
          className={styles.video}
        >
          Sorry your browser doesn't support HTML5 videos!
        </video>
        <div className={styles.controls}>
          <div className={styles.stationaryControls}>
            <NextPrevious type="prev" onClick={previous} />
            <PlayPause
              isPlaying={isPlaying}
              togglePlayPause={this.togglePlayPause}
            />
            <NextPrevious type="next" onClick={next} />
          </div>
          <ProgressBar seek={seek} />
        </div>
      </section>
    )
  }
}
