(function() {
  var globe = planetaryjs.planet();
  // Load our custom `autorotate` plugin; see below.
  globe.loadPlugin(autorotate(10));
  // The `earth` plugin draws the oceans and the land; it's actually
  // a combination of several separate built-in plugins.
  //
  // Note that we're loading a special TopoJSON file
  // (world-110m-withlakes.json) so we can render lakes.
  globe.loadPlugin(planetaryjs.plugins.earth({
    topojson: { file:   '/js/planetary/lib/world-110m-withlakes.json' },
    oceans:   { fill:   '#f4f5f8' },
    land:     { fill:   '#dee2ea' },
    borders:  { stroke: '#ffffff' }
  }));
  // Load our custom `lakes` plugin to draw lakes; see below.
  globe.loadPlugin(lakes({
    fill: '#dee2ea'
  }));
  // The `pings` plugin draws animated pings on the globe.
  globe.loadPlugin(planetaryjs.plugins.pings());
  // The `zoom` and `drag` plugins enable
  // manipulating the globe with the mouse.
  // globe.loadPlugin(planetaryjs.plugins.zoom({
  //   scaleExtent: [400, 600]
  // }));
  globe.loadPlugin(planetaryjs.plugins.drag({
    // Dragging the globe should pause the
    // automatic rotation until we release the mouse.
    onDragStart: function() {
      this.plugins.autorotate.pause();
    },
    onDragEnd: function() {
      this.plugins.autorotate.resume();
    }
  }));
  // Set up the globe's initial scale, offset, and rotation.
  globe.projection.scale(280).translate([280, 280]).rotate([-10, -10, -15]);

  // Every few hundred milliseconds, we'll draw another random ping.
var colors = ['blue'];
var Bishkek = ['74.5900000','42.8700000'];
var Moscow = ['37.6155600','55.7522200'];
var AbuDhabi = ['54.3773','24.4539'];
var Dubai = ['55.1712800','25.0657000'];
var Capetown = ['18.4241','33.9249'];
var Harrare = ['31.0335','17.8252'];
var Nairobi = ['36.8219','1.2921'];
var Cairo = ['31.2357','30.0444'];
var Alger = ['1.6596','28.0339'];
var Sydney  = ['151.2073200','-33.8678500'];
var Canberra  = ['149.1280700','-35.2834600']; 
var Wellington  = ['174.7762','-41.2865'];
var Brasil  = ['-47.8822','-15.7942'];
var RioDeJaneiro = ['43.1729', '22.9068'];
var Antananarivoo = ['47.5079','18.8792'];
var BuenosAires = ['58.3816','34.6037'];
var Ottawa = ['-75.6981200','45.4111700'];
var Vancouver = ['49.2827','123.1207'];
var Toronto = ['-79.4163000','43.7001100'];
var Halifax = ['63.5752','44.6488'];
var c1 = ['30.3141300','59.9386300'];
var c2 = ['2.1589900','41.3887900'];
var c3 = ['-74.0817500','4.6097100'];
var c4 = ['-56.1881600','-34.9032800'];
var c5 = ['-0.1257400','51.5085300'];
var c6 = ['2.3488000','48.8534100'];
var c7 = ['55.1712800','25.0657000'];
var c8 = ['32.8542700','39.9198700'];
var c9 = ['139.6917100','35.6895000'];
var c10 = ['126.9784000','37.5660000'];
var c11 = ['116.3972300','39.9075000'];
var c12 = ['-74.0059700','40.7142700'];
var c13 = ['-122.4194200','37.7749300'];
var c14 = ['-118.2436800','34.0522300'];
var coords = [Bishkek,Moscow,AbuDhabi,Capetown,Harrare,Nairobi,Cairo,Alger,Sydney,Canberra,Wellington,Brasil,RioDeJaneiro,Antananarivoo,BuenosAires,Ottawa,Vancouver,Toronto,Halifax,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14];
  setInterval(function() {
    // var lng = Math.random() * 360 - 180;
    // console.log(lat);
    // console.log(lng);
     var color = colors[Math.floor(Math.random() * colors.length)];
     var coord = coords[Math.floor(Math.random() * coords.length)];
     globe.plugins.pings.add(coord[0],coord[1], {color : color, ttl: 1500, angle: 1.5});
  }, 10);

  var canvas = document.getElementById('rotatingGlobe');
  // Special code to handle high-density displays (e.g. retina, some phones)
  // In the future, Planetary.js will handle this by itself (or via a plugin).
  if (window.devicePixelRatio == 2) {
    canvas.width = 800;
    canvas.height = 800;
    context = canvas.getContext('2d');
    context.scale(2, 2);
  }
  // Draw that globe!
  globe.draw(canvas);

  // This plugin will automatically rotate the globe around its vertical
  // axis a configured number of degrees every second.
  function autorotate(degPerSec) {
    // Planetary.js plugins are functions that take a `planet` instance
    // as an argument...
    return function(planet) {
      var lastTick = null;
      var paused = false;
      planet.plugins.autorotate = {
        pause:  function() { paused = true;  },
        resume: function() { paused = false; }
      };
      // ...and configure hooks into certain pieces of its lifecycle.
      planet.onDraw(function() {
        if (paused || !lastTick) {
          lastTick = new Date();
        } else {
          var now = new Date();
          var delta = now - lastTick;
          // This plugin uses the built-in projection (provided by D3)
          // to rotate the globe each time we draw it.
          var rotation = planet.projection.rotate();
          rotation[0] += degPerSec * delta / 1000;
          if (rotation[0] >= 180) rotation[0] -= 360;
          planet.projection.rotate(rotation);
          lastTick = now;
        }
      });
    };
  };

  // This plugin takes lake data from the special
  // TopoJSON we're loading and draws them on the map.
  function lakes(options) {
    options = options || {};
    var lakes = null;

    return function(planet) {
      planet.onInit(function() {
        // We can access the data loaded from the TopoJSON plugin
        // on its namespace on `planet.plugins`. We're loading a custom
        // TopoJSON file with an object called "ne_110m_lakes".
        var world = planet.plugins.topojson.world;
        lakes = topojson.feature(world, world.objects.ne_110m_lakes);
      });

      planet.onDraw(function() {
        planet.withSavedContext(function(context) {
          context.beginPath();
          planet.path.context(context)(lakes);
          context.fillStyle = options.fill || 'black';
          context.fill();
        });
      });
    };
  };
})();