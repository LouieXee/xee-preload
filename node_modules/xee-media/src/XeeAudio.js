import jQuery from 'jquery';

import {version} from '../package.json';
import XeeMedia from './XeeMedia';

const $ = jQuery;

class XeeAudio extends XeeMedia {

    constructor (opt) {
        super(opt)

        if (opt.ele) {
            this.$media = $(opt.ele);
        } else {
            this.$media = $(`<audio src="${opt.src}">`);
            this.__getWrapper__().append(this.$media);
        }

        XeeMedia.IS_SUPPORT_MEDIA && this.__init__();
    }

    __getWrapper__ () {
        let $wrapper = $('.myAudio--wrapper');

        if (!$wrapper[0]) {
            $wrapper = $('<div>').addClass('myAudio--wrapper').css({
                display: 'none'
            }).appendTo('body');
        }

        return $wrapper;
    }

}

XeeAudio.IS_SUPPORT_MEDIA = XeeMedia.IS_SUPPORT_MEDIA;
XeeAudio.PLAY_THROUGH = XeeMedia.PLAY_THROUGH;
XeeAudio.CAN_PLAY = XeeMedia.CAN_PLAY;
XeeAudio.version = version;

export default XeeAudio;
