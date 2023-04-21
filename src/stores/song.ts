import { defineStore } from 'pinia'
import artist from '@/artist.json'
import { ref } from 'vue'

export const useSongStore = defineStore('song', {
  state: () => {
    const isPlaying = ref<Boolean>(false)
    const currentArtist = ref<Object | any>({})
    const currentTrack = ref<Object | any>({})
    const trackTime = ref<Object | any>({})
    const currentVolume = ref<Number>(80)
    const isLyrics = ref<Boolean>(false)
    const lyricsPosition = ref<String>('0:00')
    const audio = ref<HTMLAudioElement | any>({})
    return { isPlaying, audio, currentArtist, lyricsPosition, currentTrack, trackTime, currentVolume, isLyrics }
  },
  actions: {
    loadSong(artist: any, track: any): void {
      this.currentArtist = artist
      this.currentTrack = track
      if (this.audio && (this.audio?.src as HTMLAudioElement)) {
        this.audio.pause()
        this.isPlaying = false
        this.audio.src = ''
      }
      this.audio = new Audio()
      this.audio = track.path

      setTimeout(() => {
        this.isPlaying = true
        this.audio.play()
      }, 200)
    },

    playOrPauseSong(): void {
      if (this.audio.paused) {
        this.isPlaying = true
        this.audio.play()
      } else {
        this.isPlaying = false
        this.audio.pause()
      }
    },

    playOrPauseThisSong(artist: any, track: any): void {
      if (!this.audio || !this.audio.src || this.currentTrack?.id !== track.id) {
        this.loadSong(artist, track)
        return
      }

      this.playOrPauseSong()
    },

    prevSong(currentTrack: any): void {
      let track = artist.tracks[currentTrack.id - 2]
      this.loadSong(artist, track)
    },

    nextSong(currentTrack: any): void {
      if (currentTrack.id === artist.tracks.length) {
        let track = artist.tracks[0]
        this.loadSong(artist, track)
      } else {
        let track = artist.tracks[currentTrack.id]
        this.loadSong(artist, track)
      }
    },

    playFromFirst(): void {
      this.resetState()
      let track = artist.tracks[0]
      this.loadSong(artist, track)
    },

    resetState(): void {
      this.isPlaying = false
      this.audio = null
      this.currentArtist = {}
      this.currentTrack = {}
    }
  },
  persist: true
})
