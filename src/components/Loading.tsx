import { Box, CircularProgress } from "@mui/material"

const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        mt: 3,
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading
