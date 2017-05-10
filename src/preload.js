import xeeUtils from 'xee-utils';
import { XeeAudio, XeeVideo } from 'xee-media';

class XeePreload {

    constructor () {
        this._cache = {};

        this._EXP_REGS = {
            IMG_REG: /(?:\.jpg|\.jpeg|\.png|\.gif)$/i,
            BASE64_IMG_REG: /^data:image\/(?:png|jpg|jpeg);base64/i,
            AUDIO_REG: /\.mp3$/i,
            VIDEO_REG: /\.mp4$/i,
            JS_REG: /\.js$/i,
            CSS_REG: /\.css$/i
        };
    }

    /*
        @method preload
        @public
        @param {Object} opt.data
        @param {Function} opt.onProgress
        @param {Function} opt.onComplete
    */
    preload (opt) {
        let _EXP_REGS = this._EXP_REGS;
        let preloadData = opt.data;
        let onProgress = xeeUtils.isFunction(opt.onProgress) && opt.onProgress || xeeUtils.noop;
        let onComplete = xeeUtils.isFunction(opt.onComplete) && opt.onComplete || xeeUtils.noop;
        let count = 0;
        let total = 0;

        for (let name in preloadData) {
            ((name)=>{
                let url = preloadData[name];
                if (_EXP_REGS.IMG_REG.test(url) || _EXP_REGS.BASE64_IMG_REG.test(url)) {
                    total++;
                    let img = new Image();
                    img.onload = ()=>{
                        this._cache[name] = img;
                        // IE8下onload回调会在循环结束之前调用
                        setTimeout(_loadedCallback);
                    };
                    img.src = url;
                } else if (_EXP_REGS.JS_REG.test(url)) {
                    total++;
                    xeeUtils.loadScript(url).then(function () {
                        _loadedCallback();
                    })
                } else if (_EXP_REGS.CSS_REG.test(url)) {
                    total++;
                    xeeUtils.loadStyle(url).then(function () {
                        _loadedCallback();
                    })
                } else if (_EXP_REGS.VIDEO_REG.test(url)) {
                    if (!XeeVideo) {
                        console.error('XeePreload 预加载视频依赖于 XeeVideo，请提前加载该模块!')
                        return false;
                    }

                    if (!XeeVideo.IS_SUPPORT_MEDIA) {
                        return false;
                    }

                    total++;
                    let video = new XeeVideo({
                        src: url
                    });
                    let removeListener = video.onDone(()=>{
                        this._cache[name] = video;
                        removeListener();
                        _loadedCallback();
                    });
                } else if (_EXP_REGS.AUDIO_REG.test(url)) {
                    if (!XeeAudio) {
                        console.error('XeePreload 预加载音频依赖于 XeeAudio，请提前加载该模块!')
                        return false;
                    }

                    if (!XeeVideo.IS_SUPPORT_MEDIA) {
                        return false;
                    }

                    total++;
                    let audio = new XeeAudio({
                        src: url
                    });
                    let removeListener = audio.onDone(() => {
                        this._cache[name] = audio;
                        removeListener();
                        _loadedCallback();
                    });
                }
            })(name)
        }

        function _loadedCallback () {
            count++;
            onProgress(count, total);
            if (count == total) {
                onComplete();
            }
        }
    }

    get (name) {
        return this._cache[name];
    }

}

export default new XeePreload();
