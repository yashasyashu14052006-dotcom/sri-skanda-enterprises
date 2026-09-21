/**
 * VOLUMETRIC 3D ANIME ATHLETE & CINEMATIC VOLLEYBALL ARENA
 * Complete 3D humanoid mesh system with organic curves, anatomical musculature,
 * authentic volleyball approach/jump/cock/smash kinematics, and explosive VFX.
 */

import * as THREE from '../vendor/three.module.js';

export class VolleyballScene {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();

    // 3D Environment & Objects
    this.courtMesh = null;
    this.netGroup = null;
    this.volleyball = null;
    this.ballTrail = null;
    this.dustParticles = null;
    this.smashSparks = null;
    this.shockwaveMesh = null;
    this.secondaryShockwave = null;
    this.godRays = [];
    this.scoreboard = null;
    this.lights = {};

    // 3D Full Mesh Humanoid Character Rig
    this.athleteGroup = null;
    this.rig = {
      root: null,
      torso: null,
      chest: null,
      neck: null,
      head: null,
      // Right Arm (Spiking)
      rightShoulder: null,
      rightUpperArm: null,
      rightElbow: null,
      rightForearm: null,
      rightWrist: null,
      rightHand: null,
      // Left Arm (Guide & Balance)
      leftShoulder: null,
      leftUpperArm: null,
      leftElbow: null,
      leftForearm: null,
      leftWrist: null,
      leftHand: null,
      // Pelvis & Legs
      pelvis: null,
      rightHip: null,
      rightThigh: null,
      rightKnee: null,
      rightShin: null,
      rightAnkle: null,
      rightFoot: null,
      leftHip: null,
      leftThigh: null,
      leftKnee: null,
      leftShin: null,
      leftAnkle: null,
      leftFoot: null,
      shadow: null
    };

    // Scroll & Smash State
    this.scrollProgress = 0; // 0.0 to 1.0
    this.targetScrollProgress = 0;
    this.isSmashTriggered = false;
    this.onSmashContactCallback = null;

    this.init();
  }

  init() {
    // 1. Scene & Atmosphere Setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x040508);
    this.scene.fog = new THREE.FogExp2(0x040508, 0.032);

    // 2. Camera Setup
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 150);
    this.camera.position.set(0, 0.4, 8.2);
    this.cameraTarget = new THREE.Vector3(0, 1.3, 0);

    // 3. High-Performance WebGL Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    this.container.appendChild(this.renderer.domElement);

    // 4. Build Arena, Lighting & 3D Character
    this.setupLighting();
    this.buildStadiumArena();
    this.buildCourt();
    this.buildNet();
    this.buildVolleyball();
    this.buildBallTrail();
    this.buildVolumetric3DAnimeAthlete();
    this.buildAtmosphere();
    this.buildVolumetricGodRays();
    this.buildSmashVFX();

    // 5. Window Resize Handler
    window.addEventListener('resize', this.onResize.bind(this));

    // 6. Start Render Loop
    this.render();
  }

  setupLighting() {
    // Ambient arena base
    this.lights.ambient = new THREE.AmbientLight(0xffffff, 0.28);
    this.scene.add(this.lights.ambient);

    // Main Overhead Stadium Spotlights
    this.lights.mainSpot = new THREE.SpotLight(0xffffff, 4.5, 45, Math.PI / 3.0, 0.45, 1.1);
    this.lights.mainSpot.position.set(0, 14, 3);
    this.lights.mainSpot.castShadow = true;
    this.lights.mainSpot.shadow.mapSize.width = 2048;
    this.lights.mainSpot.shadow.mapSize.height = 2048;
    this.scene.add(this.lights.mainSpot);

    // Electric Orange Rim Light
    this.lights.rimOrange = new THREE.DirectionalLight(0xff5500, 3.5);
    this.lights.rimOrange.position.set(-8, 7, -6);
    this.scene.add(this.lights.rimOrange);

    // Cyan / Silver Key Light
    this.lights.rimBlue = new THREE.DirectionalLight(0x38bdf8, 2.2);
    this.lights.rimBlue.position.set(8, 6, -5);
    this.scene.add(this.lights.rimBlue);

    // Soft Warm Front Fill
    this.lights.frontFill = new THREE.DirectionalLight(0xffeedd, 1.2);
    this.lights.frontFill.position.set(0, 4, 9);
    this.scene.add(this.lights.frontFill);

    // Smash Impact Point Light
    this.lights.impactFlash = new THREE.PointLight(0xffffff, 0, 35);
    this.lights.impactFlash.position.set(0, 3.4, 0);
    this.scene.add(this.lights.impactFlash);
  }

  buildStadiumArena() {
    const arenaGroup = new THREE.Group();

    // Grandstand Seating Tiers
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x090b12,
      roughness: 0.85,
      metalness: 0.2
    });

    for (let tier = 0; tier < 8; tier++) {
      const row = new THREE.Mesh(new THREE.BoxGeometry(30, 0.85, 1.3), standMat);
      row.position.set(0, tier * 0.8 + 0.8, -14 - tier * 1.2);
      arenaGroup.add(row);
    }

    for (let tier = 0; tier < 6; tier++) {
      const leftRow = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.85, 32), standMat);
      leftRow.position.set(-12 - tier * 1.2, tier * 0.8 + 0.8, 0);
      const rightRow = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.85, 32), standMat);
      rightRow.position.set(12 + tier * 1.2, tier * 0.8 + 0.8, 0);
      arenaGroup.add(leftRow, rightRow);
    }

    // Suspended LED Jumbotron Scoreboard
    const scoreCanvas = document.createElement('canvas');
    scoreCanvas.width = 512;
    scoreCanvas.height = 256;
    const sCtx = scoreCanvas.getContext('2d');
    sCtx.fillStyle = '#05070d';
    sCtx.fillRect(0, 0, 512, 256);
    sCtx.strokeStyle = '#ff5500';
    sCtx.lineWidth = 8;
    sCtx.strokeRect(10, 10, 492, 236);

    sCtx.fillStyle = '#ff5500';
    sCtx.font = 'bold 36px "Space Grotesk", monospace';
    sCtx.textAlign = 'center';
    sCtx.fillText('DISTRICT CHAMPIONSHIP', 256, 62);

    sCtx.fillStyle = '#ffffff';
    sCtx.font = 'bold 84px "Bebas Neue", sans-serif';
    sCtx.fillText('EPCET VC  24 : 23', 256, 152);

    sCtx.fillStyle = '#94a3b8';
    sCtx.font = 'bold 28px "Space Grotesk", monospace';
    sCtx.fillText('OUTSIDE ATTACKER #17 YASHU', 256, 212);

    const scoreTex = new THREE.CanvasTexture(scoreCanvas);
    const scoreMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 4.5),
      new THREE.MeshBasicMaterial({ map: scoreTex })
    );
    scoreMesh.position.set(0, 9.5, -17);
    arenaGroup.add(scoreMesh);
    this.scoreboard = scoreMesh;

    // Overhead Steel Truss Girders
    const trussMat = new THREE.MeshStandardMaterial({ color: 0x1a1e28, metalness: 0.85, roughness: 0.3 });
    for (let z = -12; z <= 12; z += 6) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(28, 0.4, 0.4), trussMat);
      beam.position.set(0, 12, z);
      arenaGroup.add(beam);
    }

    this.scene.add(arenaGroup);
  }

  buildCourt() {
    const courtGeo = new THREE.PlaneGeometry(20, 30);
    const textureLoader = new THREE.TextureLoader();
    const courtTex = textureLoader.load('./textures/court_floor_texture.jpg', (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
    });

    const courtMat = new THREE.MeshStandardMaterial({
      color: 0x242834,
      roughness: 0.16,
      metalness: 0.28,
      map: courtTex
    });

    this.courtMesh = new THREE.Mesh(courtGeo, courtMat);
    this.courtMesh.rotation.x = -Math.PI / 2;
    this.courtMesh.receiveShadow = true;
    this.scene.add(this.courtMesh);

    // Court Regulation Markings
    const linesGroup = new THREE.Group();
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.85, transparent: true });

    // Boundary Rect: 9m x 18m
    const outerGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4.5, 0.02, -9),
      new THREE.Vector3(4.5, 0.02, -9),
      new THREE.Vector3(4.5, 0.02, 9),
      new THREE.Vector3(-4.5, 0.02, 9),
      new THREE.Vector3(-4.5, 0.02, -9)
    ]);
    linesGroup.add(new THREE.Line(outerGeo, lineMat));

    // Center Line
    const centerGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4.5, 0.02, 0),
      new THREE.Vector3(4.5, 0.02, 0)
    ]);
    linesGroup.add(new THREE.Line(centerGeo, lineMat));

    // 3-Meter Attack Lines
    const attackMat = new THREE.MeshBasicMaterial({ color: 0xff5500, opacity: 0.8, transparent: true });
    const attack1Geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4.5, 0.02, -3),
      new THREE.Vector3(4.5, 0.02, -3)
    ]);
    const attack2Geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4.5, 0.02, 3),
      new THREE.Vector3(4.5, 0.02, 3)
    ]);
    linesGroup.add(new THREE.Line(attack1Geo, attackMat));
    linesGroup.add(new THREE.Line(attack2Geo, attackMat));

    this.scene.add(linesGroup);
  }

  buildNet() {
    this.netGroup = new THREE.Group();

    // Steel Posts with blue protective padding
    const poleGeo = new THREE.CylinderGeometry(0.075, 0.075, 2.7, 16);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.4, roughness: 0.4 });

    const leftPole = new THREE.Mesh(poleGeo, padMat);
    leftPole.position.set(-5.2, 1.35, 0);
    leftPole.castShadow = true;

    const rightPole = new THREE.Mesh(poleGeo, padMat);
    rightPole.position.set(5.2, 1.35, 0);
    rightPole.castShadow = true;

    this.netGroup.add(leftPole, rightPole);

    // Regulation Net Mesh (Height 1.0m, Top at 2.43m)
    const netGeo = new THREE.PlaneGeometry(9.8, 1.0, 36, 10);
    const netMat = new THREE.MeshStandardMaterial({
      color: 0x12141a,
      roughness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    });
    const netMesh = new THREE.Mesh(netGeo, netMat);
    netMesh.position.set(0, 1.93, 0);
    this.netGroup.add(netMesh);

    // Top White Tape Band
    const topTape = new THREE.Mesh(
      new THREE.BoxGeometry(10.0, 0.09, 0.025),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.25 })
    );
    topTape.position.set(0, 2.43, 0);
    this.netGroup.add(topTape);

    // Antennas
    const antennaGeo = new THREE.CylinderGeometry(0.016, 0.016, 1.8, 8);
    const antennaMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const leftAntenna = new THREE.Mesh(antennaGeo, antennaMat);
    leftAntenna.position.set(-4.5, 2.3, 0);
    const rightAntenna = new THREE.Mesh(antennaGeo, antennaMat);
    rightAntenna.position.set(4.5, 2.3, 0);
    this.netGroup.add(leftAntenna, rightAntenna);

    this.scene.add(this.netGroup);
  }

  buildVolleyball() {
    const ballGeo = new THREE.SphereGeometry(0.245, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    const ballTex = textureLoader.load('./textures/volleyball_texture.jpg');
    
    const ballMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.26,
      metalness: 0.12,
      map: ballTex
    });

    this.volleyball = new THREE.Mesh(ballGeo, ballMat);
    this.volleyball.castShadow = true;
    this.volleyball.position.set(0, 0.245, 4.8);
    this.scene.add(this.volleyball);
  }

  buildBallTrail() {
    const count = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = 0;
      positions[i + 1] = 0;
      positions[i + 2] = 0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xff6600,
      size: 0.22,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });

    this.ballTrail = new THREE.Points(geometry, pMat);
    this.scene.add(this.ballTrail);
  }

  /**
   * BUILD VOLUMETRIC 3D ANIME ATHLETE (YASHU #17)
   * Anatomically articulated 3D humanoid mesh with organic curves, smooth joints,
   * sculpted anime head, spiky 3D hair, and authentic jersey #17 textures.
   */
  buildVolumetric3DAnimeAthlete() {
    this.athleteGroup = new THREE.Group();

    // High-End Shaders
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xa86c44, // Warm athletic tanned anime skin tone
      roughness: 0.45,
      metalness: 0.08
    });

    const jerseyMat = new THREE.MeshStandardMaterial({
      color: 0x0c1424, // Midnight navy
      roughness: 0.4,
      metalness: 0.12
    });

    const jerseyTrimMat = new THREE.MeshStandardMaterial({
      color: 0xff5500, // Electric orange piping
      roughness: 0.3
    });

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x14151c, // Anime raven black
      roughness: 0.6,
      metalness: 0.25
    });

    const shoeMat = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      roughness: 0.35,
      metalness: 0.2
    });

    const sockMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.5
    });

    // 1. ROOT & TORSO (Pelvis / Abdomen / Chest)
    const root = new THREE.Group();
    root.position.set(0, 1.35, 0);

    const torso = new THREE.Group();
    root.add(torso);
    this.rig.torso = torso;

    // Muscular Chest (V-Taper Upper Torso)
    const chestGeo = new THREE.CylinderGeometry(0.36, 0.30, 0.55, 20);
    chestGeo.scale(1.0, 1.0, 0.65);
    const chestMesh = new THREE.Mesh(chestGeo, jerseyMat);
    chestMesh.position.set(0, 0.3, 0);
    chestMesh.castShadow = true;
    torso.add(chestMesh);

    // Abdomen / Midsection
    const absGeo = new THREE.CylinderGeometry(0.30, 0.26, 0.35, 20);
    absGeo.scale(1.0, 1.0, 0.65);
    const absMesh = new THREE.Mesh(absGeo, jerseyMat);
    absMesh.position.set(0, -0.1, 0);
    absMesh.castShadow = true;
    torso.add(absMesh);

    // Jersey #17 Decals (Front & Back)
    const chestCanvas = document.createElement('canvas');
    chestCanvas.width = 256;
    chestCanvas.height = 256;
    const cCtx = chestCanvas.getContext('2d');
    cCtx.fillStyle = '#0c1424';
    cCtx.fillRect(0, 0, 256, 256);
    // EPCET Logo badge
    cCtx.fillStyle = '#ff5500';
    cCtx.fillRect(35, 30, 48, 22);
    cCtx.fillStyle = '#ffffff';
    cCtx.font = 'bold 16px "Space Grotesk", sans-serif';
    cCtx.fillText('EPCET', 38, 46);
    // Number 17
    cCtx.fillStyle = '#ffffff';
    cCtx.font = 'bold 150px "Bebas Neue", sans-serif';
    cCtx.textAlign = 'center';
    cCtx.fillText('17', 128, 175);

    const chestTex = new THREE.CanvasTexture(chestCanvas);
    const chestDecal = new THREE.Mesh(
      new THREE.PlaneGeometry(0.42, 0.42),
      new THREE.MeshBasicMaterial({ map: chestTex, transparent: true })
    );
    chestDecal.position.set(0, 0.32, 0.205);
    torso.add(chestDecal);

    // Back Decal (YASHU #17)
    const backCanvas = document.createElement('canvas');
    backCanvas.width = 256;
    backCanvas.height = 256;
    const bCtx = backCanvas.getContext('2d');
    bCtx.fillStyle = '#0c1424';
    bCtx.fillRect(0, 0, 256, 256);
    bCtx.fillStyle = '#ffffff';
    bCtx.font = 'bold 52px "Bebas Neue", sans-serif';
    bCtx.textAlign = 'center';
    bCtx.fillText('YASHU', 128, 65);
    bCtx.font = 'bold 135px "Bebas Neue", sans-serif';
    bCtx.fillText('17', 128, 175);

    const backTex = new THREE.CanvasTexture(backCanvas);
    const backDecal = new THREE.Mesh(
      new THREE.PlaneGeometry(0.42, 0.42),
      new THREE.MeshBasicMaterial({ map: backTex, transparent: true })
    );
    backDecal.rotation.y = Math.PI;
    backDecal.position.set(0, 0.32, -0.205);
    torso.add(backDecal);

    // Jersey Orange Piping / Collar V-Neck
    const collar = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.022, 12, 24),
      jerseyTrimMat
    );
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, 0.58, 0);
    torso.add(collar);

    // 2. NECK & HEAD (Sculpted Anime Head & Spiky Hair)
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.22, 16), skinMat);
    neck.position.set(0, 0.65, 0);
    torso.add(neck);

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.88, 0.02);
    torso.add(headGroup);
    this.rig.head = headGroup;

    // Sculpted Head Jawline
    const headMesh = new THREE.Mesh(new THREE.SphereGeometry(0.185, 20, 20), skinMat);
    headMesh.scale.set(0.92, 1.08, 0.95);
    headMesh.castShadow = true;
    headGroup.add(headMesh);

    // Anime Eyes & Facial Features Decal
    const faceCanvas = document.createElement('canvas');
    faceCanvas.width = 256;
    faceCanvas.height = 256;
    const fCtx = faceCanvas.getContext('2d');
    fCtx.clearRect(0, 0, 256, 256);
    // Left Eye
    fCtx.fillStyle = '#ffffff';
    fCtx.beginPath();
    fCtx.ellipse(85, 120, 22, 14, -0.15, 0, Math.PI * 2);
    fCtx.fill();
    fCtx.fillStyle = '#ff5500'; // Amber/Orange Anime Iris
    fCtx.beginPath();
    fCtx.arc(88, 120, 10, 0, Math.PI * 2);
    fCtx.fill();
    fCtx.fillStyle = '#111111';
    fCtx.beginPath();
    fCtx.arc(88, 120, 5, 0, Math.PI * 2);
    fCtx.fill();
    // Brow
    fCtx.strokeStyle = '#0f172a';
    fCtx.lineWidth = 6;
    fCtx.beginPath();
    fCtx.moveTo(60, 102);
    fCtx.lineTo(105, 112);
    fCtx.stroke();

    // Right Eye
    fCtx.fillStyle = '#ffffff';
    fCtx.beginPath();
    fCtx.ellipse(170, 120, 22, 14, 0.15, 0, Math.PI * 2);
    fCtx.fill();
    fCtx.fillStyle = '#ff5500';
    fCtx.beginPath();
    fCtx.arc(168, 120, 10, 0, Math.PI * 2);
    fCtx.fill();
    fCtx.fillStyle = '#111111';
    fCtx.beginPath();
    fCtx.arc(168, 120, 5, 0, Math.PI * 2);
    fCtx.fill();
    // Brow
    fCtx.beginPath();
    fCtx.moveTo(195, 102);
    fCtx.lineTo(150, 112);
    fCtx.stroke();

    const faceTex = new THREE.CanvasTexture(faceCanvas);
    const faceDecal = new THREE.Mesh(
      new THREE.PlaneGeometry(0.30, 0.30),
      new THREE.MeshBasicMaterial({ map: faceTex, transparent: true })
    );
    faceDecal.position.set(0, 0.02, 0.18);
    headGroup.add(faceDecal);

    // 3D Anime Spiky Hair Clusters (14 Sculpted Hair Spikes)
    const hairBase = new THREE.Mesh(
      new THREE.SphereGeometry(0.20, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.7),
      hairMat
    );
    hairBase.position.set(0, 0.04, -0.02);
    headGroup.add(hairBase);

    const spikeGeo = new THREE.ConeGeometry(0.065, 0.22, 5);
    const spikeConfigs = [
      { pos: [0, 0.22, 0.08], rot: [0.4, 0, 0] },
      { pos: [0.08, 0.21, 0.06], rot: [0.35, 0.2, -0.2] },
      { pos: [-0.08, 0.21, 0.06], rot: [0.35, -0.2, 0.2] },
      { pos: [0.14, 0.16, 0.02], rot: [0.1, 0.4, -0.5] },
      { pos: [-0.14, 0.16, 0.02], rot: [0.1, -0.4, 0.5] },
      { pos: [0, 0.2, -0.12], rot: [-0.4, 0, 0] },
      { pos: [0.09, 0.18, -0.1], rot: [-0.35, 0.2, -0.3] },
      { pos: [-0.09, 0.18, -0.1], rot: [-0.35, -0.2, 0.3] }
    ];

    spikeConfigs.forEach((cfg) => {
      const spike = new THREE.Mesh(spikeGeo, hairMat);
      spike.position.set(...cfg.pos);
      spike.rotation.set(...cfg.rot);
      headGroup.add(spike);
    });

    // 3. RIGHT ARM RIG (PRIMARY SPIKING WEAPON)
    const rightShoulder = new THREE.Group();
    rightShoulder.position.set(0.42, 0.48, 0);
    torso.add(rightShoulder);
    this.rig.rightShoulder = rightShoulder;

    const rDeltoid = new THREE.Mesh(new THREE.SphereGeometry(0.115, 14, 14), skinMat);
    rightShoulder.add(rDeltoid);

    const rUpperArm = new THREE.Group();
    rightShoulder.add(rUpperArm);
    this.rig.rightUpperArm = rUpperArm;

    const rBicep = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.082, 0.38, 14), skinMat);
    rBicep.position.set(0, -0.19, 0);
    rBicep.castShadow = true;
    rUpperArm.add(rBicep);

    const rightElbow = new THREE.Group();
    rightElbow.position.set(0, -0.38, 0);
    rUpperArm.add(rightElbow);
    this.rig.rightElbow = rightElbow;

    const rForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.068, 0.38, 14), skinMat);
    rForearm.position.set(0, -0.19, 0);
    rForearm.castShadow = true;
    rightElbow.add(rForearm);

    // Athletic Wrist Tape
    const rWristTape = new THREE.Mesh(new THREE.CylinderGeometry(0.072, 0.072, 0.08, 14), sockMat);
    rWristTape.position.set(0, -0.32, 0);
    rightElbow.add(rWristTape);

    // Open Hand Ready to Smash
    const rightHand = new THREE.Group();
    rightHand.position.set(0, -0.42, 0);
    rightElbow.add(rightHand);
    this.rig.rightHand = rightHand;

    const rPalm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.045), skinMat);
    rPalm.position.set(0, -0.08, 0);
    rPalm.castShadow = true;
    rightHand.add(rPalm);

    // 4. LEFT ARM RIG (TRACKING & BALANCE)
    const leftShoulder = new THREE.Group();
    leftShoulder.position.set(-0.42, 0.48, 0);
    torso.add(leftShoulder);
    this.rig.leftShoulder = leftShoulder;

    const lDeltoid = new THREE.Mesh(new THREE.SphereGeometry(0.115, 14, 14), skinMat);
    leftShoulder.add(lDeltoid);

    const lUpperArm = new THREE.Group();
    leftShoulder.add(lUpperArm);
    this.rig.leftUpperArm = lUpperArm;

    const lBicep = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.082, 0.38, 14), skinMat);
    lBicep.position.set(0, -0.19, 0);
    lBicep.castShadow = true;
    lUpperArm.add(lBicep);

    const leftElbow = new THREE.Group();
    leftElbow.position.set(0, -0.38, 0);
    lUpperArm.add(leftElbow);
    this.rig.leftElbow = leftElbow;

    const lForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.068, 0.38, 14), skinMat);
    lForearm.position.set(0, -0.19, 0);
    lForearm.castShadow = true;
    leftElbow.add(lForearm);

    const leftHand = new THREE.Group();
    leftHand.position.set(0, -0.42, 0);
    leftElbow.add(leftHand);
    this.rig.leftHand = leftHand;

    const lPalm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.16, 0.045), skinMat);
    lPalm.position.set(0, -0.08, 0);
    lPalm.castShadow = true;
    leftHand.add(lPalm);

    // 5. PELVIS & VOLLEYBALL SHORTS
    const pelvis = new THREE.Group();
    pelvis.position.set(0, -0.28, 0);
    torso.add(pelvis);
    this.rig.pelvis = pelvis;

    const shortsMesh = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.38, 0.38), jerseyMat);
    shortsMesh.castShadow = true;
    pelvis.add(shortsMesh);

    // 6. LEGS & VOLLEYBALL COURT SHOES
    // Right Leg
    const rightHip = new THREE.Group();
    rightHip.position.set(0.19, -0.2, 0);
    pelvis.add(rightHip);
    this.rig.rightHip = rightHip;

    const rThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.092, 0.48, 16), skinMat);
    rThigh.position.set(0, -0.24, 0);
    rThigh.castShadow = true;
    rightHip.add(rThigh);

    const rightKnee = new THREE.Group();
    rightKnee.position.set(0, -0.48, 0);
    rightHip.add(rightKnee);
    this.rig.rightKnee = rightKnee;

    // Knee Pad
    const rKneePad = new THREE.Mesh(
      new THREE.CylinderGeometry(0.105, 0.105, 0.18, 16),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 })
    );
    rightKnee.add(rKneePad);

    const rShin = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.078, 0.48, 16), skinMat);
    rShin.position.set(0, -0.24, 0);
    rShin.castShadow = true;
    rightKnee.add(rShin);

    const rightAnkle = new THREE.Group();
    rightAnkle.position.set(0, -0.48, 0);
    rightKnee.add(rightAnkle);
    this.rig.rightAnkle = rightAnkle;

    const rSock = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.082, 0.14, 14), sockMat);
    rSock.position.set(0, -0.04, 0);
    rightAnkle.add(rSock);

    const rShoe = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.34), shoeMat);
    rShoe.position.set(0, -0.12, 0.06);
    rShoe.castShadow = true;
    rightAnkle.add(rShoe);

    // Left Leg
    const leftHip = new THREE.Group();
    leftHip.position.set(-0.19, -0.2, 0);
    pelvis.add(leftHip);
    this.rig.leftHip = leftHip;

    const lThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.092, 0.48, 16), skinMat);
    lThigh.position.set(0, -0.24, 0);
    lThigh.castShadow = true;
    leftHip.add(lThigh);

    const leftKnee = new THREE.Group();
    leftKnee.position.set(0, -0.48, 0);
    leftHip.add(leftKnee);
    this.rig.leftKnee = leftKnee;

    const lKneePad = new THREE.Mesh(
      new THREE.CylinderGeometry(0.105, 0.105, 0.18, 16),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5 })
    );
    leftKnee.add(lKneePad);

    const lShin = new THREE.Mesh(new THREE.CylinderGeometry(0.092, 0.078, 0.48, 16), skinMat);
    lShin.position.set(0, -0.24, 0);
    lShin.castShadow = true;
    leftKnee.add(lShin);

    const leftAnkle = new THREE.Group();
    leftAnkle.position.set(0, -0.48, 0);
    leftKnee.add(leftAnkle);
    this.rig.leftAnkle = leftAnkle;

    const lSock = new THREE.Mesh(new THREE.CylinderGeometry(0.082, 0.082, 0.14, 14), sockMat);
    lSock.position.set(0, -0.04, 0);
    leftAnkle.add(lSock);

    const lShoe = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.34), shoeMat);
    lShoe.position.set(0, -0.12, 0.06);
    lShoe.castShadow = true;
    leftAnkle.add(lShoe);

    // 7. Dynamic Court Contact Shadow
    const shadowGeo = new THREE.PlaneGeometry(1.8, 1.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.7
    });
    this.rig.shadow = new THREE.Mesh(shadowGeo, shadowMat);
    this.rig.shadow.rotation.x = -Math.PI / 2;
    this.rig.shadow.position.set(0, 0.025, 0);
    this.athleteGroup.add(this.rig.shadow);

    this.athleteGroup.add(root);
    this.rig.root = root;

    // Position athlete in backcourt
    this.athleteGroup.position.set(0, 0, -2.8);
    this.scene.add(this.athleteGroup);
  }

  buildAtmosphere() {
    const particleCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 22;
      positions[i + 1] = Math.random() * 11 + 0.2;
      positions[i + 2] = (Math.random() - 0.5) * 24;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const pMat = new THREE.PointsMaterial({
      color: 0xffeedd,
      size: 0.075,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    this.dustParticles = new THREE.Points(geometry, pMat);
    this.scene.add(this.dustParticles);
  }

  buildVolumetricGodRays() {
    const coneGeo = new THREE.ConeGeometry(4.6, 14, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.055,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const beam1 = new THREE.Mesh(coneGeo, coneMat);
    beam1.position.set(-3.5, 7, 2);
    beam1.rotation.x = Math.PI;

    const beam2 = new THREE.Mesh(coneGeo, coneMat);
    beam2.position.set(3.5, 7, -1);
    beam2.rotation.x = Math.PI;

    this.godRays.push(beam1, beam2);
    this.scene.add(beam1, beam2);
  }

  buildSmashVFX() {
    // Dual Expanding Fiery Shockwave Rings
    const shockGeo = new THREE.RingGeometry(0.1, 0.45, 36);
    const shockMat = new THREE.MeshBasicMaterial({
      color: 0xff5500,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    this.shockwaveMesh = new THREE.Mesh(shockGeo, shockMat);
    this.shockwaveMesh.position.set(0, 3.3, 0.2);
    this.shockwaveMesh.rotation.x = Math.PI / 2;
    this.scene.add(this.shockwaveMesh);

    const secMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    this.secondaryShockwave = new THREE.Mesh(shockGeo, secMat);
    this.secondaryShockwave.position.set(0, 3.3, 0.2);
    this.secondaryShockwave.rotation.x = Math.PI / 2;
    this.scene.add(this.secondaryShockwave);

    // 150+ Explosive Contact Sparks
    const sparkCount = 150;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    this.sparkVelocities = [];

    for (let i = 0; i < sparkCount; i++) {
      sparkPos[i * 3] = 0.2;
      sparkPos[i * 3 + 1] = 3.3;
      sparkPos[i * 3 + 2] = -0.2;

      this.sparkVelocities.push(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 16 + 2.0,
        (Math.random() - 0.5) * 16
      );
    }

    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    this.smashSparks = new THREE.Points(
      sparkGeo,
      new THREE.PointsMaterial({
        color: 0xffaa00,
        size: 0.18,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending
      })
    );
    this.scene.add(this.smashSparks);
  }

  setScrollProgress(progress) {
    this.targetScrollProgress = Math.max(0, Math.min(1, progress));
  }

  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }

  render() {
    requestAnimationFrame(this.render.bind(this));

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Smooth scroll progress lerp
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.1;
    const p = this.scrollProgress;

    // Atmospheric Floating Dust
    if (this.dustParticles) {
      const positions = this.dustParticles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + positions[i]) * 0.003;
      }
      this.dustParticles.geometry.attributes.position.needsUpdate = true;
    }

    // =========================================================================
    // ACCURATE 3D VOLLEYBALL KINEMATICS CHOREOGRAPHY
    // =========================================================================

    if (p < 0.25) {
      // -----------------------------------------------------------------------
      // STAGE 0: READY STANCE (0.0 to 0.25)
      // Low ready crouch, subtle breathing, volleyball rolls in.
      // -----------------------------------------------------------------------
      const stageP = p / 0.25;

      this.volleyball.position.set(
        Math.sin(stageP * 2) * 0.35,
        0.245,
        4.8 - stageP * 2.5
      );
      this.volleyball.rotation.x = -time * 2.2 - stageP * 5;
      this.volleyball.rotation.z = Math.sin(time * 1.5) * 0.15;

      // Athlete Ready Stance
      this.athleteGroup.position.set(0, 0, -2.8);
      this.athleteGroup.rotation.y = 0;
      this.rig.root.position.y = 1.35 + Math.sin(time * 2.5) * 0.02;
      this.rig.torso.rotation.set(0.15, 0, 0); // Slight forward athletic tilt
      this.rig.head.rotation.set(-0.12, 0, 0); // Looking forward

      // Relaxed ready arms
      this.rig.rightUpperArm.rotation.set(0.3, 0, 0.15);
      this.rig.rightElbow.rotation.set(0.4, 0, 0);
      this.rig.leftUpperArm.rotation.set(0.3, 0, -0.15);
      this.rig.leftElbow.rotation.set(0.4, 0, 0);

      // Bent knees ready stance
      this.rig.rightHip.rotation.set(-0.25, 0, 0);
      this.rig.rightKnee.rotation.set(0.4, 0, 0);
      this.rig.leftHip.rotation.set(-0.25, 0, 0);
      this.rig.leftKnee.rotation.set(0.4, 0, 0);

      this.rig.shadow.scale.set(1, 1, 1);
      this.rig.shadow.material.opacity = 0.7;

      // Camera: Low-angle floor push-in
      this.camera.position.set(
        Math.sin(stageP * Math.PI) * 0.8,
        0.4 + stageP * 0.65,
        8.2 - stageP * 2.8
      );
      this.cameraTarget.set(0, 1.3, -1.0);

      this.isSmashTriggered = false;
      this.shockwaveMesh.material.opacity = 0;
      this.secondaryShockwave.material.opacity = 0;
      this.lights.impactFlash.intensity = 0;
      if (this.ballTrail) this.ballTrail.material.opacity = 0;
      if (this.smashSparks) this.smashSparks.material.opacity = 0;

    } else if (p < 0.50) {
      // -----------------------------------------------------------------------
      // STAGE 1: THE 4-STEP SPRINT APPROACH (0.25 to 0.50)
      // Rapid acceleration, footwork stride, arms gathering far back behind body.
      // -----------------------------------------------------------------------
      const stageP = (p - 0.25) / 0.25;

      const athleteZ = -2.8 + stageP * 2.4;
      const stepCycle = stageP * Math.PI * 4;
      const stepBounce = Math.abs(Math.sin(stepCycle)) * 0.16;

      this.athleteGroup.position.set(0, stepBounce, athleteZ);
      this.rig.torso.rotation.set(0.25, 0, 0); // Sprint forward lean

      // Leg stride alternation
      this.rig.rightHip.rotation.set(Math.sin(stepCycle) * 0.85, 0, 0);
      this.rig.rightKnee.rotation.set(Math.max(0, -Math.sin(stepCycle) * 0.9), 0, 0);
      this.rig.leftHip.rotation.set(-Math.sin(stepCycle) * 0.85, 0, 0);
      this.rig.leftKnee.rotation.set(Math.max(0, Math.sin(stepCycle) * 0.9), 0, 0);

      // Arm swing gathering backwards into jump load
      const armSwing = stageP > 0.6 ? -(stageP - 0.6) * 3.5 : Math.sin(stepCycle) * 0.7;
      this.rig.rightUpperArm.rotation.set(armSwing, 0, 0.1);
      this.rig.leftUpperArm.rotation.set(armSwing, 0, -0.1);

      // Volleyball setter toss
      this.volleyball.position.set(
        0.35,
        1.4 + stageP * 1.9,
        athleteZ + 0.85
      );
      this.volleyball.rotation.x += delta * 5;

      // Camera: Dynamic side-tracking action shot
      this.camera.position.set(
        3.5 - stageP * 1.2,
        1.5 + stageP * 0.9,
        4.4 - stageP * 2.5
      );
      this.cameraTarget.set(0, 1.6, athleteZ);

    } else if (p < 0.75) {
      // -----------------------------------------------------------------------
      // STAGE 2: EXPLOSIVE VERTICAL JUMP & AERIAL COCK (0.50 to 0.75)
      // Body explodes upward (2.2m), arches backward like a bow, left arm aims,
      // right arm cocks back at maximum tension, 180° bullet-time orbit.
      // -----------------------------------------------------------------------
      const stageP = (p - 0.50) / 0.25;

      // Peak vertical jump elevation (up to 2.2m)
      const jumpY = Math.sin(stageP * (Math.PI / 2)) * 2.2;
      this.athleteGroup.position.set(0, jumpY, -0.4);

      // Body Arch (Thoracic Extension) & 180° Orbit
      this.athleteGroup.rotation.y = stageP * Math.PI * 0.95;
      this.rig.torso.rotation.set(-stageP * 0.45, 0, 0); // Arch back

      // LEFT ARM: Points high toward the volleyball (Aiming Guide)
      this.rig.leftUpperArm.rotation.set(stageP * 2.6, 0, -stageP * 0.3);
      this.rig.leftElbow.rotation.set(stageP * 0.3, 0, 0);

      // RIGHT ARM: Max Cocked Tension Behind Ear (Bow and Arrow)
      this.rig.rightUpperArm.rotation.set(-stageP * 2.2, 0, stageP * 0.85);
      this.rig.rightElbow.rotation.set(-stageP * 1.85, 0, 0); // Flexed 90° behind head
      this.rig.rightHand.rotation.set(stageP * 0.4, 0, 0);

      // Legs trail backward in mid-air
      this.rig.rightHip.rotation.set(stageP * 0.7, 0, 0.1);
      this.rig.rightKnee.rotation.set(stageP * 1.1, 0, 0);
      this.rig.leftHip.rotation.set(stageP * 0.7, 0, -0.1);
      this.rig.leftKnee.rotation.set(stageP * 1.1, 0, 0);

      // Floor Shadow shrinks
      const shadowScale = Math.max(0.15, 1 - jumpY * 0.4);
      this.rig.shadow.scale.set(shadowScale, shadowScale, shadowScale);
      this.rig.shadow.material.opacity = Math.max(0.1, 0.7 - jumpY * 0.28);

      // Volleyball floats at apex in hitting zone
      this.volleyball.position.set(
        0.2,
        3.55 + Math.sin(stageP * Math.PI) * 0.1,
        -0.2
      );

      // Camera: 180° Bullet-Time Cinematic Orbit
      const orbitAngle = stageP * Math.PI * 0.95;
      const orbitDist = 4.1;
      this.camera.position.set(
        Math.sin(orbitAngle) * orbitDist,
        2.5 + stageP * 0.9,
        Math.cos(orbitAngle) * orbitDist
      );
      this.cameraTarget.set(0, 2.7, -0.35);

    } else {
      // -----------------------------------------------------------------------
      // STAGE 3: THE DEVASTATING SMASH & FOLLOW-THROUGH (0.75 to 1.0)
      // Core snaps forward, arm whips down, palm-to-ball contact, explosive shockwaves!
      // -----------------------------------------------------------------------
      const stageP = (p - 0.75) / 0.25;

      if (stageP < 0.2) {
        // High-velocity downward arm whip & abdominal snap
        const swingP = stageP / 0.2;
        this.rig.torso.rotation.set(-0.45 + swingP * 0.9, 0, 0); // Core crunch
        this.rig.rightUpperArm.rotation.set(-2.2 + swingP * 4.5, 0, 0.4 - swingP * 0.6);
        this.rig.rightElbow.rotation.set(-1.85 + swingP * 2.2, 0, 0);
        this.rig.rightHand.rotation.set(0.4 - swingP * 1.2, 0, 0); // Wrist snap
        this.rig.leftUpperArm.rotation.set(2.6 - swingP * 2.0, 0, 0); // Left arm pulls down
      }

      // Contact Trigger
      if (stageP >= 0.12 && !this.isSmashTriggered) {
        this.isSmashTriggered = true;
        if (this.onSmashContactCallback) {
          this.onSmashContactCallback();
        }
      }

      if (stageP >= 0.12) {
        const smashFlightP = (stageP - 0.12) / 0.88;

        // Shockwaves Expansion
        const shockScale1 = smashFlightP * 26;
        this.shockwaveMesh.scale.set(shockScale1, shockScale1, shockScale1);
        this.shockwaveMesh.material.opacity = Math.max(0, 1 - smashFlightP * 2.2);

        const shockScale2 = smashFlightP * 19;
        this.secondaryShockwave.scale.set(shockScale2, shockScale2, shockScale2);
        this.secondaryShockwave.material.opacity = Math.max(0, 1 - smashFlightP * 2.5);

        // Flash Light
        this.lights.impactFlash.intensity = Math.max(0, (1 - smashFlightP * 2) * 24);

        // Particle Air Streak Trail
        if (this.ballTrail) {
          this.ballTrail.material.opacity = Math.max(0, 1.0 - smashFlightP * 0.7);
        }

        // Contact Sparks Explosion
        if (this.smashSparks) {
          this.smashSparks.material.opacity = Math.max(0, 1 - smashFlightP * 2.4);
          const sPos = this.smashSparks.geometry.attributes.position.array;
          for (let i = 0; i < this.sparkVelocities.length; i += 3) {
            sPos[i] += this.sparkVelocities[i] * delta * 0.75;
            sPos[i + 1] += this.sparkVelocities[i + 1] * delta * 0.75;
            sPos[i + 2] += this.sparkVelocities[i + 2] * delta * 0.75;
          }
          this.smashSparks.geometry.attributes.position.needsUpdate = true;
        }

        // POWERFUL VOLLEYBALL ROCKET BLAST INTO CAMERA LENS
        const ballStart = new THREE.Vector3(0.2, 3.55, -0.2);
        const ballTarget = new THREE.Vector3(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        this.volleyball.position.lerpVectors(ballStart, ballTarget, Math.pow(smashFlightP, 1.95));
        this.volleyball.rotation.x += delta * 40;
        this.volleyball.rotation.y += delta * 28;
      }
    }

    this.camera.lookAt(this.cameraTarget);
    this.renderer.render(this.scene, this.camera);
  }
}
