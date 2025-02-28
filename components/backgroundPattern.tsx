/* eslint-disable */
"use client";

import React, { useState, useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

interface ProgrammingIcon {
  id: string;
  x: number;
  y: number;
  distance: number;
  angle: number;
  size: number;
  opacity: number;
  rotation: number;
  brightness: number;
  iconType: number; // 0-5 for different programming icons
}

const BackgroundPattern: React.FC = () => {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [icons, setIcons] = useState<ProgrammingIcon[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const lastClickTime = useRef<number>(0);
  const ripples = useRef<
    Array<{ x: number; y: number; size: number; time: number }>
  >([]);

  // Configuration
  const iconSize = 24;
  const iconPadding = 3;
  const maxRippleSize = 300;
  const rippleDuration = 3000; // ms
  const maxVisibleDistance = 400;

  // Calculate icon grid positions
  useEffect(() => {
    const generateIconGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Icon dimensions with reduced spacing
      const gridCellWidth = iconSize * 2.2;
      const gridCellHeight = iconSize * 2.2;

      // Calculate number of icons needed
      const columns = Math.ceil(width / gridCellWidth) + 2;
      const rows = Math.ceil(height / gridCellHeight) + 2;

      const newIcons: ProgrammingIcon[] = [];

      for (let row = -2; row < rows; row++) {
        for (let col = -2; col < columns; col++) {
          // Calculate center position
          const x = col * gridCellWidth;
          const y = row * gridCellHeight;

          // Add small randomness to position for more organic look
          const randomOffsetX = (Math.random() - 0.5) * iconSize * 0.4;
          const randomOffsetY = (Math.random() - 0.5) * iconSize * 0.4;

          newIcons.push({
            id: `icon-${row}-${col}`,
            x: x + randomOffsetX,
            y: y + randomOffsetY,
            distance: 0,
            angle: 0,
            size: iconSize,
            opacity: 0.15,
            rotation: Math.random() * 30 - 15,
            brightness: 40 + Math.random() * 20, // Random initial brightness
            iconType: Math.floor(Math.random() * 12), // Randomly assign one of 12 icon types
          });
        }
      }

      setIcons(newIcons);
    };

    generateIconGrid();
    window.addEventListener("resize", generateIconGrid);

    return () => {
      window.removeEventListener("resize", generateIconGrid);
    };
  }, [iconSize]);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Update icons based on mouse position
  useEffect(() => {
    const { x, y } = mousePos;

    setIcons((prevIcons) =>
      prevIcons.map((icon) => {
        // Calculate distance and angle from mouse to icon
        const dx = icon.x - x;
        const dy = icon.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        // Determine new properties based on distance
        let opacity = 0.15;
        let size = iconSize;
        let brightness = 40; // Default low brightness

        if (distance < maxVisibleDistance) {
          // Intensity based on distance (closer = more intense) - significantly reduced
          const intensity = (1 - distance / maxVisibleDistance) * 0.4; // Reduced by multiplying by 0.4
          opacity = 0.15 + intensity * 0.25; // Reduced highlight opacity

          // Size adjustment based on distance wave - more subtle
          const wave =
            Math.sin(distance * 0.03 - performance.now() * 0.002) * 0.3 + 0.5; // Reduced wave amplitude
          size = iconSize * (1 + wave * 0.2); // Smaller size variation

          // Increase brightness based on proximity - more subtle contrast
          brightness = 40 + intensity * 50; // Reduced brightness difference
        }

        // Add ripple effect
        ripples.current.forEach((ripple) => {
          const rippleDx = icon.x - ripple.x;
          const rippleDy = icon.y - ripple.y;
          const rippleDistance = Math.sqrt(
            rippleDx * rippleDx + rippleDy * rippleDy
          );
          const rippleProgress =
            (performance.now() - ripple.time) / rippleDuration;

          if (rippleProgress < 1) {
            const rippleSize = ripple.size * rippleProgress;
            const rippleWidth = rippleSize * 0.2;

            // If icon is within the ripple ring
            if (
              rippleDistance > rippleSize - rippleWidth &&
              rippleDistance < rippleSize + rippleWidth
            ) {
              const rippleIntensity =
                1 - Math.abs(rippleDistance - rippleSize) / rippleWidth;
              opacity += rippleIntensity * 0.2; // Reduced ripple opacity effect
              size += iconSize * rippleIntensity * 0.3; // Reduced ripple size effect
              brightness += rippleIntensity * 25; // Reduced brightness increase during ripple
            }
          }
        });

        return {
          ...icon,
          distance,
          angle,
          opacity: Math.min(opacity, 0.85),
          size: Math.max(size, iconSize * 0.8),
          brightness: Math.min(Math.max(brightness, 0), 100), // Clamp brightness
        };
      })
    );

    // Clean up old ripples
    ripples.current = ripples.current.filter(
      (ripple) => performance.now() - ripple.time < rippleDuration
    );
  }, [mousePos, iconSize, maxVisibleDistance]);

  // Handle click to create ripple
  const handleClick = (e: React.MouseEvent) => {
    const now = performance.now();
    const { clientX, clientY } = e;

    // Double click detection (within 300ms)
    const isDoubleClick = now - lastClickTime.current < 300;
    lastClickTime.current = now;

    if (isDoubleClick) {
      setIsExpanded(!isExpanded);
    } else {
      // Create new ripple
      ripples.current.push({
        x: clientX,
        y: clientY,
        size: maxRippleSize,
        time: now,
      });
    }
  };

  // Icon paths for different programming-related shapes
  const getIconPath = (iconType: number, size: number) => {
    const s = size; // For convenience

    switch (
      iconType % 12 // Now supports 12 different icon types
    ) {
      case 0: // Curly braces {}
        return `M ${-s * 0.5},${-s * 0.7} C ${-s * 0.8},${-s * 0.4} ${
          -s * 0.8
        },${-s * 0.2} ${-s * 0.5},0 C ${-s * 0.8},${s * 0.2} ${-s * 0.8},${
          s * 0.4
        } ${-s * 0.5},${s * 0.7} M ${s * 0.5},${-s * 0.7} C ${s * 0.8},${
          -s * 0.4
        } ${s * 0.8},${-s * 0.2} ${s * 0.5},0 C ${s * 0.8},${s * 0.2} ${
          s * 0.8
        },${s * 0.4} ${s * 0.5},${s * 0.7}`;

      case 1: // Hash/Pound symbol #
        return `M ${-s * 0.6},${-s * 0.5} L ${s * 0.6},${-s * 0.5} M ${
          -s * 0.6
        },${s * 0.5} L ${s * 0.6},${s * 0.5} M ${-s * 0.2},${-s * 0.8} L ${
          -s * 0.2
        },${s * 0.8} M ${s * 0.2},${-s * 0.8} L ${s * 0.2},${s * 0.8}`;

      case 2: // Angle brackets <>
        return `M ${-s * 0.4},0 L 0,${-s * 0.7} L ${s * 0.4},0 L 0,${
          s * 0.7
        } Z`;

      case 3: // Parentheses ()
        return `M ${-s * 0.4},${-s * 0.7} C ${-s * 0.8},0 ${-s * 0.8},0 ${
          -s * 0.4
        },${s * 0.7} M ${s * 0.4},${-s * 0.7} C ${s * 0.8},0 ${s * 0.8},0 ${
          s * 0.4
        },${s * 0.7}`;

      case 4: // Semicolon ;
        return `M 0,${-s * 0.5} A ${s * 0.15},${s * 0.15} 0 1,1 0,${
          -s * 0.2
        } A ${s * 0.15},${s * 0.15} 0 1,1 0,${-s * 0.5} M 0,${s * 0.2} A ${
          s * 0.15
        },${s * 0.15} 0 1,1 0,${s * 0.5} A ${s * 0.15},${s * 0.15} 0 1,1 0,${
          s * 0.8
        }`;

      case 5: // Equal and arrows =>
        return `M ${-s * 0.6},${-s * 0.3} L ${s * 0.2},${-s * 0.3} M ${
          -s * 0.6
        },${s * 0.3} L ${s * 0.2},${s * 0.3} M ${s * 0.2},${-s * 0.6} L ${
          s * 0.7
        },0 L ${s * 0.2},${s * 0.6}`;

      case 6: // Tilde ~
        return `M ${-s * 0.6},0 C ${-s * 0.3},${-s * 0.4} ${-s * 0.1},${
          -s * 0.4
        } ${s * 0.1},0 C ${s * 0.3},${s * 0.4} ${s * 0.5},${s * 0.4} ${
          s * 0.6
        },0`;

      case 7: // Star/Asterisk *
        return `M 0,${-s * 0.7} L 0,${s * 0.7} M ${-s * 0.6},${-s * 0.3} L ${
          s * 0.6
        },${s * 0.3} M ${-s * 0.6},${s * 0.3} L ${s * 0.6},${-s * 0.3}`;

      case 8: // Forward/backward slashes \/
        return `M ${-s * 0.5},${-s * 0.7} L ${s * 0.5},${s * 0.7} M ${
          -s * 0.5
        },${s * 0.7} L ${s * 0.5},${-s * 0.7}`;

      case 9: // Dot notation .
        return `M ${-s * 0.6},0 L ${-s * 0.3},0 M 0,0 A ${s * 0.1},${
          s * 0.1
        } 0 1,0 ${s * 0.01},0 A ${s * 0.1},${s * 0.1} 0 1,0 0,0 M ${
          s * 0.3
        },0 L ${s * 0.6},0`;

      case 10: // Double arrow <->
        return `M ${-s * 0.6},0 L ${s * 0.6},0 M ${-s * 0.4},${-s * 0.3} L ${
          -s * 0.7
        },0 L ${-s * 0.4},${s * 0.3} M ${s * 0.4},${-s * 0.3} L ${
          s * 0.7
        },0 L ${s * 0.4},${s * 0.3}`;

      case 11: // Plus/minus symbols +-
        return `M 0,${-s * 0.6} L 0,${s * 0.6} M ${-s * 0.6},0 L ${
          s * 0.6
        },0 M ${-s * 0.5},${-s * 0.3} L ${-s * 0.2},${-s * 0.3} M ${
          -s * 0.35
        },${-s * 0.45} L ${-s * 0.35},${-s * 0.15}`;

      default:
        return `M ${-s * 0.5},${-s * 0.5} L ${s * 0.5},${s * 0.5} M ${
          -s * 0.5
        },${s * 0.5} L ${s * 0.5},${-s * 0.5}`;
    }
  };

  return (
    <div className="programming-pattern-container" onClick={handleClick}>
      <svg className={`programming-pattern ${isExpanded ? "expanded" : ""}`}>
        {icons.map((icon) => (
          <g
            key={icon.id}
            className="icon-cell"
            style={{
              transform: `translate(${icon.x}px, ${icon.y}px) rotate(${
                icon.rotation + (isExpanded ? icon.angle * 30 : 0)
              }deg) scale(${isExpanded ? 1.2 : 1})`,
              opacity: icon.opacity,
              transition:
                "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
            }}
          >
            <path
              d={getIconPath(icon.iconType, icon.size)}
              className={`prog-icon ${icon.distance < 100 ? "pulse" : ""}`}
              style={{
                fill: "none",
                stroke: `rgba(${icon.brightness}%, ${icon.brightness}%, ${
                  icon.brightness
                }%, ${
                  icon.distance < 100
                    ? 0.3 + (1 - icon.distance / 100) * 0.3
                    : 0.25
                })`,
                strokeWidth: iconPadding,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                transformOrigin: "center",
                filter:
                  icon.distance < 100
                    ? `drop-shadow(0 0 3px rgba(255, 255, 255, ${
                        (1 - icon.distance / 100) * 0.2
                      }))`
                    : "none",
              }}
            />
          </g>
        ))}
      </svg>

      <style jsx>{`
        .programming-pattern-container {
          position: fixed;
          inset: 0;
          overflow: hidden;
          z-index: -50;
          background-color: rgba(12, 12, 14, 0.97);
        }

        .programming-pattern {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .programming-pattern.expanded .icon-cell {
          animation: float 8s infinite alternate;
        }

        .icon-cell {
          will-change: transform, opacity;
        }

        .prog-icon.pulse {
          animation: pulse 3s infinite alternate;
        }

        @keyframes pulse {
          0% {
            filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.3));
          }
          100% {
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(10px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundPattern;
