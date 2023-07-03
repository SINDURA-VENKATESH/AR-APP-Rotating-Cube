import "./App.css";
import { useEffect } from "react";
import * as THREE from "three";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
//import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

function App() {
  useEffect(() => {
    const initialize = async () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera();
      camera.position.z=5;
      const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
      scene.add(light);

       const materials = [
          new THREE.MeshBasicMaterial({ color: 0xff0000 }),
          new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
          new THREE.MeshBasicMaterial({ color: 0x0000ff }),
          new THREE.MeshBasicMaterial({ color: 0xffff00 }),
          new THREE.MeshBasicMaterial({ color: 0xff00ff }),
          new THREE.MeshBasicMaterial({ color: 0x00ffff })
        ];
        const geometry = new THREE.BoxGeometry(1,1,1);
        const cube = new THREE.Mesh(geometry, materials);
        cube.position.z = -5;
        //mesh.position.setFromMatrixPosition(reticle.matrix);
        scene.add(cube);

      // const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(- Math.PI / 2);
      // const reticleMaterial = new THREE.MeshBasicMaterial();
      // const reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
      // reticle.matrixAutoUpdate = false;
      // reticle.visible = false;
      // scene.add(reticle);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.xr.enabled = true;

      const arButton = ARButton.createButton(renderer, { requiredFeatures: ['hit-test'], optionalFeatures: ['dom-overlay'], domOverlay: { root: document.body } });
      document.body.appendChild(renderer.domElement);
      document.body.appendChild(arButton);

      // const controller = renderer.xr.getController(0);
      // scene.add(controller);
      // controller.addEventListener('select', () => {
      //   // const materials = [
      //   //   new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      //   //   new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
      //   //   new THREE.MeshBasicMaterial({ color: 0x0000ff }),
      //   //   new THREE.MeshBasicMaterial({ color: 0xffff00 }),
      //   //   new THREE.MeshBasicMaterial({ color: 0xff00ff }),
      //   //   new THREE.MeshBasicMaterial({ color: 0x00ffff })
      //   // ];
      //   // const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      //   // const mesh = new THREE.Mesh(geometry, materials);

      //   // mesh.position.setFromMatrixPosition(reticle.matrix);
      //   // scene.add(mesh);

      //   const loader = new GLTFLoader();
      //   loader.load('/assets/SHOE_CABINET.gltf', (gltf) => {
      //     const object = gltf.scene;
      //     object.position.setFromMatrixPosition(reticle.matrix);
      //     scene.add(object);
      //   })
      // });

      renderer.xr.addEventListener("sessionstart", async (e) => {
        // const session = renderer.xr.getSession();
        // const viewerReferenceSpace = await session.requestReferenceSpace("viewer");
        // const hitTestSource = await session.requestHitTestSource({ space: viewerReferenceSpace });

        renderer.setAnimationLoop((timestamp, frame) => {
          if (!frame) return;

          // const hitTestResults = frame.getHitTestResults(hitTestSource);

          // if (hitTestResults.length) {
          //   const hit = hitTestResults[0];
          //   const referenceSpace = renderer.xr.getReferenceSpace(); // ARButton requested 'local' reference space
          //   const hitPose = hit.getPose(referenceSpace);

          //   reticle.visible = true;
          //   reticle.matrix.fromArray(hitPose.transform.matrix);
          // } else {
          //   reticle.visible = false;
          // }
          cube.rotation.y += 0.01;
          cube.rotation.x += 0.02;

          renderer.render(scene, camera);
        });
      });

      renderer.xr.addEventListener("sessionend", () => {
        console.log("session end");
      });

    }

    initialize();
  }, []);

  return (
    <div className="App">
      <div id="container"></div>
    </div>
  )
}

export default App;

