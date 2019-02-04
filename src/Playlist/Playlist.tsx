import * as React from 'react'

import { IVideo } from '../VideoPlayer'

export interface IPlaylistProps {
  videos: IVideo[]
  children: (video: IVideo, videoNumber: number) => JSX.Element
  onClickAdd: () => void
}

export const Playlist: React.FunctionComponent<IPlaylistProps> = ({
  videos,
  children,
  onClickAdd,
}) => (
  <section>
    <ul>{videos.map(children)}</ul>
    <button onClick={onClickAdd}>Add to playlist</button>
  </section>
)
