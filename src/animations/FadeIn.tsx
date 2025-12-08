"use client";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number; // Opsional: biar munculnya gantian
  className?: string;
};

export default function FadeIn({ children, delay = 0, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Keadaan awal: transparan & agak turun
      whileInView={{ opacity: 1, y: 0 }} // Pas discroll: jelas & naik ke posisi asli
      viewport={{ once: true, margin: "-50px" }} // once: true (biar ga ngulang2 pas scroll naik turun)
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}