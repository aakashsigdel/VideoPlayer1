import * as React from 'react'
import Dialog from 'react-modal'

import { IVideo } from '../VideoPlayer'
import { Button } from '../commons/Button'
import { TextField } from '../commons/TextField'

import styles from './AddToPlaylist.module.css'

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
      <Dialog
        isOpen={true}
        onRequestClose={onClickCancel}
        contentLabel="Example Modal"
        className={styles.dialog}
        overlayClassName={styles.overlay}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <section className={styles.root}>
          <header>
            <h2>Add to Playlist</h2>
          </header>
          <form onSubmit={this.handleOnSubmit} className={styles.form}>
            <div className={styles.formContent}>
              <TextField
                label="Artist"
                type="text"
                id="artist"
                onChange={this.handleOnChage('artist')}
              />
              <TextField
                label="Title"
                type="text"
                id="title"
                onChange={this.handleOnChage('title')}
              />
              <TextField
                label="Video URL"
                type="url"
                id="videoUrl"
                onChange={this.handleOnChage('videoUrl')}
              />
            </div>
            <footer className={styles.footer}>
              <Button
                type="button"
                onClick={onClickCancel}
                label="Cancel"
                variant="raised"
              />
              <Button type="submit" label="Add" variant="raised" />
            </footer>
          </form>
        </section>
      </Dialog>
    )
  }
}
