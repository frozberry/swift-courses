import { Button } from "@mui/material"
import Link from "next/link"

type Props = {
  href: string
  text: string
}

const LinkButton = ({ href, text }: Props) => {
  return (
    <Link href={href} passHref>
      <Button color="primary" variant="contained">
        {text}
      </Button>
    </Link>
  )
}

export default LinkButton
