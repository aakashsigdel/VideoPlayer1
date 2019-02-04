import * as React from 'react'

import { PlayerRoot } from './Player/PlayerRoot'
import { Playlist } from './Playlist/Playlist'
import { PlaylistItem } from './Playlist/PlaylistItem'
import { AddToPlaylist } from './Playlist/AddToPlaylist'
import { getVideos } from './factory'

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
}

export class VideoPlayer extends React.Component<{}, IVideoPlayerState> {
  state = {
    videos: getVideos(), // TODO: change this
    currentVideo: 0,
    isOpenAddToPlaylist: false,
    shouldAutoPlay: false,
  }

  addVideo = (video: IVideo): void => {
    this.setState({
      videos: [...this.state.videos, video],
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
    const { shouldAutoPlay } = this.state
    if (!shouldAutoPlay) {
      this.setState({
        shouldAutoPlay: true,
      })
    }
  }

  next = (): void => {
    const { currentVideo, videos } = this.state
    this.setAutoPlay()
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
      <main>
        <PlayerRoot
          videoUrl={videos[currentVideo].videoUrl}
          next={this.next}
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
