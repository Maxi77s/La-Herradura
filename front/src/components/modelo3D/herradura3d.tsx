"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
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
  const router = useRouter(); // Inicializa el router

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
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
  }, []);

  // Change cursor style when hovering over model
  useEffect(() => {
    document.body.style.cursor = isOverModel ? "pointer" : "default";
  }, [isOverModel]);

  const handleReserveClick = () => {
    router.push("/Reservar"); // Navega a la ruta "/Reservar"
  };

  return (
    <div
    id="inicio"
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
              : "fixed top-8 right-32 z-50" // Desktop position
            : "absolute bottom-36 flex justify-center w-full z-20" // Initial position
        } text-center`}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReserveClick} // Cambiado a handleReserveClick
          className="relative flex items-center justify-center text-white font-bold py-3 px-10 rounded-md bg-black border-2 border-white shadow-lg overflow-hidden group transition-all duration-300"
        >
          <span className="relative z-10 group-hover:text-black transition-colors duration-300">
            Reservar
          </span>
          <GiHorseshoe className="ml-3 w-6 h-6 relative z-10 group-hover:text-black transition-colors duration-300" />
          <motion.div
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{
              zIndex: 5,
            }}
          ></motion.div>
          <motion.div
            className="absolute inset-0 rounded-md border-2 border-white group-hover:border-black transition-colors duration-300 pointer-events-none"
            style={{
              zIndex: 9,
            }}
          ></motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ThreeModel;
