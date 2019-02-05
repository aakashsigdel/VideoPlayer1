import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { create } from 'react-test-renderer'

import {
  PlayerRoot,
  IPlayerRootProps,
  IPlayerRootState,
  DEFAULT_PLAYER_HEIGHT,
  DEFAULT_PLAYER_WIDTH,
} from './PlayerRoot'

describe('<PlayerRoot />', () => {
  let wrapper: ShallowWrapper<IPlayerRootProps, IPlayerRootState>
  let player: PlayerRoot
  const defaultProps: IPlayerRootProps = {
    videoUrl: 'testUrl',
    posterUrl: 'testUrl',
    next: jest.fn(),
    previous: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<PlayerRoot {...defaultProps} />)
    player = wrapper.instance() as PlayerRoot
  })

  it('should render correctly', () => {
    const tree = create(<PlayerRoot {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should set height of the player to DEFAULT_PLAYER_HEIGHT when no height is specified as prop', () => {
    expect(wrapper.find('video').props().height).toBe(DEFAULT_PLAYER_HEIGHT)
  })

  it('should set width of the player to DEFAULT_PLAYER_WIDTH when no width is specified as prop', () => {
    expect(wrapper.find('video').props().width).toBe(DEFAULT_PLAYER_WIDTH)
  })

  it('should toggle play and pause when togglePlayPause is called', () => {
    player.player = { current: { play: jest.fn(), pause: jest.fn() } as any }
    let isPlaying = wrapper.state().isPlaying
    player.togglePlayPause()
    expect(isPlaying).not.toBe(wrapper.state().isPlaying)
    isPlaying = wrapper.state().isPlaying
    player.togglePlayPause()
    expect(isPlaying).not.toBe(wrapper.state().isPlaying)
  })

  it('should toggle play and pause state of video when playPauseVideo is called', () => {
    player.player = { current: { play: jest.fn(), pause: jest.fn() } as any }
    player.togglePlayPause()
    expect(player.player.current!.play).toHaveBeenCalledTimes(1)
    player.togglePlayPause()
    expect(player.player.current!.pause).toHaveBeenCalledTimes(1)
  })
})
