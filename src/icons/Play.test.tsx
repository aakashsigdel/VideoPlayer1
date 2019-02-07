import * as React from 'react'
import { create } from 'react-test-renderer'

import { Play } from './Play'

describe('<Play />', () => {
  it('should render correctly', () => {
    const tree = create(<Play />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
