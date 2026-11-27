import React, { useState, useRef, useCallback } from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * BeforeAfterSlider for Framer
 * Interactive comparison slider showing Raw Unedited Frame vs Final Photoshop Thumbnail.
 * 
 * Instructions in Framer:
 * 1. Go to Assets > Code > Create New Component > Name it "BeforeAfterSlider"
 * 2. Paste this code and save.
 * 3. Drag and drop onto your Framer canvas!
 */

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel: string
  afterLabel: string
  borderRadius: number
}

export default function BeforeAfterSlider(props: BeforeAfterSliderProps) {
  const { beforeImage, afterImage, beforeLabel, afterLabel, borderRadius } = props
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percent)
  }, [])

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX)
  }

  const handleMouseDown = () => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX)
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: borderRadius,
        overflow: "hidden",
        userSelect: "none",
        cursor: "ew-resize",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backgroundColor: "#0d0f14",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* "After" Image (Final Photoshop Thumbnail) - Full Width Background */}
      <img
        src={afterImage}
        alt={afterLabel}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 12,
          right: 12,
          backgroundColor: "rgba(99, 102, 241, 0.85)",
          color: "#fff",
          fontSize: 11,
          fontWeight: 700,
          padding: "4px 10px",
          borderRadius: 20,
          letterSpacing: "0.05em",
        }}
      >
        {afterLabel}
      </div>

      {/* "Before" Image (Raw Video Frame) - Clipped by Slider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${sliderPosition}%`,
          height: "100%",
          overflow: "hidden",
          borderRight: "2px solid #ffffff",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.5)",
          pointerEvents: "none",
        }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: containerRef.current ? containerRef.current.clientWidth : "100%",
            height: "100%",
            maxWidth: "none",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: 12,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 20,
            letterSpacing: "0.05em",
          }}
        >
          {beforeLabel}
        </div>
      </div>

      {/* Slider Center Drag Handle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${sliderPosition}%`,
          transform: "translate(-50%, -50%)",
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          color: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.6)",
          pointerEvents: "none",
          fontWeight: 900,
          fontSize: 14,
        }}
      >
        ↔
      </div>
    </div>
  )
}

addPropertyControls(BeforeAfterSlider, {
  beforeImage: {
    type: ControlType.Image,
    title: "Raw / Before",
    defaultValue: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
  },
  afterImage: {
    type: ControlType.Image,
    title: "Photoshop / After",
    defaultValue: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
  },
  beforeLabel: {
    type: ControlType.String,
    title: "Before Label",
    defaultValue: "RAW FOOTAGE",
  },
  afterLabel: {
    type: ControlType.String,
    title: "After Label",
    defaultValue: "PHOTOSHOP MASTER",
  },
  borderRadius: {
    type: ControlType.Number,
    title: "Border Radius",
    defaultValue: 16,
    min: 0,
    max: 32,
    step: 1,
  },
})
