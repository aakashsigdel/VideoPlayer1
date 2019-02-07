import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import {
  PlayerRoot,
  IPlayerRootProps,
  IPlayerRootState,
  DEFAULT_PLAYER_HEIGHT,
} from './PlayerRoot'

describe('<PlayerRoot />', () => {
  let wrapper: ShallowWrapper<IPlayerRootProps, IPlayerRootState>
  let player: PlayerRoot
  const defaultProps: IPlayerRootProps = {
    videoUrl: 'testUrl',
    posterUrl: 'testUrl',
    next: jest.fn(),
    previous: jest.fn(),
    onPlay: jest.fn(),
    autoPlay: true,
  }

  beforeEach(() => {
    wrapper = shallow(<PlayerRoot {...defaultProps} />)
    player = wrapper.instance() as PlayerRoot
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should set height of the player to DEFAULT_PLAYER_HEIGHT when no height is specified as prop', () => {
    expect(wrapper.find('video').props().height).toBe(DEFAULT_PLAYER_HEIGHT)
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

  it("shouldn't update seek when node.currentTime is 0", () => {
    player.player = { current: { currentTime: 0 } } as any
    player.updateSeek()
    expect(wrapper.state().seek).toBe(0)
  })

  it('should update seek when node.currentTime is greater than 0', () => {
    const currentTime = 5
    const duration = 300
    const expectedSeek = player.calculateSeek(currentTime, duration)
    player.player = { current: { currentTime, duration } } as any
    player.updateSeek()
    expect(wrapper.state().seek).toBe(expectedSeek)
  })

  it('should reset seek when resetSeek is called', () => {
    player.setState({ seek: 80 })
    player.resetSeek()
    expect(wrapper.state().seek).toBe(0)
  })

  it('should reset seek and call next on handleNext', () => {
    player.resetSeek = jest.fn()
    player.handleNext()
    expect(player.resetSeek).toHaveBeenCalledTimes(1)
    expect(defaultProps.next).toHaveBeenCalledTimes(1)
  })

  it('should reset seek and call previous on handleNext', () => {
    player.resetSeek = jest.fn()
    player.handlePrevious()
    expect(player.resetSeek).toHaveBeenCalledTimes(1)
    expect(defaultProps.previous).toHaveBeenCalledTimes(1)
  })
})
