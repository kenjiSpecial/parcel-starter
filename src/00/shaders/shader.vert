// an attribute will receive data from a buffer
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
  }