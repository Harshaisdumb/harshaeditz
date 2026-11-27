import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"

/**
 * ThumbnailLightbox for Framer
 * Click-to-expand minimal lightbox specifically crafted for Photoshop thumbnails.
 * 
 * Instructions in Framer:
 * 1. Go to Assets > Code > Create New Component > Name it "ThumbnailLightbox"
 * 2. Paste this code and save.
 * 3. Drag and drop onto your Framer canvas!
 */

interface ThumbnailLightboxProps {
  previewImage: string
  fullImage: string
  title: string
  category: string
  ctr: string
  borderRadius: number
}

export default function ThumbnailLightbox(props: ThumbnailLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { previewImage, fullImage, title, category, ctr, borderRadius } = props

  return (
    <>
      {/* Thumbnail Card Preview */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={() => setIsOpen(true)}
        style={{
          width: "100%",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          userSelect: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: borderRadius,
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#0d0f14",
          }}
        >
          <img
            src={previewImage || fullImage}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* CTR Badge */}
          {ctr && (
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                backgroundColor: "rgba(16, 185, 129, 0.9)",
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 20,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
              }}
            >
              CTR: {ctr}
            </div>
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: 13,
                fontWeight: 600,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                padding: "8px 16px",
                borderRadius: 20,
              }}
            >
              🔍 View Full HD
            </span>
          </motion.div>
        </div>

        {/* Thumbnail Info */}
        <div>
          <h4
            style={{
              margin: 0,
              fontSize: 15,
              fontWeight: 600,
              color: "#f8fafc",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </h4>
          <p
            style={{
              margin: "3px 0 0 0",
              fontSize: 12,
              color: "#94a3b8",
            }}
          >
            {category}
          </p>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              backgroundColor: "rgba(0, 0, 0, 0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            {/* Modal Dialog Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: 1040,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: -46,
                  right: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
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

              {/* Main Full-Res Image */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16 / 9",
                  borderRadius: 14,
                  overflow: "hidden",
                  boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  backgroundColor: "#05070a",
                }}
              >
                <img
                  src={fullImage || previewImage}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
              </div>

              {/* Caption */}
              <div
                style={{
                  marginTop: 16,
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#f8fafc",
                  }}
                >
                  {title} {ctr && `(CTR: ${ctr})`}
                </h3>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    fontSize: 13,
                    color: "#94a3b8",
                  }}
                >
                  {category} • Designed in Adobe Photoshop
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

addPropertyControls(ThumbnailLightbox, {
  previewImage: {
    type: ControlType.Image,
    title: "Preview Image",
    defaultValue: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  },
  fullImage: {
    type: ControlType.Image,
    title: "Full Res Image",
    defaultValue: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
  },
  title: {
    type: ControlType.String,
    title: "Title",
    defaultValue: "Next-Gen Setup Tour",
  },
  category: {
    type: ControlType.String,
    title: "Category",
    defaultValue: "Tech / Gaming",
  },
  ctr: {
    type: ControlType.String,
    title: "CTR Badge",
    defaultValue: "14.2%",
  },
  borderRadius: {
    type: ControlType.Number,
    title: "Border Radius",
    defaultValue: 12,
    min: 0,
    max: 32,
    step: 1,
  },
})
