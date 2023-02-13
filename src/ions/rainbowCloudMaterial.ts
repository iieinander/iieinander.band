import * as THREE from 'three';

export const rainbowCloudMaterial = new THREE.ShaderMaterial({
  uniforms: {
    lightDirection: { value: new THREE.Vector3(-1, -1, -1).normalize() },
    diffuseColor: { value: new THREE.Color(0xffffff) },
    specularColor: { value: new THREE.Color(0xffffff) },
    shininess: { value: 32 },
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
    uniform float shininess;
    uniform float time;
    uniform vec2 resolution;

    varying vec3 vNormal;
    varying vec3 vPosition;

    vec3 hsv2rgb(vec3 c)
    {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    float noise(vec2 x)
    {
      vec2 i = floor(x);
      vec2 f = fract(x);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(dot(i, vec2(127.1, 311.7)), dot(i + vec2(1.0, 0.0), vec2(127.1, 311.7)), u.x),
               mix(dot(i + vec2(0.0, 1.0), vec2(127.1, 311.7)), dot(i + vec2(1.0, 1.0), vec2(127.1, 311.7)), u.x), u.y) * 43758.5453;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec3 normal = normalize(vNormal);
      vec3 diffuse = max(dot(lightDirection, normal), 0.0) * diffuseColor;
      vec3 specular = vec3(0.0);
      if (diffuse.x > 0.0) {
        vec3 eyeDirection = normalize(-vPosition);
        vec3 halfVector = normalize(lightDirection + eyeDirection);
        float specularAngle = max(dot(halfVector, normal), 0.0);
        specular = pow(specularAngle, shininess) * specularColor;
      }

      uv.x = noise(vec2(uv.x, .2));
      uv.y = noise(vec2(uv.y, uv.x));
      //float hue = mod(time + noise(vec2(gl_FragCoord.x / resolution.x * 3.0, gl_FragCoord.y / resolution.y * 3.0)), 360.0);
      float hue = mod(time + uv.y * 2.0, 360.0);
      //hue *= noise(uv * time);
      vec3 color = vec3(hue, 1.0, 0.5);
      gl_FragColor = vec4(hsv2rgb(color) + diffuse + specular, 1.0);
    }
  `,
});
