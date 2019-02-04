import * as React from 'react'

interface ISong {
  title: string
  artist: string
  videoUrl: string
}

export interface IVideoPlayerState {
  songs: ISong[]
  currentSong: number // index of the song array
}

export class VideoPlayer extends React.Component<{}, IVideoPlayerState> {
  state = {
    songs: [],
    currentSong: 0,
  }

  setCurrentSong = (index: number) => {
    this.setState({
      currentSong: index,
    })
  }

  render() {
    return null
  }
}
