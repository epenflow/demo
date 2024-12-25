"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, Flip, useGSAP);

export default gsap;
export { Flip, ScrollTrigger, useGSAP };
