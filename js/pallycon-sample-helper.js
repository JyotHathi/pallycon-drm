var browser = 'Non-DRM browser';
var drmType = 'No DRM';

// Replace the DASH and HLS URIs when you test your own content. 
var dashUri = './media/demo/dash/stream.mpd';
var hlsUri = 'https://vz-a9a2725a-03d.b-cdn.net/cfdbe93b-23d8-4001-935e-94690ca36bc4/playlist.m3u8';

var licenseUri = 'https://license-global.pallycon.com/ri/licenseManager.do';

// Replace the DEMO site ID with yours when you test your own FPS content.
var fairplayCertUri = 'https://license-global.pallycon.com/ri/fpsKeyManager.do?siteId=A2R2'; // for base64 encoded binary cert data
var fairplayCertDerUri = 'https://license-global.pallycon.com/ri/fpsCert.do?siteId=A2R2'; // for cert .der file download 

// Create and set the license tokens when you test your own content.
var widevineToken = 'eyJrZXlfcm90YXRpb24iOmZhbHNlLCJyZXNwb25zZV9mb3JtYXQiOiJvcmlnaW5hbCIsInVzZXJfaWQiOiJqeW90aDQ1MzAiLCJkcm1fdHlwZSI6IldpZGV2aW5lIiwic2l0ZV9pZCI6IkEyUjIiLCJoYXNoIjoieTlhV1ZkdWVlVFBXV2U0aVhFUGo3aW5wOFZwUEd3L0x0aXVFUko0SFY2Zz0iLCJjaWQiOiJkZW1vLTEiLCJwb2xpY3kiOiJSN0FzNEdwSis1YVlQdGp5ZUZlSXhnPT0iLCJ0aW1lc3RhbXAiOiIyMDI0LTA2LTIzVDE0OjI0OjEwWiJ9';
var playreadyToken = 'eyJrZXlfcm90YXRpb24iOmZhbHNlLCJyZXNwb25zZV9mb3JtYXQiOiJvcmlnaW5hbCIsInVzZXJfaWQiOiJqeW90aDQ1MzAiLCJkcm1fdHlwZSI6InBsYXlSZWFkeSIsInNpdGVfaWQiOiJBMlIyIiwiaGFzaCI6IkpyakQ1NjVveEhFN0Flc3FXVk43MjZjOFk3MzZCUThNWTlZTThZMUJZTk09IiwiY2lkIjoiZGVtby0xIiwicG9saWN5IjoiUjdBczRHcEorNWFZUHRqeWVGZUl4Zz09IiwidGltZXN0YW1wIjoiMjAyNC0wNi0yM1QxNDoyMjoyNVoifQ==';
// var fairplayToken = 'eyJrZXlfcm90YXRpb24iOmZhbHNlLCJyZXNwb25zZV9mb3JtYXQiOiJvcmlnaW5hbCIsInVzZXJfaWQiOiJ0ZXN0LXVzZXIiLCJkcm1fdHlwZSI6IkZhaXJQbGF5Iiwic2l0ZV9pZCI6IkRFTU8iLCJoYXNoIjoiY21NZkZPUExrakErbTVLZ3BKS09vVnVmRTVTc3hKdVlTUm1jUWM1dmlVUT0iLCJjaWQiOiJiaWdidWNrYnVubnkiLCJwb2xpY3kiOiJuNXgyOHVZbURkUENGaW1vTTNuR053PT0iLCJ0aW1lc3RhbXAiOiIyMDIxLTAxLTA2VDA5OjI0OjI4WiJ9';

function setWidevineToken(newWidevineToken) {
  widevineToken = newWidevineToken;
}

function setPlayReadyToken(newPlayReadyToken) {
  playreadyToken = newPlayReadyToken;
}

function setFairPlayToken(newFairPlayToken) {
  fairplayToken = newFairPlayToken;
}

// Detect the browser and set proper DRM type
function checkBrowser() {
  var agent = navigator.userAgent.toLowerCase(),
    name = navigator.appName,
    browser;

  if (name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
    browser = 'ie';
    if (name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
      agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
      // browser += parseInt(agent[1]);
    } else if (agent.indexOf('edge/') > -1) { // Edge
      browser = 'Edge';
    }
  } else if (agent.indexOf('safari') > -1) { // Chrome or Safari
    if (agent.indexOf('opr') > -1) { // Opera
      browser = 'Opera';
    } else if (agent.indexOf('whale') > -1) { // Chrome
      browser = 'Whale';
    } else if (agent.indexOf('edg/') > -1 || agent.indexOf('Edge/') > -1) { // Chrome
      browser = 'Edge';
    } else if (agent.indexOf('chrome') > -1) { // Chrome
      browser = 'Chrome';
    } else { // Safari
      browser = 'Safari';
    }
  } else if (agent.indexOf('firefox') > -1) { // Firefox
    browser = 'firefox';
  }

    // The below three lines are for the sample code only. May need to be removed.
    var result = "Running in " + browser + ". " + drmType + " supported.";
    document.getElementById("browserCheckResult").innerHTML = result;
    console.log(result);

  return browser;
}

// checks which DRM is supported by the browser
async function checkSupportedDRM() {
  const config = [
    {
      initDataTypes: ['cenc'],
      audioCapabilities: [
        {
          contentType: 'audio/mp4;codecs="mp4a.40.2"',
        },
      ],
      videoCapabilities: [
        {
          contentType: 'video/mp4;codecs="avc1.42E01E"',
        },
      ],
    },
  ];
  const drm = {
    Widevine: {
      name: 'Widevine',
      mediaKey: 'com.widevine.alpha',
    },
    PlayReady: {
      name: 'PlayReady',
      mediaKey: 'com.microsoft.playready',
    },
    FairPlay: {
      name: 'FairPlay',
      mediaKey: 'com.apple.fps.1_0',
    },
  };
  let supportedDRMType = '';
  for (const key in drm) {
    try {
      await navigator
          .requestMediaKeySystemAccess(drm[key].mediaKey, config)
          .then((mediaKeySystemAccess) => {
            supportedDRMType = drm[key].name;
            console.log(supportedDRMType + ' support ok');
          })
          .catch((e) => {
            console.log(key + ' :: ' + e);
          });
    } catch (e) {
      console.log(e);
    }
    drmType = supportedDRMType;
  }
}

function arrayToString(array) {
  var uint16array = new Uint16Array(array.buffer);
  return String.fromCharCode.apply(null, uint16array);
}

function arrayBufferToString(buffer) {
  var arr = new Uint8Array(buffer);
  var str = String.fromCharCode.apply(String, arr);
  // if(/[\u0080-\uffff]/.test(str)){
  //     throw new Error("this string seems to contain (still encoded) multibytes");
  // }
  return str;
}

function base64DecodeUint8Array(input) {
  var raw = window.atob(input);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for (i = 0; i < rawLength; i++)
    array[i] = raw.charCodeAt(i);

  return array;
}

function base64EncodeUint8Array(input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  while (i < input.length) {
    chr1 = input[i++];
    chr2 = i < input.length ? input[i++] : Number.NaN;
    chr3 = i < input.length ? input[i++] : Number.NaN;

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
      keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
  return output;
}

function getFairplayCert() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.open("GET", fairplayCertUri, false);
  xmlhttp.send();

  var fpsCert = shaka.util.Uint8ArrayUtils.fromBase64(xmlhttp.responseText);
  return fpsCert;
}