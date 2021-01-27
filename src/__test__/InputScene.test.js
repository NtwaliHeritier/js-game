import InputScene from '../Scenes/InputScene';

const scene = new InputScene();

test('InputScene is of type function', () => {
  expect(typeof InputScene).toBe('function');
});

test('InputScene key name is PlayerInput', () => {
  expect(scene.sys.config).toBe('Input');
});

test('InputScene scene is not undefined', () => {
  expect(scene.sys.config).not.toBe(undefined);
});
