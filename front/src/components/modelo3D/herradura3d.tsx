"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeModel: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isOverModel, setIsOverModel] = useState(false);
  const glbPath = "/herradura.glb"; // Asegúrate de que esta ruta sea correcta

  useEffect(() => {
    if (!sceneRef.current) return;

    // Crear la escena, cámara y renderizador
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Fondo transparente
    sceneRef.current.appendChild(renderer.domElement);

    // Añadir luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 50);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // Configurar DRACOLoader y GLTFLoader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/"); // Ruta al decodificador DRACO

    const loader = new GLTFLoader(); // Uso de GLTFLoader
    loader.setDRACOLoader(dracoLoader);

    // Cargar el modelo GLB
    loader.load(
      glbPath,
      (gltf) => {
        gltf.scene.scale.set(0.2, 0.2, 0.2); // Ajustar el tamaño del modelo

        // Centrar el modelo
        const isMobile = window.innerWidth <= 768; // Detectar si es móvil
        gltf.scene.position.set(0, isMobile ? 0.5 : 0.8, 0); // Ajustar posición según dispositivo

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

    // Configurar cámara
    camera.position.z = 3;

    // Raycaster y vector para interacciones
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Variables para la rotación
    let isMouseDown = false;
    let previousMouseX = 0;
    let previousTouchX = 0;

    // Funciones de eventos (Mouse y táctil)
    const onMouseDown = (event: MouseEvent) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0 && event.button === 0) {
        isMouseDown = true;
        previousMouseX = event.clientX;
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      setIsOverModel(intersects.length > 0);

      if (isMouseDown) {
        const deltaX = event.clientX - previousMouseX;
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.y += deltaX * 0.005; // Rotar el modelo
          }
        });
        previousMouseX = event.clientX;
      }
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    // Soporte táctil
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        previousTouchX = event.touches[0].clientX;
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const deltaX = event.touches[0].clientX - previousTouchX;
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.rotation.y += deltaX * 0.005; // Rotar el modelo
          }
        });
        previousTouchX = event.touches[0].clientX;
      }
    };

    const onTouchEnd = () => {
      previousTouchX = 0;
    };

    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Agregar eventos
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onWindowResize);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isMouseDown) {
        scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).rotation.y += 0.01; // Animación constante del modelo
          }
        });
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
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

  useEffect(() => {
    document.body.style.cursor = isOverModel ? "pointer" : "default";
  }, [isOverModel]);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/FondoHerradura.webp")' }} // Fondo del contenedor
    >
      <div className="absolute inset-0 z-0"></div>
      <div ref={sceneRef} className="w-full h-full overflow-hidden absolute inset-0 z-10"></div>
    </div>
  );
};

export default ThreeModel;
