"use client";

import { motion } from "motion/react"
import { useState } from "react";

export default function Logo() {
  const [isClicked, setIsClicked] = useState(false);
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      animate={(isHover || isClicked) ? 'active' : 'initial'}
      className="flex gap-x-2 gap-y-1 items-start flex-wrap flex-col md:flex-row md:items-baseline md:flex-nowrap"
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      onClick={() => setIsClicked(!isClicked)}
    >
      <motion.h1
        className="text-[var(--logoPrimaryColor)] text-lg lg:text-xl font-bold overflow-hidden leading-none"
      >
        <span>W</span>
        <div className="relative inline-flex items-baseline">
          <motion.span
            className="absolute left-0 top-0"
            variants={{
              initial: {
                opacity: 1,
              },
              active: {
                opacity: 0,
              }
            }}
          >
            .
          </motion.span>
          {
            String('abi').split('').map((letter, i) => {
              return (
                <motion.span
                  key={i}
                  variants={{
                    initial: {
                      x: -10 * i,
                      opacity: 0,
                    },
                    active: {
                      x: 0,
                      opacity: 1,
                    }
                  }}
                  layout
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                    delay: 0.005 * i,
                  }}
                >
                  {letter}
                </motion.span>
              );
            })
          }
        </div>
      </motion.h1>
      <motion.p
        className="text-[var(--logoSecondaryColor)] text-xs md:text-xs lg:text-sm"
      >
        {
          String('The modern simple clock app').split('').map((letter, i) => {
            return (
              <motion.span
                key={i}
                variants={{
                  initial: {
                    x: -10,
                    opacity: 0,
                    scaleX: 0.5
                  },
                  active: {
                    x: 0,
                    opacity: 1,
                    scaleX: 1
                  }
                }}
                layout
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  delay: 0.005 * i + 0.1,
                }}
              >
                {letter}
              </motion.span>
            );
          })
        }
      </motion.p>
    </motion.div>
  )
} 