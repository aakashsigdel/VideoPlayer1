import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { Play, Pause } from '../icons'
import { PlayPause, IPlayPauseProps } from './PlayPause'

describe('<PlayPause />', () => {
  let wrapper: ShallowWrapper<IPlayPauseProps>
  const defaultProps: IPlayPauseProps = {
    togglePlayPause: jest.fn(),
    isPlaying: true,
  }

  beforeEach(() => {
    wrapper = shallow(<PlayPause {...defaultProps} />)
  })

  it('should display Pause Icon if isPlaying', () => {
    expect(wrapper.find(Pause)).toHaveLength(1)
  })

  it('should display Paly Icon if not isPlaying', () => {
    wrapper.setProps({ isPlaying: false })
    expect(wrapper.find(Play)).toHaveLength(1)
  })

  it('should call togglePlayPause when clicked', () => {
    wrapper.simulate('click')
    expect(defaultProps.togglePlayPause).toHaveBeenCalledTimes(1)
  })
})
