import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { create } from 'react-test-renderer'

import { VideoPlayer, IVideoPlayerState } from './VideoPlayer'
import { getVideos, getVideo } from './factory'

describe('<VideoPlayer />', () => {
  let wrapper: ShallowWrapper<{}, IVideoPlayerState>
  let videoPlayer: VideoPlayer

  beforeEach(() => {
    wrapper = shallow(<VideoPlayer />)
    videoPlayer = wrapper.instance() as VideoPlayer
  })

  it('should render correctly', () => {
    const tree = create(<VideoPlayer />).toJSON()
    expect(tree).toMatchSnapshot()
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
})
