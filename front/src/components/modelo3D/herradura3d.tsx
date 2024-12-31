"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeModel: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isOverModel, setIsOverModel] = useState(false);
  const glbPath = "/herraduradefinitiva3.glb"; // Asegúrate de que esta ruta sea correcta para el modelo GLB

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
    renderer.setClearColor(0x000000, 0);
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
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    // Cargar el modelo GLB
    loader.load(
      glbPath,
      (gltf) => {
        gltf.scene.scale.set(0.20, 0.20, 0.20);
        gltf.scene.position.set(0, 1, 0);
        scene.add(gltf.scene);

        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
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

    // Eventos de interacción
    const onMouseDown = (event: MouseEvent) => {
      // Verificar si el clic inicial ocurre sobre el modelo
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
        // Girar el modelo basado en el movimiento horizontal del mouse
        scene.traverse((child) => {
          if (child.isMesh) {
            child.rotation.y += deltaX * 0.005;
          }
        });
        previousMouseX = event.clientX;
      }
    };

    const onMouseUp = () => {
      isMouseDown = false;
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

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isMouseDown) {
        scene.traverse((child) => {
          if (child.isMesh) {
            child.rotation.y += 0.01;
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
      style={{ backgroundImage: 'url("/FondoHerradura.webp")' }} // Asegúrate de que esta ruta sea correcta para la imagen
    >
      <div className="absolute inset-0 z-0"></div>
      <div ref={sceneRef} className="w-full h-full overflow-hidden absolute inset-0 z-10"></div>

    </div>
  );
};

export default ThreeModel;
