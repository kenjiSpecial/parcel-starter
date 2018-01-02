const dat = require('dat.gui/build/dat.gui');
const TweenMax = require('gsap');
const Stats = require('stats.js');
import imageURL from '../assets/image.jpg';
import uvImageURL from '../assets/uv_img.jpg';

import { Program, ArrayBuffer, IndexArrayBuffer, Texture } from 'tubugl-core';

const vertexShader = `// an attribute will receive data from a buffer
  precision mediump float;
  
  attribute vec4 position;
  uniform float uTheta;
  uniform float uWindowRate;
  
  varying vec2 vUv;

  void main() {
    float x = mix(-1., 1.0 + uWindowRate * 2.0, position.x);
    float y = mix(-1., 1.0 + 1.0/uWindowRate * 2.0, position.y);
    float uvX = mix(0., 1.0 + uWindowRate, position.x);
    float uvY = 1.0 - mix(0., 1.0 + 1.0/uWindowRate, position.y);
    
    gl_Position = vec4(x, y, position.z, 1.0);
    
    vUv = vec2(uvX, uvY);
  }`;

const fragmentShader = `
  precision mediump float;
  
  varying vec2 vUv;
  
  uniform sampler2D uTexture;
  uniform float uWindowRate;
  uniform float uImageRate;
  uniform bool uIsGrey;
  uniform bool uIsFit;
  

  void main() {
    vec2 customUv;
    
    if(uIsFit){
        customUv = vUv;   
    }else{
        if(uImageRate < uWindowRate){
            float winWSize = 1.0/uWindowRate; float imgWSize = 1.0/uImageRate; 
            customUv.x = (imgWSize-winWSize)/imgWSize/2.0 + mix( 0.0, winWSize/imgWSize, vUv.x);
            customUv.y = vUv.y;
        }else{
            customUv.x = vUv.x;
            customUv.y = (uImageRate-uWindowRate)/uImageRate/2.0 + mix( 0.0, uWindowRate/uImageRate, vUv.y);
        }
    }
    
    vec4 color;
    if(uIsGrey){
        vec4 outputColor =texture2D( uTexture, customUv);
        color = vec4( (outputColor.r + outputColor.g + outputColor.b)/3. );
        color.a = 1.0;  
    }else{
        color = texture2D( uTexture, customUv);
    }
    
    gl_FragColor = color;
  }
`;

export default class App {
	constructor(params = {}) {
		this._width = params.width ? params.width : window.innerWidth;
		this._height = params.height ? params.height : window.innerHeight;

		this.canvas = document.createElement('canvas');
		this.gl = this.canvas.getContext('webgl');

		this._isGrey = false;
		this._isFit = false;
		this._isUVImage = false;

		if (params.isDebug) {
			this.stats = new Stats();
			document.body.appendChild(this.stats.dom);
			this._addGui();
		} else {
			let descId = document.getElementById('tubugl-desc');
			descId.style.display = 'none';
		}

		this._createProgram();
		this.resize(this._width, this._height);
	}

	_addGui() {
		this.gui = new dat.GUI();
		this.playAndStopGui = this.gui.add(this, '_playAndStop').name('pause');
		this.gui
			.add(this, '_isGrey')
			.name('isGrey')
			.onChange(() => {
				this._obj.program.bind();
				this.gl.uniform1f(this._program.getUniforms('uIsGrey').location, this._isGrey);
			});
		this.gui
			.add(this, '_isFit')
			.name('isFitScreen')
			.onChange(() => {
				this._obj.program.bind();
				this.gl.uniform1f(this._program.getUniforms('uIsFit').location, this._isFit);
			});
		this.gui
			.add(this, '_isUVImage')
			.name('isUVImage')
			.onChange(() => {
				let image = this._isUVImage ? this._uvimage : this._image;
				this._texture
					.bind()
					.setFilter()
					.wrap()
					.fromImage(image, image.width, image.height);
			});
	}

	_createProgram() {
		this._program = new Program(this.gl, vertexShader, fragmentShader);

		let vertices = new Float32Array([0, 0, 1, 0, 0, 1]);

		this._arrayBuffer = new ArrayBuffer(this.gl, vertices);
		this._arrayBuffer.setAttribs('position', 2, this.gl.FLOAT, false, 0, 0);

		this._obj = {
			program: this._program,
			positionBuffer: this._arrayBuffer,
			count: 3
		};
	}

	animateIn() {
		this._startLoad();
	}

	loop() {
		if (this.stats) this.stats.update();

		this._obj.program.bind();
		this._obj.program.setUniformTexture(this._texture, 'uTexture');
		this._texture.activeTexture().bind();
		this._obj.positionBuffer.bind().attribPointer(this._obj.program);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, this._obj.count);
	}

	animateOut() {
		TweenMax.ticker.removeEventListener('tick', this.loop, this);
	}

	onMouseMove(mouse) {}

	onKeyDown(ev) {
		switch (ev.which) {
			case 27:
				this._playAndStop();
				break;
		}
	}

	_onload() {
		this._texture = new Texture(this.gl);
		this._texture
			.bind()
			.setFilter()
			.wrap()
			.fromImage(this._image, this._image.width, this._image.height);

		this._obj.program.bind();
		this.gl.uniform1f(
			this._program.getUniforms('uImageRate').location,
			this._image.height / this._image.width
		);

		this._playAndStop();
	}

	_startLoad() {
		this._image = new Image();
		this._image.onload = this._onload.bind(this);
		this._image.onerror = function() {
			console.error('image load error');
		};
		this._image.src = imageURL;

		this._uvimage = new Image();
		this._uvimage.onerror = function() {
			console.error('image load error');
		};
		this._uvimage.src = uvImageURL;
	}

	_playAndStop() {
		this.isLoop = !this.isLoop;
		if (this.isLoop) {
			TweenMax.ticker.addEventListener('tick', this.loop, this);
			if (this.playAndStopGui) this.playAndStopGui.name('pause');
		} else {
			TweenMax.ticker.removeEventListener('tick', this.loop, this);
			if (this.playAndStopGui) this.playAndStopGui.name('play');
		}
	}

	resize(width, height) {
		this._width = width;
		this._height = height;

		this.canvas.width = this._width;
		this.canvas.height = this._height;
		this.gl.viewport(0, 0, this._width, this._height);

		this._obj.program.bind();
		this.gl.uniform1f(
			this._program.getUniforms('uWindowRate').location,
			this._height / this._width
		);
	}

	destroy() {}
}
