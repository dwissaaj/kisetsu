
"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

export default function BrushBackground() {
  const brushRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/loader/brush.svg")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load brush.svg");
        return res.text();
      })
      .then((markup) => {
        if (!cancelled) setSvgMarkup(markup);
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const container = brushRef.current;
    if (!container || !svgMarkup) return;

    const svg = container.querySelector("svg");
    if (!svg) return;

    svg.style.width = "100%";
    svg.style.height = "auto";
    svg.style.display = "block";
    svg.style.overflow = "visible";

    const ns = "http://www.w3.org/2000/svg";

    let defs = svg.querySelector("defs");

    if (!defs) {
      defs = document.createElementNS(ns, "defs");
      svg.prepend(defs);
    }

    const filter = document.createElementNS(ns, "filter");
    filter.setAttribute("id", "brush-wave");
    filter.setAttribute("x", "-20%");
    filter.setAttribute("y", "-20%");
    filter.setAttribute("width", "140%");
    filter.setAttribute("height", "140%");

    const turbulence = document.createElementNS(ns, "feTurbulence");
    turbulence.setAttribute("type", "fractalNoise");
    turbulence.setAttribute("baseFrequency", "0.008 0.025");
    turbulence.setAttribute("numOctaves", "2");
    turbulence.setAttribute("seed", "3");
    turbulence.setAttribute("result", "noise");

    const displacement = document.createElementNS(
      ns,
      "feDisplacementMap",
    );

    displacement.setAttribute("in", "SourceGraphic");
    displacement.setAttribute("in2", "noise");
    displacement.setAttribute("scale", "0");

    filter.append(turbulence, displacement);
    defs.appendChild(filter);

    svg.style.filter = "url(#brush-wave)";

    const distortion = { value: 0 };

    const animation = animate(distortion, {
      value: [0, 3, 7, 4, 9, 3, 0],
      duration: 5000,
      ease: "inOutSine",
      loop: true,
      onUpdate: () => {
        displacement.setAttribute(
          "scale",
          String(distortion.value),
        );
      },
    });

    return () => {
      animation.revert();
      svg.style.filter = "";
    };
  }, [svgMarkup]);

  return (
    <div
      ref={brushRef}
      className="w-full"
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
