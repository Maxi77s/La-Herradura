"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GiHorseshoe } from "react-icons/gi";

import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeModel: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isOverModel, setIsOverModel] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const glbPath = "/herradura.glb";

  // Detect mobile devices
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Detect screen width for mobile
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle scroll position for fixed button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsFixed(scrollPosition > 600); // Adjust based on scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!sceneRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    sceneRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 50);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      glbPath,
      (gltf) => {
        gltf.scene.scale.set(0.2, 0.2, 0.2);
        const isMobile = window.innerWidth <= 768;
        gltf.scene.position.set(0, isMobile ? 0.5 : 0.8, 0);
        scene.add(gltf.scene);
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).castShadow = true;
            (child as THREE.Mesh).receiveShadow = true;
          }
        });
      },
      undefined,
      (error) => console.error("Error al cargar el modelo:", error)
    );

    camera.position.z = 3;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let isInteracting = false;
    let previousInteractionX = 0;

    // Mouse interaction
    const onMouseDown = (event: MouseEvent) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0 && event.button === 0) {
        isInteracting = true;
        previousInteractionX = event.clientX;
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      setIsOverModel(intersects.length > 0);

      if (isInteracting) {
        const deltaX = event.clientX - previousInteractionX;
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.y += deltaX * 0.005;
          }
        });
        previousInteractionX = event.clientX;
      }
    };

    const onMouseUp = () => {
      isInteracting = false;
    };

    // Touch interaction
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          isInteracting = true;
          previousInteractionX = touch.clientX;
        }
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (isInteracting && event.touches.length === 1) {
        const touch = event.touches[0];
        const deltaX = touch.clientX - previousInteractionX;
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.y += deltaX * 0.005;
          }
        });
        previousInteractionX = touch.clientX;
      }
    };

    const onTouchEnd = () => {
      isInteracting = false;
    };

    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onWindowResize);

    const animate = () => {
      requestAnimationFrame(animate);
      if (!isInteracting) {
        scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).rotation.y += 0.01;
          }
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
  }, []);

  // Change cursor style when hovering over model
  useEffect(() => {
    document.body.style.cursor = isOverModel ? "pointer" : "default";
  }, [isOverModel]);

  const handleWhatsAppClick = () => {
    const whatsappNumber = "543585047802"; // Número en formato internacional sin el signo +
    const message = "¡Hola! Me gustaría obtener más información."; // Mensaje predeterminado
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/FondoHerradura.webp")' }}
    >
      <div className="absolute inset-0 z-0"></div>
      <div
        ref={sceneRef}
        className="w-full h-[80vh] overflow-hidden absolute inset-0 z-10"
      ></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className={`${
          isFixed
            ? isMobile
              ? "fixed bottom-4 right-4 z-50" // Mobile position
              : "fixed top-7 right-4 z-50" // Desktop position
            : "absolute bottom-10 flex justify-center w-full z-20" // Initial position
        } text-center`}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleWhatsAppClick}
          className="relative flex items-center justify-center text-white font-bold py-3 px-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 shadow-md overflow-hidden"
        >
          <span className="relative z-10">Reservar</span>
          <GiHorseshoe className="ml-3 w-6 h-6 relative z-10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-transparent opacity-100"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          ></motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ThreeModel;
