import * as React from 'react'
import { create } from 'react-test-renderer'

import { Playlist } from './Playlist'
import { getVideos } from '../factory'

describe('<Playlist />', () => {
  it('should render correctly', () => {
    const tree = create(
      <Playlist videos={getVideos()}>{(s, k) => <div key={k} />}</Playlist>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
