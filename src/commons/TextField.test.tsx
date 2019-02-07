import * as React from 'react'
import { create } from 'react-test-renderer'

import { TextField, ITextFieldProps } from './TextField'

describe('<TextField />', () => {
  const defaultProps: ITextFieldProps = {
    id: 'test',
    label: 'testLabel',
    type: 'text',
    onChange: jest.fn(),
  }

  it('should render correctly', () => {
    const tree = create(<TextField {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
