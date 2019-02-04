import * as React from 'react'

import { PlayerRoot } from './Player/PlayerRoot'
import { Playlist } from './Playlist/Playlist'
import { PlaylistItem } from './Playlist/PlaylistItem'
import { getSongs } from './factory'

export interface ISong {
  title: string
  artist: string
  videoUrl: string
}

export interface IVideoPlayerState {
  songs: ISong[]
  currentSong: number // index of the song array
  isOpenAddToPlaylist: boolean
}

export class VideoPlayer extends React.Component<{}, IVideoPlayerState> {
  state = {
    songs: getSongs(), // TODO: change this
    currentSong: 0,
    isOpenAddToPlaylist: false,
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
    const { songs, currentSong } = this.state
    return (
      <main>
        <PlayerRoot videoUrl={songs[currentSong].videoUrl} />
        <Playlist songs={songs}>
          {(song, songNumber) => (
            <PlaylistItem
              song={song}
              songNumber={songNumber}
              onSelectSong={this.setCurrentSong}
              key={songNumber}
            />
          )}
        </Playlist>
      </main>
    )
  }
}
