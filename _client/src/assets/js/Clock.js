var Clock = (function() {
  // private variables
  var canvas, // canvas element
    ctx, // canvas context
    bgGrad = true, // background gradient flag
    gradient, // gradient (background)
    height = 400, // canvas height
    key = { up: false, shift: false }, // key presses
    particles = [], // particle array
    particleColor = 'hsla(35, 0%, 100%, 0.3)', // particle color
    mouse = { x: 0, y: 0 }, // position of mouse / touch
    press = false, // pressed flag
    quiver = false, // quiver flag
    text, // the text to copy pixels from
    textSize = 140, // (initial) textsize
    valentine = false, // valentine-ify it for a bit?
    msgTime = 100, // time to show a message before returning to clock
    updateColor = true, // update color of gradient / particles with time?
    width = 800; // canvas width

  // Constants
  var FRAME_RATE = 20, // frames per second target
    MIN_WIDTH = 800, // minimum width of canvas
    MIN_HEIGHT = 400, // minimum height of canvas
    PARTICLE_NUM = 600, // (max) number of particles to generate
    RADIUS = Math.PI * 2; // radius of particle

  var defaultStyles = function() {
    textSize = 140;
    // particle color
    particleColor = 'hsla(35, 0%, 100%, 0.3)';

    // color stops
    var gradientStops = {
      0: '#333333',
      0.5: '#222222'
    };

    // create gradient
    setGradient(gradientStops);
  };

  var draw = function(p) {
    ctx.fillStyle = particleColor;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, RADIUS, true);
    ctx.closePath();
    ctx.fill();
  };

  var explode = function() {
    for (var i = 0, l = particles.length; i < l; i++) {
      var p = particles[i];

      if (p.inText) {
        var ax = mouse.x - p.px,
          ay = mouse.y - p.py,
          angle = Math.atan2(ay, ax),
          polarity,
          C = Math.cos(angle),
          S = Math.sin(angle);

        // change polarity
        // attract particles if mouse pressed, repel if shift + mousedown
        polarity = key.shift === true ? -1 : 1;

        p.x += polarity * (Math.pow(C - 1, 2) - 1) + p.velocityX * p.delta;
        p.y += polarity * (Math.pow(S - 1, 2) - 1) + p.velocityY * p.delta;

        // set previous positions
        p.px = p.x;
        p.py = p.y;

        draw(p);
      }
    }
  };

  var getTime = function(amPM, vm) {
    var endDate = new Date(vm.startTime || '2020-10-31 19:30:00').getTime(),
      nowDate = new Date().getTime(),
      date = endDate - nowDate,
      day = Math.floor(date / 1000 / 60 / 60 / 24),
      hours = (hours = Math.floor((date / 1000 / 60 / 60) % 24)),
      minutes = Math.floor((date / 1000 / 60) % 60),
      seconds = Math.floor((date / 1000) % 60),
      timeOfDay = '';

    // if(amPM) {
    //         hours = ( hours > 12 ) ? hours -= 12 : hours;
    //         hours = ( hours == 0 ) ? 12 : hours;
    //         console.log(day);
    // } else {
    //     hours = pad(hours);
    // }

    hours += day * 24;

    // var minutes = pad(date.getMinutes());
    // var seconds = pad(date.getSeconds());
    if (endDate < nowDate) {
      clearInterval(vm.timer);
      vm.timer = null;
      vm.section = 'interlude';
      vm.darken();
    }
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      timeString: hours + ' : ' + minutes + ' : ' + seconds
    };
  };

  // animation loop
  var loop = function(vm) {
    // clear out text
    ctx.clearRect(0, 0, width, height);

    var time = getTime(true, vm);

    textSize = 140;
    // draw text on canvas
    if (valentine === true) {
      if (msgTime > 0) {
        textSize = 180;
        text = '?';
        msgTime--;
      } else {
        text = time.timeString;
      }
      // valentine-ify it by setting hue to pink
      setStyles(300);
    } else if (updateColor === true && bgGrad === true) {
      // changing color with time
      // @TODO: come up with something better, this is a hacky implementation
      var color = time.hours + time.minutes + time.seconds;
      setStyles(color);
      text = time.timeString;
    } else {
      defaultStyles();
      text = time.timeString;
    }

    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.textBaseline = 'middle';
    ctx.font =
      textSize + "px 'Avenir', 'Helvetica Neue', 'Arial', 'sans-serif'";
    ctx.fillText(
      text,
      (width - ctx.measureText(text).width) * 0.5,
      height * 0.5
    );

    // copy pixels
    var imgData = ctx.getImageData(0, 0, width, height);

    // clear canvas, again
    ctx.clearRect(0, 0, width, height);

    if (bgGrad === true) {
      // draw gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }

    if (press === false) {
      // reset particles
      for (var i = 0, l = particles.length; i < l; i++) {
        var p = particles[i];
        p.inText = false;
      }
      particleText(imgData);
    } else {
      explode();
    }
    // FPS.update('fps');
  };

  var pad = function(number) {
    return ('0' + number).substr(-2);
  };

  var particleText = function(imgData) {
    var pxls = [];
    for (var w = width; w > 0; w -= 6) {
      for (var h = 0; h < width; h += 6) {
        var index = (w + h * width) * 4;
        if (imgData.data[index] > 10) {
          pxls.push([w, h]);
        }
      }
    }

    var count = pxls.length;
    for (var i = 0; i < pxls.length && i < particles.length; i++) {
      try {
        var p = particles[i],
          X,
          Y;

        if (quiver) {
          X = pxls[count - 1][0] - (p.px + Math.random() * 5);
          Y = pxls[count - 1][1] - (p.py + Math.random() * 5);
        } else {
          X = pxls[count - 1][0] - p.px;
          Y = pxls[count - 1][1] - p.py;
        }

        // tangent
        var T = Math.sqrt(X * X + Y * Y);

        // arctangent
        var A = Math.atan2(Y, X);

        // cosine
        var C = Math.cos(A);

        // sine
        var S = Math.sin(A);

        // set new postition
        p.x = p.px + C * T * p.delta;
        p.y = p.py + S * T * p.delta;

        // set previous positions
        p.px = p.x;
        p.py = p.y;

        p.inText = true;

        // draw the particle
        draw(p);

        if (key.up === true) {
          p.size += 0.3;
        } else {
          var newSize = p.size - 0.5;
          if (newSize > p.origSize && newSize > 0) {
            p.size = newSize;
          } else {
            p.size = m.origSize;
          }
        }
      } catch (e) {
        //console.log(e);
      }
      count--;
    }
  };

  var setCoordinates = function(e) {
    if (e.offsetX) {
      return { x: e.offsetX, y: e.offsetY }; // use offset if available
    } else if (e.layerX) {
      return { x: e.layerX, y: e.layerY }; // firefox... make sure to position the canvas
    } else {
      // iOS. Maybe others too?
      return {
        x: e.pageX - canvas.offsetLeft,
        y: e.pageY - canvas.offsetTop
      };
    }
  };

  // set dimensions of canvas
  var setDimensions = function() {
    width = Math.max(window.innerWidth, MIN_WIDTH);
    height = Math.max(window.innerHeight, MIN_HEIGHT);

    // Resize the canvas
    canvas.width = width;
    canvas.height = height;

    canvas.style.position = 'absolute';
    canvas.style.left = '0px';
    canvas.style.top = '0px';
  };

  var setGradient = function(gradientStops) {
    // create gradient
    gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      width
    );

    // iterate through colorstops
    for (var position in gradientStops) {
      var color = gradientStops[position];
      gradient.addColorStop(position, color);
    }
  };

  var setStyles = function(hue) {
    // color stops
    var gradientStops = {
      // 0: 'hsl(' + 35 + ', 100%, 100%)',
      // 0.5: 'hsl(' + 35 +', 10%, 50%)'
      // 0: 'rgba(0, 0, 0, .1)',
      // 0.5: 'rgba(0, 0, 0, .2)',
      // 1: 'rgba(0, 0, 0, 1)'
      0: 'hsla(35, 77%, 51%, 0.5)', // 黄
      0.3: 'hsla(35, 77%, 51%, 0.8)', // 黄
      0.8: 'hsla(0, 0%, 0%, 1)', // 黑
      1: 'hsla(37, 15%, 24%, 1)' // 黑
    };

    // change particle color
    // particleColor = 'hsla(35, 77%, 51%, 0.3)'
    particleColor = 'rgba(0, 0, 0, 0.8)';

    // create gradient
    setGradient(gradientStops);
  };

  /**
   * Public Methods
   */
  return {
    init: function(canvasID, vm) {
      canvas = document.getElementById(canvasID);
      // make sure canvas exists and that the browser understands it
      if (canvas === null || !canvas.getContext) {
        return;
      }
      // set context
      ctx = canvas.getContext('2d');

      // set dimensions
      setDimensions();

      // ui
      // this.ui();

      for (var i = 0; i < PARTICLE_NUM; i++) {
        particles[i] = new Particle(canvas);
      }

      // show FPS
      // FPS.initialize(canvas, 'fps');

      // set defaults
      defaultStyles();

      // let's do this
      vm.timer = setInterval(loop, FRAME_RATE, vm);
    }
  };
})();

// Create new particles
var Particle = function(canvas) {
  var range = (Math.random() * 180) / Math.PI, // random starting point
    spread = canvas.height, // how far away from text should the particles begin?
    size = Math.random() * 7; // random size of particle

  this.delta = 0.25;
  this.x = 0;
  this.y = 0;

  // starting positions
  this.px = canvas.width / 2 + Math.cos(range) * spread;
  this.py = canvas.height / 2 + Math.sin(range) * spread;

  this.velocityX = Math.floor(Math.random() * 10) - 5;
  this.velocityY = Math.floor(Math.random() * 10) - 5;

  this.size = size;
  this.origSize = size;

  this.inText = false;
};

export default Clock;
