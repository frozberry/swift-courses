import { Box, Skeleton, Typography } from "@mui/material"

const Page = () => {
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="body1">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Typography>
    </Box>
  )
}

export default Page
