type Props = {
  href: string
  children: React.ReactNode
}

const Page = ({ href, children }: Props) => {
  return (
    <a
      href={href}
      target="blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      {children}
    </a>
  )
}

export default Page
