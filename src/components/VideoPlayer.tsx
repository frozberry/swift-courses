import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { useState } from "react"
import ReactPlayer from "react-player/youtube"

type Props = {
  url: string
  videoRef: React.Ref<any>
  setTimestamp: (timestamp: number) => void
}

const VideoPlayer = ({ url, videoRef, setTimestamp }: Props) => {
  const [playing, setPlaying] = useState(false)

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          position: "relative",
          pt: "56.25%",
        }}
      >
        <ReactPlayer
          url={url}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
          playing={playing}
          width="100%"
          height="100%"
          pip={true}
          volume={0.5}
          controls={true}
          ref={videoRef}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onProgress={(data) => setTimestamp(data.playedSeconds)}
        />
      </Box>
    </Container>
  )
}

export default VideoPlayer
