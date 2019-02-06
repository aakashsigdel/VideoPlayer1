import * as React from 'react'
import cn from 'classnames'

import { Play, Pause } from '../icons'
import { IVideo } from '../VideoPlayer'
import styles from './Playlist.module.css'

export interface IPlaylistItemProps {
  video: IVideo
  videoNumber: number
  onSelectVideo: (videoNumber: number) => void
}

export const PlaylistItem: React.FunctionComponent<IPlaylistItemProps> = ({
  video,
  videoNumber,
  onSelectVideo,
}) => (
  <li onClick={() => onSelectVideo(videoNumber)} className={styles.listItem}>
    <span className={styles.number}>{videoNumber}</span>
    <span className={cn(styles.title, styles.ellipsis)}>{video.title}</span>
    <span className={cn(styles.artist, styles.ellipsis)}>{video.artist}</span>
    {false ? (
      <Pause style={{ fill: 'black' }} />
    ) : (
      <Play style={{ fill: 'black' }} />
    )}
  </li>
)
