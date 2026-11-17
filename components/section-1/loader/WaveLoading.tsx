"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedWave() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/loader/wave.svg")
      .then((response) => {
        if (!response.ok) throw new Error("Could not load wave.svg");

        return response.text();
      })
      .then((markup) => {
        if (!cancelled) setSvgMarkup(markup);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !svgMarkup) return;

    const svg = container.querySelector("svg");

    if (!svg) return;

    // Keep SVG responsive but small
    svg.style.width = "100%";
    svg.style.height = "auto";
    svg.style.maxWidth = "none";
    svg.style.display = "block";

    // Remove white backgrounds
    svg.querySelectorAll('rect[fill="#ffffff"]').forEach((rect) => {
      rect.remove();
    });

    const namespace = "http://www.w3.org/2000/svg";

    let defs = svg.querySelector("defs");

    if (!defs) {
      defs = document.createElementNS(namespace, "defs");
      svg.prepend(defs);
    }

    const filter = document.createElementNS(namespace, "filter");

    filter.setAttribute("id", "wave-flow");
    filter.setAttribute("x", "-15%");
    filter.setAttribute("y", "-15%");
    filter.setAttribute("width", "130%");
    filter.setAttribute("height", "130%");

    const turbulence = document.createElementNS(namespace, "feTurbulence");

    turbulence.setAttribute("type", "fractalNoise");
    turbulence.setAttribute("baseFrequency", "0.008 0.025");
    turbulence.setAttribute("numOctaves", "2");
    turbulence.setAttribute("seed", "2");
    turbulence.setAttribute("result", "noise");

    const displacement = document.createElementNS(
      namespace,
      "feDisplacementMap",
    );

    displacement.setAttribute("in", "SourceGraphic");
    displacement.setAttribute("in2", "noise");
    displacement.setAttribute("scale", "0");

    const distortionAnimation = document.createElementNS(namespace, "animate");

    distortionAnimation.setAttribute("attributeName", "scale");
    distortionAnimation.setAttribute("values", "0;5;12;7;0");
    distortionAnimation.setAttribute("dur", "5s");
    distortionAnimation.setAttribute("repeatCount", "indefinite");

    displacement.appendChild(distortionAnimation);
    filter.append(turbulence, displacement);
    defs.appendChild(filter);

    svg.style.filter = "url(#wave-flow)";

    return () => {
      svg.style.filter = "";
    };
  }, [svgMarkup]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: svgMarkup,
      }}
      ref={containerRef}
      className="mx-auto flex h-10 w-36 shrink-0 items-center justify-center"
      style={{
        opacity: svgMarkup ? 1 : 0,
        transition: "opacity 500ms ease-in-out",
      }}
    />
  );
}
