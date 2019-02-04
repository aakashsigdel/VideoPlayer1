import * as React from 'react'
import { create } from 'react-test-renderer'
import { shallow, ShallowWrapper } from 'enzyme'

import {
  AddToPlaylist,
  IAddToPlaylistProps,
  IAddToPlaylistState,
} from './AddToPlaylist'
import { getVideo } from '../factory'

describe('<AddToPlaylist />', () => {
  let wrapper: ShallowWrapper<IAddToPlaylistProps, IAddToPlaylistState>
  const defaultProps: IAddToPlaylistProps = {
    onClickAdd: jest.fn(),
    onClickCancel: jest.fn(),
  }

  beforeEach(() => {
    wrapper = shallow(<AddToPlaylist {...defaultProps} />)
  })

  it('should render correctly', () => {
    const tree = create(<AddToPlaylist {...defaultProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should call onClickCancel on clicking cancel button', () => {
    wrapper.find('button[type="button"]').simulate('click')
    expect(defaultProps.onClickCancel).toHaveBeenCalledTimes(1)
  })

  it('should call onClickAdd on form submit', () => {
    const video = getVideo()
    wrapper.setState(video)
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() })
    expect(defaultProps.onClickAdd).toHaveBeenCalledWith(video)
  })

  it('should set title state when typed on title input', () => {
    wrapper.find('#title').simulate('change', { target: { value: 'test' } })
    expect(wrapper.state().title).toBe('test')
  })

  it('should set artist state when typed on artist input', () => {
    wrapper.find('#artist').simulate('change', { target: { value: 'test' } })
    expect(wrapper.state().artist).toBe('test')
  })

  it('should set videoUrl state when typed on videoUrl input', () => {
    wrapper.find('#videoUrl').simulate('change', { target: { value: 'test' } })
    expect(wrapper.state().videoUrl).toBe('test')
  })
})
