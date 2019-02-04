import * as React from 'react'

import { ISong } from '../VideoPlayer'

export interface IPlaylistProps {
  songs: ISong[]
  children: (song: ISong) => JSX.Element
}

export const Playlist: React.FunctionComponent<IPlaylistProps> = ({
  songs,
  children,
}) => <React.Fragment>songs.map(children)</React.Fragment>
