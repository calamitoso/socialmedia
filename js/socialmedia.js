/* global socialmedia, jQuery, $ */

window.socialmedia = window.socialmedia || {};

(window.socialmedia = function($){

    'use strict';

    //private members
    var _ns       = socialmedia || {},
        _services = [];

    //app initialization module
    (function(){

        _ns.registerService = function(options){

            _services.push(options.id);

            //populate stats
            $.ajax( options.statsUrl, { dataType: 'jsonp' } )
                .done(options.statsCallback)
                .fail( function(a, b, c) {
                    console.log(a, b, c);
                });

            //prepare target
            $('#' + options.id)
                .attr('href', options.shareUrl)
                .on('click', function(e){
                    console.log($(this).attr('href'));

                    e.preventDefault();
                    var winHeight = 350;
                    var winWidth = 520;
                    var winTop = (screen.height / 2) - (winHeight / 2);
                    var winLeft = (screen.width / 2) - (winWidth / 2);
                    window.open($(this).attr('href'), 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width='+winWidth+',height='+winHeight);

                    
                });

        };

        // _ns.getServices = function(){
        //     return _services;
        // };

    }());

    return _ns;

}(jQuery));


$(function() {
    'use strict';
    //socialmedia.init({});

    var url         = 'http://calamitoso.github.io/socialmedia/',
        encodedUrl  = encodeURIComponent(url);

    socialmedia.registerService({
        id: 'fb',
        statsUrl: 'https://api.facebook.com/method/links.getStats?urls=' + encodedUrl + '&format=json',
        statsCallback: function(data){
            $('#fb-count').html(data[0].share_count);
        },
        shareUrl: 'https://www.facebook.com/sharer/sharer.php?u='+ encodedUrl
    });

    socialmedia.registerService({
        id: 'tw',
        statsUrl: 'http://urls.api.twitter.com/1/urls/count.json?url=' + encodedUrl,
        statsCallback: function(data){
            $('#tw-count').html(data.count);
        },
        shareUrl: 'https://twitter.com/intent/tweet?url='+ encodedUrl
    });

    socialmedia.registerService({
        id: 'li',
        statsUrl: 'https://www.linkedin.com/countserv/count/share?url=' + encodedUrl,
        statsCallback: function(data){
            $('#li-count').html(data.count);
        },
        shareUrl: 'http://www.linkedin.com/shareArticle?mini=true&url='+ encodedUrl
    });

    $('.panel-share').on('click', function(e){
        e.preventDefault();

        var panel = $(this).closest('.panel'),
            name    = panel.find('.panel-name'),
            picture = panel.find('img'),
            fBUIOptions = {
                method:     'feed',
                link:       'http://calamitoso.github.io/socialmedia/',
                name:       name.html(),
                picture:    window.location.host + '/' + picture.attr('src')
            };

        console.log(fBUIOptions);


        FB.ui(fBUIOptions, function(response){
            console.log(response);
        });
    });

    $.getScript('//connect.facebook.net/en_UK/all.js', function(){
        FB.init({
            appId: '224831637710153',
        });
    });

});