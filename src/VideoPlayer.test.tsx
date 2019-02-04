import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { create } from 'react-test-renderer'

import { VideoPlayer, IVideoPlayerState } from './VideoPlayer'

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

  it('should set current song when setCurrentSong is called', () => {
    videoPlayer.setCurrentSong(5)
    expect(wrapper.state().currentSong).toBe(5)
  })
})
