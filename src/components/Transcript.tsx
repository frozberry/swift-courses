import { Box, Container, Typography } from "@mui/material"
import SkeletonParagraph from "./SkeletonParagraph"

const Transcript = ({ seekTo, timestamp, transcript }: any) => {
  return (
    <Container maxWidth="md">
      <Typography variant="h6">Transcript</Typography>

      {transcript ? (
        <Box sx={{ my: 2 }}>
          {transcript.map((paragraph: any) => (
            <Box key={paragraph.start} sx={{ my: 2 }}>
              {paragraph.sentences.map((sentence: any) => (
                <>
                  <Typography
                    key={sentence.start}
                    display="inline"
                    onClick={() => seekTo(sentence.start)}
                    sx={{
                      cursor: "pointer",
                      backgroundColor:
                        sentence.start / 1000 < timestamp &&
                        sentence.end / 1000 > timestamp
                          ? "primary.light"
                          : null,
                      "&:hover": {
                        backgroundColor: "secondary.light",
                      },
                    }}
                  >
                    {sentence.text}
                  </Typography>
                  {/* Prevents styling being applied to space between sentences*/}
                  <Typography display="inline"> </Typography>
                </>
              ))}
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ my: 2 }}>
          <SkeletonParagraph />
          <SkeletonParagraph />
          <SkeletonParagraph />
          <SkeletonParagraph />
          <SkeletonParagraph />
          <SkeletonParagraph />
        </Box>
      )}
    </Container>
  )
}

export default Transcript
