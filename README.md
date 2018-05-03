# HostMaker

dev challenge for host maker

This is effectively a front end interface into a database for Creating Reading Updating and Deleting through websockets. Its all JavaScript and JSON and asyncy and valididates URL links with AirBnB.

This is a half finished project. It will run and work but the front end is buggy visually (not functionally), the secuirty amounts to a small sign saying "bad guys stay out" and it isn't fully unit tested. 

To get around airbnb's love of blocking me constantly I spoof the agent-header and I route everything through tor onion layers

mongoose.connect() in server.js needs to connect to a mongo DB. I suggest making a free mlab database, or you can make a local. I dunno, you do you man

Instructions: 

- I assume you will have node, brew and a mac. node: https://nodejs.org/en/download/ brew: https://brew.sh/
- Download and get to root
- $ npm install
- $ brew install tor
- Tor configuration file at /usr/local/etc/tor/torrc.sample. Remove the .sample extension.
- Macports would be more effective for refreshing IP pathway if you would like to set that up : https://www.torproject.org/docs/tor-doc-osx.html.en
- Run tor in terminal (literally just type '$ tor' in terminal when installed)
- $ node server
- go to localhost:3000
- Please hit the server with the credentials I gave you so you can see the historical data collection
- I dropped a lot of console logs in to make it easy for anyone reviewing it
- on the front end click the "click me to add"

Problems: 
- I didn't have time to fully unit test it
- errors are not handled, they are just piped through to the front end in the console
- The front end is awful, lots of UI bugs but considering the back end nature of this challenge I focused my attention on the BE.
- I have assumed this is an endpoint that wont be script injected or need credentials
- This is not commented code
- My variable naming is terrible property_ is not smart of me considering the application
