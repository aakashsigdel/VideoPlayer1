import * as React from 'react'

import { PlayPause } from './PlayPause'
import { NextPrevious } from './NextPrevious'
import { ProgressBar } from './ProgressBar'

import styles from './PlayerRoot.module.css'

export const DEFAULT_PLAYER_HEIGHT = 338

export interface IPlayerRootState {
  isPlaying: boolean
  seek: number
}
export interface IPlayerRootProps {
  height?: number
  videoUrl: string
  posterUrl?: string
  next: () => void
  previous: () => void
  autoPlay: boolean
  onPlay: () => void
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
    this.props.onPlay()
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

  calculateSeek = (currentTime: number, duration: number) => {
    return Math.floor((100 / duration) * currentTime)
  }

  updateSeek = () => {
    const node = this.player.current!
    if (node.currentTime > 0) {
      this.setState({
        seek: this.calculateSeek(node.currentTime, node.duration),
      })
    }
  }

  resetSeek = () => {
    this.setState({
      seek: 0,
    })
  }

  handleNext = () => {
    this.resetSeek()
    this.props.next()
  }

  handlePrevious = () => {
    this.resetSeek()
    this.props.previous()
  }

  render() {
    const {
      videoUrl,
      posterUrl,
      height = DEFAULT_PLAYER_HEIGHT,
      autoPlay,
    } = this.props
    const { isPlaying, seek } = this.state

    return (
      <section className={styles.root}>
        <video
          ref={this.player}
          autoPlay={isPlaying && autoPlay}
          height={height}
          src={videoUrl}
          poster={posterUrl}
          onTimeUpdate={this.updateSeek}
          onEnded={this.handleNext}
          className={styles.video}
        >
          Sorry your browser doesn't support HTML5 videos!
        </video>
        <div className={styles.controls}>
          <div className={styles.stationaryControls}>
            <NextPrevious type="prev" onClick={this.handlePrevious} />
            <PlayPause
              isPlaying={isPlaying}
              togglePlayPause={this.togglePlayPause}
            />
            <NextPrevious type="next" onClick={this.handleNext} />
          </div>
          <ProgressBar seek={seek} />
        </div>
      </section>
    )
  }
}
