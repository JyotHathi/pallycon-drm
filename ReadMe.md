<h1>Pollycon</h1>
<a style="font-size:56px;" href="https://pallycon.com/">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#26e07f;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#1fb141"><path d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path></g></g></svg>
</a>
<a href="https://pollycon-drm.vercel.app/">Demo</a>
<hr />

<h1>To Donwload Packager For Conversion of File</h1>
<a href="https://github.com/inka-pallycon/pallycon-drm-cli-packager">Packager Reference</a>
Command After downloading packager :
<code>PallyConPackager --enc_token YOUR-KMS-TOKEN-VALUE --content_id test-content-1 --dash -i ./input/test-content-1.mp4 -o ./output/test-content-1</code>
<ul>
    <li>YOUR-KMS-TOKEN-VALUE : get from DRM settings section</li>
    <li>i : Profide input file</li>
    <li>o : Output file</li>
</ul>

<h1>To generate token for communication</h1>
<a href="https://sample.pallycon.com/customdata/#createToken">Token Generation</a>
<ul>
    <li>SITE ID, SITE Key, ACCESS Key from DRM settings section</li>
    <li>DRM Type : </li>
    <li>USER ID : Add User ID</li>
    <li>Response Format : Default original only</li>
    <li>Key Rotation : Default false</li>
    <li>Token Rule : Set to empty object{}</li>
</ul>
<p>Note : To maintain token available for longer duration change token duration to max 999,999,999 or according need</p>

<a href="https://login.pallycon.com/?lang=en&_gl=1*juee59*_ga*MTI1NTQxMjQ2My4xNzE5MTE5NTMx*_ga_1J5K0D1B1Z*MTcxOTE1NTYxMi40LjEuMTcxOTE1NjA2Ni42MC4wLjA.">Login portal</a>
<a href="https://console.pallycon.com/drm/setting">DRM settings </a>

