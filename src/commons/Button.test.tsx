import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { Button, IButtonProps } from './Button'

describe('<NextPrevious />', () => {
  let wrapper: ShallowWrapper<IButtonProps>
  const defaultProps: IButtonProps = {
    type: 'button',
    onClick: jest.fn(),
    label: 'test',
    variant: 'raised',
    className: 'testClassName',
  }

  beforeEach(() => {
    wrapper = shallow(<Button {...defaultProps} />)
  })

  it('should set className based on variant', () => {
    wrapper.setProps({ variant: 'raised' })
    expect(wrapper.find('button').props().className).toEqual(
      expect.stringMatching(/raised/i)
    )
    wrapper.setProps({ variant: 'flat' })
    expect(wrapper.find('button').props().className).toEqual(
      expect.stringMatching(/flat/i)
    )
  })
})
