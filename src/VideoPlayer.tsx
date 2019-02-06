import * as React from 'react'

import { PlayerRoot } from './Player/PlayerRoot'
import { Playlist } from './Playlist/Playlist'
import { PlaylistItem } from './Playlist/PlaylistItem'
import { AddToPlaylist } from './Playlist/AddToPlaylist'
import { getVideos } from './factory'

import styles from './VideoPlayer.module.css'

export interface IVideo {
  title: string
  artist: string
  videoUrl: string
}

export interface IVideoPlayerState {
  videos: IVideo[]
  currentVideo: number // index of the video array
  isOpenAddToPlaylist: boolean
  shouldAutoPlay: boolean
  playedOnce: boolean
}

export class VideoPlayer extends React.Component<{}, IVideoPlayerState> {
  state = {
    videos: getVideos(), // TODO: change this
    currentVideo: 0,
    isOpenAddToPlaylist: false,
    shouldAutoPlay: false,
    playedOnce: false,
  }

  addVideo = (video: IVideo): void => {
    this.setState({
      videos: [...this.state.videos, video],
      isOpenAddToPlaylist: false,
    })
  }

  setCurrentVideo = (index: number): void => {
    if (index >= this.state.videos.length) {
      return
    }
    this.setState({
      currentVideo: index,
    })
  }

  setAutoPlay = () => {
    const { shouldAutoPlay, playedOnce } = this.state
    if (!shouldAutoPlay && !playedOnce) {
      this.setState({
        shouldAutoPlay: true,
        playedOnce: true,
      })
    }
  }

  previous = (): void => {
    const { currentVideo, videos } = this.state
    if (!videos.length || currentVideo - 1 < 0) {
      return
    }
    this.setCurrentVideo(currentVideo - 1)
  }

  next = (): void => {
    const { currentVideo, videos } = this.state
    if (!videos.length) {
      return
    }
    const nextVideo = (currentVideo + 1) % videos.length
    this.setCurrentVideo(nextVideo)
  }

  openAddToPlaylist = (): void => {
    this.setState({
      isOpenAddToPlaylist: true,
    })
  }

  closeAddToPlaylist = (): void => {
    this.setState({
      isOpenAddToPlaylist: false,
    })
  }

  render() {
    const {
      videos,
      currentVideo,
      shouldAutoPlay,
      isOpenAddToPlaylist,
    } = this.state
    return (
      <main className={styles.root}>
        <section className={styles.container}>
          <PlayerRoot
            videoUrl={videos[currentVideo].videoUrl}
            onPlay={this.setAutoPlay}
            next={this.next}
            previous={this.previous}
            autoPlay={shouldAutoPlay}
          />
          <Playlist videos={videos} onClickAdd={this.openAddToPlaylist}>
            {(video, videoNumber) => (
              <PlaylistItem
                video={video}
                videoNumber={videoNumber}
                onSelectVideo={this.setCurrentVideo}
                key={videoNumber}
              />
            )}
          </Playlist>
        </section>
        {isOpenAddToPlaylist && (
          <AddToPlaylist
            onClickAdd={this.addVideo}
            onClickCancel={this.closeAddToPlaylist}
          />
        )}
      </main>
    )
  }
}
