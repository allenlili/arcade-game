var Engine=function(e){var a,n=e.document,o=e.window,g=n.createElement("canvas"),s=g.getContext("2d");function t(){var n,e=Date.now();n=(e-a)/1e3,allEnemies.forEach(function(e){e.update(n)}),player.update(),function(){var e,n,a=["images/water-block.png","images/stone-block.png","images/stone-block.png","images/stone-block.png","images/grass-block.png","images/grass-block.png"];for(s.clearRect(0,0,g.width,g.height),e=0;e<6;e++)for(n=0;n<5;n++)s.drawImage(Resources.get(a[e]),101*n,83*e);allEnemies.forEach(function(e){e.render()}),player.render()}(),a=e,o.requestAnimationFrame(t)}g.width=505,g.height=606,n.body.appendChild(g),Resources.load(["images/stone-block.png","images/water-block.png","images/grass-block.png","images/enemy-bug.png","images/char-boy.png"]),Resources.onReady(function(){a=Date.now(),t()}),e.ctx=s}(this);