import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { Next, Previous } from '../icons'
import { NextPrevious, INextPreviousProps } from './NextPrevious'

describe('<NextPrevious />', () => {
  let wrapper: ShallowWrapper<INextPreviousProps>
  const defaultProps: INextPreviousProps = {
    type: 'next',
    onClick: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<NextPrevious {...defaultProps} />)
  })

  it('should display Next Icon if type is next', () => {
    expect(wrapper.find(Next)).toHaveLength(1)
  })

  it('should display Previous Icon if type is prev', () => {
    wrapper.setProps({ type: 'prev' })
    expect(wrapper.find(Previous)).toHaveLength(1)
  })

  it('should call onClick when clicked', () => {
    wrapper.simulate('click')
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })
})
