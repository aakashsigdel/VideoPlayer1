import * as React from 'react'
import { create } from 'react-test-renderer'

import { Next } from './Next'

describe('<Next />', () => {
  it('should render correctly', () => {
    const tree = create(<Next />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
