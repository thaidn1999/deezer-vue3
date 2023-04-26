import { defineStore } from 'pinia'
import artist from '@/artist.json'
import { ref } from 'vue'

export const useSongStore = defineStore('song', () => {
  const isPlaying = ref<Boolean>(false)
  const currentArtist = ref<Object | any>({})
  const currentTrack = ref<Object | any>({})
  const trackTime = ref<Object | any>({})
  const currentVolume = ref<Number>(80)
  const isLyrics = ref<Boolean>(false)
  const lyricsPosition = ref<String>('0:00')
  const audio = ref<HTMLAudioElement>()

  const loadSong = (artist: any, track: any): void => {
    currentArtist.value = artist
    currentTrack.value = track
    if (audio.value && audio.value?.src) {
      audio.value.pause()
      isPlaying.value = false
      audio.value.src = ''
    }
    audio.value = new Audio()
    audio.value = track.path

    setTimeout(() => {
      isPlaying.value = true
      audio.value?.play
    }, 200)
  }

  const playOrPauseSong = (): void => {
    if (audio.value?.paused) {
      isPlaying.value = true
      audio.value.play()
    } else {
      isPlaying.value = false
      audio.value?.pause()
    }
  }

  const playOrPauseThisSong = (artist: any, track: any): void => {
    if (!audio.value || !audio.value.src || currentTrack.value?.id !== track.id) {
      loadSong(artist, track)
      return
    }
    playOrPauseSong()
  }

  const prevSong = (currentTrack: any): void => {
    let track = artist.tracks[currentTrack.id - 2]
    loadSong(artist, track)
  }

  const nextSong = (currentTrack: any): void => {
    if (currentTrack.id === artist.tracks.length) {
      let track = artist.tracks[0]
      loadSong(artist, track)
    } else {
      let track = artist.tracks[currentTrack.id]
      loadSong(artist, track)
    }
  }

  const playFromFirst = (): void => {
    resetState()
    let track = artist.tracks[0]
    loadSong(artist, track)
  }

  const resetState = (): void => {
    isPlaying.value = false
    currentArtist.value = {}
    currentTrack.value = {}
  }

  return {
    isPlaying,
    currentArtist,
    currentTrack,
    trackTime,
    currentVolume,
    lyricsPosition,
    isLyrics,
    audio,
    loadSong,
    prevSong,
    playOrPauseSong,
    playOrPauseThisSong,
    nextSong,
    playFromFirst,
    resetState
  }
})
