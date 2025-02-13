/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["card.html","1912ac20fb7464a6916de07f15b33e59"],["deck.html","25d5b2d350c50eff04975f9078a80c3f"],["game.html","abe1f47dcccceee603936783f11f2339"],["img/manifest/icons/icon-128x128.png","569b987f64c8181cb7ba4ef2beef6d8e"],["img/manifest/icons/icon-144x144.png","686ef0d5d27572181205013a19375602"],["img/manifest/icons/icon-152x152.png","21aaa4c3ef963466875cf431e1ddf2c1"],["img/manifest/icons/icon-192x192.png","1bf22dec1e6560371f8b54185a1dd2fb"],["img/manifest/icons/icon-384x384.png","642d0d5a954d15c105b899957b2b8e86"],["img/manifest/icons/icon-512x512.png","04c93a5ffd3a4d44bc2cd9bf0ce83ec2"],["img/manifest/icons/icon-72x72.png","8a22532fa99d28fa6268b4700e1c2133"],["img/manifest/icons/icon-96x96.png","c362c39ec317ec93a309aef0bd2ac4a1"],["img/playingCards/black_joker.svg","7ce690e9a5d9fd4b323dcf7d6b988d3c"],["img/playingCards/card_back.svg","5ee45c4225cfbbf7e7670dfc7fd95883"],["img/playingCards/clubs_10.svg","8178b783fdc3c7801749624be64ca892"],["img/playingCards/clubs_2.svg","dac577f6de0164f3c3b02b485ef17c2f"],["img/playingCards/clubs_3.svg","4288d3346fb1b43a869d93bd379ea827"],["img/playingCards/clubs_4.svg","2945f53caf27b39f709d37e034883336"],["img/playingCards/clubs_5.svg","34e6950b37fb73ea0df78db803c4a4c5"],["img/playingCards/clubs_6.svg","42f752ef88f0fdea51b7e052cadb040a"],["img/playingCards/clubs_7.svg","5c6859d3b6ac3e9015106d6a45692f71"],["img/playingCards/clubs_8.svg","99611f154d489412d6f78ccd46f0e293"],["img/playingCards/clubs_9.svg","bdfee2e3b53f58c9005af3ca76537bf8"],["img/playingCards/clubs_ace.svg","10796dd915551213652f35fae2334721"],["img/playingCards/clubs_jack.svg","1266b47be4fc4e08923f8c5f85127af4"],["img/playingCards/clubs_king.svg","d38376c56e146a23373889bd6d8d8127"],["img/playingCards/clubs_queen.svg","691a3650966f0e45fb05b3c4d67e881e"],["img/playingCards/deck_empty.svg","cabbfe3e38cf17989d2aac535d409ed6"],["img/playingCards/diamonds_10.svg","4f0a42098e08ec2e9d7c5992a24a7fb8"],["img/playingCards/diamonds_2.svg","78abdab0f9b01f9c7e7bc3609ae641cd"],["img/playingCards/diamonds_3.svg","ce85f5a9c89d2a91f509ff84f78ca49a"],["img/playingCards/diamonds_4.svg","e281135f787011f2664fe4204a446f02"],["img/playingCards/diamonds_5.svg","29f6506fef5021fe13313917edefc3dc"],["img/playingCards/diamonds_6.svg","708bdfd4294c792f4629803244b8c707"],["img/playingCards/diamonds_7.svg","704b725441125e19ce48866eb49b973b"],["img/playingCards/diamonds_8.svg","2ca0a75983e192b6091b0fda89ca32a8"],["img/playingCards/diamonds_9.svg","2e84005c0e6f37cdb2503fbf6baff9ff"],["img/playingCards/diamonds_ace.svg","8c8ec1cebe2ac87b0a8fb89492d031d7"],["img/playingCards/diamonds_jack.svg","7dc71683da611aa3058242b8a79ee280"],["img/playingCards/diamonds_king.svg","920e742cbe3248b09c29f8f0c2cf117f"],["img/playingCards/diamonds_queen.svg","4ce9d2ed0b96aab686d24d640731ab08"],["img/playingCards/hearts_10.svg","7fcd4833829af4b7b9a84d872e327479"],["img/playingCards/hearts_2.svg","0d83cf478ae50e12d050cf36ac51a5e4"],["img/playingCards/hearts_3.svg","f88e9197fdd6d93ef4ad2eacbaa02261"],["img/playingCards/hearts_4.svg","14d0019f3375b51518df7aa2a8e827e3"],["img/playingCards/hearts_5.svg","833e4009feced241ab4202124e991d34"],["img/playingCards/hearts_6.svg","3e8b984201c53a2050f7791bf362916d"],["img/playingCards/hearts_7.svg","e0ff230485cd121c1354f9a525502aaf"],["img/playingCards/hearts_8.svg","09eba49680f520556366c0aaf3001b70"],["img/playingCards/hearts_9.svg","8438edb6e4911cb7d7633fd7aced62cc"],["img/playingCards/hearts_ace.svg","b050f0b516cc453ea5e501d486e0b426"],["img/playingCards/hearts_jack.svg","cd6b8b712c82f8dbafd6913509608dce"],["img/playingCards/hearts_king.svg","2334cdd221354154b1cc11294799e0b5"],["img/playingCards/hearts_queen.svg","b95f151ba8c735188fff69b9b654e21e"],["img/playingCards/spades_10.svg","17eac4e8c4c99e8ea6b840ee9d8577ad"],["img/playingCards/spades_2.svg","4c483b3316ba2d6b7b6e80dc7b8458d2"],["img/playingCards/spades_3.svg","f5ae9a4aa5712724137c8ab774e1d5f6"],["img/playingCards/spades_4.svg","02233482de2b5cd8008535352857b487"],["img/playingCards/spades_5.svg","283ff8433f8056b52f7f6d74984b4d98"],["img/playingCards/spades_6.svg","91685044767b4a28b9d868f3b747668c"],["img/playingCards/spades_7.svg","0d5d2b8a1283bbd3a710ac0d37f4ad29"],["img/playingCards/spades_8.svg","c478aedeaf1100110395e8d0d6246a08"],["img/playingCards/spades_9.svg","d8298471c2ef22a270037d1d357487e2"],["img/playingCards/spades_ace.svg","31fced5241ed9b4e43fa952ea383fd60"],["img/playingCards/spades_jack.svg","8866bdec22ddae52fae0962236301c43"],["img/playingCards/spades_king.svg","344beabcc8caf3149beb5012286b9a9a"],["img/playingCards/spades_queen.svg","0efaf0e52eb36caea88b215f971c4f31"],["index.html","f678b120dd3fdbcfe9cd7974eec22d66"],["manifest.json","94e06ce444ee72e32003448109bac37d"],["solitaire.js","f6bee879eac367dfe7bc514df3ca3ffd"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







