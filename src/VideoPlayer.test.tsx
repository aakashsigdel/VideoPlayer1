import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { VideoPlayer, IVideoPlayerState } from './VideoPlayer'
import { PlaylistItem } from './Playlist/PlaylistItem'
import { Playlist } from './Playlist/Playlist'
import { getVideos, getVideo } from './factory'

describe('<VideoPlayer />', () => {
  let wrapper: ShallowWrapper<{}, IVideoPlayerState>
  let videoPlayer: VideoPlayer

  beforeEach(() => {
    wrapper = shallow(<VideoPlayer />)
    videoPlayer = wrapper.instance() as VideoPlayer
  })

  it('should set shouldAutoPlay when shouldAutoPlay and playedOnce is false', () => {
    videoPlayer.setAutoPlay()
    expect(wrapper.state().shouldAutoPlay).toBeTruthy()
  })

  it('should set playedOnce when shouldAutoPlay and playedOnce is false', () => {
    videoPlayer.setAutoPlay()
    expect(wrapper.state().playedOnce).toBeTruthy()
  })

  it('should not set current video when setCurrentVideo is called with index greater than or equal to length of playlist', () => {
    videoPlayer.setCurrentVideo(5)
    expect(wrapper.state().currentVideo).not.toBe(5)
  })

  it('should set current video when setCurrentVideo is called', () => {
    const sampleVideos = getVideos()
    wrapper.setState({ videos: sampleVideos })
    videoPlayer.setCurrentVideo(2)
    expect(wrapper.state().currentVideo).toBe(2)
  })

  it('should add video to the playlist wieh addVideo is called', () => {
    const video = getVideo()
    videoPlayer.addVideo(video)
    expect(wrapper.state().videos).toContainEqual(video)
  })

  it('should close add to playlist dialog when addVideo is called', () => {
    const video = getVideo()
    videoPlayer.addVideo(video)
    expect(wrapper.state().isOpenAddToPlaylist).toBeFalsy()
  })

  it('should not got to next video if there is no videos on the list', () => {
    wrapper.setState({ videos: [] })
    const current = wrapper.state().currentVideo
    videoPlayer.next()
    expect(wrapper.state().currentVideo).toBe(current)
  })

  it('should go to the first video when next is called on last video', () => {
    const sampleVideos = getVideos()
    wrapper.setState({
      videos: sampleVideos,
      currentVideo: sampleVideos.length - 1,
    })
    videoPlayer.next()
    expect(wrapper.state().currentVideo).toBe(0)
  })

  it('should currentVideo to next video on the list when next is called', () => {
    const sampleVideos = getVideos()
    wrapper.setState({ videos: sampleVideos })
    const current = wrapper.state().currentVideo
    videoPlayer.next()
    expect(wrapper.state().currentVideo).toBe(current + 1)
  })

  it('should not go to prev video if there is no videos on the list', () => {
    wrapper.setState({ videos: [] })
    const current = wrapper.state().currentVideo
    videoPlayer.previous()
    expect(wrapper.state().currentVideo).toBe(current)
  })

  it('should not go to prev video if current video is 0', () => {
    wrapper.setState({ videos: getVideos(), currentVideo: 0 })
    const current = wrapper.state().currentVideo
    videoPlayer.previous()
    expect(wrapper.state().currentVideo).toBe(current)
  })

  it('should go to prev video if current video is not 0', () => {
    wrapper.setState({ videos: getVideos(), currentVideo: 1 })
    const current = wrapper.state().currentVideo
    videoPlayer.previous()
    expect(wrapper.state().currentVideo).toBe(0)
  })

  it('should set isOpenAddToPlaylist to true', () => {
    videoPlayer.openAddToPlaylist()
    expect(wrapper.state().isOpenAddToPlaylist).toBeTruthy()
  })

  it('should set isOpenAddToPlaylist to false', () => {
    videoPlayer.closeAddToPlaylist()
    expect(wrapper.state().isOpenAddToPlaylist).toBeFalsy()
  })
})
