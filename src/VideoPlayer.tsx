import * as React from 'react'

import { PlayerRoot } from './Player/PlayerRoot'
import { Playlist } from './Playlist/Playlist'
import { PlaylistItem } from './Playlist/PlaylistItem'
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

  addVideo(video: IVideo): void {
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

  render() {
    const { videos, currentVideo, shouldAutoPlay } = this.state
    return (
      <main>
        <PlayerRoot
          videoUrl={videos[currentVideo].videoUrl}
          next={this.next}
          autoPlay={shouldAutoPlay}
        />
        <Playlist videos={videos}>
          {(video, videoNumber) => (
            <PlaylistItem
              video={video}
              videoNumber={videoNumber}
              onSelectVideo={this.setCurrentVideo}
              key={videoNumber}
            />
          )}
        </Playlist>
      </main>
    )
  }
}
