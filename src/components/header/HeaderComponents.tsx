import { Button } from "@mui/material"
import Link from "next/link"

type LinkProps = {
  link: string
  children: string
  emphasis?: boolean
}

type ButtonProps = {
  onClick?: any
  children: string
  emphasis?: boolean
}

export const HeaderButton = ({ onClick, emphasis, children }: ButtonProps) => {
  return (
    <Button
      variant={emphasis ? "contained" : "text"}
      color="primary"
      onClick={onClick}
      sx={{
        color: emphasis ? "white" : "black",
        textTransform: "none",
        px: 3,
        ml: emphasis ? 3 : 0,
        fontSize: "1rem",
      }}
    >
      {children}
    </Button>
  )
}

export const HeaderLink = ({ link, children, emphasis }: LinkProps) => {
  return (
    <Link href={link} passHref>
      <HeaderButton emphasis={emphasis}>{children}</HeaderButton>
    </Link>
  )
}
