import ReactPlayer from "react-player/youtube"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

type Props = {
  url: string
}

const VideoPlayer = ({ url }: Props) => {
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
          width="100%"
          height="100%"
          pip={true}
          volume={0.5}
          controls={true}
        />
      </Box>
    </Container>
  )
}

export default VideoPlayer
