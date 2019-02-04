import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { create } from 'react-test-renderer'

import { VideoPlayer, IVideoPlayerState } from './VideoPlayer'
import { getSongs, getSong } from './factory'

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

  it('should not set current song when setCurrentSong is called with index greater than or equal to length of playlist', () => {
    videoPlayer.setCurrentSong(5)
    expect(wrapper.state().currentSong).not.toBe(5)
  })

  it('should set current song when setCurrentSong is called', () => {
    const sampleSongs = getSongs()
    wrapper.setState({ songs: sampleSongs })
    videoPlayer.setCurrentSong(2)
    expect(wrapper.state().currentSong).toBe(2)
  })

  it('should add song to the playlist wieh addSong is called', () => {
    const song = getSong()
    videoPlayer.addSong(song)
    expect(wrapper.state().songs).toContainEqual(song)
  })

  it('should not change the song if there is no songs on the list', () => {
    const current = wrapper.state().currentSong
    videoPlayer.next()
    expect(wrapper.state().currentSong).toBe(0)
  })

  it('should go to the first song when next is called on last song', () => {
    const sampleSongs = getSongs()
    wrapper.setState({
      songs: sampleSongs,
      currentSong: sampleSongs.length - 1,
    })
    videoPlayer.next()
    expect(wrapper.state().currentSong).toBe(0)
  })

  it('should currentSong to next song on the list when next is called', () => {
    const sampleSongs = getSongs()
    wrapper.setState({ songs: sampleSongs })
    const current = wrapper.state().currentSong
    videoPlayer.next()
    expect(wrapper.state().currentSong).toBe(current + 1)
  })
})
