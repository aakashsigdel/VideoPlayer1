export const getSong = (suffix: string = '1') => ({
  title: `testSong${suffix}`,
  artist: `testArtist${suffix}`,
  videoUrl:
    'http://mirrors.standaloneinstaller.com/video-sample/dolbycanyon.m4v',
})

export const getSongs = () => {
  return ['1', '2', '3'].map(getSong)
}
