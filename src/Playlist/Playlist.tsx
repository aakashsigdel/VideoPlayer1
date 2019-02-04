import * as React from 'react'

import { ISong } from '../VideoPlayer'

export interface IPlaylistProps {
  songs: ISong[]
  children: (song: ISong, songNumber: number) => JSX.Element
}

export const Playlist: React.FunctionComponent<IPlaylistProps> = ({
  songs,
  children,
}) => <ul>{songs.map(children)}</ul>
