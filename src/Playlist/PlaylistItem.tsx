import * as React from 'react'
import { ISong } from '../VideoPlayer'

export interface IPlaylistItemProps {
  song: ISong
}

export const IPlaylistItem: React.FunctionComponent<IPlaylistItemProps> = ({
  song,
}) => <div>{song.title}</div>
