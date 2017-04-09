/**
*
* Globe
*
*/

import React, { PropTypes } from 'react';
import THREE from 'three';

import Wrapper from './Wrapper';

import globeImage from '../../images/world.png'

const ORIGINAL_WIDTH = 928;
const ORIGINAL_HEIGHT = 908;


class Globe extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    style: {},
    isMouseDownOnGlobe: false,
  }

  componentDidMount() {
    this.mouse = { x: 0, y: 0, z: 1 };
    this.mouseOnDown = { x: 0, y: 0 };
    this.rotation = { x: Math.PI * 3 / 2, y: Math.PI / 8 };
    this.target = { x: Math.PI * 3 / 2, y: Math.PI / 8 };
    this.targetOnDown = { x: 0, y: 0 };
    this.distance = 100000;
    this.distanceTarget = 100000;
    this.scene = new THREE.Scene();
    this.ray = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector3();
    this.intersects = [];
    //$mapTooltip = $('.map-tooltip')

    this.setupScene();
  }

  componentWillReceiveProps(newProps) {
    const { timeline, activeMarkerId } = newProps
    if (activeMarkerId !== this.props.activeMarkerId) {
      const activeMarker = timeline.filter((item) => item.id === activeMarkerId)[0];
      this.moveToPoint(activeMarker.lat, activeMarker.lon);
    }
  }

  componentWillUnmount() {
    this.stopAnimationLoop();
  }

  setupScene = () => {
    this.setStageSize();

    this.camera = new THREE.PerspectiveCamera(25, this.w / this.h, 1, 10000);
    this.camera.position.z = this.distance;

    const globeMaterial = new THREE.MeshBasicMaterial();

    globeMaterial.map = new THREE.TextureLoader().load(globeImage);
    globeMaterial.fog = false;

    this.globeMesh = new THREE.Mesh(
      new THREE.SphereGeometry(200, 64, 64),
      globeMaterial
    );
    this.globeMesh.rotation.y = Math.PI;
    this.globeMesh.isGlobe = true;
    this.scene.add(this.globeMesh);
    this.pointsArray = [this.globeMesh];

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.w, this.h);

    this.renderer.domElement.style.position = 'absolute';

    this.container.appendChild(this.renderer.domElement);

    this.addMarkers();
  }

  setStageSize = () => {
    const ratio = Math.min(
      (window.innerWidth - 50) / ORIGINAL_WIDTH,
      (window.innerHeight + 150) / ORIGINAL_HEIGHT
    );

    this.w = Math.ceil(ORIGINAL_WIDTH * ratio);
    this.h = Math.ceil(ORIGINAL_HEIGHT * ratio);

    this.setState({
      style: {
        height: this.h,
        width: this.w,
        marginTop: `-${(this.h / 2)}px`,
        marginLeft: `-${(this.w / 2)}px`,
      }
    });
  }

  addMarkers = () => {
    const { timeline } = this.props
    const firstMarkerData = timeline[0]

    this.rotation.x = this.target.x = - Math.PI / 2 + (firstMarkerData.lon * Math.PI / 180);
    this.rotation.y = this.target.y = firstMarkerData.lat * Math.PI / 180;
    this.startAnimationLoop();
    timeline.forEach((markerData) => {
      this.addMarker(markerData);
    });
  }

  startAnimationLoop = () => {
    if (!this.animationFrame) {
      this.animationFrame = window.requestAnimationFrame(this.animate);
    }
  }

  stopAnimationLoop = () => {
    window.cancelAnimationFrame(this.animationFrame);
  }

  addMarker = (markerData) => {
    const phi = (90 - markerData.lat) * Math.PI / 180;
    const theta = (180 - markerData.lon) * Math.PI / 180;
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x607D8B,
      transparent: true,
      opacity: 0.5,
    });
    const marker = new THREE.Mesh(geometry, material);

    marker.position.x = 200 * Math.sin(phi) * Math.cos(theta);
    marker.position.y = 200 * Math.cos(phi);
    marker.position.z = 200 * Math.sin(phi) * Math.sin(theta);
    marker.modelId = markerData.id;

    this.scene.add(marker);
    this.pointsArray.push(marker);
  }

  onMouseDown = (event) => {
    event.preventDefault();

    this.mouseOnDown.x = -event.clientX;
    this.mouseOnDown.y = event.clientY;

    this.targetOnDown.x = this.target.x;
    this.targetOnDown.y = this.target.y;

    if (this.intersects[0] && this.intersects[0].object.isGlobe) {
      this.setState({
        style: {
          ...this.state.style,
          cursor: 'move',
        },
      });
      this.isMouseDownOnGlobe = true
    }
  }

  onMouseMove = (event) => {
    const boundingClientRect = this.container.getBoundingClientRect()
    const x = event.pageX - boundingClientRect.left;
    const y = event.pageY - boundingClientRect.top;
    this.mouse.x = (x / this.w) * 2 - 1;
    this.mouse.y = - (y / this.h) * 2 + 1;
    this.mouseVector.set(this.mouse.x, this.mouse.y, this.mouse.z);

    if (this.isMouseDownOnGlobe && this.intersects[0] && this.intersects[0].object.isGlobe) {
      this.mouse.x = - event.clientX;
      this.mouse.y = event.clientY;

      const zoomDamp = this.distance / 1000;

      this.target.x = this.targetOnDown.x + (this.mouse.x - this.mouseOnDown.x) * 0.005 * zoomDamp;
      this.target.y = this.targetOnDown.y + (this.mouse.y - this.mouseOnDown.y) * 0.005 * zoomDamp;
    }
  }

  onMouseUp = () => {
    const { timeline } = this.props

    if (this.intersects[0] && !this.intersects[0].object.isGlobe) {
      const activeMarker = timeline.filter((item) => item.id === this.intersects[0].object.modelId)[0];
      this.props.setActiveMarker(activeMarker.id);
    }

    this.setState({
      style: {
        ...this.state.style,
        cursor: 'auto',
      },
    });
    this.isMouseDownOnGlobe = false;
  }

  moveToPoint = (lat, lng) => {
    this.target.x = - Math.PI / 2 + (lng * Math.PI / 180);
    this.target.y = lat * Math.PI / 180;
  }

  resize = () => {
    this.setStageSize();
    this.renderer.setSize(this.w, this.h);
  }

  zoom = (delta) => {
    this.distanceTarget -= delta;
    this.distanceTarget = this.distanceTarget > 1000 ? 1000 : this.distanceTarget;
    this.distanceTarget = this.distanceTarget < 350 ? 350 : this.distanceTarget;
  }

  loop = () => {
    this.sceneRender();
  }

  animate = () => {
    this.sceneRender();
    this.animationFrame = window.requestAnimationFrame(this.animate);
  }

  sceneRender = () => {
    this.zoom(0);

    this.rotation.x += (this.target.x - this.rotation.x) * 0.05;
    this.rotation.y += (this.target.y - this.rotation.y) * 0.05;
    this.distance += (this.distanceTarget - this.distance) * 0.3;

    this.camera.position.x = this.distance * Math.sin(this.rotation.x) * Math.cos(this.rotation.y);
    this.camera.position.y = this.distance * Math.sin(this.rotation.y);
    this.camera.position.z = this.distance * Math.cos(this.rotation.x) * Math.cos(this.rotation.y);

    this.camera.lookAt(this.globeMesh.position);

    this.mouseVector.set(this.mouse.x, this.mouse.y, this.mouse.z);

    this.ray.setFromCamera(this.mouseVector, this.camera);
    this.intersects = this.ray.intersectObjects(this.pointsArray);

    this.renderer.render(this.scene, this.camera);
  }

  setContainerRef = (container) => {
    this.container = container;
  }

  render() {
    return (
      <Wrapper
        innerRef={this.setContainerRef}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        style={this.state.style}
      />
    );
  }
}

Globe.propTypes = {
  timeline: PropTypes.array,
};

export default Globe;
