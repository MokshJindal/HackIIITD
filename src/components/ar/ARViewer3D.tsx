import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Eye, Maximize2, RotateCw, CheckCircle2, AlertTriangle, Sliders } from 'lucide-react';
import { SAMPLE_CRAFTS } from '../../data/mockData';
import { CraftSample } from '../../types';

export const ARViewer3D: React.FC = () => {
  const [selectedCraftId, setSelectedCraftId] = useState<string>('craft-1');
  const craft: CraftSample = SAMPLE_CRAFTS.find(c => c.id === selectedCraftId) || SAMPLE_CRAFTS[0];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [roomBackdrop, setRoomBackdrop] = useState<'living_room' | 'shelf' | 'studio'>('living_room');

  const [userSpaceWidth, setUserSpaceWidth] = useState<number>(50);
  const [userSpaceHeight, setUserSpaceHeight] = useState<number>(45);
  const [userSpaceDepth, setUserSpaceDepth] = useState<number>(30);

  const meshRef = useRef<THREE.Mesh | null>(null);

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

    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffeedd, 2.0);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xd4c0a5, 1.0);
    dirLight2.position.set(-5, -2, -5);
    scene.add(dirLight2);

    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, -1.8));
    points.push(new THREE.Vector2(0.8, -1.8));
    points.push(new THREE.Vector2(1.2, -1.2));
    points.push(new THREE.Vector2(1.6, -0.4));
    points.push(new THREE.Vector2(1.5, 0.4));
    points.push(new THREE.Vector2(0.9, 1.0));
    points.push(new THREE.Vector2(0.7, 1.3));
    points.push(new THREE.Vector2(1.1, 1.8));
    points.push(new THREE.Vector2(0.9, 1.8));
    points.push(new THREE.Vector2(0.6, 1.3));
    points.push(new THREE.Vector2(0.8, -1.5));
    points.push(new THREE.Vector2(0, -1.5));

    const geometry = new THREE.LatheGeometry(points, 48);

    const material = new THREE.MeshStandardMaterial({
      color: selectedCraftId === 'craft-2' ? 0x2255aa : selectedCraftId === 'craft-4' ? 0x6e472e : 0xc85a32,
      roughness: 0.65,
      metalness: 0.1,
      wireframe: wireframe,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    const shadowGeo = new THREE.CircleGeometry(2, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.12,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.85;
    scene.add(shadowMesh);

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

  const heightClearance = userSpaceHeight - craft.dimensions.height;
  const widthClearance = userSpaceWidth - craft.dimensions.width;
  const depthClearance = userSpaceDepth - craft.dimensions.depth;

  const fits = heightClearance >= 0 && widthClearance >= 0 && depthClearance >= 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm text-stone-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-2">
              <Box className="w-3.5 h-3.5 text-stone-700" />
              <span>3D WebGL Engine & "Will It Fit?" AR Space Checker</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              2D-to-3D Auto AR "View in Room"
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Preview authentic handicrafts at measured scale with real space clearance checks.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-stone-50 p-1.5 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-600 font-medium">Model:</span>
            <select
              value={craft.id}
              onChange={(e) => setSelectedCraftId(e.target.value)}
              className="bg-white text-stone-900 text-xs font-medium rounded-lg px-2.5 py-1 border border-stone-200 focus:outline-none cursor-pointer"
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

      {/* Main Grid: Left = 3D Viewport, Right = Dimension Clearance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: 3D Viewport */}
        <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-100 text-xs">
              <div className="flex items-center gap-2 text-stone-800">
                <Eye className="w-4 h-4 text-stone-600" />
                <span className="font-semibold">{craft.name}</span>
                <span className="text-stone-500 font-mono text-[11px]">
                  ({craft.dimensions.width}×{craft.dimensions.height} cm)
                </span>
              </div>

              <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                <button
                  onClick={() => setRoomBackdrop('living_room')}
                  className={`px-2.5 py-0.5 rounded text-xs font-medium transition-all ${
                    roomBackdrop === 'living_room' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Living Room
                </button>
                <button
                  onClick={() => setRoomBackdrop('shelf')}
                  className={`px-2.5 py-0.5 rounded text-xs font-medium transition-all ${
                    roomBackdrop === 'shelf' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Wood Shelf
                </button>
                <button
                  onClick={() => setRoomBackdrop('studio')}
                  className={`px-2.5 py-0.5 rounded text-xs font-medium transition-all ${
                    roomBackdrop === 'studio' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Studio
                </button>
              </div>
            </div>

            <div className="relative w-full h-80 sm:h-92 rounded-xl overflow-hidden border border-stone-200 bg-[#fbfaf8] group">
              {roomBackdrop === 'living_room' && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[1px]"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80')`,
                  }}
                />
              )}
              {roomBackdrop === 'shelf' && (
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[1px]"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1200&q=80')`,
                  }}
                />
              )}

              <canvas
                ref={canvasRef}
                className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
              />

              <div className="absolute bottom-3 left-3 z-20 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-stone-600 font-mono pointer-events-none border border-stone-200 shadow-xs">
                Drag to rotate 360°
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                autoRotate
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Auto-Rotate: {autoRotate ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setWireframe(!wireframe)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors ${
                wireframe
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Mesh Wireframe: {wireframe ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT: "Will It Fit?" AR Dimension Check */}
        <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center border border-stone-200">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-900 font-serif">
                  "Will It Fit?" AR Dimension Check
                </h3>
                <p className="text-xs text-stone-500">
                  Compare artisan specs with your table or shelf space
                </p>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl text-xs space-y-2">
              <span className="text-xs font-semibold text-stone-800 block">
                Artisan Handcrafted Dimensions:
              </span>
              <div className="grid grid-cols-3 gap-2 font-mono text-center">
                <div className="bg-white p-2 rounded-lg border border-stone-200">
                  <span className="text-stone-400 text-[10px] block">Height</span>
                  <strong className="text-stone-900">{craft.dimensions.height} cm</strong>
                </div>
                <div className="bg-white p-2 rounded-lg border border-stone-200">
                  <span className="text-stone-400 text-[10px] block">Diameter</span>
                  <strong className="text-stone-900">{craft.dimensions.width} cm</strong>
                </div>
                <div className="bg-white p-2 rounded-lg border border-stone-200">
                  <span className="text-stone-400 text-[10px] block">Weight</span>
                  <strong className="text-stone-900">{craft.dimensions.weightKg} kg</strong>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <span className="text-xs font-semibold text-stone-800 block">
                Enter Your Table / Shelf Clearances:
              </span>

              <div>
                <div className="flex justify-between text-xs text-stone-600 mb-1">
                  <span>Available Shelf Height:</span>
                  <span className="font-mono font-bold text-stone-900">{userSpaceHeight} cm</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={80}
                  value={userSpaceHeight}
                  onChange={(e) => setUserSpaceHeight(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-stone-600 mb-1">
                  <span>Available Table Width:</span>
                  <span className="font-mono font-bold text-stone-900">{userSpaceWidth} cm</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={120}
                  value={userSpaceWidth}
                  onChange={(e) => setUserSpaceWidth(Number(e.target.value))}
                  className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
              </div>
            </div>

            {/* Fit Result Outcome Banner */}
            <div className={`p-4 rounded-xl border text-xs space-y-1 ${
              fits
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-sm">
                {fits ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Fits Comfortably ({heightClearance} cm Headroom)</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
                    <span>Too Tall for Shelf ({Math.abs(heightClearance)} cm short)</span>
                  </>
                )}
              </div>
              <p className="text-xs opacity-90 leading-relaxed">
                {fits
                  ? `Your space accommodates the 35cm vase with ample clearance for dry pampas grass or flower stalks.`
                  : `Your shelf clearance (${userSpaceHeight} cm) is smaller than the handcrafted vase (${craft.dimensions.height} cm). You can request a custom compact version directly from ${craft.artisanName}.`}
              </p>
            </div>
          </div>

          <button
            onClick={() => alert(`Custom size request dispatched to ${craft.artisanName} in ${craft.village}!`)}
            className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs shadow-xs transition-colors"
          >
            {fits ? 'Proceed to Buy with Verified Fit' : 'Request Custom Compact Size from Artisan'}
          </button>
        </div>
      </div>
    </div>
  );
};
