import { ORIGINAL_WIDTH, ORIGINAL_HEIGHT } from './config';

export default () => {
  const ratio = Math.min(
    (window.innerWidth - 50) / ORIGINAL_WIDTH,
    (window.innerHeight + 150) / ORIGINAL_HEIGHT
  );

  return {
    width: Math.ceil(ORIGINAL_WIDTH * ratio),
    height: Math.ceil(ORIGINAL_HEIGHT * ratio),
  }
};
