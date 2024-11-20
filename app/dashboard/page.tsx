'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Play, Share2 } from "lucide-react"
import { Appbar } from '../components/Appbar'
import axios from 'axios'


type Video = {
  id: string
  title: string
  votes: number
  thumbnail: string
}

const REFRESH_INTERVAL_MS = 10 * 1000

export default function Component() {
  const [videoLink, setVideoLink] = useState('')
  const [queue, setQueue] = useState<Video[]>([
    { id: 'dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up', votes: 5, thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg' },
    { id: 'L_jWHffIx5E', title: 'Smash Mouth - All Star', votes: 3, thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/default.jpg' },
    { id: 'fJ9rUzIMcZQ', title: 'Queen - Bohemian Rhapsody', votes: 4, thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/default.jpg' },
  ])
  const [currentVideo, setCurrentVideo] = useState('dQw4w9WgXcQ')
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    setCanShare(!!navigator.share)
  }, [])

  async function refreshStream(){
    const res = await axios.get("/api/streams/me",{
      withCredentials: true
    })
    console.log("logging res",res)

  }
  useEffect(() =>{
    setInterval(() => {
      refreshStream();
    }, 3000);
  },[])



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const videoId = extractVideoId(videoLink)
    if (videoId) {
      const videoInfo = await fetchVideoInfo(videoId)
      setQueue([...queue, videoInfo])
      setVideoLink('')
    }
  }

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  const fetchVideoInfo = async (videoId: string): Promise<Video> => {
    // In a real application, you would fetch this data from the YouTube API
    // For this example, we'll just return a placeholder object
    return {
      id: videoId,
      title: 'New Video Title',
      votes: 0,
      thumbnail: `https://img.youtube.com/vi/${videoId}/default.jpg`
    }
  }

  const handleVote = (id: string, increment: number) => {
    setQueue(queue.map(video => 
      video.id === id ? { ...video, votes: video.votes + increment } : video
    ).sort((a, b) => b.votes - a.votes))
  }

  const playNext = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0].id)
      setQueue(queue.slice(1))
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my Song Voting Queue!',
          text: 'Help me choose the next song to play on my stream!',
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white p-4">
      <Appbar/>
      <div className="container mx-auto max-w-3xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-blue-300 text-center sm:text-left">Dashboard</h1>
          {canShare && (
            <Button onClick={handleShare} className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          )}
        </div>
        
        {/* YouTube Video Input */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="text"
            placeholder="Enter YouTube video link"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
            className="w-full bg-gray-800 border-blue-500 focus:border-blue-400 focus:ring-blue-400 text-white placeholder-gray-400"
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Add to Queue</Button>
        </form>
        
        {/* Video Preview */}
        {videoLink && extractVideoId(videoLink) && (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${extractVideoId(videoLink)}`}
              className="w-full h-full"
              allowFullScreen
              title="Video preview"
            />
          </div>
        )}
        
        {/* Currently Playing Video */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-blue-300">Now Playing</h2>
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${currentVideo}`}
              className="w-full h-full"
              allowFullScreen
              title="Now playing"
            />
          </div>
          <Button onClick={playNext} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Play className="mr-2 h-4 w-4" /> Play Next Song
          </Button>
        </div>
        
        {/* Video Queue */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-blue-300">Upcoming Songs</h2>
          {queue.map((video) => (
            <Card key={video.id} className="bg-gray-800 border-blue-500">
              <CardContent className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 flex-grow">
                  <img
                    src={video.thumbnail}
                    alt={`Thumbnail for ${video.title}`}
                    width={120}
                    height={90}
                    className="rounded"
                  />
                  <div className="text-center sm:text-left">
                    <p className="font-medium text-blue-300">{video.title}</p>
                    <p className="text-sm text-blue-400">Votes: {video.votes}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVote(video.id, 1)}
                    className="flex items-center border-blue-500 text-blue-300 hover:bg-blue-800"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>{video.votes}</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVote(video.id, -1)}
                    className="flex items-center border-blue-500 text-blue-300 hover:bg-blue-800"
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    <span>{Math.max(0, video.votes - 1)}</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}