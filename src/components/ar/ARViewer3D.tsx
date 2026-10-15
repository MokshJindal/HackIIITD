import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Eye, Maximize2, RotateCw, CheckCircle2, AlertTriangle, Sparkles, Sliders } from 'lucide-react';
import { SAMPLE_CRAFTS } from '../../data/mockData';
import { CraftSample } from '../../types';

export const ARViewer3D: React.FC = () => {
  const [selectedCraftId, setSelectedCraftId] = useState<string>('craft-1');
  const craft: CraftSample = SAMPLE_CRAFTS.find(c => c.id === selectedCraftId) || SAMPLE_CRAFTS[0];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [roomBackdrop, setRoomBackdrop] = useState<'studio' | 'living_room' | 'shelf'>('living_room');

  // "Will It Fit?" AR Dimension Measurement State
  const [userSpaceWidth, setUserSpaceWidth] = useState<number>(50); // cm
  const [userSpaceHeight, setUserSpaceHeight] = useState<number>(45); // cm
  const [userSpaceDepth, setUserSpaceDepth] = useState<number>(30); // cm

  const meshRef = useRef<THREE.Mesh | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffeedd, 2.0);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd4c0a5, 1.0);
    dirLight2.position.set(-5, -2, -5);
    scene.add(dirLight2);

    // Create Lathe Geometry for traditional pottery/vase
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, -1.8));
    points.push(new THREE.Vector2(0.8, -1.8)); // Base
    points.push(new THREE.Vector2(1.2, -1.2));
    points.push(new THREE.Vector2(1.6, -0.4)); // Belly
    points.push(new THREE.Vector2(1.5, 0.4));
    points.push(new THREE.Vector2(0.9, 1.0)); // Neck
    points.push(new THREE.Vector2(0.7, 1.3));
    points.push(new THREE.Vector2(1.1, 1.8)); // Rim Lip
    points.push(new THREE.Vector2(0.9, 1.8));
    points.push(new THREE.Vector2(0.6, 1.3));
    points.push(new THREE.Vector2(0.8, -1.5));
    points.push(new THREE.Vector2(0, -1.5));

    const geometry = new THREE.LatheGeometry(points, 48);

    // Terracotta warm clay material
    const material = new THREE.MeshStandardMaterial({
      color: selectedCraftId === 'craft-2' ? 0x2255aa : selectedCraftId === 'craft-4' ? 0x6e472e : 0xc85a32,
      roughness: 0.65,
      metalness: 0.1,
      wireframe: wireframe,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Pedestal shadow plane
    const shadowGeo = new THREE.CircleGeometry(2, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.2,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.85;
    scene.add(shadowMesh);

    // Mouse drag interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !mesh) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const canvasEl = canvasRef.current;
    canvasEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (mesh && autoRotate && !isDragging) {
        mesh.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvasEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.dispose();
    };
  }, [selectedCraftId, autoRotate, wireframe]);

  // "Will It Fit?" Clearance Calculations
  const heightClearance = userSpaceHeight - craft.dimensions.height;
  const widthClearance = userSpaceWidth - craft.dimensions.width;
  const depthClearance = userSpaceDepth - craft.dimensions.depth;

  const fits = heightClearance >= 0 && widthClearance >= 0 && depthClearance >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-[#3a2012] to-amber-950 border border-amber-800/40 rounded-2xl p-6 text-amber-50 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs font-semibold mb-2">
              <Box className="w-3.5 h-3.5 text-orange-400" />
              <span>3D WebGL Engine & "Will It Fit?" AR Space Checker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              2D-to-3D Auto AR "View in Room"
            </h1>
            <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Buyers want to see how authentic handicrafts look in their homes. AI extrudes 2D artisan photos into measured 3D assets with real-scale space clearance calculations.
            </p>
          </div>

          {/* Craft Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-amber-900/40 p-1.5 rounded-xl border border-amber-700/50">
            <span className="text-xs text-amber-300 font-medium">Model:</span>
            <select
              value={craft.id}
              onChange={(e) => setSelectedCraftId(e.target.value)}
              className="bg-amber-950 text-amber-100 text-xs font-medium rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
            >
              {SAMPLE_CRAFTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.split(' ')[0]} - {c.category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = 3D Viewport with Backdrop, Right = "Will It Fit?" Measurement Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: 3D Interactive Viewport */}
        <div className="lg:col-span-7 bg-[#161310] border border-amber-800/50 rounded-3xl p-5 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Viewport Top Bar */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-xs">
              <div className="flex items-center gap-2 text-amber-200">
                <Eye className="w-4 h-4 text-orange-400" />
                <span className="font-semibold">{craft.name}</span>
                <span className="text-[10px] text-amber-400/80 font-mono">
                  Scale: 1:1 Actual ({craft.dimensions.width}×{craft.dimensions.height} cm)
                </span>
              </div>

              {/* Backdrop Modes */}
              <div className="flex items-center gap-1 bg-stone-900 p-0.5 rounded-lg border border-white/10">
                <button
                  onClick={() => setRoomBackdrop('living_room')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                    roomBackdrop === 'living_room' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Living Room
                </button>
                <button
                  onClick={() => setRoomBackdrop('shelf')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                    roomBackdrop === 'shelf' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Wood Shelf
                </button>
                <button
                  onClick={() => setRoomBackdrop('studio')}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                    roomBackdrop === 'studio' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Studio Grey
                </button>
              </div>
            </div>

            {/* Three.js Canvas Container with Backdrop Simulation */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/5 shadow-inner group">
              {/* Room Backdrop Images */}
              {roomBackdrop === 'living_room' && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30 filter blur-[1px]"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')`,
                  }}
                />
              )}
              {roomBackdrop === 'shelf' && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-35 filter blur-[1px]"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80')`,
                  }}
                />
              )}

              {/* WebGL Canvas */}
              <canvas
                ref={canvasRef}
                className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
              />

              {/* Instructions Overlay */}
              <div className="absolute bottom-3 left-3 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-amber-300 font-mono pointer-events-none border border-white/10">
                Drag mouse / touch to rotate 360°
              </div>
            </div>
          </div>

          {/* Viewport Bottom Controls */}
          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] transition-all ${
                autoRotate
                  ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                  : 'bg-stone-900 border-stone-700 text-stone-400'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Auto-Rotate: {autoRotate ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setWireframe(!wireframe)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] transition-all ${
                wireframe
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-stone-900 border-stone-700 text-stone-400'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Mesh Wireframe: {wireframe ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT: "Will It Fit?" AR Dimension Check Calculator */}
        <div className="lg:col-span-5 bg-amber-950/20 border border-amber-800/40 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-amber-800/40">
              <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-amber-100 font-serif">
                  "Will It Fit?" AR Dimension Check
                </h3>
                <p className="text-[11px] text-amber-300/70">
                  Compare artisan specs with your table or shelf space
                </p>
              </div>
            </div>

            {/* Confirmed Artisan Dimensions */}
            <div className="bg-amber-900/20 border border-amber-800/30 p-3.5 rounded-xl text-xs space-y-2">
              <span className="text-[11px] font-semibold text-amber-300 block">
                Artisan Handcrafted Dimensions:
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-center">
                <div className="bg-black/30 p-2 rounded border border-white/5">
                  <span className="text-amber-400/70 text-[10px] block">Height</span>
                  <strong className="text-amber-100">{craft.dimensions.height} cm</strong>
                </div>
                <div className="bg-black/30 p-2 rounded border border-white/5">
                  <span className="text-amber-400/70 text-[10px] block">Diameter</span>
                  <strong className="text-amber-100">{craft.dimensions.width} cm</strong>
                </div>
                <div className="bg-black/30 p-2 rounded border border-white/5">
                  <span className="text-amber-400/70 text-[10px] block">Weight</span>
                  <strong className="text-amber-100">{craft.dimensions.weightKg} kg</strong>
                </div>
              </div>
            </div>

            {/* Buyer Space Input Sliders */}
            <div className="space-y-3 text-xs">
              <span className="text-xs font-semibold text-amber-200 block">
                Enter Your Table / Shelf Clearances:
              </span>

              <div>
                <div className="flex justify-between text-[11px] text-amber-300 mb-1">
                  <span>Available Shelf Height:</span>
                  <span className="font-mono font-bold">{userSpaceHeight} cm</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={80}
                  value={userSpaceHeight}
                  onChange={(e) => setUserSpaceHeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-amber-950 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-amber-300 mb-1">
                  <span>Available Table Width:</span>
                  <span className="font-mono font-bold">{userSpaceWidth} cm</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={120}
                  value={userSpaceWidth}
                  onChange={(e) => setUserSpaceWidth(Number(e.target.value))}
                  className="w-full h-1.5 bg-amber-950 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </div>

            {/* Fit Result Outcome Banner */}
            <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
              fits
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm">
                {fits ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Fits Perfectly! ({heightClearance} cm Headroom)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>Too Tall for Shelf ({Math.abs(heightClearance)} cm short)</span>
                  </>
                )}
              </div>
              <p className="text-[11px] opacity-90 leading-relaxed">
                {fits
                  ? `Your space accommodates the 35cm vase with ample clearance for dry pampas grass or flower stalks.`
                  : `Your shelf clearance (${userSpaceHeight} cm) is smaller than the handcrafted vase (${craft.dimensions.height} cm). You can request a custom compact 20cm version directly from ${craft.artisanName}.`}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => alert(`Custom size request dispatched to ${craft.artisanName} in ${craft.village}!`)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-xl transition-all"
          >
            {fits ? 'Proceed to Buy with Verified Fit' : 'Request Custom Compact Size from Artisan'}
          </button>
        </div>
      </div>
    </div>
  );
};
