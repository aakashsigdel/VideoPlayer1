import * as React from 'react'

import { IVideo } from '../VideoPlayer'

export interface IPlaylistProps {
  videos: IVideo[]
  children: (video: IVideo, videoNumber: number) => JSX.Element
}

export const Playlist: React.FunctionComponent<IPlaylistProps> = ({
  videos,
  children,
}) => <ul>{videos.map(children)}</ul>
