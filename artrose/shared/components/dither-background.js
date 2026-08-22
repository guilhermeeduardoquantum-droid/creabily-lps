/**
 * dither-background.js
 * Background WebGL2 de gradiente térmico fluido — vanilla JS, sem dependências.
 *
 * Estático por padrão (u_time congelado). A única animação é um "aquecimento"
 * local que segue o cursor (pointermove) e se desfaz com ease-out ao sair
 * (pointerleave) — não há loop de animação contínuo.
 *
 * Uso: <div class="dither-background" data-colors="termografia"></div>
 */

(function () {
  'use strict';

  var VERTEX_SHADER = [
    '#version 300 es',
    'in vec2 a_position;',
    'void main() {',
    '  gl_Position = vec4(a_position, 0.0, 1.0);',
    '}'
  ].join('\n');

  var FRAGMENT_SHADER = [
    '#version 300 es',
    'precision highp float;',
    '',
    'uniform float u_time;',
    'uniform vec2 u_resolution;',
    'uniform vec3 u_colors[5];',
    'uniform int u_colorCount;',
    'uniform vec3 u_colorBack;',
    'uniform float u_scale;',
    'uniform float u_pointerX;',
    'uniform float u_pointerY;',
    'uniform float u_hoverAmount;',
    'uniform float u_hoverRadius;',
    '',
    'out vec4 fragColor;',
    '',
    '// Simplex noise 2D (Ashima Arts)',
    'vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }',
    'vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }',
    'vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }',
    '',
    'float snoise(vec2 v) {',
    '  const vec4 C = vec4(0.211324865405187, 0.366025403784439,',
    '                       -0.577350269189626, 0.024390243902439);',
    '  vec2 i  = floor(v + dot(v, C.yy));',
    '  vec2 x0 = v - i + dot(i, C.xx);',
    '  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);',
    '  vec4 x12 = x0.xyxy + C.xxzz;',
    '  x12.xy -= i1;',
    '  i = mod289(i);',
    '  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))',
    '           + i.x + vec3(0.0, i1.x, 1.0));',
    '  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);',
    '  m = m * m;',
    '  m = m * m;',
    '  vec3 x = 2.0 * fract(p * C.www) - 1.0;',
    '  vec3 h = abs(x) - 0.5;',
    '  vec3 ox = floor(x + 0.5);',
    '  vec3 a0 = x - ox;',
    '  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);',
    '  vec3 g;',
    '  g.x  = a0.x  * x0.x  + h.x  * x0.y;',
    '  g.yz = a0.yz * x12.xz + h.yz * x12.yw;',
    '  return 130.0 * dot(m, g);',
    '}',
    '',
    '// idx 0 = fundo (cor mais fria); idx 1..N = paleta de calor',
    'vec3 paletteColor(int idx, int total) {',
    '  if (idx <= 0) return u_colorBack;',
    '  int i = idx - 1;',
    '  vec3 c = u_colorBack;',
    '  for (int k = 0; k < 5; k++) {',
    '    if (k == i) c = u_colors[k];',
    '  }',
    '  return c;',
    '}',
    '',
    'void main() {',
    '  vec2 pos = gl_FragCoord.xy;',
    '',
    '  // "scale" alto = zoom maior = blobs GRANDES (inverso da frequência do ruído)',
    '  float freq = 0.08 / max(u_scale, 1.0);',
    '',
    '  // Offset temporal independente por octave — quando u_time está parado (padrão),',
    '  // isso apenas fixa uma fase; a variação real só ocorre via u_hoverAmount abaixo.',
    '  float n = 0.7 * snoise(pos * freq + vec2(u_time * 0.05, 0.0));',
    '  n += 0.3 * snoise(pos * freq * 2.0 + vec2(0.0, u_time * -0.08));',
    '  n = n * 0.5 + 0.5;',
    '',
    '  // Aquecimento local ao redor do cursor: quanto mais perto do ponteiro,',
    '  // mais a área "esquenta" (empurra o gradiente pro lado quente da paleta).',
    '  float dist = distance(pos, vec2(u_pointerX, u_pointerY));',
    '  float proximity = 1.0 - smoothstep(0.0, max(u_hoverRadius, 1.0), dist);',
    '  n += proximity * u_hoverAmount * 0.65;',
    '  n = clamp(n, 0.0, 1.0);',
    '',
    '  // Contraste: garante separação real entre frio e quente na paleta',
    '  float boosted = clamp((n - 0.5) * 2.2 + 0.5, 0.0, 1.0);',
    '',
    '  int colorCount = max(u_colorCount, 1);',
    '  int totalStops = colorCount + 1;',
    '  float colorPos = clamp(boosted, 0.0, 0.999) * float(totalStops - 1);',
    '  int idx0 = int(floor(colorPos));',
    '  int idx1 = min(idx0 + 1, totalStops - 1);',
    '  float t = fract(colorPos);',
    '',
    '  // Gradiente contínuo — sem quantização em pixels, sem dithering.',
    '  vec3 color = mix(paletteColor(idx0, totalStops), paletteColor(idx1, totalStops), t);',
    '',
    '  fragColor = vec4(color, 1.0);',
    '}'
  ].join('\n');

  var PRESETS = {
    termografia: {
      colors: ['#1a3a52', '#f4a742', '#d63838'],
      back: '#0a1520'
    }
  };

  function hexToVec3(hex) {
    var clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(function (c) { return c + c; }).join('');
    }
    var r = parseInt(clean.substring(0, 2), 16) / 255;
    var g = parseInt(clean.substring(2, 4), 16) / 255;
    var b = parseInt(clean.substring(4, 6), 16) / 255;
    return [r, g, b];
  }

  function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      var info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error('dither-background: erro ao compilar shader — ' + info);
    }
    return shader;
  }

  function createProgram(gl, vertexSource, fragmentSource) {
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      var info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error('dither-background: erro ao linkar programa — ' + info);
    }
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    return program;
  }

  var EASE_DURATION_MS = 1000;

  function DitherBackground(container) {
    this.container = container;
    this.canvas = null;
    this.gl = null;
    this.program = null;
    this.vao = null;
    this.positionBuffer = null;
    this.uniforms = {};
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.resizeObserver = null;
    this.disposed = false;

    this.frozenTime = 0; // u_time nunca avança — imagem estática por padrão
    this.pointerX = -9999;
    this.pointerY = -9999;
    this.hoverAmount = 0;
    this.hoverRadius = 200;
    this._easeRafId = null;

    this._resize = this._resize.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerLeave = this._onPointerLeave.bind(this);

    this._init();
  }

  DitherBackground.prototype._init = function () {
    var container = this.container;
    var presetName = container.dataset.colors || 'termografia';
    var preset = PRESETS[presetName] || PRESETS.termografia;

    this.scale = parseFloat(container.dataset.scale) || 15;
    this.hoverRadius = parseFloat(container.dataset.hoverRadius) || 200;
    this.colors = (preset.colors || []).map(hexToVec3);
    this.colorBack = hexToVec3(preset.back || '#000000');

    var canvas = document.createElement('canvas');
    canvas.setAttribute('aria-hidden', 'true');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.display = 'block';
    this.canvas = canvas;

    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }
    container.appendChild(canvas);

    var gl = canvas.getContext('webgl2', { antialias: false, alpha: false });
    if (!gl) {
      console.warn('dither-background: WebGL2 não suportado, abortando.');
      return;
    }
    this.gl = gl;

    this.program = createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    gl.useProgram(this.program);

    var positionLocation = gl.getAttribLocation(this.program, 'a_position');
    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 3, -1, -1, 3
    ]), gl.STATIC_DRAW);

    this.vao = gl.createVertexArray();
    gl.bindVertexArray(this.vao);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    this.uniforms = {
      u_time: gl.getUniformLocation(this.program, 'u_time'),
      u_resolution: gl.getUniformLocation(this.program, 'u_resolution'),
      u_colors: gl.getUniformLocation(this.program, 'u_colors'),
      u_colorCount: gl.getUniformLocation(this.program, 'u_colorCount'),
      u_colorBack: gl.getUniformLocation(this.program, 'u_colorBack'),
      u_scale: gl.getUniformLocation(this.program, 'u_scale'),
      u_pointerX: gl.getUniformLocation(this.program, 'u_pointerX'),
      u_pointerY: gl.getUniformLocation(this.program, 'u_pointerY'),
      u_hoverAmount: gl.getUniformLocation(this.program, 'u_hoverAmount'),
      u_hoverRadius: gl.getUniformLocation(this.program, 'u_hoverRadius')
    };

    this._resize();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(this._resize);
      this.resizeObserver.observe(container);
    } else {
      window.addEventListener('resize', this._resize);
    }

    container.addEventListener('pointermove', this._onPointerMove);
    container.addEventListener('pointerleave', this._onPointerLeave);

    this._renderFrame();
  };

  DitherBackground.prototype._resize = function () {
    if (!this.gl || this.disposed) return;
    var container = this.container;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width = Math.max(1, Math.floor(container.clientWidth * dpr));
    var height = Math.max(1, Math.floor(container.clientHeight * dpr));

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.gl.viewport(0, 0, width, height);
    }
    this._renderFrame();
  };

  DitherBackground.prototype._onPointerMove = function (e) {
    if (!this.gl || this.disposed) return;
    var rect = this.canvas.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var xTop = (e.clientX - rect.left) * dpr;
    var yTop = (e.clientY - rect.top) * dpr;

    this.pointerX = xTop;
    this.pointerY = this.canvas.height - yTop; // gl_FragCoord tem origem embaixo (Y invertido)
    this.hoverAmount = 1;
    this._cancelEase();
    this._renderFrame();
  };

  DitherBackground.prototype._onPointerLeave = function () {
    if (!this.gl || this.disposed) return;
    if (this.reducedMotion) {
      this.hoverAmount = 0;
      this._renderFrame();
      return;
    }
    this._startEaseOut();
  };

  DitherBackground.prototype._cancelEase = function () {
    if (this._easeRafId !== null) {
      cancelAnimationFrame(this._easeRafId);
      this._easeRafId = null;
    }
  };

  DitherBackground.prototype._startEaseOut = function () {
    this._cancelEase();
    var self = this;
    var startAmount = this.hoverAmount;
    var startTime = null;

    function step(now) {
      if (self.disposed) return;
      if (startTime === null) startTime = now;
      var progress = Math.min((now - startTime) / EASE_DURATION_MS, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
      self.hoverAmount = startAmount * (1 - eased);
      self._renderFrame();

      if (progress < 1) {
        self._easeRafId = requestAnimationFrame(step);
      } else {
        self.hoverAmount = 0;
        self._renderFrame();
        self._easeRafId = null;
      }
    }

    this._easeRafId = requestAnimationFrame(step);
  };

  DitherBackground.prototype._renderFrame = function () {
    var gl = this.gl;
    if (!gl) return;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    gl.useProgram(this.program);
    gl.bindVertexArray(this.vao);

    gl.uniform1f(this.uniforms.u_time, this.frozenTime);
    gl.uniform2f(this.uniforms.u_resolution, this.canvas.width, this.canvas.height);
    gl.uniform1i(this.uniforms.u_colorCount, this.colors.length);
    gl.uniform3fv(this.uniforms.u_colorBack, this.colorBack);
    gl.uniform1f(this.uniforms.u_scale, this.scale);
    gl.uniform1f(this.uniforms.u_pointerX, this.pointerX);
    gl.uniform1f(this.uniforms.u_pointerY, this.pointerY);
    gl.uniform1f(this.uniforms.u_hoverAmount, this.hoverAmount);
    gl.uniform1f(this.uniforms.u_hoverRadius, this.hoverRadius * dpr);

    var flatColors = new Float32Array(15);
    for (var i = 0; i < 5; i++) {
      var c = this.colors[i] || [0, 0, 0];
      flatColors[i * 3] = c[0];
      flatColors[i * 3 + 1] = c[1];
      flatColors[i * 3 + 2] = c[2];
    }
    gl.uniform3fv(this.uniforms.u_colors, flatColors);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  DitherBackground.prototype.dispose = function () {
    this.disposed = true;
    this._cancelEase();

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    } else {
      window.removeEventListener('resize', this._resize);
    }

    this.container.removeEventListener('pointermove', this._onPointerMove);
    this.container.removeEventListener('pointerleave', this._onPointerLeave);

    var gl = this.gl;
    if (gl) {
      if (this.positionBuffer) gl.deleteBuffer(this.positionBuffer);
      if (this.vao) gl.deleteVertexArray(this.vao);
      if (this.program) gl.deleteProgram(this.program);
    }

    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.gl = null;
    this.canvas = null;
  };

  function initAll() {
    var elements = document.querySelectorAll('.dither-background');
    elements.forEach(function (el) {
      if (!el._ditherInstance) {
        el._ditherInstance = new DitherBackground(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  window.DitherBackground = DitherBackground;
})();
