import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { ProgressBar, IProgressBarProps } from './ProgressBar'

describe('<ProgressBar />', () => {
  let wrapper: ShallowWrapper<IProgressBarProps>
  const defaultProps: IProgressBarProps = {
    seek: 5,
  }

  beforeEach(() => {
    wrapper = shallow(<ProgressBar {...defaultProps} />)
  })

  it('should set the width as the percentage of seek', () => {
    expect(wrapper.find('span').props().style!.width).toBe('5%')
  })
})
