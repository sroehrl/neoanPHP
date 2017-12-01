**Using NodeJS and express**

1. Install nodeJS
2. Run _package.json_ in this folder
3. Run _index.js_ in this folder via Shell

Test: visit <APPLICATION_URL>:3000 to verify the express server & socket.io runs

Consider using screen (apt-get package):



`sudo apt-get install screen`

Enter manager: `screen`

`screen -S socket-session` (starts new session)

`screen -r socket-session` (reenter runnning session)

`screen -ls` (list running sessions)

`screen -d socket-session` (end session)

`screen -X -S socket-session quit` (kill session)

HOTKEYS:

Ctrl+A, then C : new window

Ctrl+A, then Space : switch between windows

Ctrl+A, then D : end session