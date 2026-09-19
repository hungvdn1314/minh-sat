---
name: asset-packer-optimizer
description: "Use this skill when preparing, packing, or optimizing game assets for web deployment. Covers automated sprite sheet packing (free-tex-packer-core), 3D GLTF model compression (gltf-transform), and audio sprite generation."
---

# Asset Packing & Web Optimization Pipelines

This skill automates the packaging of game assets into high-performance web formats.

## 1. Automated Sprite Atlas Generator (Node.js)
Combine multiple single PNG sprites into 1 texture atlas with JSON metadata:

```javascript
// scripts/pack-textures.js
const fs = require('fs');
const path = require('path');
const { packAsync } = require('free-tex-packer-core');

async function packAssets() {
  const images = [];
  const srcDir = './raw_assets/sprites';
  
  fs.readdirSync(srcDir).forEach(file => {
    if (file.endsWith('.png')) {
      images.push({
        path: file,
        contents: fs.readFileSync(path.join(srcDir, file))
      });
    }
  });

  const files = await packAsync(images, {
    textureName: 'spritesheet',
    width: 2048,
    height: 2048,
    fixedSize: false,
    padding: 2,
    allowRotation: false,
    exporter: 'Phaser3' // or 'Pixi'
  });

  for (let item of files) {
    fs.writeFileSync(`./public/assets/${item.name}`, item.buffer);
  }
  console.log('Spritesheet packed successfully!');
}

packAssets();
```

---

## 2. 3D GLTF Optimization CLI (`gltf-transform`)
Commands to shrink 3D models for instant web loading:

```bash
# 1. Deduplicate & weld vertices
npx @gltf-transform/cli weld input.glb temp.glb

# 2. Compress mesh with Draco & textures with WebP
npx @gltf-transform/cli optimize temp.glb output.glb --draco.compress --texture-compress webp

# 3. Inspect final budget
npx @gltf-transform/cli inspect output.glb
```
