"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type ConfettiPiece = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
};

const colors = [
  "#FFC700", // yellow
  "#FF0099", // pink
  "#00C3FF", // blue
  "#7700FF", // purple
  "#FF4301", // orange
  "#2FFF00", // green
];

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    // Create confetti pieces
    const newPieces: ConfettiPiece[] = [];
    const count = 100; // Number of confetti pieces

    for (let i = 0; i < count; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100, // random position across screen width (%)
        y: -20 - Math.random() * 10, // start slightly above viewport
        size: 5 + Math.random() * 10, // random size
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360, // random rotation
      });
    }

    setPieces(newPieces);

    // Clean up after animation completes
    const timer = setTimeout(() => {
      setPieces([]);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: piece.size,
            height: piece.size * 1.5,
            backgroundColor: piece.color,
            borderRadius: "1px",
            rotate: `${piece.rotation}deg`,
          }}
          animate={{
            y: ["0%", "100vh"],
            x: [`${piece.x}%`, `${piece.x + (Math.random() * 20 - 10)}%`],
            rotate: [`${piece.rotation}deg`, `${piece.rotation + 360 * 2}deg`],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
