import grid from './app/val-engine.js'

const iso = new grid({
  root: '#root',
  size: {width: 900, height: 900},
  // tileset: './resource/tiles.png'
})

iso.onClickLeft((e, tile) => {
  iso.editTile('/src/resources/pyramid.png', tile, e)
  let ctxMenu = document.querySelector('#context-menu');
  if(ctxMenu) ctxMenu.parentNode.removeChild(ctxMenu);
});

iso.onClickRight((e, tile) => {

  let contextMenu = document.createElement('div');
   contextMenu.setAttribute('id', 'context-menu');
   contextMenu.style.position = 'absolute';
   contextMenu.style.top = e.clientY;
   contextMenu.style.left = e.clientX;
   contextMenu.style.width = 200;
   contextMenu.style.border = '1px solid #222';
   contextMenu.style.background = '#fff';
   contextMenu.style.zIndex = 50;

   let ctxMenu = document.querySelector('#context-menu');

   if(ctxMenu) ctxMenu.parentNode.removeChild(ctxMenu);

   document.querySelector('#root').appendChild(contextMenu);

   ctxMenu = document.querySelector('#context-menu');

  let contextList = document.createElement('ul');
  contextList.setAttribute('id', 'contest-list')

  ctxMenu.appendChild(contextList);

  let ctxList = document.querySelector('#contest-list');

  let list = [
    {name: 'Remove Tile', id: 'remove-tile'},
    {name: 'Remove All', id: 'remove-all'},
    {name: 'Increase Z level', id: 'raise-z-index'},
    {name: 'Decrease Z level', id: 'decrease-z-index'}
  ]

  for(let i=0;i<list.length;i++){
    let ctxItem = document.createElement('li');
    ctxItem.setAttribute('id', list[i].id)
    ctxItem.innerHTML = list[i].name
    ctxList.appendChild(ctxItem)

    switch(i){
      case 0:
        ctxList.querySelectorAll('li')[0].addEventListener('click', () => {
          iso.editTile(null, tile, e);
          if(ctxMenu) ctxMenu.parentNode.removeChild(ctxMenu);
        })
      break;
      case 1:
        ctxList.querySelectorAll('li')[1].addEventListener('click', () => {
          iso.clearAll();
          if(ctxMenu) ctxMenu.parentNode.removeChild(ctxMenu);
        })
      break;
      case 2:
        ctxList.querySelectorAll('li')[2].addEventListener('click', () => {
          iso.tileLevel('increase', tile);
          if(ctxMenu) ctxMenu.parentNode.removeChild(ctxMenu);
        })
      break;
      case 3:
        ctxList.querySelectorAll('li')[3].addEventListener('click', () => {
          iso.tileLevel('decrease', tile);
          if(ctxMenu) ctxMenu.parentNode.removeChild(ctxMenu);
        })
      break;
    }



  }

});


iso.draw();
