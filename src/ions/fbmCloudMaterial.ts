import * as THREE from 'three';

export const fbmCloudMaterial = new THREE.ShaderMaterial({
  uniforms: {
    lightDirection: { value: new THREE.Vector3(-1, -1, -1).normalize() },
    diffuseColor: { value: new THREE.Color(0xffffff) },
    specularColor: { value: new THREE.Color(0xffffff) },
    cameraPosition: { value: new THREE.Vector3(0, 0, 0) },
    time: { value: 0.0 },
    resolution: { value: new THREE.Vector2() },
  },
  vertexShader: `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normal;
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * vec4(vPosition, 1.0);
  }
`,
  fragmentShader: `
  uniform vec3 lightDirection;
  uniform vec3 diffuseColor;
  uniform vec3 specularColor;
 // uniform vec3 cameraPosition;

  uniform float time;
  uniform vec2 resolution;

  varying vec3 vNormal;
  varying vec3 vPosition;

  #define NUM_OCTAVES 4

  float random(vec2 pos) {
    return fract(1.0 * sin(pos.y + fract(100.0 * sin(pos.x)))); // http://www.matteo-basei.it/noise
  }

  float noise(vec2 pos) {
    vec2 i = floor(pos);
    vec2 f = fract(pos);
    float a = random(i + vec2(0.0, 0.0));
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 pos) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.15), sin(0.15), -sin(0.25), cos(0.5));
    for (int i=0; i<NUM_OCTAVES; i++) {
      v += a * noise(pos);
      pos = rot * pos * 2.0 + shift;
      a *= 0.625;
    }
    return v;
  }

  void main(void) {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    p = gl_FragCoord.xy / resolution.xy * 10.0;

    p.x += cameraPosition.x;
    p.y += cameraPosition.y;

    vec3 normal = normalize(vNormal);
    vec3 diffuse = max(dot(lightDirection, normal), 0.0) * diffuseColor;
    vec3 specular = vec3(0.0);

    float t = 0.0, d;

    float time2 = time;

    vec2 q = vec2(0.0);
    q.x = fbm(p + 0.2 * time2);
    q.y = fbm(p + vec2(1.0));

    vec2 r = vec2(0.0);
    r.x = fbm(p + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time2);
    r.y = fbm(p + 1.0 * q + vec2(8.3, 2.8) + 0.126 * time2);
    //float f = fbm(p + r);

    float f = fbm(q + p * .85);
    //f = abs(fbm(q));

   // float f = fbm(p + fbm(p + fbm(p + fbm((p + time2) * 5.0))));
    //float f = fbm(p);

    vec3 color = mix(
      vec3(0.9, 0.3, 0.3),
      vec3(.9, 0.3, 0.3) + diffuse + specular,
      clamp((f * f) * 10.0, 0.1, 1.0)
    );

    color = mix(
      color,
      vec3(1., 0.1, 0.43),
      clamp(length(q), 0.5, 0.7)
    );

    /*color = mix(
      color,
      vec3(0., 0.3, 5.4),
      clamp(length(r.x), 0., .5)
    );*/

    color = (f * f * f + .5 * f * f + 1.1 * f) * color;

    gl_FragColor = vec4(color, 1.0);
  }
`,
});
