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

  addSong(song: ISong): void {
    this.setState({
      songs: [...this.state.songs, song],
    })
  }

  setCurrentSong = (index: number): void => {
    if (index >= this.state.songs.length) {
      return
    }
    this.setState({
      currentSong: index,
    })
  }

  next = (): void => {
    const { currentSong, songs } = this.state
    if (!songs.length) {
      return
    }
    const nextSong = (currentSong + 1) % songs.length
    this.setCurrentSong(nextSong)
  }

  render() {
    return null
  }
}
