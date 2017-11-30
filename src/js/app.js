import 'jquery';
import '../css/main.scss';
import '../users.html';
import {RandomGenerator} from './random-generator';

const outputParagraph = $('#outputParagraph');

const outputRandomInt = () => {
    outputParagraph.text(RandomGenerator.randomInteger());
};

const outputRandomRange = () => {
    outputParagraph.text(RandomGenerator.randomRange(1, 500));
};

const buttonRndInt = jQuery('#randomInt');
const buttonRndRange = $('#randomRange');

buttonRndInt.click(outputRandomInt);
buttonRndRange.click(outputRandomRange);