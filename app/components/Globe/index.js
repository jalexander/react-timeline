/**
*
* Globe
*
*/

import React, { PropTypes } from 'react';
import THREE from 'three';
import { Iterable } from 'immutable';

import Wrapper from './Wrapper';

import globeImage from '../../images/world.png';

import degreesToRadians from '../../utils/degreesToRadians';

const halfPI = Math.PI / 2;

class Globe extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    style: {},
    isMouseDownOnGlobe: false,
  }

  componentDidMount() {
    const { stage } = this.props;
    this.mouse = { x: 0, y: 0, z: 1 };
    this.mouseOnDown = { x: 0, y: 0 };
    this.rotation = { x: (Math.PI * 3) / 2, y: Math.PI / 8 };
    this.target = { x: (Math.PI * 3) / 2, y: Math.PI / 8 };
    this.targetOnDown = { x: 0, y: 0 };
    this.distance = 100000;
    this.distanceTarget = 100000;
    this.scene = new THREE.Scene();
    this.ray = new THREE.Raycaster();
    this.mouseVector = new THREE.Vector3();
    this.intersects = [];
    this.stageWidth = stage.get('width');
    this.stageHeight = stage.get('height');

    this.setupScene();
  }

  componentWillReceiveProps(newProps) {
    const { timeline, activeMarkerId, stage } = newProps;

    if (activeMarkerId !== this.props.activeMarkerId) {
      const activeMarker = timeline.find((item) => item.get('id') === activeMarkerId);
      this.moveToPoint(activeMarker.get('lat'), activeMarker.get('lon'));
    }

    if (stage !== this.props.stage) {
      this.stageWidth = stage.get('width');
      this.stageHeight = stage.get('height');
      this.renderer.setSize(this.stageWidth, this.stageHeight);
    }
  }

  componentWillUnmount() {
    this.stopAnimationLoop();
  }

  setupScene = () => {
    this.setupCamera();
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
    this.renderer.setSize(this.stageWidth, this.stageHeight);

    this.renderer.domElement.style.position = 'absolute';

    this.container.appendChild(this.renderer.domElement);

    this.addMarkers();
  }

  setupCamera = () => {
    this.camera = new THREE.PerspectiveCamera(25, this.stageWidth / this.stageHeight, 1, 10000);
    this.camera.position.z = this.distance;
  }

  setContainerRef = (container) => {
    this.container = container;
  }

  addMarkers = () => {
    const { timeline } = this.props;
    const firstMarkerData = timeline.get(0);

    this.rotation.x = this.target.x = -halfPI + degreesToRadians(firstMarkerData.get('lon'));
    this.rotation.y = this.target.y = degreesToRadians(firstMarkerData.get('lat'));
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
    const phi = degreesToRadians(90 - markerData.get('lat'));
    const theta = degreesToRadians(180 - markerData.get('lon'));
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x607D8B,
      transparent: true,
      opacity: 0.5,
    });
    const marker = new THREE.Mesh(geometry, material);

    const distanceFromSurface = 200;

    marker.position.x = distanceFromSurface * Math.sin(phi) * Math.cos(theta);
    marker.position.y = distanceFromSurface * Math.cos(phi);
    marker.position.z = distanceFromSurface * Math.sin(phi) * Math.sin(theta);
    marker.modelId = markerData.get('id');

    this.scene.add(marker);
    this.pointsArray.push(marker);
  }

  handleMouseDown = (event) => {
    event.preventDefault();
    this.props.setPreviewMarker(null);

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
      this.isMouseDownOnGlobe = true;
    }
  }

  handleMouseMove = (event) => {
    const boundingClientRect = this.container.getBoundingClientRect();
    const x = event.pageX - boundingClientRect.left;
    const y = event.pageY - boundingClientRect.top;
    this.mouse.x = ((x / this.stageWidth) * 2) - 1;
    this.mouse.y = (-(y / this.stageHeight) * 2) + 1;

    this.mouseVector.set(this.mouse.x, this.mouse.y, this.mouse.z);

    this.ray.setFromCamera(this.mouseVector, this.camera);
    this.intersects = this.ray.intersectObjects(this.pointsArray);


    const isOnMarker = this.intersects.length > 1 && !this.intersects[0].object.isGlobe;
    if (isOnMarker) {
      const isSameMarker = this.props.previewMarkerData && this.intersects[0].object.modelId === this.props.previewMarkerData.get('id');
      if (isSameMarker) return;
      this.props.setPreviewMarker({
        id: this.intersects[0].object.modelId,
        x: event.pageX,
        y: event.pageY,
      });
    }

    const isOnGlobe = this.intersects[0] && this.intersects[0].object.isGlobe;
    if (isOnGlobe) {
      if (this.props.previewMarkerData) this.props.setPreviewMarker(null);
      if (this.isMouseDownOnGlobe) {
        this.mouse.x = -event.clientX;
        this.mouse.y = event.clientY;

        this.target.x = this.targetOnDown.x + ((this.mouse.x - this.mouseOnDown.x) * 0.005);
        this.target.y = this.targetOnDown.y + ((this.mouse.y - this.mouseOnDown.y) * 0.005);
      }
    }
  }

  handleMouseUp = () => {
    const { timeline } = this.props;

    if (this.intersects[0] && !this.intersects[0].object.isGlobe) {
      const activeMarker = timeline.find((item) => item.get('id') === this.intersects[0].object.modelId);
      this.props.setActiveMarker(activeMarker.get('id'));
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
    this.target.x = -halfPI + degreesToRadians(lng);
    this.target.y = degreesToRadians(lat);
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
    if (this.distance > 1001) {
      this.zoom(0);
      this.distance += Math.round((this.distanceTarget - this.distance) * 0.3);
    }

    this.rotation.x += (this.target.x - this.rotation.x) * 0.05;
    this.rotation.y += (this.target.y - this.rotation.y) * 0.05;

    this.camera.position.x = this.distance * Math.sin(this.rotation.x) * Math.cos(this.rotation.y);
    this.camera.position.y = this.distance * Math.sin(this.rotation.y);
    this.camera.position.z = this.distance * Math.cos(this.rotation.x) * Math.cos(this.rotation.y);

    this.camera.lookAt(this.globeMesh.position);

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    const { stage } = this.props;
    const width = stage.get('width');
    const height = stage.get('height');
    return (
      <Wrapper
        innerRef={this.setContainerRef}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        style={this.state.style}
        {...{ width, height }}
      />
    );
  }
}

Globe.propTypes = {
  setActiveMarker: PropTypes.func.isRequired,

  activeMarkerId: PropTypes.string,
  previewMarkerData: PropTypes.object,
  setPreviewMarker: PropTypes.func,
  stage: PropTypes.object,
  timeline: PropTypes.instanceOf(Iterable),
};

export default Globe;
