import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

/**
 * VideoModalCard for Framer
 * Video project card with click-to-play modal player.
 * 
 * Instructions in Framer:
 * 1. Go to Assets > Code > Create New Component > Name it "VideoModalCard"
 * 2. Paste this code and save.
 * 3. Drag and drop onto your Framer canvas!
 */

interface VideoModalCardProps {
  title: string
  client: string
  duration: string
  tags: string
  posterImage: string
  youtubeId: string
  borderRadius: number
}

export default function VideoModalCard(props: VideoModalCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { title, client, duration, tags, posterImage, youtubeId, borderRadius } = props

  // Generate YouTube Embed URL with autoplay
  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={() => setIsPlaying(true)}
        style={{
          width: "100%",
          cursor: "pointer",
          borderRadius: borderRadius,
          overflow: "hidden",
          backgroundColor: "rgba(18, 21, 30, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          display: "flex",
          flexDirection: "column",
          userSelect: "none",
        }}
      >
        {/* Video Thumbnail Frame */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            backgroundColor: "#000",
          }}
        >
          <img
            src={posterImage}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* Duration Badge */}
          {duration && (
            <span
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "#ffffff",
                fontSize: 11,
                fontWeight: 600,
                padding: "3px 8px",
                borderRadius: 6,
              }}
            >
              {duration}
            </span>
          )}

          {/* Play Button Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                color: "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Card Metadata */}
        <div style={{ padding: "20px 22px" }}>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 8,
              flexWrap: "wrap",
            }}
          >
            {tags &&
              tags.split(",").map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: 20,
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    color: "#94a3b8",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {tag.trim()}
                </span>
              ))}
          </div>

          <h3
            style={{
              margin: "0 0 6px 0",
              fontSize: 16,
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.35,
            }}
          >
            {title}
          </h3>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 14,
              paddingTop: 12,
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              fontSize: 12,
            }}
          >
            <span style={{ color: "#64748b" }}>{client}</span>
            <span style={{ color: "#818cf8", fontWeight: 600 }}>Watch Edit →</span>
          </div>
        </div>
      </motion.div>

      {/* Video Modal Player */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsPlaying(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: 960,
                width: "100%",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                backgroundColor: "#000",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsPlaying(false)}
                aria-label="Close video"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  zIndex: 20,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                ✕
              </button>

              {/* 16:9 Iframe Container */}
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  width: "100%",
                }}
              >
                <iframe
                  src={embedUrl}
                  title={title}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

addPropertyControls(VideoModalCard, {
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "The Evolution of Silicon: Future of Computing",
  },
  client: {
    type: ControlType.String,
    title: "Client",
    defaultValue: "TechVision Media",
  },
  duration: {
    type: ControlType.String,
    title: "Duration",
    defaultValue: "14:22",
  },
  tags: {
    type: ControlType.String,
    title: "Tags (csv)",
    defaultValue: "YouTube Longform, Documentary",
  },
  posterImage: {
    type: ControlType.Image,
    title: "Poster Cover",
    defaultValue: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  youtubeId: {
    type: ControlType.String,
    title: "YouTube Video ID",
    defaultValue: "ScMzIvxBSi4",
  },
  borderRadius: {
    type: ControlType.Number,
    title: "Border Radius",
    defaultValue: 14,
    min: 0,
    max: 32,
    step: 1,
  },
})
