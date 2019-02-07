import * as React from 'react'
import { create } from 'react-test-renderer'

import { Pause } from './Pause'

describe('<Pause />', () => {
  it('should render correctly', () => {
    const tree = create(<Pause />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
