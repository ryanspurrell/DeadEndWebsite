# Dead End Website
The ***official*** website for the Dead End Zine, run by students at the University of Alberta.  
The site uses React with Vite, along with Node. The node dependencies are listed in the `package.json` file in the site directory.  
**Our site is still a WIP** so don't judge the spaghetti code!   

## How to run the site locally
#### 0. Dependencies:  
Download the following programs:  
- [git](https://git-scm.com/install/)
- [NodeJS](https://nodejs.org/en/download) (make sure you choose the option to download with **npm**)
##### Once these are installed, you can run the following code in the terminal and skip steps 1-4
```
git clone https://github.com/ryanspurrell/DeadEndWebsite.git
npm install
npm run dev
```

#### 1. Download the github repository:
---
##### Without terminal:  
- Go to the Code section and click "Download as zip"  
- Extract the zipped files, where you'll have a directory called "DeadEnd"  
    
##### With terminal:  
- Navigate to the directory where you'd like to download the folder
- Run the code `git clone https://github.com/ryanspurrell/DeadEndWebsite.git` in the terminal

**Everything from this point has to be done in your computer's terminal from the DeadEnd directory**

#### 2. Install node dependencies:  
- `npm install`
- The dependencies are listed in the `package.json` file. When you run this code they will automatically be installed, so no need to check that file.

#### 3. Host server locally:
- `npm run dev`
- The terminal will output a link; either click on it to open the website in a browser or copy the ip and paste it into your browser. It should look something like "http://localhost:5173/"
- "localhost" refers to your local ip address, and "5173" refers to the port that the server is connecting to. You may have a different number. 

#### 4. It should now be running!

### Troubleshooting
- If you're a member of **Dead End** just send me (Ryan) a text / call or ask for help with this when you see me.
#### Unable to connect to website
- This could be caused by the port being blocked. Stop the server with Ctrl+c in the terminal it's running on, and restart the server with the command `npm run dev -- --port ####` where "####" is a number up to 4 digits. You can use just about any number here, but common ones are 80, 8000, and 8080.
- Once you've run the command, try connecting to "http://localhost:####/" where "####" are the digits inputted above.
##### If you're still unable to connect:
- It's likely that your ISP is blocking your ports. In this case, you'll probably have to call them to unblock the ports.

## How to add files
**If you don't know how git works, you're probably better off sending me (Ryan) the files you'd like to add, and I'll add them when I have the chance.**
