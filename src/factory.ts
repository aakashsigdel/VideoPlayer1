const urls = [
  'http://mazwai.com/system/posts/videos/000/000/208/preview_mp4_2/white-lilies.mp4',
  'http://mirrors.standaloneinstaller.com/video-sample/dolbycanyon.m4v',
  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
]

export const getVideo = (suffix: number = 0) => ({
  title: `testVideo${suffix}`,
  artist: `testArtist${suffix}`,
  videoUrl: urls[suffix],
})

export const getVideos = () => {
  return [0, 1, 2].map(getVideo)
}
