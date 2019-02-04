import * as React from 'react'

import { IVideo } from '../VideoPlayer'

export interface IAddToPlaylistState extends IVideo {}

export interface IAddToPlaylistProps {
  onClickAdd: (video: IVideo) => void
  onClickCancel: () => void
}

export class AddToPlaylist extends React.Component<
  IAddToPlaylistProps,
  IAddToPlaylistState
> {
  state = {
    artist: '',
    title: '',
    videoUrl: '',
  }

  handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const { onClickAdd } = this.props
    e.preventDefault()
    onClickAdd(this.state)
  }

  handleOnChage = (type: keyof IAddToPlaylistState) => (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({ [type]: e.target.value } as Pick<
      IAddToPlaylistState,
      keyof IAddToPlaylistState
    >) // this is a typescript limitation https://github.com/DefinitelyTyped/DefinitelyTyped/issues/26635
  }

  render() {
    const { onClickAdd, onClickCancel } = this.props
    return (
      <section>
        <header>
          <h2>Add to Playlist</h2>
        </header>
        <form onSubmit={this.handleOnSubmit}>
          <label htmlFor="artist">Artist</label>
          <input
            type="text"
            id="artist"
            onChange={this.handleOnChage('artist')}
            required
          />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            onChange={this.handleOnChage('title')}
            required
          />
          <label htmlFor="videoUrl">Video URL</label>
          <input
            type="url"
            id="videoUrl"
            onChange={this.handleOnChage('videoUrl')}
            required
          />
          <footer>
            <button type="button" onClick={onClickCancel}>
              Cancel
            </button>
            <button type="submit">Add</button>
          </footer>
        </form>
      </section>
    )
  }
}
