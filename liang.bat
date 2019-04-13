::=================================config==================================
set Version=1.0.0
set AppID=00000000
set AccessToken=000000000
set imgQuality=50-70

::=================================build options==================================
::PC
if "%1"=="-p" (
    node .\Tools\removeFBScript.js
    http-server ./Source/ --key ./Tools/key.pem --cert ./Tools/cert.pem --ssl -c-1 -p 8080 -a 0.0.0.0
)

::mobile
if "%1"=="-m" (
    node .\Tools\removeFBScript.js
    http-server ./Source/ -c-1 -p 8080 -a 0.0.0.0
)

::upload test
if "%1"=="-t" (
    set comment=Test
    node .\Tools\addFBScript.js
    call :testPrepare
    call :export
    EXIT /B 0
)

::upload release
if "%1"=="-r" (
    set comment=Release_minified
    call :releasePrepare
    call :minifyJS
    call :minifyImage
    call :export
    http-server ./Build/ --key ./Tools/key.pem --cert ./Tools/cert.pem --ssl -c-1 -p 8080 -a 0.0.0.0
    EXIT /B 0
)

::=================================functions==================================
:testPrepare
    rmdir /S /Q .\Build
    mkdir .\Build
    xcopy .\Assets .\Build\Assets /e /i /h /y
    copy .\index.html .\Build\index.html /y
    copy .\Tools\fbapp-config.json .\Build\fbapp-config.json /y
EXIT /B 0

:releasePrepare
    rmdir /S /Q .\Build
    mkdir .\Build
    xcopy .\Source\Assets\Audio .\Build\Assets\Audio /e /i /h /y
    xcopy .\Source\Assets\Models .\Build\Assets\Models /e /i /h /y
    xcopy .\Source\Assets\Textures .\Build\Assets\Textures /e /i /h /y
    copy .\Tools\index_release.html .\Build\index.html /y
    copy .\Tools\fbapp-config.json .\Build\fbapp-config.json /y
EXIT /B 0

:minifyJS
    node .\Tools\biMinify.js
    call .\Tools\biMinify.bat
    del .\Tools\biMinify.bat
EXIT /B 0

:minifyImage
    set imgDir=./Build/Assets/Textures
    .\Tools\pngquant --ext .png --force --speed=1 --quality=%imgQuality% %imgDir%/*.png %imgDir%/*/*.png %imgDir%/*/*/*.png
EXIT /B 0

:export
    for %%I in (.) do set ProjectName=%%~nxI
    set Filename=%ProjectName%-FB-%Version%.zip

    del .\Build\%Filename%
    7z a -tzip .\Build\%Filename% .\Build\*
EXIT /B 0

:upload
    curl -x http://127.0.0.1:1080 -X POST https://graph-video.facebook.com/%AppID%/assets ^
    -F access_token=%AccessToken% ^
    -F type=BUNDLE ^
    -F asset=@Build/%Filename% ^
    -F comment=%comment%

    start https://developers.facebook.com/apps/%AppID%/instant-games/hosting/?business_id=2032974016957223
EXIT /B 0