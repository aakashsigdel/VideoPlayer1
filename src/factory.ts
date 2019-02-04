export const getSong = (suffix: string = '1') => ({
  title: `testSong${suffix}`,
  artist: `testArtist${suffix}`,
  videoUrl: `testUrl${suffix}`,
})

export const getSongs = () => {
  return ['1', '2', '3'].map(getSong)
}
