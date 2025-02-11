import { motion } from "framer-motion"

export const Logo = () => (
  <motion.svg
    className="w-8 h-8 text-primary"
    viewBox="0 0 24 24"
    fill="currentColor"
    initial={{ rotate: -90, opacity: 0 }}
    animate={{ rotate: 0, opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <motion.path
      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    />
  </motion.svg>
)

