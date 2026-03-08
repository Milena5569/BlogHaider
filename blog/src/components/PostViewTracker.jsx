import { useEffect } from "react"
import { trackEvent } from "../lib/analytics"

export default function PostViewTracker({ slug }) {
  useEffect(() => {
    trackEvent("post_view", slug)
  }, [slug])

  return null
}