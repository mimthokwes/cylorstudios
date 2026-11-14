import fs from 'fs';
import path from 'path';

// Helper to build OBJ geometry
class ObjBuilder {
  constructor() {
    this.vertices = [];
    this.normals = [];
    this.uvs = [];
    this.faces = [];
    this.currentMaterial = '';
  }

  useMaterial(matName) {
    this.faces.push({ type: 'usemtl', name: matName });
  }

  addVertex(x, y, z) {
    this.vertices.push([x, y, z]);
    return this.vertices.length; // 1-based index
  }

  // Adds a 3D box (minX, minY, minZ to maxX, maxY, maxZ)
  addBox(minX, minY, minZ, maxX, maxY, maxZ, matName) {
    if (matName) this.useMaterial(matName);
    
    // 8 vertices
    const v1 = this.addVertex(minX, minY, minZ);
    const v2 = this.addVertex(maxX, minY, minZ);
    const v3 = this.addVertex(maxX, maxY, minZ);
    const v4 = this.addVertex(minX, maxY, minZ);
    const v5 = this.addVertex(minX, minY, maxZ);
    const v6 = this.addVertex(maxX, minY, maxZ);
    const v7 = this.addVertex(maxX, maxY, maxZ);
    const v8 = this.addVertex(minX, maxY, maxZ);

    // 6 faces (each 2 triangles)
    // Front (z = minZ)
    this.faces.push({ type: 'f', verts: [v1, v2, v3] }, { type: 'f', verts: [v1, v3, v4] });
    // Back (z = maxZ)
    this.faces.push({ type: 'f', verts: [v6, v5, v8] }, { type: 'f', verts: [v6, v8, v7] });
    // Top (y = maxY)
    this.faces.push({ type: 'f', verts: [v4, v3, v7] }, { type: 'f', verts: [v4, v7, v8] });
    // Bottom (y = minY)
    this.faces.push({ type: 'f', verts: [v5, v6, v2] }, { type: 'f', verts: [v5, v2, v1] });
    // Left (x = minX)
    this.faces.push({ type: 'f', verts: [v5, v1, v4] }, { type: 'f', verts: [v5, v4, v8] });
    // Right (x = maxX)
    this.faces.push({ type: 'f', verts: [v2, v6, v7] }, { type: 'f', verts: [v2, v7, v3] });
  }

  // Adds a prism / roof wedge
  addRoof(minX, minY, minZ, maxX, maxY, maxZ, ridgeAxis = 'x', matName) {
    if (matName) this.useMaterial(matName);
    const midX = (minX + maxX) / 2;
    const midZ = (minZ + maxZ) / 2;

    if (ridgeAxis === 'z') {
      // Ridge runs along Z from minZ to maxZ at midX, maxY
      const v1 = this.addVertex(minX, minY, minZ); // 1
      const v2 = this.addVertex(maxX, minY, minZ); // 2
      const v3 = this.addVertex(maxX, minY, maxZ); // 3
      const v4 = this.addVertex(minX, minY, maxZ); // 4
      const r1 = this.addVertex(midX, maxY, minZ); // 5 (front ridge)
      const r2 = this.addVertex(midX, maxY, maxZ); // 6 (back ridge)

      // Bottom
      this.faces.push({ type: 'f', verts: [v1, v2, v3] }, { type: 'f', verts: [v1, v3, v4] });
      // Front Gable
      this.faces.push({ type: 'f', verts: [v1, v2, r1] });
      // Back Gable
      this.faces.push({ type: 'f', verts: [v3, v4, r2] });
      // Left slope
      this.faces.push({ type: 'f', verts: [v4, v1, r1] }, { type: 'f', verts: [v4, r1, r2] });
      // Right slope
      this.faces.push({ type: 'f', verts: [v2, v3, r2] }, { type: 'f', verts: [v2, r2, r1] });
    }
  }

  toString(mtlFileName) {
    let out = `# CylorStudios Roblox Export\nmtllib ${mtlFileName}\n`;
    for (const v of this.vertices) {
      out += `v ${v[0].toFixed(4)} ${v[1].toFixed(4)} ${v[2].toFixed(4)}\n`;
    }
    for (const item of this.faces) {
      if (item.type === 'usemtl') {
        out += `usemtl ${item.name}\n`;
      } else if (item.type === 'f') {
        out += `f ${item.verts.join(' ')}\n`;
      }
    }
    return out;
  }
}

// 1. Generate Medieval Tavern
const tavern = new ObjBuilder();

// Foundation / Ground Floor (Stone)
tavern.addBox(-4, 0, -5, 4, 3, 5, 'StoneWall');
// Stone Chimney
tavern.addBox(3.5, 0, 1, 4.8, 7.5, 3, 'ChimneyStone');
tavern.addBox(3.3, 7.3, 0.8, 5.0, 7.8, 3.2, 'ChimneyStone');

// Wooden Second Floor (Slight overhang)
tavern.addBox(-4.5, 3, -5.5, 4.5, 6, 5.5, 'WoodPlank');

// Timber Beams on Second Floor (Corners & Frames)
tavern.addBox(-4.6, 3, -5.6, -4.2, 6, -5.2, 'WoodBeam');
tavern.addBox(4.2, 3, -5.6, 4.6, 6, -5.2, 'WoodBeam');
tavern.addBox(-4.6, 3, 5.2, -4.2, 6, 5.6, 'WoodBeam');
tavern.addBox(4.2, 3, 5.2, 4.6, 6, 5.6, 'WoodBeam');

// Horizontal belt beam
tavern.addBox(-4.6, 2.8, -5.6, 4.6, 3.1, 5.6, 'WoodBeam');

// Tavern Wooden Entrance Door & Porch
tavern.addBox(-1.2, 0, -5.2, 1.2, 2.2, -4.9, 'WoodBeam');
tavern.addBox(-1.8, 0, -6.5, 1.8, 0.2, -5.0, 'StoneWall'); // front steps
tavern.addBox(-1.5, 2.4, -6.2, 1.5, 2.6, -5.0, 'RoofTiles'); // door canopy

// Windows with warm lantern glow
tavern.addBox(-3, 1.2, -5.1, -1.8, 2.2, -4.9, 'WindowGlow');
tavern.addBox(1.8, 1.2, -5.1, 3.0, 2.2, -4.9, 'WindowGlow');
tavern.addBox(-3, 4.0, -5.6, -1.8, 5.0, -5.4, 'WindowGlow');
tavern.addBox(1.8, 4.0, -5.6, 3.0, 5.0, -5.4, 'WindowGlow');
// Side windows
tavern.addBox(-4.6, 4.0, -1, -4.4, 5.0, 1, 'WindowGlow');

// Roof (Terracotta Tiles)
tavern.addRoof(-5.0, 6, -6.0, 5.0, 9.2, 6.0, 'z', 'RoofTiles');

const tavernMtl = `# Medieval Tavern Material Library
newmtl StoneWall
Ka 0.2 0.2 0.2
Kd 0.45 0.45 0.47
Ks 0.1 0.1 0.1
Ns 10

newmtl ChimneyStone
Ka 0.15 0.15 0.15
Kd 0.32 0.32 0.34
Ks 0.05 0.05 0.05
Ns 5

newmtl WoodPlank
Ka 0.2 0.15 0.1
Kd 0.58 0.42 0.25
Ks 0.1 0.1 0.05
Ns 10

newmtl WoodBeam
Ka 0.15 0.1 0.05
Kd 0.32 0.20 0.10
Ks 0.05 0.05 0.05
Ns 15

newmtl RoofTiles
Ka 0.2 0.1 0.05
Kd 0.65 0.28 0.20
Ks 0.1 0.05 0.05
Ns 15

newmtl WindowGlow
Ka 0.9 0.7 0.2
Kd 1.0 0.85 0.35
Ks 0.5 0.5 0.5
Ke 0.85 0.65 0.2
Ns 30
`;

// 2. Generate Sci-Fi Lobby
const scifi = new ObjBuilder();

// Base Platform (Octagonal feel with layered slabs)
scifi.addBox(-6, 0, -6, 6, 0.4, 6, 'DarkAlloy');
scifi.addBox(-5.5, 0.4, -5.5, 5.5, 0.8, 5.5, 'WhitePlating');
// Neon ground ring
scifi.addBox(-5.7, 0.35, -5.7, 5.7, 0.45, 5.7, 'NeonCyan');

// Main Central Hub building
scifi.addBox(-3.5, 0.8, -3.5, 3.5, 5.0, 3.5, 'DarkAlloy');
// White armor plates
scifi.addBox(-3.8, 1.2, -3.2, 3.8, 4.5, 3.2, 'WhitePlating');
scifi.addBox(-3.2, 1.2, -3.8, 3.2, 4.5, 3.8, 'WhitePlating');

// Glowing vertical neon strip pillars at corners
scifi.addBox(-3.9, 0.8, -3.9, -3.6, 5.2, -3.6, 'NeonCyan');
scifi.addBox(3.6, 0.8, -3.9, 3.9, 5.2, -3.6, 'NeonCyan');
scifi.addBox(-3.9, 0.8, 3.6, -3.6, 5.2, 3.9, 'NeonCyan');
scifi.addBox(3.6, 0.8, 3.6, 3.9, 5.2, 3.9, 'NeonCyan');

// Entrance Arch & Hologram Port
scifi.addBox(-1.5, 0.8, -4.2, 1.5, 3.2, -3.4, 'NeonGold');
scifi.addBox(-1.2, 0.8, -4.3, 1.2, 2.8, -3.3, 'GlassCyan');

// Second Tier Overlook
scifi.addBox(-2.5, 5.0, -2.5, 2.5, 7.2, 2.5, 'WhitePlating');
scifi.addBox(-2.7, 5.8, -2.7, 2.7, 6.2, 2.7, 'NeonCyan');

// Observation Windows (Panoramic Glass)
scifi.addBox(-2.6, 6.2, -2.6, 2.6, 7.0, 2.6, 'GlassCyan');

// Roof Spire / Transmission Tower
scifi.addBox(-0.8, 7.2, -0.8, 0.8, 8.0, 0.8, 'DarkAlloy');
scifi.addBox(-0.2, 8.0, -0.2, 0.2, 10.5, 0.2, 'NeonCyan');
scifi.addBox(-0.6, 9.8, -0.6, 0.6, 10.0, 0.6, 'NeonGold');

// Side Generator Pods
scifi.addBox(-5.0, 0.8, -1.2, -3.6, 2.8, 1.2, 'DarkAlloy');
scifi.addBox(-4.8, 1.2, -1.0, -3.7, 2.4, 1.0, 'NeonCyan');
scifi.addBox(3.6, 0.8, -1.2, 5.0, 2.8, 1.2, 'DarkAlloy');
scifi.addBox(3.7, 1.2, -1.0, 4.8, 2.4, 1.0, 'NeonCyan');

const scifiMtl = `# Sci-Fi Lobby Material Library
newmtl WhitePlating
Ka 0.2 0.25 0.3
Kd 0.85 0.88 0.92
Ks 0.6 0.6 0.7
Ns 40

newmtl DarkAlloy
Ka 0.1 0.12 0.15
Kd 0.18 0.20 0.25
Ks 0.4 0.4 0.5
Ns 35

newmtl NeonCyan
Ka 0.0 0.8 1.0
Kd 0.1 0.9 1.0
Ks 0.8 0.9 1.0
Ke 0.0 0.85 1.0
Ns 60

newmtl NeonGold
Ka 0.8 0.6 0.1
Kd 1.0 0.75 0.2
Ks 0.9 0.8 0.3
Ke 0.7 0.5 0.1
Ns 50

newmtl GlassCyan
Ka 0.1 0.4 0.6
Kd 0.2 0.6 0.8
Ks 0.9 0.9 1.0
d 0.65
Ns 80
`;

// Write files
fs.writeFileSync('public/models/medieval-tavern/model.obj', tavern.toString('model.mtl'));
fs.writeFileSync('public/models/medieval-tavern/model.mtl', tavernMtl);

fs.writeFileSync('public/models/scifi-lobby/model.obj', scifi.toString('model.mtl'));
fs.writeFileSync('public/models/scifi-lobby/model.mtl', scifiMtl);

console.log('Successfully generated Roblox models in public/models/');
