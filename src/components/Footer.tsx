import { Box, Divider, Link, Typography } from "@mui/material"

const Footer = () => {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Divider sx={{ my: 2, width: 30 }} />
      <Typography sx={{ fontSize: "0.75rem", mb: 1 }}>
        © Swift Badminton {year}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
        <Link
          href="https://drive.google.com/file/d/1H6in-dQjmNZXUen3Y4dyDOHGHYU-yqjb/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography sx={{ fontSize: "0.75rem", mx: 2 }}>
            60 Day Guarantee
          </Typography>
        </Link>
        <Link
          href="https://drive.google.com/file/d/1z-kXdn6yvdz7LVckKhC7dr9pKKgYKiZx/view"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography sx={{ fontSize: "0.75rem", mx: 2 }}>
            Physical Disclaimer
          </Typography>
        </Link>
      </Box>
    </Box>
  )
}

export default Footer
