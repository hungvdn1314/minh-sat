---
name: threejs-lowpoly-explorer
description: "Use this skill when creating 3D exploration, isometric adventure, or 3D diorama puzzle games using Three.js, Rapier.js physics (WASM), and low-poly web asset pipelines."
---

# Three.js & Rapier.js Low-Poly Web 3D Architecture

This skill governs the development of performant, lightweight 3D web games.

## 1. Performance Guidelines for Web 3D
1. **Asset Compression:** All 3D models must be `.glb` format, compressed with **Draco** or **Meshopt**, with textures in **KTX2 / WebP**.
2. **Polycount Target:** Max 5,000–10,000 triangles per scene.
3. **Lighting:** Prefer baked ambient occlusion with a single directional light with shadow mapping limited to 1024×1024.

---

## 2. Rapier.js Physics Integration
Always use **Rapier.js** (`@dimforge/rapier3d-compat`) instead of Cannon or Ammo for fast WebAssembly physics.

```typescript
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';

export class World3D {
  private scene: THREE.Scene;
  private physicsWorld!: RAPIER.World;

  async init() {
    await RAPIER.init();
    const gravity = { x: 0.0, y: -9.81, z: 0.0 };
    this.physicsWorld = new RAPIER.World(gravity);
  }

  stepPhysics(delta: number) {
    this.physicsWorld.timestep = Math.min(delta, 0.1);
    this.physicsWorld.step();
  }
}
```

---

## 3. Strict GPU Memory Cleanup (Anti-Crash Protocol)
Web browsers do NOT garbage-collect GPU textures automatically. When swapping rooms/scenes:
```typescript
export function disposeHierarchy(object: THREE.Object3D) {
  object.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.geometry.dispose();

      if (Array.isArray(mesh.material)) {
        mesh.material.forEach(m => m.dispose());
      } else {
        mesh.material.dispose();
      }
    }
  });
}
```
