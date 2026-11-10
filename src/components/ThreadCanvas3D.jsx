import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ThreadCanvas3D() {
  const containerRef = useRef(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // 1. Controllo disponibilità WebGL
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setHasWebGL(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 2. Setup Scena Three.js
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 3. Sistema di illuminazione caldo & riflettente per metallo satinato e filo
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 2.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffedd5, 3.5);
    dirLight1.position.set(12, 16, 14);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe7d5c0, 2.2);
    dirLight2.position.set(-14, -10, 10);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xfffbeb, 4.0, 30);
    pointLight.position.set(2, 3, 9);
    scene.add(pointLight);

    // 4. Procedural Yarn Noise Texture
    const createYarnNoiseTexture = () => {
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      const imgData = ctx.createImageData(size, size);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const x = (i / 4) % size;
        const y = Math.floor(i / 4 / size);
        const stripe = Math.sin((x * 0.9 + y * 1.8) * 0.4) * 0.5 + 0.5;
        const noise = Math.random() * 0.3;
        const v = Math.floor((stripe * 0.7 + noise) * 255);
        imgData.data[i] = v;
        imgData.data[i + 1] = v;
        imgData.data[i + 2] = v;
        imgData.data[i + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(40, 2);
      return texture;
    };

    const yarnBumpMap = createYarnNoiseTexture();

    // 5. Materiale del Filato: Filo di Cotone mercerizzato écru
    const threadMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xeddcc8,
      roughness: 0.32,
      metalness: 0.05,
      sheen: 1.0,
      sheenRoughness: 0.3,
      sheenColor: new THREE.Color(0xfff6e5),
      clearcoat: 0.15,
      clearcoatRoughness: 0.3,
      bumpMap: yarnBumpMap,
      bumpScale: 0.035,
    });

    // 6. Curva Continua 3D Scrollytelling ("Il Filo Conduttore"):
    // Si snoda dall'alto (Hero) scendendo per le sezioni inferiori
    const threadPoints = [
      new THREE.Vector3(-6.5, 5.0, 0.5),
      new THREE.Vector3(-3.0, 3.8, 2.5),
      new THREE.Vector3(1.8, 2.2, 2.2),
      new THREE.Vector3(4.8, 0.5, 0.8),
      new THREE.Vector3(2.5, -2.5, 1.5),
      new THREE.Vector3(-3.5, -4.5, -0.5),
      new THREE.Vector3(-1.0, -8.0, 1.8),
      new THREE.Vector3(4.0, -11.5, 0.5),
      new THREE.Vector3(0.5, -15.0, 2.0),
      new THREE.Vector3(-3.5, -18.5, 0.0),
      new THREE.Vector3(2.5, -22.5, 1.2),
      new THREE.Vector3(0.0, -26.0, 0.0),
    ];

    const threadCurve = new THREE.CatmullRomCurve3(threadPoints, false, 'catmullrom', 0.5);
    const tubularSegments = 380;
    const radius = 0.16;
    const tubeGeometry = new THREE.TubeGeometry(threadCurve, tubularSegments, radius, 18, false);
    const threadMesh = new THREE.Mesh(tubeGeometry, threadMaterial);
    scene.add(threadMesh);

    const basePositions = tubeGeometry.attributes.position.clone();

    // 7. COSTRUZIONE REALE DELL'UNCINETTO ARTIGIANALE (Basato sulla foto dell'utente)
    // Caratteristiche reali: corpo in alluminio satinato/anodizzato, zona piatta per il pollice ("thumb grip"), gancio ricurvo con solco profondo
    const crochetHookGroup = new THREE.Group();

    // Materiale in Alluminio Anodizzato Argenteo Satinato
    const crochetMaterial = new THREE.MeshStandardMaterial({
      color: 0xdedee5,
      metalness: 0.85,
      roughness: 0.22,
    });

    // A) Manico rotondo inferiore (lungo e affusolato)
    const handleGeo = new THREE.CylinderGeometry(0.12, 0.13, 5.0, 32);
    const handleMesh = new THREE.Mesh(handleGeo, crochetMaterial);
    handleMesh.position.y = -2.5;
    crochetHookGroup.add(handleMesh);

    // Fondello arrotondato del manico
    const bottomCapGeo = new THREE.SphereGeometry(0.13, 24, 16);
    const bottomCap = new THREE.Mesh(bottomCapGeo, crochetMaterial);
    bottomCap.position.y = -5.0;
    crochetHookGroup.add(bottomCap);

    // B) Impugnatura Piatta per il pollice ("Thumb Grip" con impresso il calibro)
    // Notata chiaramente in foto: sezione schiacciata ed ellittica
    const thumbGripGeo = new THREE.BoxGeometry(0.32, 1.6, 0.11);
    const thumbGripMesh = new THREE.Mesh(thumbGripGeo, crochetMaterial);
    thumbGripMesh.position.y = 0.5;
    crochetHookGroup.add(thumbGripMesh);

    // C) Asta superiore / collo che va verso la testa
    const throatGeo = new THREE.CylinderGeometry(0.11, 0.13, 2.4, 32);
    const throatMesh = new THREE.Mesh(throatGeo, crochetMaterial);
    throatMesh.position.y = 2.4;
    crochetHookGroup.add(throatMesh);

    // D) Becco / Gancio ricurvo dell'uncinetto (Hook Head con solco profondo)
    // Modellato con curva a becco reale (Torus + sfera terminale)
    const hookBeakGeo = new THREE.TorusGeometry(0.24, 0.09, 16, 32, Math.PI * 1.15);
    const hookBeakMesh = new THREE.Mesh(hookBeakGeo, crochetMaterial);
    hookBeakMesh.position.set(0.16, 3.6, 0);
    hookBeakMesh.rotation.z = Math.PI * 0.92;
    crochetHookGroup.add(hookBeakMesh);

    // Punta arrotondata del becco (inconfondibile punta smussata per non sfilacciare il cotone)
    const beakTipGeo = new THREE.SphereGeometry(0.09, 20, 16);
    const beakTipMesh = new THREE.Mesh(beakTipGeo, crochetMaterial);
    beakTipMesh.position.set(0.02, 3.82, 0);
    crochetHookGroup.add(beakTipMesh);

    // Posizionamento dell'uncinetto: posizionato dove il filo si incurva
    crochetHookGroup.position.set(2.4, 2.0, 2.2);
    crochetHookGroup.rotation.z = -Math.PI / 3.2;
    crochetHookGroup.rotation.x = 0.45;
    scene.add(crochetHookGroup);

    // 8. COSTRUZIONE REALE DELL'AGO DA RICAMO CON CRUNA (Basato sull'illustrazione dell'utente)
    // Ago sottile in acciaio lucido, punta affilatissima e asola lunga (cruna) con filo rosso/écru che la attraversa
    const needleGroup = new THREE.Group();

    const needleMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f6fa,
      metalness: 0.95,
      roughness: 0.1,
    });

    // Fusto dell'ago
    const needleShaftGeo = new THREE.CylinderGeometry(0.065, 0.07, 4.2, 32);
    const needleShaft = new THREE.Mesh(needleShaftGeo, needleMaterial);
    needleShaft.position.y = 0;
    needleGroup.add(needleShaft);

    // Punta acuta dell'ago
    const needleTipGeo = new THREE.ConeGeometry(0.065, 1.2, 32);
    const needleTip = new THREE.Mesh(needleTipGeo, needleMaterial);
    needleTip.position.y = -2.7;
    needleTip.rotation.x = Math.PI;
    needleGroup.add(needleTip);

    // Cruna dell'ago: testa affusolata con foro allungato
    const eyeTopGeo = new THREE.TorusGeometry(0.16, 0.045, 16, 32);
    const eyeTop = new THREE.Mesh(eyeTopGeo, needleMaterial);
    eyeTop.position.y = 2.2;
    eyeTop.scale.set(0.55, 1.8, 0.55); // Ovale allungato tipico della cruna per filo da ricamo
    needleGroup.add(eyeTop);

    // Filo da ricamo che passa attraverso la cruna (filo di seta/cotone color rubino tenue)
    const needleThreadPoints = [
      new THREE.Vector3(-1.2, 3.2, 0.2),
      new THREE.Vector3(-0.4, 2.4, 0.05),
      new THREE.Vector3(0.0, 2.2, 0.0), // Passa proprio dentro la cruna
      new THREE.Vector3(0.5, 2.0, -0.1),
      new THREE.Vector3(1.4, 1.2, 0.2),
    ];
    const needleThreadCurve = new THREE.CatmullRomCurve3(needleThreadPoints, false);
    const needleThreadGeo = new THREE.TubeGeometry(needleThreadCurve, 40, 0.035, 12, false);
    const needleThreadMat = new THREE.MeshPhysicalMaterial({
      color: 0x9f1239, // Rubino raffinato / filo da ricamo a contrasto
      roughness: 0.35,
      sheen: 1.0,
      sheenColor: new THREE.Color(0xffccd5),
    });
    const needleThreadMesh = new THREE.Mesh(needleThreadGeo, needleThreadMat);
    needleGroup.add(needleThreadMesh);

    // Posizionamento dell'ago da ricamo
    needleGroup.position.set(-3.2, 3.2, 2.0);
    needleGroup.rotation.z = Math.PI / 4.5;
    needleGroup.rotation.x = -0.3;
    scene.add(needleGroup);

    // 9. Particelle dorate fluttuanti
    const particleCount = 70;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 22;
      particlePositions[i + 1] = Math.random() * -30 + 8; // Distribuite lungo tutta l'altezza della pagina
      particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xd9b382,
      size: 0.22,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 10. Interattività Mouse e Scrollytelling Globale
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handlePointerMove = (e) => {
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX) ?? 0;
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY) ?? 0;
      targetMouseX = (clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Calcolo scroll globale della pagina per accompagnare la navigazione
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      targetScrollProgress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // 11. Render Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp per mouse e scroll
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;

      // Scrollytelling: La telecamera segue il filo scendendo lungo le sezioni della pagina!
      // In alto (Hero): Y = 0. Man mano che scorri: la camera scende fino a -24
      const scrollYOffset = scrollProgress * 23.0;
      camera.position.x = mouseX * 2.2;
      camera.position.y = 1.0 - scrollYOffset - mouseY * 1.5;
      camera.lookAt(0, -scrollYOffset * 0.95, 0);

      // Oscillazione organica della gugliata di filo
      const posAttr = tubeGeometry.attributes.position;
      const basePos = basePositions;
      const count = posAttr.count;
      for (let i = 0; i < count; i++) {
        const bx = basePos.getX(i);
        const by = basePos.getY(i);
        const bz = basePos.getZ(i);

        const wave = Math.sin(elapsedTime * 1.8 + by * 0.35 + bx * 0.3) * 0.12;
        posAttr.setXYZ(i, bx + wave * 0.4, by + wave * 0.3, bz + wave * 0.5);
      }
      posAttr.needsUpdate = true;

      // Movimento realistico dell'uncinetto: segue il ritmo del lavoro
      crochetHookGroup.position.y = 2.0 + Math.sin(elapsedTime * 1.5) * 0.28;
      crochetHookGroup.position.x = 2.4 + Math.cos(elapsedTime * 1.2) * 0.22;
      crochetHookGroup.rotation.z = -Math.PI / 3.2 + Math.sin(elapsedTime * 1.4) * 0.08;

      // Movimento delicato dell'ago da ricamo
      needleGroup.position.y = 3.2 + Math.sin(elapsedTime * 1.6 + 1.2) * 0.25;
      needleGroup.position.x = -3.2 + Math.cos(elapsedTime * 1.3) * 0.2;
      needleGroup.rotation.z = Math.PI / 4.5 + Math.sin(elapsedTime * 1.1) * 0.06;

      // Rotazione soffusa delle particelle
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // 12. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      tubeGeometry.dispose();
      yarnBumpMap.dispose();
      threadMaterial.dispose();
      handleGeo.dispose();
      bottomCapGeo.dispose();
      thumbGripGeo.dispose();
      throatGeo.dispose();
      hookBeakGeo.dispose();
      beakTipGeo.dispose();
      crochetMaterial.dispose();
      needleShaftGeo.dispose();
      needleTipGeo.dispose();
      eyeTopGeo.dispose();
      needleMaterial.dispose();
      needleThreadGeo.dispose();
      needleThreadMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return null;
  }

  // Canvas a schermo intero fisso sullo sfondo (fixed inset-0):
  // Visibile continuamente durante tutto lo scorrimento della pagina!
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
}
