#version 300 es
precision highp float;

in vec4 position;
in vec2 uv;
in vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

uniform sampler2D alphaMap;
uniform float layerThickness;
uniform float layersCount;
uniform vec4 colorStart;
uniform vec4 colorEnd;
uniform float uTime;
uniform float waveScale;
uniform float stiffness;

const float PI2 = 6.2831852;
const float RANDOM_COEFF_1 = 0.1376;
const float RANDOM_COEFF_2 = 0.3726;
const float RANDOM_COEFF_3 = 0.2546;

out vec4 vAO;
out vec2 vUv;
out float vLayerCoeff;

void main() {
    float f = float(gl_InstanceID + 1) * layerThickness;
    float layerCoeff = float(gl_InstanceID) / layersCount;

    vec4 vertex = position + vec4(normal, 0.0) * vec4(f, f, f, 0.0) ;

    float timePi2 = uTime ;
    float waveScaleFinal = waveScale * pow(layerCoeff, stiffness);
    
    vertex.x += cos( timePi2 + 10. * ( layerCoeff)) * 4. + sin(  timePi2 + ((position.x+position.y+position.z) * RANDOM_COEFF_1)) * waveScaleFinal * layerCoeff; 
    vertex.y += clamp(cos(timePi2 + ((position.x-position.y+position.z) * RANDOM_COEFF_2)) * waveScaleFinal * layerCoeff, 0.0, 1.0);
    vertex.z += sin( timePi2 + 10. * ( layerCoeff)) * 4. + sin(  timePi2 + ((position.x+position.y-position.z) * RANDOM_COEFF_3)) * waveScaleFinal * layerCoeff;

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vertex;
    // gl_Position.y = gl_Position.y - layerCoeff * layerCoeff * 100.;

    vUv = vec2(uv.x, 1.0 - uv.y);
    vAO = mix(colorStart, colorEnd, layerCoeff);
    vLayerCoeff = layerCoeff;

}