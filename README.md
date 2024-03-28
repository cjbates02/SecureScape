-- Make sure you have node js installed

-- Create a python virtual environemnt using command: python -m venv <name of venv>

-- Inside the venv clone the repository: git clone -b master https://github.com/cjbates02/SecureScape.git

-- Install node modules, use command: npm install

-- Install python dependencies pip install -r requirements.txt

-- Eel has a bug with web sockets, to address after python dependencies have been installed navigate to lib/eel/__init__.py and change line import bottle.ext.websocket as wbs to import bottle_websocket as wbs

-- To start up dev server run command: python main.py

-- Not for commercial use
