# Valkyrie Engine

An engine for creating tile-based isometric visuals for Apps.

```javascript
// Initialization

var app = new Valkyrie({
  root: '#root',
  tileset: {
    'grass': '/res/grass.png',
    'tree': '/res/tree.png',
    'pyramid': '/res/pyramid.png',
    'ball': '/res/ball.png'
  },,
  mapName: 'Map',
  tileSize: 120,
  tilesX: 7,
  tilesY: 7,
  zHeight: 10
})

app.draw();

```

An Example of a Web App using the engine is hosted here https://gentle-peak-73896.herokuapp.com/.
