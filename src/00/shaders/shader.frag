#version 300 es

precision highp float;
uniform sampler2D diffuseMap;
uniform sampler2D alphaMap;
uniform vec4 colorStart;
uniform vec4 colorEnd;
uniform float uTime;

in vec2 vUv;
in vec4 vAO;
in float vLayerCoeff;
out vec4 fragColor;

float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u*u*(3.0-2.0*u);
	
	float res = mix(
		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
	return res*res;
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}


void main(){
    vec4 diffuseColor = texture(diffuseMap, vUv);
    // float alphaColor = texture(alphaMap, vUv * 100. ).r ;
    float alphaColor = clamp((noise(vUv * 1024.) ) , 0.0, 1.0);
    fragColor = diffuseColor * vec4( vAO.rgba );
    fragColor.a *= alphaColor;
}