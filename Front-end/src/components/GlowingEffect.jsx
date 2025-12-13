import { memo, useCallback, useEffect, useRef } from "react";

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className = "",
    movementDuration = 2,
    borderWidth = 1,
    disabled = false,
  }) => {
    const containerRef = useRef(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(0);

    const handleMove = useCallback(
      (e) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          // Using setTimeout as a simple animation alternative (no framer-motion dependency)
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / (movementDuration * 1000), 1);
            // Easing function similar to [0.16, 1, 0.3, 1]
            const easeProgress = progress < 0.5 
              ? 2 * progress * progress 
              : -1 + (4 - 2 * progress) * progress;
            
            const value = currentAngle + angleDiff * easeProgress;
            element.style.setProperty("--start", String(value));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    const gradientStyle = variant === "white"
      ? `repeating-conic-gradient(
          from 236.84deg at 50% 50%,
          var(--black),
          var(--black) calc(25% / var(--repeating-conic-gradient-times))
        )`
      : `radial-gradient(circle, #ff0080 20%, #ff0080dd 35%, #ff008099 50%, transparent 70%),
        radial-gradient(circle at 40% 40%, #ffdd00 12%, #ffdd00dd 30%, transparent 60%),
        radial-gradient(circle at 60% 60%, #00ff00 15%, #00ff00dd 35%, transparent 65%), 
        radial-gradient(circle at 40% 60%, #00ffff 15%, #00ffffdd 35%, transparent 65%),
        radial-gradient(circle at 70% 40%, #ff00ff 12%, #ff00ffdd 30%, transparent 60%),
        repeating-conic-gradient(
          from 236.84deg at 50% 50%,
          #ff0080 0%,
          #ffdd00 calc(25% / var(--repeating-conic-gradient-times)),
          #00ff00 calc(50% / var(--repeating-conic-gradient-times)), 
          #00ffff calc(75% / var(--repeating-conic-gradient-times)),
          #ff0080 calc(100% / var(--repeating-conic-gradient-times))
        )`;

    return (
      <>
        <div
          className={`pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity ${
            glow ? "opacity-100" : ""
          } ${variant === "white" ? "border-white" : ""} ${
            disabled ? "!block" : ""
          }`}
        />
        <div
          ref={containerRef}
          style={{
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            "--gradient": gradientStyle,
          }}
          className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity ${
            glow ? "opacity-100" : ""
          } ${blur > 0 ? "blur-[var(--blur)]" : ""} ${className} ${
            disabled ? "!hidden" : ""
          }`}
        >
          <style>{`
            .glow::after {
              content: "";
              border-radius: inherit;
              position: absolute;
              inset: calc(-1 * var(--glowingeffect-border-width));
              border: var(--glowingeffect-border-width) solid transparent;
              background: var(--gradient);
              background-attachment: fixed;
              opacity: var(--active);
              transition: opacity 300ms;
              -webkit-mask-clip: padding-box, border-box;
              mask-clip: padding-box, border-box;
              -webkit-mask-composite: destination-in;
              mask-composite: intersect;
              -webkit-mask-image: linear-gradient(#0000, #0000), conic-gradient(from calc((var(--start) - var(--spread)) * 1deg), #00000000 0deg, #fff, #00000000 calc(var(--spread) * 2deg));
              mask-image: linear-gradient(#0000, #0000), conic-gradient(from calc((var(--start) - var(--spread)) * 1deg), #00000000 0deg, #fff, #00000000 calc(var(--spread) * 2deg));
            }
          `}</style>
          <div className="glow rounded-[inherit]" />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export default GlowingEffect;
