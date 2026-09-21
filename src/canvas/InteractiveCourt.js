/**
 * INTERACTIVE TACTICAL 3D COURT SANDBOX
 * Renders an interactive 3D tactical court for exploring Yashu's skills (Spiking, Serving, Attacking).
 */

import * as THREE from '../vendor/three.module.js';

export class InteractiveCourt {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.activeSkill = 'spiking';
    this.trajectoryLine = null;
    this.courtMesh = null;
    this.targetMarker = null;
    this.ballParticle = null;
    this.curvePoints = [];
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    const width = this.canvas.clientWidth || 600;
    const height = this.canvas.clientHeight || 380;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x090a0f);

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    this.camera.position.set(0, 7.5, 9);
    this.camera.lookAt(0, 0.5, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const amb = new THREE.AmbientLight(0xffffff, 0.45);
    this.scene.add(amb);

    this.spot = new THREE.SpotLight(0xff5500, 2.5, 20, Math.PI / 3, 0.5);
    this.spot.position.set(-2, 6, 2);
    this.scene.add(this.spot);

    // Court Floor
    const courtGeo = new THREE.PlaneGeometry(8, 14);
    const courtMat = new THREE.MeshStandardMaterial({
      color: 0x161822,
      roughness: 0.35,
      metalness: 0.2
    });
    this.courtMesh = new THREE.Mesh(courtGeo, courtMat);
    this.courtMesh.rotation.x = -Math.PI / 2;
    this.scene.add(this.courtMesh);

    // Grid / Court markings
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0.45, transparent: true });
    const outerGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3.5, 0.02, -6),
      new THREE.Vector3(3.5, 0.02, -6),
      new THREE.Vector3(3.5, 0.02, 6),
      new THREE.Vector3(-3.5, 0.02, 6),
      new THREE.Vector3(-3.5, 0.02, -6)
    ]);
    this.scene.add(new THREE.Line(outerGeo, lineMat));

    // Net line
    const netGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-3.5, 0.02, 0),
      new THREE.Vector3(3.5, 0.02, 0)
    ]);
    this.scene.add(new THREE.Line(netGeo, new THREE.MeshBasicMaterial({ color: 0xff5500 })));

    // Net structure
    const netMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 1.2),
      new THREE.MeshBasicMaterial({ color: 0x374151, wireframe: true, transparent: true, opacity: 0.5 })
    );
    netMesh.position.set(0, 0.8, 0);
    this.scene.add(netMesh);

    // Target Impact Marker
    const markerGeo = new THREE.RingGeometry(0.2, 0.35, 24);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xff5500, side: THREE.DoubleSide });
    this.targetMarker = new THREE.Mesh(markerGeo, markerMat);
    this.targetMarker.rotation.x = -Math.PI / 2;
    this.targetMarker.position.set(2.2, 0.03, -4.2);
    this.scene.add(this.targetMarker);

    // Animated Flying Ball on Trajectory
    const ballGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const ballMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.ballParticle = new THREE.Mesh(ballGeo, ballMat);
    this.scene.add(this.ballParticle);

    this.updateTrajectory('spiking');
    this.animate();

    window.addEventListener('resize', () => {
      if (!this.canvas) return;
      const w = this.canvas.clientWidth;
      const h = this.canvas.clientHeight;
      if (w > 0 && h > 0) {
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      }
    });
  }

  updateTrajectory(skillId) {
    this.activeSkill = skillId;

    if (this.trajectoryLine) {
      this.scene.remove(this.trajectoryLine);
    }

    let points = [];
    if (skillId === 'spiking') {
      this.spot.position.set(-2.5, 6, 1.5);
      this.spot.color.setHex(0xff5500);
      this.targetMarker.position.set(2.4, 0.03, -4.5);

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-2.2, 2.8, 0.5),
        new THREE.Vector3(0, 3.2, -1.8),
        new THREE.Vector3(2.4, 0.03, -4.5)
      );
      this.curve = curve;
      points = curve.getPoints(30);

    } else if (skillId === 'serving') {
      this.spot.position.set(0, 6, 6);
      this.spot.color.setHex(0x38bdf8);
      this.targetMarker.position.set(-1.8, 0.03, -5.2);

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 2.5, 5.8),
        new THREE.Vector3(-0.8, 3.4, 0),
        new THREE.Vector3(-1.8, 0.03, -5.2)
      );
      this.curve = curve;
      points = curve.getPoints(30);

    } else {
      this.spot.position.set(0, 6, 2);
      this.spot.color.setHex(0xec4899);
      this.targetMarker.position.set(0, 0.03, -3.8);

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 2.7, 1.8),
        new THREE.Vector3(0, 3.0, -1.0),
        new THREE.Vector3(0, 0.03, -3.8)
      );
      this.curve = curve;
      points = curve.getPoints(30);
    }

    const trajGeo = new THREE.BufferGeometry().setFromPoints(points);
    const trajMat = new THREE.LineDashedMaterial({
      color: 0xffffff,
      dashSize: 0.25,
      gapSize: 0.15,
      linewidth: 2
    });
    this.trajectoryLine = new THREE.Line(trajGeo, trajMat);
    this.trajectoryLine.computeLineDistances();
    this.scene.add(this.trajectoryLine);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    const time = this.clock.getElapsedTime();

    if (this.targetMarker) {
      const s = 1 + Math.sin(time * 5) * 0.15;
      this.targetMarker.scale.set(s, s, s);
    }

    if (this.ballParticle && this.curve) {
      const t = (time * 0.8) % 1;
      const pt = this.curve.getPoint(t);
      this.ballParticle.position.copy(pt);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
