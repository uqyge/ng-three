import * as THREE from "three";
import { Injectable } from "@angular/core";
import { CubeCamera } from "three";

@Injectable({
  providedIn: "root"
})
export class EngineService {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private light: THREE.AmbientLight;

  private cube: THREE.Mesh;

  mouse: THREE.Vector2 = new THREE.Vector2();

  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private INTERSECTED: any;
  createScene(elementId: string): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = <HTMLCanvasElement>document.getElementById(elementId);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true, // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // create the scene
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // soft white light
    this.light = new THREE.AmbientLight(0x404040);
    this.light.position.z = 10;
    this.scene.add(this.light);

    // this.mouse = new THREE.Vector2();
    console.log(this.mouse);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const geometry2 = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.x = 1;
    this.scene.add(this.cube);
    const mesh = new THREE.Mesh(
      geometry2,
      new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
    );
    mesh.position.y = 3;
    this.scene.add(mesh);
  }

  animate(): void {
    console.log(this.mouse);
    window.addEventListener("DOMContentLoaded", () => {
      this.render();
    });

    window.addEventListener("resize", () => {
      this.resize();
    });

    window.addEventListener("mousemove", e => {
      this.onMouseMove(e);
    });
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });

    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  onMouseMove(event) {
    // event.preventDefault();

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // let intersects = this.raycaster.intersectObjects(this.scene.children, true);
    // for (let i = 0; i < intersects.length; i++) {
    //   this.tl = new TimelineMax();
    //   this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
    //   this.tl.to(intersects[i].object.scale, 0.5, {
    //     x: 0.5,
    //     ease: Expo.easeOut
    //   });
    //   this.tl.to(intersects[i].object.position, 0.5, {
    //     x: 2,
    //     ease: Expo.easeOut
    //   });
    //   this.tl.to(
    //     intersects[i].object.rotation,
    //     0.5,
    //     { y: Math.PI * 0.5, ease: Expo.easeOut },
    //     "=-1.5"
    //   );
    // }

    let intersects = this.raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      if (this.INTERSECTED !== intersects[0].object) {
        if (this.INTERSECTED) {
          this.INTERSECTED.material.material.color.setHex(
            this.INTERSECTED.currentHex
          );
        }
        this.INTERSECTED = intersects[0].object;
        console.log(this.INTERSECTED);
        this.INTERSECTED.currentHex = this.INTERSECTED.material.color.getHex();
        this.INTERSECTED.material.color.setHex(0xff0000);
      }
    } else {
      if (this.INTERSECTED) {
        this.INTERSECTED.material.color.setHex(this.INTERSECTED.currentHex);
      }
      this.INTERSECTED = null;
    }
  }
}
