// Custom basic game engine
// import Icon from '../resources/pyramid.png';

const grid = function(obj){
  this.root = obj.root
  this.tileset = obj.tileset;
  this.zHeight = obj.zHeight;
  this.tileSize = obj.tileSize;
  this.tilesX = obj.tilesX;
  this.tilesY = obj.tilesY;

  this.mapWidth = this.tileSize * this.tilesX;
  this.mapHeight = (this.tileSize / 2) * this.tilesY;;

  this.canvas;
  this.context;
  this.clickLeft;
  this.clickRight;
  this.hovered;
  this.tiles = [];
  this.tileMap = [];
  this.zIndex = 0




  this.tileOffsetX = this.tileSize / 2;
  this.tileOffsetY = (this.tileSize / 2) / 2;

  this.startCordsX = 35;
  this.startCordsY = 68;

  this.topCorner = {
    x: null,
    y: null
  };
  this.rightCorner = {
    x: null,
    y: null
  };
  this.bottomCorner = {
    x: null,
    y: null
  };
  this.leftCorner = {
    x: null,
    y: null
  };



}

grid.prototype.buildCanvas = function(){

  const root = document.querySelector(this.root);

  if(!document.querySelector('#game-field')){

    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'game-field');
    root.appendChild(canvas);

    var thisCanvas = document.querySelector('#game-field')
    thisCanvas.setAttribute('width', this.mapWidth + this.startCordsX);
    thisCanvas.setAttribute('height', this.mapHeight + this.startCordsY);
    this.canvas = thisCanvas;

    let context;

    context = thisCanvas.getContext('2d');

    let plane = new Path2D();

    // plane.moveTo(35, 280);
    // plane.lineTo(460, 68);
    // plane.lineTo(880, 280);
    // plane.lineTo(460, 490);
    // plane.lineTo(35, 280);



    var startCordsX = 35;
    var startCordsY = 68;

    var mapWidth = this.tileSize * this.tilesX;
    var mapHeight = (this.tileSize / 2) * this.tilesY;

    // console.log(mapWidth);
    // console.log(mapHeight);

    // plane.moveTo(35, 280);
    // plane.lineTo(460, 68);
    // plane.lineTo(880, 280);
    // plane.lineTo(460, 490);
    // plane.lineTo(35, 280);


    let top = this.tileMap[0][0];
    let right = this.tileMap[0][this.tileMap[this.tileMap.length - 1].length - 1];
    let bottom = this.tileMap[this.tileMap.length - 1][this.tileMap[this.tileMap.length - 1].length - 1];
    let left = this.tileMap[this.tileMap.length - 1][0];

    let offsetY = this.startCordsY;
    let offsetX = ((this.mapWidth / 2) + this.startCordsX);

      // console.log(top)
      // console.log(right)
      // console.log(bottom)
      // console.log(left)
      // console.log(((mapHeight / 2) + startCordsY))



    // plane.moveTo(startCordsX, ((mapHeight / 2) + startCordsY));
    // plane.lineTo(((mapWidth / 2) + startCordsX), startCordsY);
    // plane.lineTo((mapWidth + startCordsX), ((mapHeight / 2) + startCordsY));
    // plane.lineTo(((mapWidth / 2) + startCordsX), (mapHeight + startCordsY));
    // plane.lineTo(startCordsX, ((mapHeight / 2) + startCordsY));

    // console.log('---------------')
    // console.log((left.b - left.t))
    // console.log(((left.t + offsetY) + ((left.b - left.t) / 2)))
    // console.log(bottom)

    // plane.moveTo(left.cl[1] + offsetX, left.cl[0] + offsetY);
    // plane.lineTo(top.ct[1] + offsetX, top.ct[0] + offsetY);
    // plane.lineTo(right.cr[1] + offsetX, right.cr[0] + offsetY);
    // plane.lineTo(bottom.cb[1] + offsetX, bottom.cb[0] + offsetY);
    // plane.lineTo(left.cl[1] + offsetX, left.cl[0] + offsetY);


    this.leftCorner['x'] = left.cl[1] + offsetX;
    this.leftCorner['y'] = ((left.t + offsetY) + ((left.b - left.t) / 2));
    this.topCorner['x'] = top.ct[1] + offsetX;
    this.topCorner['y'] = top.ct[0] + offsetY;
    this.rightCorner['x'] = right.cr[1] + offsetX;
    this.rightCorner['y'] = right.cr[0] + offsetY;
    this.bottomCorner['x'] = ((bottom.cl[1] + offsetX) + ((bottom.r - bottom.l) / 2));
    this.bottomCorner['y'] =  bottom.cb[0] + offsetY;


    plane.moveTo(left.cl[1] + offsetX, ((left.t + offsetY) + ((left.b - left.t) / 2)));
    plane.lineTo(top.ct[1] + offsetX, top.ct[0] + offsetY);
    plane.lineTo(right.cr[1] + offsetX, right.cr[0] + offsetY);
    plane.lineTo(((bottom.cl[1] + offsetX) + ((bottom.r - bottom.l) / 2)), bottom.cb[0] + offsetY);
    plane.lineTo(left.cl[1] + offsetX, ((left.t + offsetY) + ((left.b - left.t) / 2)));


    // context.fillStyle = 'rgba(0, 0, 0, 0.2)'
    context.fillStyle = 'rgba(255, 0, 255, 0.2)'
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
    thisCanvas.setAttribute('width', this.mapWidth + this.startCordsX);
    thisCanvas.setAttribute('height', this.mapHeight + this.startCordsY);

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
  // // Tile Height
  // var th = 420 / this.tilesX;
  // // Tile Width
  // var tw = 850 / this.tilesY;


  // Tile Height
  var th = this.tileSize / 2;
  // Tile Width
  var tw = this.tileSize;

  var y = th;
  var x = tw;

  var tileY = 0;
  var tileX = 0;

  var tileId = 0;

  if(this.tileMap.length < 1){

    for(let x=0;x<this.tilesX;x++){

        // if(x > 0){
          var offsetTileY = (th / 2) * (x)
          var offsetTileX = 0 + ((x) * (tw / 2));
        // }

        tileX = 0;

      for(let i=0;i<this.tilesY;i++){

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

    var rect = this.canvas.getBoundingClientRect();

    this.context.clearRect(this.startCordsX - 1, this.startCordsY - 1, this.mapWidth + 1, this.mapHeight + 1);

    let plane = new Path2D();

    // plane.moveTo(35, 230);
    // plane.lineTo(460, 18);
    // plane.lineTo(880, 230);
    // plane.lineTo(460, 440);
    // plane.lineTo(35, 230);


    // plane.moveTo(35, 280); //Left Point
    // plane.lineTo(460, 68); //Top Point
    // plane.lineTo(880, 280); //Right Point
    // plane.lineTo(460, 490); //Bottom Point
    // plane.lineTo(35, 280); //Left Point


    var startCordsX = 35;
    var startCordsY = 68;

    var mapWidth = this.tileSize * this.tilesX;
    var mapHeight = (this.tileSize / 2) * this.tilesY;;

    var tileOffsetX = this.tileOffsetX;
    var tileOffsetY = this.tileOffsetY;

    // plane.moveTo(35, 280);
    // plane.lineTo(460, 68);
    // plane.lineTo(880, 280);
    // plane.lineTo(460, 490);
    // plane.lineTo(35, 280);

    plane.moveTo(this.leftCorner['x'], this.leftCorner['y']);
    plane.lineTo(this.topCorner['x'], this.topCorner['y']);
    plane.lineTo(this.rightCorner['x'], this.rightCorner['y']);
    plane.lineTo(this.bottomCorner['x'], this.bottomCorner['y']);
    plane.lineTo(this.leftCorner['x'], this.leftCorner['y']);

    // plane.moveTo(startCordsX, ((mapHeight / 2) + startCordsY));
    // plane.lineTo(((mapWidth / 2) + startCordsX), startCordsY);
    // plane.lineTo((mapWidth + startCordsX), ((mapHeight / 2) + startCordsY));
    // plane.lineTo(((mapWidth / 2) + startCordsX), (mapHeight + startCordsY));
    // plane.lineTo(startCordsX, ((mapHeight / 2) + startCordsY));

    this.context.fillStyle = 'rgba(255, 0, 255, 0.2)'
    this.context.fill(plane);

    for(let x = 0;x<this.tileMap.length;x++){

      let index = 0;

      this.tileMap[x].forEach((item, i) => {

        if(item.data.tile){

          let ctx = this.context;

          let posX = item.tile.split(',')[0];
          let posY = item.tile.split(',')[1];

          if(item.data.zPos === 0){
            // let x = (520 + (posX - 1) * 60) - (60 * (posY)) - 60;
            // let y = (120 + (posX - 1) * 30) + (30 * (posY)) - (item.data.tile.height - 38);

            // let x = (520 + (posX - 1) * 60) - (60 * (posY)) - 62;
            // let y = (120 + (posX - 1) * 30) + (30 * (posY)) - (item.data.tile.height - 38);

            // let x = (520 + (posX - 1) * 60) - (60 * (posY)) - 60.75;
            // let y = (120 + (posX - 1) * 30) + (30 * (posY)) - (item.data.tile.height - 38.75);

            // let x = ((((mapWidth / 2) + startCordsX) + (tw / 2)) + (posX - 1) * tileOffsetX) - (tileOffsetX * (posY - 1));
            // let y = ((startCordsY + th) + (posX - 1) * tileOffsetY) + (tileOffsetY * (posY - 1)) - (item.data.tile.height);

            // console.log(item.data.tile.height / (this.tileSize / 2))

            var offsetImg = 0;

            if(item.data.tile.height > (this.tileSize / 2)){
              offsetImg = (item.data.tile.height / (this.tileSize / 2) - 1) * (this.tileSize / 2);
            }

            let x = (((((mapWidth / 2) + startCordsX)) + (posX - 1) * tileOffsetX) - (tileOffsetX * (posY - 1)) - (this.tileSize / 2));
            let y = ((startCordsY + th) + (posX - 1) * tileOffsetY) + (tileOffsetY * (posY - 1)) - (offsetImg);

            // console.log(item.data.tile.height)

            ctx.drawImage(item.data.tile, x, y)
          }


        }

        if(item.data.zPos > 0){

          if(item.data.zPos > this.zIndex){

            // const canvas = document.createElement('canvas');
            // canvas.setAttribute('id', `game-field-${item.data.zPos}`);
            // root.appendChild(canvas);

            // var thisCanvas = document.querySelector(`#game-field-${item.data.zPos}`)
            // thisCanvas.setAttribute('width', this.width);
            // thisCanvas.setAttribute('height', this.height);

            let context;

            context = this.context

            let plane = new Path2D();

            // plane.moveTo(35, (250 - (30 * item.data.zPos)));
            // plane.lineTo(460, (38 - (30 * item.data.zPos)));
            // plane.lineTo(880, (250 - (30 * item.data.zPos)));
            // plane.lineTo(460, (460 - (30 * item.data.zPos)));
            // plane.lineTo(35, (250 - (30 * item.data.zPos)));

            // var startCordsX = 35;
            // var startCordsY = 68;
            //
            // var mapWidth = (this.tileSize * this.tilesX);
            // var mapHeight = (mapWidth / 2);

            plane.moveTo(startCordsX, (((mapHeight / 2) + startCordsY)) - (tileOffsetY * item.data.zPos));
            plane.lineTo(((mapWidth / 2) + startCordsX), (startCordsY - (tileOffsetY * item.data.zPos)));
            plane.lineTo((mapWidth + startCordsX), (((mapHeight / 2) + startCordsY)) - (tileOffsetY * item.data.zPos));
            plane.lineTo(((mapWidth / 2) + startCordsX), ((mapHeight + startCordsY)) - (tileOffsetY * item.data.zPos));
            plane.lineTo(startCordsX, (((mapHeight / 2) + startCordsY)) - (tileOffsetY * item.data.zPos));


            context.fillStyle = 'rgba(0, 0, 0, 0)'
            context.fill(plane);


          }

          let zPath = new Path2D();

          var posX = parseInt(item.tile.split(',')[1]);
          var posY = parseInt(item.tile.split(',')[0]);



          // let path1X = (((mapWidth / 2) - (startCordsX / 2)) - 10);
          let path1X = ((mapWidth / 2) + startCordsX) - (tw / 2);
          let path1Y = (startCordsY + (th / 2));
          let path2X = ((mapWidth / 2) + startCordsX);
          let path2Y = (startCordsY + th);
          let path3X = (((mapWidth / 2) + startCordsX) + (tw / 2));
          let path3Y = (startCordsY + (th / 2));

          zPath.moveTo((path1X + ((posY - 0) * tileOffsetX)) - (tileOffsetX * posX), (path1Y + ((posY - 0) * tileOffsetY)) + (tileOffsetY * posX));
          zPath.lineTo((path1X + ((posY - 0) * tileOffsetX)) - (tileOffsetX * posX), (path1Y + ((posY- 0) * tileOffsetY)) + (tileOffsetY * posX) - (this.zHeight * item.data.zPos))

          zPath.moveTo((path2X + ((posY - 0) * tileOffsetX)) - (tileOffsetX * posX), (path2Y + ((posY - 0) * tileOffsetY)) + (tileOffsetY * posX));
          zPath.lineTo((path2X + ((posY - 0) * tileOffsetX)) - (tileOffsetX * posX), (path2Y + ((posY - 0) * tileOffsetY)) + (tileOffsetY * posX) - (this.zHeight * item.data.zPos))

          zPath.moveTo((path3X + ((posY - 0) * tileOffsetX)) - (tileOffsetX * posX), (path3Y + ((posY - 0) * tileOffsetY)) + (tileOffsetY * posX));
          zPath.lineTo((path3X + ((posY - 0) * tileOffsetX)) - (tileOffsetX * posX), (path3Y + ((posY - 0) * tileOffsetY)) + (tileOffsetY * posX) - (this.zHeight * item.data.zPos))

          this.context.lineWidth = 3
          this.context.strokeStyle = "#229954";
          this.context.stroke(zPath)


          var calculateCords = (array, y, x, z = 0) => {

            let obj = {};

            obj['startPointX'] = (array[0][0] + (y * tileOffsetX)) - (tileOffsetX * x);
            obj['startPointY'] = ((array[0][1] + (y * tileOffsetY)) + (tileOffsetY * x) - (this.zHeight * (z - 1)));
            obj['pointAX'] = (array[1][0] + (y * tileOffsetX)) - (tileOffsetX * x);
            obj['pointAY'] = ((array[1][1] + (y * tileOffsetY)) + (tileOffsetY * x) - (this.zHeight * (z - 1)));
            obj['pointBX'] = (array[2][0] + (y * tileOffsetX)) - (tileOffsetX * x);
            obj['pointBY'] = ((array[2][1] + (y * tileOffsetY)) + (tileOffsetY * x) - (this.zHeight * (z - 1)));
            obj['pointCX'] = (array[3][0] + (y * tileOffsetX)) - (tileOffsetX * x);
            obj['pointCY'] = ((array[3][1] + (y * tileOffsetY)) + (tileOffsetY * x) - (this.zHeight * (z - 1)));

            return obj;

          }

          // Top Pane
          let zPlaneOne = new Path2D();

          // let cordArray = [
          //   [400, 100],
          //   [460, 130],
          //   [520, 100],
          //   [460, 70],
          //   [400, 100]
          // ];

          let cordArray = [
            [(((mapWidth / 2) + startCordsX) - (tw / 2)), (startCordsY + (th / 2))],
            [((mapWidth / 2) + startCordsX), (startCordsY + th)],
            [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
            [((mapWidth / 2) + startCordsX), (startCordsY)],
            [(((mapWidth / 2) + startCordsX) - (tw / 2)), (startCordsY + (th / 2))]
          ];

          var pointObj = calculateCords(cordArray, posY, posX, item.data.zPos);

          zPlaneOne.moveTo(pointObj.startPointX, (pointObj.startPointY - this.zHeight));
          zPlaneOne.lineTo(pointObj.pointAX, (pointObj.pointAY - this.zHeight));
          zPlaneOne.lineTo(pointObj.pointBX, (pointObj.pointBY - this.zHeight));
          zPlaneOne.lineTo(pointObj.pointCX, (pointObj.pointCY - this.zHeight));
          zPlaneOne.lineTo(pointObj.pointDX, (pointObj.pointDY - this.zHeight));

          this.context.fillStyle = 'rgba(220, 160, 100, 1)'
          this.context.fill(zPlaneOne);


          // Left Pane
          let zPlaneTwo = new Path2D();

          // let cordArray2 = [
          //   [400, 100],
          //   [460, 130],
          //   [460, ((130 + this.zHeight) + (this.zHeight * (item.data.zPos - 1)))],
          //   [400, ((100 + this.zHeight) + (this.zHeight * (item.data.zPos - 1)))],
          //   [400, 100]
          // ];


          let cordArray2 = [
            [(((mapWidth / 2) + startCordsX) - (tw / 2)), (startCordsY + (th / 2))],
            [((mapWidth / 2) + startCordsX), (startCordsY + th)],
            [((mapWidth / 2) + startCordsX), (((startCordsY + th) + this.zHeight) + (this.zHeight * (item.data.zPos - 1)))],
            [(((mapWidth / 2) + startCordsX) - (tw / 2)), (((startCordsY + (th / 2)) + this.zHeight) + (this.zHeight * (item.data.zPos - 1)))],
            [(((mapWidth / 2) + startCordsX) - (tw / 2)), (startCordsY + (th / 2))]
          ];

          var pointObj2 = calculateCords(cordArray2, posY, posX, item.data.zPos);

          zPlaneTwo.moveTo(pointObj2.startPointX, (pointObj2.startPointY - this.zHeight));
          zPlaneTwo.lineTo(pointObj2.pointAX, (pointObj2.pointAY - this.zHeight));
          zPlaneTwo.lineTo(pointObj2.pointBX, (pointObj2.pointBY - this.zHeight));
          zPlaneTwo.lineTo(pointObj2.pointCX, (pointObj2.pointCY - this.zHeight));
          zPlaneTwo.lineTo(pointObj2.pointDX, (pointObj2.pointDY - this.zHeight));

          this.context.fillStyle = 'rgba(160, 220, 100, 1)'
          this.context.fill(zPlaneTwo);



          // Right Pane
          let zPlaneThree = new Path2D();

          // let cordArray3 = [
          //   [520, 100],
          //   [520, ((100 + this.zHeight) + (this.zHeight * (item.data.zPos - 1)))],
          //   [460, ((130 + this.zHeight) + (this.zHeight * (item.data.zPos - 1)))],
          //   [460, 130],
          //   [520, 100]
          // ];


          let cordArray3 = [
            [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
            [(((mapWidth / 2) + startCordsX) + (tw / 2)), (((startCordsY + (th / 2)) + this.zHeight) + (this.zHeight * (item.data.zPos - 1)))],
            [((mapWidth / 2) + startCordsX), (((startCordsY + th) + this.zHeight) + (this.zHeight * (item.data.zPos - 1)))],
            [((mapWidth / 2) + startCordsX), (startCordsY + th)],
            [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))]
          ];


          var pointObj3 = calculateCords(cordArray3, posY, posX, item.data.zPos);

          zPlaneThree.moveTo(pointObj3.startPointX, (pointObj3.startPointY - this.zHeight));
          zPlaneThree.lineTo(pointObj3.pointAX, (pointObj3.pointAY - this.zHeight));
          zPlaneThree.lineTo(pointObj3.pointBX, (pointObj3.pointBY - this.zHeight));
          zPlaneThree.lineTo(pointObj3.pointCX, (pointObj3.pointCY - this.zHeight));
          zPlaneThree.lineTo(pointObj3.pointDX, (pointObj3.pointDY - this.zHeight));

          this.context.fillStyle = 'rgba(160, 100, 220, 1)'
          this.context.fill(zPlaneThree);



          // console.log(item.data.tile)
          if(item.data.tile){
            // console.log(posX)
            // console.log(posY)

            // let x = (520 + (posX - 1) * 60) - (60 * (posY)) - 60.75;
            // let y = (120 + (posX - 1) * 30) + (30 * (posY)) - (item.data.tile.height - 38.75);

            // let x = (520 + (posY - 1) * 60) - (60 * (posX)) - 64;
            // let y = (120 + (posX - 1) * 30) + (30 * (posY)) - ((item.data.tile.height - 35) + (60 * item.data.zPos));

            // let x = (520 + (posY - 1) * 60) - (60 * (posX)) - 60.75;
            // let y = (120 + (posX - 1) * 30) + (30 * (posY)) - ((item.data.tile.height - 38.75) + (this.zHeight * item.data.zPos));

            // let x = ((((mapWidth / 2) + startCordsX) + (tw / 2)) + (posY - 1) * startCordsX) - (startCordsX * (posX)) - 60.75;
            // let y = ((startCordsY + th) + (posX - 1) * startCordsY) + (startCordsY * (posY)) - ((item.data.tile.height - 38.75) + (this.zHeight * item.data.zPos));

            // let x = ((((mapWidth / 2) + startCordsX) + (tw / 2)) + (posY - 1) * startCordsX) - (startCordsX * (posX));
            // let y = ((startCordsY + th) + (posX - 1) * startCordsY) + (startCordsY * (posY)) - ((item.data.tile.height) + (this.zHeight * item.data.zPos));


            var offsetImg = 0;

            if(item.data.tile.height > (this.tileSize / 2)){
              offsetImg = (item.data.tile.height / (this.tileSize / 2) - 1) * (this.tileSize / 2);
            }

            let x = ((mapWidth / 2) + (posY - 1) * (this.tileSize / 2)) - ((this.tileSize / 2) * (posX - 1)) - ((this.tileSize / 2) / 2) + 5;
            let y = ((startCordsY + th) + (posX - 1) * tileOffsetY) + (tileOffsetY * (posY - 1)) - ((this.zHeight * item.data.zPos)) - offsetImg;

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
  var tileOffsetX = this.tileOffsetX;
  var tileOffsetY = this.tileOffsetY;

  if(!document.querySelector('#game-ui')){

    const root = document.querySelector(this.root);
    const canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'game-ui');
    root.appendChild(canvas);

    var thisCanvas = document.querySelector('#game-ui')
    thisCanvas.setAttribute('width', this.mapWidth + this.startCordsX);
    thisCanvas.setAttribute('height', this.mapHeight + this.startCordsY);
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
    var currentTileMouseOver;
    // let tileChunkSize = 7;
    var arr = tiles;
    var tilesArray = [];

    // let startPointX, startPointY, pointAX, pointAY, pointBX, pointBY, pointCX, pointCY;

    var title = document.querySelector('#title');

    while(arr.length) {
        tilesArray.push(arr.splice(0,this.tilesY));
    }

    this.tileMap = tilesArray


    // console.log(this.tileMap)

    var calculateCords = (array, i, x, offsetY = 0, offsetX = 0,) => {

      let obj = {};

      obj['startPointX'] = (array[0][0] + ((i - offsetY)) * tileOffsetX) - (tileOffsetX * (x + offsetX));
      obj['startPointY'] = (array[0][1] + ((i - offsetY)) * tileOffsetY) + (tileOffsetY * (x + offsetX));
      obj['pointAX'] = (array[1][0] + ((i - offsetY)) * tileOffsetX) - (tileOffsetX * (x + offsetX));
      obj['pointAY'] = (array[1][1] + ((i - offsetY)) * tileOffsetY) + (tileOffsetY * (x + offsetX));
      obj['pointBX'] = (array[2][0] + ((i - offsetY)) * tileOffsetX) - (tileOffsetX * (x + offsetX));
      obj['pointBY'] = (array[2][1] + ((i - offsetY)) * tileOffsetY) + (tileOffsetY * (x + offsetX));
      obj['pointCX'] = (array[3][0] + ((i - offsetY)) * tileOffsetX) - (tileOffsetX * (x + offsetX));
      obj['pointCY'] = (array[3][1] + ((i - offsetY)) * tileOffsetY) + (tileOffsetY * (x + offsetX));

      return obj;

    }


    thisCanvas.addEventListener("mousemove", (evt) => {

        var rect = this.canvas.getBoundingClientRect();
        context.clearRect(this.startCordsX - 1, this.startCordsY - 1, this.mapWidth + 1, this.mapHeight + 1);

        var mousePos = this.getMousePos(thisCanvas, evt);
        var tileOffsetCount = 0;
        var tileZero = false;


        var th = this.tileSize / 2; // Tile Height
        var tw = this.tileSize; // Tile Width
        var mapWidth = this.tileSize * this.tilesX;
        var mapHeight = (this.tileSize / 2) * this.tilesY;
        var startCordsX = 35;
        var startCordsY = 68;

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
                  //   [460, 100],
                  //   [460, 130],
                  //   [520, 100],
                  //   [460, 100]
                  // ]


                  let cordArray = [
                    [((mapWidth / 2) + startCordsX), (startCordsY + (th / 2))],
                    [((mapWidth / 2) + startCordsX), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
                    [((mapWidth / 2) + startCordsX), (startCordsY + (th / 2))],
                  ]

                  // console.log(cordArray)

                  var pointObj = calculateCords(cordArray, i, x, 1, +0);

                  outerArea.globalAlpha = 1;
                  outerArea.moveTo(pointObj.startPointX, pointObj.startPointY);
                  outerArea.lineTo(pointObj.pointAX, pointObj.pointAY);
                  outerArea.lineTo(pointObj.pointBX, pointObj.pointBY);
                  outerArea.lineTo(pointObj.pointCX, pointObj.pointCY);

                  let outerArea2 = new Path2D();

                  // Inner Area

                  // let cordArray2 = [
                  //   [520, 130],
                  //   [460, 130],
                  //   [520, 100],
                  //   [520, 130]
                  // ]

                  let cordArray2 = [
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + th)],
                    [((mapWidth / 2) + startCordsX), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + th)]
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
                  //   [580, 100],
                  //   [580, 130],
                  //   [520, 100],
                  //   [580, 100]
                  // ]

                  let cordArray = [
                    [(((mapWidth / 2) + startCordsX) + (tw)), (startCordsY + (th / 2))],
                    [(((mapWidth / 2) + startCordsX) + (tw)), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
                    [(((mapWidth / 2) + startCordsX) + (tw)), (startCordsY + (th / 2))]
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
                  //   [520, 130],
                  //   [580, 130],
                  //   [520, 100],
                  //   [520, 130]
                  // ];

                  let cordArray2 = [
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX) + (tw)), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + th)]
                  ]

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


              if(i === (tilesArray[x].length - 1)){

                if((!inside1 && !inside2) && overlap.length === 1){

                  let outerArea = new Path2D();

                  // Outer Area

                  // let cordArray = [
                  //   [520, 130],
                  //   [460, 130],
                  //   [520, 100],
                  //   [520, 130]
                  // ];

                  let cordArray = [
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX)), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + th)]
                  ]

                  var pointObj = calculateCords(cordArray, i, x, 0, +0);

                  outerArea.globalAlpha = 1;
                  outerArea.moveTo(pointObj.startPointX, pointObj.startPointY);
                  outerArea.lineTo(pointObj.pointAX, pointObj.pointAY);
                  outerArea.lineTo(pointObj.pointBX, pointObj.pointBY);
                  outerArea.lineTo(pointObj.pointCX, pointObj.pointCY);


                  let outerArea2 = new Path2D();

                  // Inner Area

                  // let cordArray2 = [
                  //   [460, 100],
                  //   [460, 130],
                  //   [520, 100],
                  //   [460, 100]
                  // ];

                  let cordArray2 = [
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
                    [(((mapWidth / 2) + startCordsX)), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX)), (startCordsY + (th / 2))],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))]
                  ]


                  // console.log(this.bottomCorner['x'])
                  // console.log(this.bottomCorner['x'])
                  //


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


              if(x === tilesArray.length - 1){
              // if(x === (tilesArray.length - 1)){

                if((!inside1 && !inside2) && overlap.length === 1){

                  let xDistDiff = (this.topCorner['x'] - this.bottomCorner['x']) / 2

                  let outerArea = new Path2D();

                  // let cordArray = [
                  //   [580, 100],
                  //   [580, 130],
                  //   [520, 100],
                  //   [580, 100]
                  // ];

                  let cordArray = [
                    [(((mapWidth / 2) + startCordsX) + (tw)), (startCordsY + (th / 2))],
                    [(((mapWidth / 2) + startCordsX) + (tw)), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
                    [(((mapWidth / 2) + startCordsX) + (tw)), (startCordsY + (th / 2))]
                  ]

                  var pointObj = calculateCords(cordArray, i, x, 1, +1);

                  outerArea.globalAlpha = 1;
                  outerArea.moveTo(pointObj.startPointX, pointObj.startPointY);
                  outerArea.lineTo(pointObj.pointAX, pointObj.pointAY);
                  outerArea.lineTo(pointObj.pointBX, pointObj.pointBY);
                  outerArea.lineTo(pointObj.pointCX, pointObj.pointCY);


                  let outerArea2 = new Path2D();

                  // let cordArray2 = [
                  //   [520, 130],
                  //   [580, 130],
                  //   [520, 100],
                  //   [520, 130]
                  // ];

                  let cordArray2 = [
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX) + (tw)), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + th)]
                  ];

                  var pointObj2 = calculateCords(cordArray2, i, x, 1, +1);

                  outerArea2.globalAlpha = 1;
                  outerArea2.moveTo(pointObj2.startPointX, pointObj2.startPointY);
                  outerArea2.lineTo(pointObj2.pointAX, pointObj2.pointAY);
                  outerArea2.lineTo(pointObj2.pointBX, pointObj2.pointBY);
                  outerArea2.lineTo(pointObj2.pointCX, pointObj2.pointCY);


                  context.globalAlpha = 1;
                  context.strokeStyle = 'green'

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
                  //   [460, 100],
                  //   [460, 130],
                  //   [520, 100],
                  //   [460, 100]
                  // ];

                  // console.log((mapWidth / 2))

                  let cordArray = [
                    [((mapWidth / 2) + startCordsX), (startCordsY + (th / 2))],
                    [((mapWidth / 2) + startCordsX), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
                    [((mapWidth / 2) + startCordsX), (startCordsY + (th / 2))],
                  ]

                  // console.log('==== cordArray A ====')
                  // console.log(cordArray)

                  // console.log(cordArray)

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
                  //   [400, 100],
                  //   [460, 100],
                  //   [460, 130],
                  //   [400, 100]
                  // ];

                  // let cordArray2 = [
                  //   [(((mapWidth / 2) - (startCordsX / 2)) - 10), (startCordsY + (th / 2))],
                  //   [((mapWidth / 2) + startCordsX), (startCordsY + (th / 2))],
                  //   [((mapWidth / 2) + startCordsX), (startCordsY + th)],
                  //   [(((mapWidth / 2) - (startCordsX / 2)) - 10), (startCordsY + (th / 2))]
                  // ]

                  let cordArray2 = [
                    [((mapWidth / 2) + startCordsX), (startCordsY + (th / 2))],
                    [((mapWidth / 2) + startCordsX), (startCordsY + th)],
                    [(((mapWidth / 2) + startCordsX) - (tw / 2)), (startCordsY + (th / 2))],
                    [((mapWidth / 2) + startCordsX), (startCordsY + (th / 2))]
                  ]

                  // console.log('==== cordArray B ====')
                  // console.log(cordArray2)

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
                    var rect = this.canvas.getBoundingClientRect();
                    context.clearRect(this.startCordsX - 1, this.startCordsY - 1, this.mapWidth + 1, this.mapHeight + 1);
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

                var rect = this.canvas.getBoundingClientRect();

                context.clearRect(this.startCordsX - 1, this.startCordsY - 1, this.mapWidth + 1, this.mapHeight + 1);

                let hoverTile = new Path2D();

                context.globalAlpha = 1;
                context.fillStyle = 'rgba(255, 0, 0, 0.2)'
                context.strokeStyle = 'red'


                // let leftX = ((mapWidth / 2) + startCordsX - (tw / 2))
                // let leftY = (startCordsY + (th / 2))
                //
                // let bottomX = ((mapWidth / 2) + startCordsX)
                // let bottomY = (startCordsY + th)
                //
                // let topX = (((mapWidth / 2) + startCordsX) + (tw / 2))
                // let topY = (startCordsY + (th / 2))
                //
                // let rightX = ((mapWidth / 2) + startCordsX)
                // let rightY = (startCordsY)





                let leftX = ((mapWidth / 2) + startCordsX - (tw / 2))
                let leftY = (startCordsY + (th / 2))

                let bottomX = ((mapWidth / 2) + startCordsX)
                let bottomY = (startCordsY + th)

                let topX = (((mapWidth / 2) + startCordsX) + (tw / 2))
                let topY = (startCordsY + (th / 2))

                let rightX = ((mapWidth / 2) + startCordsX)
                let rightY = (startCordsY)


                // let startPointX = (400 + ((i - 0) * 60)) - (tileOffsetX * x);
                // let startPointY = (100 + ((i - 0) * 30)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos ));
                // let pointAX = (460 + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointAY = (130 + ((i - 0) * 30)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));
                // let pointBX = (520 + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointBY = (100 + ((i - 0) * 30)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));
                // let pointCX = (460 + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointCY = (70 + ((i - 0) * 30)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));
                // let pointDX = (400 + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointDY = (100 + ((i - 0) * 30)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));


                // let startPointX = (leftX + ((i - 0) * 60)) - (tileOffsetX * x);
                // let startPointY = (leftY + ((i - 0) * 30)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos ));
                // let pointAX = (bottomX + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointAY = (bottomY + ((i - 0) * 30)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));
                // let pointBX = (topX + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointBY = (topY + ((i - 0) * 30)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));
                // let pointCX = (rightX + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointCY = (rightY + ((i - 0) * 30)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));
                // let pointDX = (leftX + ((i - 0) * 60)) - (tileOffsetX * x);
                // let pointDY = (leftY + ((i - 0) * 30)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));


                let startPointX = (leftX + ((i - 0) * tileOffsetX)) - (tileOffsetX * x);
                let startPointY = (leftY + ((i - 0) * tileOffsetY)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos ));
                let pointAX = (bottomX + ((i - 0) * tileOffsetX)) - (tileOffsetX * x);
                let pointAY = (bottomY + ((i - 0) * tileOffsetY)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));
                let pointBX = (topX + ((i - 0) * tileOffsetX)) - (tileOffsetX * x);
                let pointBY = (topY + ((i - 0) * tileOffsetY)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));
                let pointCX = (rightX + ((i - 0) * tileOffsetX)) - (tileOffsetX * x);
                let pointCY = (rightY + ((i - 0) * tileOffsetY)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));
                let pointDX = (leftX + ((i - 0) * tileOffsetX)) - (tileOffsetX * x);
                let pointDY = (leftY + ((i - 0) * tileOffsetY)) + (tileOffsetY * x) - (this.zHeight * (item.data.zPos));

                // console.log('===================')
                // console.log(startPointX)
                // console.log(startPointY)
                // console.log(`X: ${i}`)
                // console.log(`Y: ${x}`)
                // console.log(pointAX)
                // console.log(pointAY)
                // console.log(pointBX)
                // console.log(pointBY)
                // console.log(pointCX)
                // console.log(pointCY)
                // console.log(pointDX)
                // console.log(pointDY)
                // console.log('===================')

                hoverTile.moveTo(startPointX, startPointY);
                hoverTile.lineTo(pointAX, pointAY);
                hoverTile.lineTo(pointBX, pointBY);
                hoverTile.lineTo(pointCX, pointCY);
                hoverTile.lineTo(pointDX, pointDY);
                context.fill(hoverTile);
                context.stroke(hoverTile);

                this.hovered = item

                // eval(this.onSelected(item))

              }else if(tileZero){

                var rect = this.canvas.getBoundingClientRect();

                context.clearRect(this.startCordsX - 1, this.startCordsY - 1, this.mapWidth + 1, this.mapHeight + 1)

                let hoverTile = new Path2D();

                context.globalAlpha = 1;
                context.fillStyle = 'rgba(255, 0, 0, 0.2)'
                context.strokeStyle = 'red'

                // hoverTile.moveTo(400, 100);
                // hoverTile.lineTo(460, 130);
                // hoverTile.lineTo(520, 100);
                // hoverTile.lineTo(460, 70);
                // hoverTile.lineTo(400, 100);


                let cordArray = [
                  [((mapWidth / 2) + startCordsX - (tw / 2)), (startCordsY + (th / 2))],
                  [((mapWidth / 2) + startCordsX), (startCordsY + th)],
                  [(((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2))],
                  [((mapWidth / 2) + startCordsX), (startCordsY)],
                  [((mapWidth / 2) + startCordsX - (tw / 2)), (startCordsY + (th / 2))],
                ]

                // console.log(cordArray)

                // hoverTile.moveTo(400, 100);
                // hoverTile.lineTo(460, 130);
                // hoverTile.lineTo(520, 100);
                // hoverTile.lineTo(460, 70);
                // hoverTile.lineTo(400, 100);

                hoverTile.moveTo(((mapWidth / 2) + startCordsX - (tw / 2)), (startCordsY + (th / 2)));
                hoverTile.lineTo(((mapWidth / 2) + startCordsX), (startCordsY + th));
                hoverTile.lineTo((((mapWidth / 2) + startCordsX) + (tw / 2)), (startCordsY + (th / 2)));
                hoverTile.lineTo(((mapWidth / 2) + startCordsX), (startCordsY));
                hoverTile.lineTo(((mapWidth / 2) + startCordsX - (tw / 2)), (startCordsY + (th / 2)));


                context.fill(hoverTile);
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

    // console.log((evt.clientX - this.startCordsX))
    // console.log((evt.clientY - rect.top))
    // console.log((evt.clientY - rect.top) - this.startCordsY)

    return {
        // x: (evt.clientX - rect.left) - 460,
        // y: (evt.clientY - rect.top) - 70,
        x: (evt.clientX - rect.left) - ((this.mapWidth / 2) + this.startCordsX),
        y: (evt.clientY - rect.top) - this.startCordsY,
        originalX: (evt.clientX - rect.left),
        originalY: (evt.clientY - rect.top),
    };
}

grid.prototype.editTile = function(tile, pos, e){

  let ctx = this.context;
  var posX = parseInt(pos.tile.split(',')[1]);
  var posY = parseInt(pos.tile.split(',')[0]);
  // let x = (520 + (posY - 1) * 60) - (60 * (posX)) - 64;
  // let y = (120 + (posY - 1) * 30) + (30 * (posX)) - 80;

  // console.log(y);
  // console.log(x);
  // console.log(pos)

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

  // let x = (520 + (posY - 1) * 60) - (60 * (posX)) - 64;
  // let y = (120 + (posY - 1) * 30) + (30 * (posX)) - 30;

  // let thisTileZ = this.tileMap[posX][posY].data['zPos']

  var zLevel;

  if(type === 'increase'){
    // console.log(pos.data.zPos)
    zLevel = pos.data.zPos+1;
    // console.log(zLevel)
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

grid.prototype.levelZero = function(){
  let ctx = this.context;

  var tile;

  for(let x = 0;x < this.tileMap.length;x++){

    this.tileMap[x].forEach((item, i) => {

      if(item.data.zPos > 0){

        let ctx = this.context;

        let posX = item.tile.split(',')[0];
        let posY = item.tile.split(',')[1];

        this.tileMap[posY][posX].data['zPos'] = 0;
        tile = this.tileMap[posY][posX]

      }

    })

  }

  this.draw();

}

grid.prototype.onClickLeft = function(func){
Valkyrie.prototype.saveMap = function(){

  function download(filename, text){
    var elm = document.createElement('a');
    elm.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
    elm.setAttribute('download', filename);
    elm.style.display = 'none';
    document.querySelector('#root').appendChild(elm);
    elm.click();
    document.querySelector('#root').removeChild(elm);
  }

  let mapObj = {};

  mapObj['data'] = this.tileMap
  mapObj['settings'] = {
    root: this.root,
    name: this.name,
    tileset: this.tileset,
    zHeight: this.zHeight,
    tileSize: this.tileSize,
    tilesX: this.tilesX,
    tilesY: this.tilesY
  }

  download(`${this.name}.json`, JSON.stringify(mapObj));
}
  this.clickLeft = func;
}

grid.prototype.onClickRight = function(func){
  this.clickRight = func;
}



grid.prototype.draw = function(){
  this.tileData();
  window.requestAnimationFrame(this.buildCanvas.bind(this));
  // this.drawGrid();
  this.ui();
}



export default grid;
