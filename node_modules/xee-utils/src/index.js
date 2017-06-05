import {version} from '../package.json';
import utils from './utils';
import Base from './Base';
import Events from './Events';

utils.version = version;

utils.Base = Base;
utils.Events = Events;

export default utils;
