import * as React from 'react'

import { IVideo } from '../VideoPlayer'
import styles from './Playlist.module.css'

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
  <section className={styles.root}>
    <div className={styles.listHead}>
      <span className={styles.number}>#</span>
      <span className={styles.title}>Title</span>
      <span className={styles.artist}>Artist</span>
    </div>
    <ul className={styles.list}>{videos.map(children)}</ul>
    <button onClick={onClickAdd}>Add to playlist</button>
  </section>
)
