/* global socialmedia, jQuery, $ */

window.socialmedia = window.socialmedia || {};

(socialmedia.ui = function($){

    'use strict';

    //private members
    var _ns      = socialmedia.ui || {},
        _services = ['fb', 'tw', 'li'];

    //app initialization module
    (function(){

        //expose app init
        _ns.init = function(options){

            console.log(_services);

            var i = 0,
                l = _services.length,
                target,
                url = 'http://calamitoso.github.io/socialmedia/',
                encodedUrl = encodeURIComponent(url),
                statsUrl,
                ajax = {
                    'collection' : [],
                    'fn': {
                        'donefb' : function( data, textStatus, jqXHR ){
                            console.log('+++ done fb', data, textStatus, jqXHR );
                            $('#fb').find('.social-media-count').html(data[0].share_count);
                        },
                        'donetw' : function( data, textStatus, jqXHR ){
                            // console.log('+++ done tw', data, textStatus, jqXHR );
                            $('#tw').find('.social-media-count').html(data.count);
                        },
                        'doneli' : function( data, textStatus, jqXHR ){
                            // console.log('+++ done li', data, textStatus, jqXHR );
                            $('#li').find('.social-media-count').html(data.count);
                        },
                        'fail' : function(){
                            console.log('--- fail', this);
                        },
                        'always' : function(){
                        }
                    }
                };

            for(;i < l; i++ ){

                target = $('#' + _services[i]);

                switch(_services[i]){
                    case 'fb':
                        target.attr('href', 'https://www.facebook.com/sharer/sharer.php?u='+ encodedUrl);
                        statsUrl = 'https://api.facebook.com/method/links.getStats?urls=' + encodedUrl + '&format=json';
                        break;

                    case 'tw':
                        target.attr('href', 'https://twitter.com/intent/tweet?url='+ encodedUrl);
                        statsUrl = 'http://urls.api.twitter.com/1/urls/count.json?url=' + encodedUrl;
                        break;

                    case 'li':
                        target.attr('href', 'http://www.linkedin.com/shareArticle?mini=true&amp;url='+ encodedUrl);
                        statsUrl = 'https://www.linkedin.com/countserv/count/share?url=' + encodedUrl;

                        break;
                }

                console.log(statsUrl);

                ajax.collection.push(
                    $.ajax( statsUrl, { dataType: 'jsonp' } )
                        .done(ajax.fn['done' + _services[i]])
                        .fail(ajax.fn.fail)
                        .always(ajax.fn.always)
                );
            }

            // window.myAjax = ajax;

            //unregister init function after first use
            delete socialmedia.ui.init;
        };

    }());

    return _ns;

}(jQuery));


$(function() {
    'use strict';
    socialmedia.ui.init({});
});

