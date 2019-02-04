import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { create } from 'react-test-renderer'

import { PlaylistItem, IPlaylistItemProps } from './PlaylistItem'
import { getVideo } from '../factory'

describe('<PlaylistItem />', () => {
  let wrapper: ShallowWrapper<IPlaylistItemProps>
  const defaultProps: IPlaylistItemProps = {
    video: getVideo(),
    videoNumber: 0,
    onSelectVideo: jest.fn(),
  }
  beforeEach(() => {
    wrapper = shallow(<PlaylistItem {...defaultProps} />)
  })
  it('should render correctly', () => {
    const tree = create(<PlaylistItem {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should call onSelectvideo onClick', () => {
    wrapper.find('li').simulate('click')
    expect(defaultProps.onSelectVideo).toHaveBeenCalledWith(
      defaultProps.videoNumber
    )
  })
})
