import 'phaser';
import config from '../Config/config';

export default class InputScene extends Phaser.Scene {
  constructor () {
    super('Input');
  }

  preload () {
    // load images
    this.load.image('logo', 'assets/logo.png');
  }

  create () {
    this.playerName = this.add.text(
      config.width / 2 - 300,
      280,
      'Enter your name :',
      {
        fontSize: '25px',
        fill: '#ffffff',
      },
    );

    this.input = this.add.dom(
      config.width / 2,
      400,
      'input',
      'background-color: white; width: 300px; height: 30px; font: 22px Times New Roman',
    );
    this.button = this.add.dom(
      config.width / 2,
      500,
      'button',
      'color:white;font-size:24px;background-color: #19d598; width: 220px; height: 50px;border:none;border-radius: 10px',
      'Start the game',
    );

    const addName = document.querySelector('button');

    addName.onclick = () => {
      const name = document.querySelector('input').value;
      if (name.length < 2) {
        this.add.text(
          config.width / 2,
          450,
          'Name should be over 2 characters!',
          {
            fontSize: '20px',
            fill: '#ff0000',
          },
        );
      } else {
        this.sys.game.globals.playerName = name;
        this.scene.stop('Input');
        this.scene.start('World');
      }
    };
  }
};