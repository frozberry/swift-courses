import { Typography, Container, Box } from "@mui/material"
import transcript from "../../courses-data/transcripts/lesson1.json"

const Transcript = ({ seekTo, timestamp }: any) => {
  return (
    <>
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
    </>
  )
}

export default Transcript
