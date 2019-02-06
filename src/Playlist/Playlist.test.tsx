import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import { Button } from '../commons/Button'
import { Playlist, IPlaylistProps } from './Playlist'
import { getVideos } from '../factory'

describe('<Playlist />', () => {
  let wrapper: ShallowWrapper<IPlaylistProps>
  const defaultProps: IPlaylistProps = {
    videos: getVideos(),
    onClickAdd: jest.fn(),
    children: (s, k) => <div key={k} />,
  }

  beforeEach(() => {
    wrapper = shallow(<Playlist {...defaultProps} />)
  })

  it('should call onClickAdd when clickin on add to playlist button', () => {
    wrapper.find(Button).simulate('click')
    expect(defaultProps.onClickAdd).toHaveBeenCalledTimes(1)
  })
})
