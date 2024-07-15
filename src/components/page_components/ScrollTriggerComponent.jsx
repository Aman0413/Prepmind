import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScroll } from "framer-motion";

const ScrollTriggerComponent = ({ children }) => {
  const { scrollYProgress } = useScroll();
  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="progress-bar"
      />
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={variants}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default ScrollTriggerComponent;
