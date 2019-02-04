import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow, ShallowWrapper } from 'enzyme'

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

  it('should render correctly', () => {
    const tree = create(<Playlist {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should call onClickAdd when clickin on add to playlist button', () => {
    wrapper.find('button').simulate('click')
    expect(defaultProps.onClickAdd).toHaveBeenCalledTimes(1)
  })
})
