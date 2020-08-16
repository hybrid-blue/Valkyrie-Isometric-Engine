# Valkyrie Engine

An engine for creating tile-based isometric visuals for Apps.

```javascript
// Initialization

const iso = new grid({
  root: '#root',
  tileset: {
    'grass': '/res/grass.png',
    'tree': '/res/tree.png',
    'pyramid': '/res/pyramid.png',
    'ball': '/res/ball.png'
  },
  zHeight: 10,
  tileSize: 120,
  tilesX: 7,
  tilesY: 7
})

iso.draw();

```

An Example of a Web App using the engine is hosted here https://gentle-peak-73896.herokuapp.com/.
