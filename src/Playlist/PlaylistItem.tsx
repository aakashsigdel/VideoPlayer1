import * as React from 'react'
import { ISong } from '../VideoPlayer'

export interface IPlaylistItemProps {
  song: ISong
  songNumber: number
  onSelectSong: (songNumber: number) => void
}

export const PlaylistItem: React.FunctionComponent<IPlaylistItemProps> = ({
  song,
  songNumber,
  onSelectSong,
}) => <li onClick={() => onSelectSong(songNumber)}>{song.title}</li>
