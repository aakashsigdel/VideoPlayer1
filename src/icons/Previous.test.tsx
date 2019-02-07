import * as React from 'react'
import { create } from 'react-test-renderer'

import { Previous } from './Previous'

describe('<Previous />', () => {
  it('should render correctly', () => {
    const tree = create(<Previous />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
