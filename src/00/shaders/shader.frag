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