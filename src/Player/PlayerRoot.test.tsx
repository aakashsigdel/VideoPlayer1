import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { create } from 'react-test-renderer'

import {
  PlayerRoot,
  IPlayerRootProps,
  DEFAULT_PLAYER_HEIGHT,
  DEFAULT_PLAYER_WIDTH,
} from './PlayerRoot'

describe('<PlayerRoot />', () => {
  let wrapper: ShallowWrapper<IPlayerRootProps>
  const defaultProps: IPlayerRootProps = {
    videoUrl: 'testUrl',
    posterUrl: 'testUrl',
  }

  beforeEach(() => {
    wrapper = shallow(<PlayerRoot {...defaultProps} />)
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
})
