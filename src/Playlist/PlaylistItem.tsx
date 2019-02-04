import * as React from 'react'
import { IVideo } from '../VideoPlayer'

export interface IPlaylistItemProps {
  video: IVideo
  videoNumber: number
  onSelectVideo: (videoNumber: number) => void
}

export const PlaylistItem: React.FunctionComponent<IPlaylistItemProps> = ({
  video,
  videoNumber,
  onSelectVideo,
}) => <li onClick={() => onSelectVideo(videoNumber)}>{video.title}</li>
