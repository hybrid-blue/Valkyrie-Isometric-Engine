// Custom basic game engine
import Icon from '../resources/pyramid.png';

const grid = function(obj){
  this.root = obj.root
  this.width = obj.size['width'];
  this.height = obj.size['height'];
  this.canvas;
  this.context;
  this.clickLeft;
  this.clickRight;
  this.hovered;
  this.tiles = [];
  this.tileMap = [];
  this.zIndex = 0
}


grid.prototype.buildCanvas = function(){
  const root = document.querySelector(this.root);

  if(!document.querySelector('#game-field')){

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'game-field');
    root.appendChild(canvas);

    var thisCanvas = document.querySelector('#game-field')
    thisCanvas.setAttribute('width', this.width);
    thisCanvas.setAttribute('height', this.height);
    // this.canvas = thisCanvas;

    let context;

    context = thisCanvas.getContext('2d');

    let plane = new Path2D();

    // plane.moveTo(35, 230);
    // plane.lineTo(460, 18);
    // plane.lineTo(880, 230);
    // plane.lineTo(460, 440);
    // plane.lineTo(35, 230);

    plane.moveTo(35, 280);
    plane.lineTo(460, 68);
    plane.lineTo(880, 280);
    plane.lineTo(460, 490);
    plane.lineTo(35, 280);

    context.fillStyle = 'rgba(0, 0, 0, 0.2)'
    context.fill(plane);

    this.context = context


  }

}

// game.prototype.drawSprites = function(){
//   let ctx = this.canvas.getContext('2d');
//   ctx.fillStyle = 'green';
//   ctx.fillRect(10, 10, 100, 100);
// }

grid.prototype.drawGrid = function(){
  let cols = 10;
  let rows = 10;

  const root = document.querySelector(this.root);

  if(!document.querySelector('#game-grid')){

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'game-grid');
    root.appendChild(canvas);

    var thisCanvas = document.querySelector('#game-grid')
    thisCanvas.setAttribute('width', this.width);
    thisCanvas.setAttribute('height', this.height);

    let context;

    context = thisCanvas.getContext('2d');
    context.transform(2,0,0,1,0,0);
    context.translate(230, 69);
    context.rotate(45 * Math.PI / 180)

    for(let i = 0;i<8;i++){
      context.moveTo(300, (42.7 * i))
      context.lineTo(0, (42.7 * i))
      context.strokeStyle = "black";
      context.stroke();
    }

    for(let i = 0;i<8;i++){
      context.moveTo((42.6 * i), 0)
      context.lineTo((42.6 * i), 300)
      context.strokeStyle = "black";
      context.stroke();
    }

  }


}

grid.prototype.tileData = function(){
  // Tile Height
  var th = 420 / 7;

  // Tile Width
  var tw = 850 / 7;

  var y = th;
  var x = tw;

  var tileY = 0;
  var tileX = 0;

  var tileId = 0;

  if(this.tileMap.length < 1){

    for(let x=0;x<7;x++){

        // if(x > 0){
          var offsetTileY = (th / 2) * (x)
          var offsetTileX = 0 + ((x) * (tw / 2));
        // }

        tileX = 0;

      for(let i=0;i<7;i++){

        let top = (0 + (i * (th / 2))) + offsetTileY;
        let bottom = (th + (i * (th / 2))) + offsetTileY;
        let left = (0 + (i * (tw / 2)) - (tw / 2)) - offsetTileX;
        let right = (0 + ((i + 1) * (tw / 2))) - offsetTileX;

        var topCorner;
        var bottomCorner;
        var leftCorner;
        var rightCorner;
        if(i === 0){
          topCorner = [top, (left + right)];
          bottomCorner = [bottom, (left + right)];
          leftCorner = [(bottom / 2), left];
          rightCorner = [(bottom / 2), right];
        }else{
          topCorner = [top, (left + (right / 2))];
          bottomCorner = [bottom, (left + (right / 2))];
          leftCorner = [(bottom - (th / 2)), left];
          rightCorner = [(bottom - (th / 2)), right];
        }

        this.tiles.push({
          tile: `${tileX},${tileY}`,
          name: tileId,
          t: top,
          b: bottom,
          l: left,
          r: right,
          ct: topCorner,
          cb: bottomCorner,
          cl: leftCorner,
          cr: rightCorner,
          center: [bottomCorner[1], rightCorner[0]],
          data: {
            tile: null,
            zPos: 0,
            attr: []
          }
        })

        tileId++
        tileX++

      }

      tileY++
    }

  }else{

    // Redraw map using existing data

    this.context.clearRect(0, 0, 900, 900);

    let plane = new Path2D();

    // plane.moveTo(35, 230);
    // plane.lineTo(460, 18);
    // plane.lineTo(880, 230);
    // plane.lineTo(460, 440);
    // plane.lineTo(35, 230);

    plane.moveTo(35, 280);
    plane.lineTo(460, 68);
    plane.lineTo(880, 280);
    plane.lineTo(460, 490);
    plane.lineTo(35, 280);


    this.context.fillStyle = 'rgba(0, 0, 0, 0.1)'
    this.context.fill(plane);

    for(let x = 0;x < this.tileMap.length;x++){

      let index = 0;

      // setInterval(() => {
      //
      //   var item = this.tileMap[x][index]
      //
      // },1000)


      this.tileMap[x].forEach((item, i) => {

        if(item.data.tile){

          let ctx = this.context;

          let posX = item.tile.split(',')[0];
          let posY = item.tile.split(',')[1];

          if(item.data.zPos === 0){
            let x = (520 + (posX - 1) * 60) - (60 * (posY)) - 64;
            let y = (120 + (posX - 1) * 30) + (30 * (posY)) - 80;
            // let y = (120 + (posX - 1) * 30) + (30 * (posY)) - (80 + (80 * item.data.zPos));
            ctx.drawImage(item.data.tile, x, y)
          }


        }

        if(item.data.zPos > 0){

          if(item.data.zPos > this.zIndex){

            const canvas = document.createElement('canvas');
            canvas.setAttribute('id', `game-field-${item.data.zPos}`);
            root.appendChild(canvas);

            var thisCanvas = document.querySelector(`#game-field-${item.data.zPos}`)
            thisCanvas.setAttribute('width', this.width);
            thisCanvas.setAttribute('height', this.height);

            let context;

            context = thisCanvas.getContext('2d');

            let plane = new Path2D();

            plane.moveTo(35, (250 - (30 * item.data.zPos)));
            plane.lineTo(460, (38 - (30 * item.data.zPos)));
            plane.lineTo(880, (250 - (30 * item.data.zPos)));
            plane.lineTo(460, (460 - (30 * item.data.zPos)));
            plane.lineTo(35, (250 - (30 * item.data.zPos)));

            context.fillStyle = 'rgba(0, 0, 0, 0)'
            context.fill(plane);


          }

          let zPath = new Path2D();

          var posX = parseInt(item.tile.split(',')[1]);
          var posY = parseInt(item.tile.split(',')[0]);

          zPath.moveTo((400 + ((posY - 0) * 60)) - (60 * posX), (100 + ((posY - 0) * 30)) + (30 * posX));
          zPath.lineTo((400 + ((posY - 0) * 60)) - (60 * posX), (100 + ((posY- 0) * 30)) + (30 * posX) - (60 * item.data.zPos))

          zPath.moveTo((460 + ((posY - 0) * 60)) - (60 * posX), (130 + ((posY - 0) * 30)) + (30 * posX));
          zPath.lineTo((460 + ((posY - 0) * 60)) - (60 * posX), (130 + ((posY - 0) * 30)) + (30 * posX) - (60 * item.data.zPos))

          zPath.moveTo((520 + ((posY - 0) * 60)) - (60 * posX), (100 + ((posY - 0) * 30)) + (30 * posX));
          zPath.lineTo((520 + ((posY - 0) * 60)) - (60 * posX), (100 + ((posY - 0) * 30)) + (30 * posX) - (60 * item.data.zPos))

          this.context.lineWidth = 3
          this.context.strokeStyle = "#229954";
          this.context.stroke(zPath)


          var calculateCords = (array, y, x, z = 0) => {

            let obj = {};

            obj['startPointX'] = (array[0][0] + (y * 60)) - (60 * x);
            obj['startPointY'] = ((array[0][1] + (y * 30)) + (30 * x) - (60 * (z - 1)));
            obj['pointAX'] = (array[1][0] + (y * 60)) - (60 * x);
            obj['pointAY'] = ((array[1][1] + (y * 30)) + (30 * x) - (60 * (z - 1)));
            obj['pointBX'] = (array[2][0] + (y * 60)) - (60 * x);
            obj['pointBY'] = ((array[2][1] + (y * 30)) + (30 * x) - (60 * (z - 1)));
            obj['pointCX'] = (array[3][0] + (y * 60)) - (60 * x);
            obj['pointCY'] = ((array[3][1] + (y * 30)) + (30 * x) - (60 * (z - 1)));

            return obj;

          }

          // Top Pane
          let zPlaneOne = new Path2D();

          let cordArray = [
            [400, 100],
            [460, 130],
            [520, 100],
            [460, 70],
            [400, 100]
          ];

          var pointObj = calculateCords(cordArray, posY, posX, item.data.zPos);

          zPlaneOne.moveTo(pointObj.startPointX, (pointObj.startPointY - 60));
          zPlaneOne.lineTo(pointObj.pointAX, (pointObj.pointAY - 60));
          zPlaneOne.lineTo(pointObj.pointBX, (pointObj.pointBY - 60));
          zPlaneOne.lineTo(pointObj.pointCX, (pointObj.pointCY - 60));
          zPlaneOne.lineTo(pointObj.pointDX, (pointObj.pointDY - 60));

          this.context.fillStyle = 'rgba(220, 160, 100, 1)'
          this.context.fill(zPlaneOne);


          // Left Pane
          let zPlaneTwo = new Path2D();

          let cordArray2 = [
            [400, 100],
            [460, 130],
            [460, (190 + (60 * (item.data.zPos - 1)))],
            [400, (160 + (60 * (item.data.zPos - 1)))],
            [400, 100]
          ];

          var pointObj2 = calculateCords(cordArray2, posY, posX, item.data.zPos);

          zPlaneTwo.moveTo(pointObj2.startPointX, (pointObj2.startPointY - 60));
          zPlaneTwo.lineTo(pointObj2.pointAX, (pointObj2.pointAY - 60));
          zPlaneTwo.lineTo(pointObj2.pointBX, (pointObj2.pointBY - 60));
          zPlaneTwo.lineTo(pointObj2.pointCX, (pointObj2.pointCY - 60));
          zPlaneTwo.lineTo(pointObj2.pointDX, (pointObj2.pointDY - 60));

          this.context.fillStyle = 'rgba(160, 220, 100, 1)'
          this.context.fill(zPlaneTwo);



          // Right Pane
          let zPlaneThree = new Path2D();

          let cordArray3 = [
            [520, 100],
            [520, (160 + (60 * (item.data.zPos - 1)))],
            [460, (190 + (60 * (item.data.zPos - 1)))],
            [460, 130],
            [520, 100]
          ];

          var pointObj3 = calculateCords(cordArray3, posY, posX, item.data.zPos);

          zPlaneThree.moveTo(pointObj3.startPointX, (pointObj3.startPointY - 60));
          zPlaneThree.lineTo(pointObj3.pointAX, (pointObj3.pointAY - 60));
          zPlaneThree.lineTo(pointObj3.pointBX, (pointObj3.pointBY - 60));
          zPlaneThree.lineTo(pointObj3.pointCX, (pointObj3.pointCY - 60));
          zPlaneThree.lineTo(pointObj3.pointDX, (pointObj3.pointDY - 60));

          this.context.fillStyle = 'rgba(160, 100, 220, 1)'
          this.context.fill(zPlaneThree);



          console.log(item.data.tile)
          if(item.data.tile){
            console.log(posX)
            console.log(posY)
            let x = (520 + (posY - 1) * 60) - (60 * (posX)) - 64;
            // let y = (120 + (posX - 1) * 30) + (30 * (posY)) - 80;
            let y = (120 + (posX - 1) * 30) + (30 * (posY)) - (80 + (60 * item.data.zPos));

            console.log(x);
            console.log(y)

            this.context.drawImage(item.data.tile, x, y)
          }

        }

      })

    }

    // console.log(this.tileMap)

  }

}

grid.prototype.ui = function(){

  const tiles = this.tiles;
  const selected = this.selected;

  if(!document.querySelector('#game-ui')){

    const root = document.querySelector(this.root);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'game-ui');
    root.appendChild(canvas);

    var thisCanvas = document.querySelector('#game-ui')
    thisCanvas.setAttribute('width', this.width);
    thisCanvas.setAttribute('height', this.height);
    var context;

    context = thisCanvas.getContext('2d');
    context.fillStyle = "rgba(200, 0, 0, 0.25)";

    var currentTile;
    var prevPos = [];
    var overlap = [];
    var area1;
    var area2;
    var x, y;
    var gridEdge;
    var tileOffsetX = 60;
    var tileOffsetY = 30
    var currentTileMouseOver;
    let tileChunkSize = 7;
    var arr = tiles;
    var tilesArray = [];

    // let startPointX, startPointY, pointAX, pointAY, pointBX, pointBY, pointCX, pointCY;

    var title = document.querySelector('#title');

    while(arr.length) {
        tilesArray.push(arr.splice(0,7));
    }

    this.tileMap = tilesArray

    var calculateCords = (array, i, x, offsetY = 0, offsetX = 0,) => {

      let obj = {};

      obj['startPointX'] = (array[0][0] + ((i - offsetY)) * 60) - (tileOffsetX * (x + offsetX));
      obj['startPointY'] = (array[0][1] + ((i - offsetY)) * 30) + (tileOffsetY * (x + offsetX));
      obj['pointAX'] = (array[1][0] + ((i - offsetY)) * 60) - (tileOffsetX * (x + offsetX));
      obj['pointAY'] = (array[1][1] + ((i - offsetY)) * 30) + (tileOffsetY * (x + offsetX));
      obj['pointBX'] = (array[2][0] + ((i - offsetY)) * 60) - (tileOffsetX * (x + offsetX));
      obj['pointBY'] = (array[2][1] + ((i - offsetY)) * 30) + (tileOffsetY * (x + offsetX));
      obj['pointCX'] = (array[3][0] + ((i - offsetY)) * 60) - (tileOffsetX * (x + offsetX));
      obj['pointCY'] = (array[3][1] + ((i - offsetY)) * 30) + (tileOffsetY * (x + offsetX));

      return obj;

    }


    thisCanvas.addEventListener("mousemove", (evt) => {

        context.clearRect(0, 0, 900, 900)

        var mousePos = this.getMousePos(thisCanvas, evt);
        var tileOffsetCount = 0;
        var tileZero = false;

        for(let x = 0;x < tilesArray.length;x++){

          tilesArray[x].forEach((item, i) => {

            if((mousePos.x > item.l && mousePos.x < item.r) && (mousePos.y > item.t && mousePos.y < item.b)){

              overlap.push(item);

              var offsetX = mousePos.originalX;
              var offsetY = mousePos.originalY;

              if(i === 0){

                if((!inside1 && !inside2) && overlap.length === 1){

                  let outerArea = new Path2D();

                  // Outer Area

                  // let cordArray = [
                  //   [460, 50],
                  //   [460, 80],
                  //   [520, 50],
                  //   [460, 50]
                  // ]

                  let cordArray = [
                    [460, 100],
                    [460, 130],
                    [520, 100],
                    [460, 100]
                  ]

                  var pointObj = calculateCords(cordArray, i, x, 1, +0);

                  outerArea.globalAlpha = 1;
                  outerArea.moveTo(pointObj.startPointX, pointObj.startPointY);
                  outerArea.lineTo(pointObj.pointAX, pointObj.pointAY);
                  outerArea.lineTo(pointObj.pointBX, pointObj.pointBY);
                  outerArea.lineTo(pointObj.pointCX, pointObj.pointCY);


                  let outerArea2 = new Path2D();

                  // Inner Area

                  // let cordArray2 = [
                  //   [520, 80],
                  //   [460, 80],
                  //   [520, 50],
                  //   [520, 80]
                  // ]

                  let cordArray2 = [
                    [520, 130],
                    [460, 130],
                    [520, 100],
                    [520, 130]
                  ]

                  var pointObj2 = calculateCords(cordArray2, i, x, 1, +0);

                  outerArea2.globalAlpha = 1;
                  outerArea2.moveTo(pointObj2.startPointX, pointObj2.startPointY);
                  outerArea2.lineTo(pointObj2.pointAX, pointObj2.pointAY);
                  outerArea2.lineTo(pointObj2.pointBX, pointObj2.pointBY);
                  outerArea2.lineTo(pointObj2.pointCX, pointObj2.pointCY);


                  context.globalAlpha = 1;
                  context.strokeStyle = 'purple'

                  context.stroke(outerArea);
                  context.stroke(outerArea2);

                  var outer = context.isPointInPath(outerArea, offsetX, offsetY);
                  var outer2 = context.isPointInPath(outerArea2, offsetX, offsetY);

                  if(outer){
                    title.innerHTML = 'N/A'
                    currentTileMouseOver = null
                  }


                  if(outer2){
                    title.innerHTML = overlap[0].tile;
                    currentTileMouseOver = overlap[0].name;

                    if(overlap[0].name === 0 && item.name === 0){
                      tileZero = true;
                    }

                  }


                }

              }



              if(x === 0){

                if((!inside1 && !inside2) && overlap.length === 1){

                  let outerArea = new Path2D();

                  // Outer Area

                  // let cordArray = [
                  //   [580, 50],
                  //   [580, 80],
                  //   [520, 50],
                  //   [580, 50]
                  // ]

                  let cordArray = [
                    [580, 100],
                    [580, 130],
                    [520, 100],
                    [580, 100]
                  ]

                  var pointObj = calculateCords(cordArray, i, x, 1, +0);

                  outerArea.globalAlpha = 1;
                  outerArea.moveTo(pointObj.startPointX, pointObj.startPointY);
                  outerArea.lineTo(pointObj.pointAX, pointObj.pointAY);
                  outerArea.lineTo(pointObj.pointBX, pointObj.pointBY);
                  outerArea.lineTo(pointObj.pointCX, pointObj.pointCY);


                  let outerArea2 = new Path2D();

                  // Inner Area

                  // let cordArray2 = [
                  //   [520, 80],
                  //   [580, 80],
                  //   [520, 50],
                  //   [520, 80]
                  // ];

                  let cordArray2 = [
                    [520, 130],
                    [580, 130],
                    [520, 100],
                    [520, 130]
                  ];

                  var pointObj2 = calculateCords(cordArray2, i, x, 1, +0);

                  outerArea2.globalAlpha = 1;
                  outerArea2.moveTo(pointObj2.startPointX, pointObj2.startPointY);
                  outerArea2.lineTo(pointObj2.pointAX, pointObj2.pointAY);
                  outerArea2.lineTo(pointObj2.pointBX, pointObj2.pointBY);
                  outerArea2.lineTo(pointObj2.pointCX, pointObj2.pointCY);


                  context.globalAlpha = 1;
                  context.strokeStyle = 'aqua'

                  context.stroke(outerArea);
                  context.stroke(outerArea2);

                  var outer = context.isPointInPath(outerArea, offsetX, offsetY);
                  var outer2 = context.isPointInPath(outerArea2, offsetX, offsetY);

                  if(outer){
                    title.innerHTML = 'N/A'
                    currentTileMouseOver = null
                  }

                  if(outer2){
                    title.innerHTML = overlap[0].tile;
                    currentTileMouseOver = overlap[0].name;

                    if(overlap[0].name === 0 && item.name === 0){
                      tileZero = true;
                    }

                  }


                }

              }


              if(i === (tilesArray.length - 1)){

                if((!inside1 && !inside2) && overlap.length === 1){

                  let outerArea = new Path2D();

                  // Outer Area

                  // let cordArray = [
                  //   [520, 80],
                  //   [460, 80],
                  //   [520, 50],
                  //   [520, 80]
                  // ];

                  let cordArray = [
                    [520, 130],
                    [460, 130],
                    [520, 100],
                    [520, 130]
                  ];

                  var pointObj = calculateCords(cordArray, i, x, 0, +0);

                  outerArea.globalAlpha = 1;
                  outerArea.moveTo(pointObj.startPointX, pointObj.startPointY);
                  outerArea.lineTo(pointObj.pointAX, pointObj.pointAY);
                  outerArea.lineTo(pointObj.pointBX, pointObj.pointBY);
                  outerArea.lineTo(pointObj.pointCX, pointObj.pointCY);


                  let outerArea2 = new Path2D();

                  // Inner Area

                  // let cordArray2 = [
                  //   [460, 50],
                  //   [460, 80],
                  //   [520, 50],
                  //   [460, 50]
                  // ];

                  let cordArray2 = [
                    [460, 100],
                    [460, 130],
                    [520, 100],
                    [460, 100]
                  ];

                  var pointObj2 = calculateCords(cordArray2, i, x, 0, +0);

                  outerArea2.globalAlpha = 1;
                  outerArea2.moveTo(pointObj2.startPointX, pointObj2.startPointY);
                  outerArea2.lineTo(pointObj2.pointAX, pointObj2.pointAY);
                  outerArea2.lineTo(pointObj2.pointBX, pointObj2.pointBY);
                  outerArea2.lineTo(pointObj2.pointCX, pointObj2.pointCY);


                  context.globalAlpha = 1;
                  context.strokeStyle = 'orange'

                  context.stroke(outerArea);
                  context.stroke(outerArea2);

                  var outer = context.isPointInPath(outerArea, offsetX, offsetY);
                  var outer2 = context.isPointInPath(outerArea2, offsetX, offsetY);

                  if(outer){
                    title.innerHTML = 'N/A'
                    currentTileMouseOver = null
                  }


                  if(outer2){
                    title.innerHTML = overlap[0].tile;
                    currentTileMouseOver = overlap[0].name;
                  }


                }

              }






              if(x === tilesArray[x].length - 1){

                if((!inside1 && !inside2) && overlap.length === 1){

                  let outerArea = new Path2D();

                  // let cordArray = [
                  //   [580, 50],
                  //   [580, 80],
                  //   [520, 50],
                  //   [580, 50]
                  // ];

                  let cordArray = [
                    [580, 100],
                    [580, 130],
                    [520, 100],
                    [580, 100]
                  ];

                  var pointObj = calculateCords(cordArray, i, x, 1, +1);

                  outerArea.globalAlpha = 1;
                  outerArea.moveTo(pointObj.startPointX, pointObj.startPointY);
                  outerArea.lineTo(pointObj.pointAX, pointObj.pointAY);
                  outerArea.lineTo(pointObj.pointBX, pointObj.pointBY);
                  outerArea.lineTo(pointObj.pointCX, pointObj.pointCY);


                  let outerArea2 = new Path2D();

                  // let cordArray2 = [
                  //   [520, 80],
                  //   [580, 80],
                  //   [520, 50],
                  //   [520, 80]
                  // ];

                  let cordArray2 = [
                    [520, 130],
                    [580, 130],
                    [520, 100],
                    [520, 130]
                  ];

                  var pointObj2 = calculateCords(cordArray2, i, x, 1, +1);

                  outerArea2.globalAlpha = 1;
                  outerArea2.moveTo(pointObj2.startPointX, pointObj2.startPointY);
                  outerArea2.lineTo(pointObj2.pointAX, pointObj2.pointAY);
                  outerArea2.lineTo(pointObj2.pointBX, pointObj2.pointBY);
                  outerArea2.lineTo(pointObj2.pointCX, pointObj2.pointCY);


                  context.globalAlpha = 1;
                  context.strokeStyle = 'pink'

                  context.stroke(outerArea);
                  context.stroke(outerArea2);

                  var outer = context.isPointInPath(outerArea, offsetX, offsetY);
                  var outer2 = context.isPointInPath(outerArea2, offsetX, offsetY);

                  if(outer){
                    title.innerHTML = overlap[0].tile;
                    currentTileMouseOver = overlap[0].name;
                  }

                  if(outer2){
                    title.innerHTML = 'N/A'
                    currentTileMouseOver = null
                  }


                }

              }


              if(currentTile !== item.name){

                if(overlap.length > 1){

                  area1 = new Path2D();

                  // let cordArray = [
                  //   [460, 50],
                  //   [460, 80],
                  //   [520, 50],
                  //   [460, 50]
                  // ];

                  let cordArray = [
                    [460, 100],
                    [460, 130],
                    [520, 100],
                    [460, 100]
                  ];

                  var pointObj = calculateCords(cordArray, i, x, 1, +0);

                  // Tile A
                  // area1.beginPath();
                  area1.globalAlpha = 1;
                  area1.moveTo(pointObj.startPointX, pointObj.startPointY);
                  area1.lineTo(pointObj.pointAX, pointObj.pointAY);
                  area1.lineTo(pointObj.pointBX, pointObj.pointBY);
                  area1.lineTo(pointObj.pointCX, pointObj.pointCY);

                  area2 = new Path2D();

                  // let cordArray2 = [
                  //   [400, 50],
                  //   [460, 50],
                  //   [460, 80],
                  //   [400, 50]
                  // ];

                  let cordArray2 = [
                    [400, 100],
                    [460, 100],
                    [460, 130],
                    [400, 100]
                  ];

                  var pointObj = calculateCords(cordArray2, i, x, 0, -1);

                  // context.beginPath();
                  area2.globalAlpha = 0.5;
                  area2.moveTo(pointObj.startPointX, pointObj.startPointY);
                  area2.lineTo(pointObj.pointAX, pointObj.pointAY);
                  area2.lineTo(pointObj.pointBX, pointObj.pointBY);
                  area2.lineTo(pointObj.pointCX, pointObj.pointCY);

                  context.stroke(area1);
                  context.stroke(area2);

                  var inside1 = context.isPointInPath(area1, offsetX, offsetY);
                  var inside2 = context.isPointInPath(area2, offsetX, offsetY);;

                  if(inside1 || inside2){

                    if(inside1){

                      title.innerHTML = overlap[0].tile;
                      currentTileMouseOver = overlap[0].name;

                      if(overlap[0].name === 0){
                        tileZero = true;
                      }

                    }

                    if(inside2){

                      title.innerHTML = overlap[0].tile;
                      currentTileMouseOver = overlap[0].name;

                      if(overlap[0].name === 0){
                        tileZero = true;
                      }

                    }

                  }else{
                    context.clearRect(0, 0, 900, 900);
                    title.innerHTML = overlap[1].tile;
                    currentTileMouseOver = overlap[1].name;
                  }

                }

                prevPos = [x, y]
                currentTile = item.name;

                // if(item.name === currentTileMouseOver){
                //   // Display hover marker selector
                //
                //   context.clearRect(0, 0, 900, 900);
                //
                //   let hoverTile = new Path2D();
                //
                //   context.globalAlpha = 1;
                //   context.strokeStyle = 'red'
                //
                //   let startPointX = (400 + ((i - 0) * 60)) - (tileOffsetX * x);
                //   let startPointY = (50 + ((i - 0) * 30)) + (tileOffsetY * x);
                //   let pointAX = (460 + ((i - 0) * 60)) - (tileOffsetX * x);
                //   let pointAY = (80 + ((i - 0) * 30)) + (tileOffsetY * x);
                //   let pointBX = (520 + ((i - 0) * 60)) - (tileOffsetX * x);
                //   let pointBY = (50 + ((i - 0) * 30)) + (tileOffsetY * x);
                //   let pointCX = (460 + ((i - 0) * 60)) - (tileOffsetX * x);
                //   let pointCY = (20 + ((i - 0) * 30)) + (tileOffsetY * x);
                //   let pointDX = (400 + ((i - 0) * 60)) - (tileOffsetX * x);
                //   let pointDY = (50 + ((i - 0) * 30)) + (tileOffsetY * x);
                //
                //   hoverTile.moveTo(startPointX, startPointY);
                //   hoverTile.lineTo(pointAX, pointAY);
                //   hoverTile.lineTo(pointBX, pointBY);
                //   hoverTile.lineTo(pointCX, pointCY);
                //   hoverTile.lineTo(pointDX, pointDY);
                //   context.fill();
                //   context.stroke(hoverTile);
                // }

              }

              if(currentTileMouseOver && item.name === currentTileMouseOver){
                // Display hover marker selector

                context.clearRect(0, 0, 900, 900);

                let hoverTile = new Path2D();

                context.globalAlpha = 1;
                context.strokeStyle = 'red'

                // let startPointX = (400 + ((i - 0) * 60)) - (tileOffsetX * x);
                // let startPointY = (50 + ((i - 0) * 30)) + (tileOffsetY * x);
                // let pointAX = (460 + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointAY = (80 + ((i - 0) * 30)) + (tileOffsetY * x);
                // let pointBX = (520 + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointBY = (50 + ((i - 0) * 30)) + (tileOffsetY * x);
                // let pointCX = (460 + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointCY = (20 + ((i - 0) * 30)) + (tileOffsetY * x);
                // let pointDX = (400 + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointDY = (50 + ((i - 0) * 30)) + (tileOffsetY * x);

                let startPointX = (400 + ((i - 0) * 60)) - (tileOffsetX * x);
                let startPointY = (100 + ((i - 0) * 30)) + (tileOffsetY * x);
                let pointAX = (460 + ((i - 0) * 60)) - (tileOffsetX * x);
                let pointAY = (130 + ((i - 0) * 30)) + (tileOffsetY * x);
                let pointBX = (520 + ((i - 0) * 60)) - (tileOffsetX * x);
                let pointBY = (100 + ((i - 0) * 30)) + (tileOffsetY * x);
                let pointCX = (460 + ((i - 0) * 60)) - (tileOffsetX * x);
                let pointCY = (70 + ((i - 0) * 30)) + (tileOffsetY * x);
                let pointDX = (400 + ((i - 0) * 60)) - (tileOffsetX * x);
                let pointDY = (100 + ((i - 0) * 30)) + (tileOffsetY * x);

                hoverTile.moveTo(startPointX, startPointY);
                hoverTile.lineTo(pointAX, pointAY);
                hoverTile.lineTo(pointBX, pointBY);
                hoverTile.lineTo(pointCX, pointCY);
                hoverTile.lineTo(pointDX, pointDY);
                context.fill();
                context.stroke(hoverTile);

                this.hovered = item

                // eval(this.onSelected(item))

              }else if(tileZero){

                context.clearRect(0, 0, 900, 900);

                let hoverTile = new Path2D();

                context.globalAlpha = 1;
                context.strokeStyle = 'red'

                // hoverTile.moveTo(400, 50);
                // hoverTile.lineTo(460, 80);
                // hoverTile.lineTo(520, 50);
                // hoverTile.lineTo(460, 20);
                // hoverTile.lineTo(400, 50);

                hoverTile.moveTo(400, 100);
                hoverTile.lineTo(460, 130);
                hoverTile.lineTo(520, 100);
                hoverTile.lineTo(460, 70);
                hoverTile.lineTo(400, 100);


                context.fill();
                context.stroke(hoverTile);

                this.hovered = item

              }

            }

          })

        }
        overlap = []
    }, false);

    thisCanvas.addEventListener("click", (e) => {
      eval(e, this.clickLeft(e, this.hovered))
    }, false);

    thisCanvas.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      eval(e, this.clickRight(e, this.hovered))
    }, false);

  }

}


grid.prototype.getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) - 460,
        y: (evt.clientY - rect.top) - 70,
        originalX: (evt.clientX - rect.left),
        originalY: (evt.clientY - rect.top),
    };
}

grid.prototype.editTile = function(tile, pos, e){

  let ctx = this.context;
  var posX = parseInt(pos.tile.split(',')[1]);
  var posY = parseInt(pos.tile.split(',')[0]);
  let x = (520 + (posY - 1) * 60) - (60 * (posX)) - 64;
  let y = (120 + (posY - 1) * 30) + (30 * (posX)) - 80;

  if(!tile){
    this.tileMap[posX][posY].data['tile'] = null;
    this.draw();
  }else{
    let img = new Image();
    img.src = tile;
    img.onload = () => {
      this.tileMap[posX][posY].data['tile'] = img;
      this.draw();
    }
  }

}

grid.prototype.tileLevel = function(type, pos){

  let ctx = this.context;
  var posX = parseInt(pos.tile.split(',')[1]);
  var posY = parseInt(pos.tile.split(',')[0]);
  // let x = (520 + (posY - 1) * 60) - (60 * (posX)) - 64;
  // let y = (50 + (posY - 1) * 30) + (30 * (posX)) - 30;

  let x = (520 + (posY - 1) * 60) - (60 * (posX)) - 64;
  let y = (120 + (posY - 1) * 30) + (30 * (posX)) - 30;

  // let thisTileZ = this.tileMap[posX][posY].data['zPos']

  var zLevel;



  if(type === 'increase'){
      console.log(pos.data.zPos)
    zLevel = pos.data.zPos+1;
    console.log(zLevel)
  }else{
    if(pos.data.zPos > 0){
      zLevel = pos.data.zPos-1;
    }
  }

  this.tileMap[posX][posY].data['zPos'] = zLevel;

  this.draw();

}

grid.prototype.clearAll = function(){
  let ctx = this.context;

  for(let x = 0;x < this.tileMap.length;x++){

    this.tileMap[x].forEach((item, i) => {

      if(item.data.tile){

        let ctx = this.context;

        let posX = item.tile.split(',')[0];
        let posY = item.tile.split(',')[1];

        this.tileMap[posY][posX].data['tile'] = null

      }

    })

  }

  this.draw();

}

grid.prototype.onClickLeft = function(func){
  this.clickLeft = func;
}

grid.prototype.onClickRight = function(func){
  this.clickRight = func;
}



grid.prototype.draw = function(){
  this.buildCanvas();
  this.drawGrid();
  this.tileData();
  this.ui();
}



export default grid;
