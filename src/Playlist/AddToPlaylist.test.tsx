import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'

import {
  AddToPlaylist,
  IAddToPlaylistProps,
  IAddToPlaylistState,
} from './AddToPlaylist'
import { Button } from '../commons/Button'
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

  it('should call onClickCancel on clicking cancel button', () => {
    wrapper
      .find(Button)
      .first()
      .simulate('click')
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
