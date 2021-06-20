import React, { useEffect } from "react"
import Container from "./Container"

function Page({ title, wide, children }) {
  useEffect(() => {
    document.title = `${title} | Complex App`
    window.scrollTo(0, 0)
  }, [title])

  return <Container wide={wide}>{children}</Container>
}

export default Page
