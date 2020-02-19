var fs = require('fs');
var resolve = require('path').resolve;
var basedir = resolve(__dirname+'/../')+'/';
var jsonfile = require('jsonfile');

const screenTemplate = {
    "id": null,
    "speed": 10000,
    "files": []
}
// directory enum
var dirs = {
    images: basedir+'public/images/',
}
// system files enum
var files = {
    data_json: basedir+'data.json'
}

// exists to reduce fs requires in other components
function getDirListingSync(path) {
    return fs.readdirSync(path);
}

function getConfigSync() {
    let jsf = jsonfile.readFileSync(files.data_json);
    console.log(jsf);
    return jsf
}

function getScreen(id) {
    return getConfigSync().screens.find( screen => screen.id === id);
}

function getConfigSync(parameter) {
    if (parameter !== undefined) {
        return jsonfile.readFileSync(files.data_json).config[parameter];
    }
    else {
        return jsonfile.readFileSync(files.data_json);
    }
}

//Should be called set speed but we saving time now
function setConfigSync(id, data) {
    // obtain current contents of data.json and modify the config object
    var conffile = getConfigSync();
    console.log(conffile);
    let screenId = conffile.screens.findIndex( screen => screen.id === id);
    console.log(screenId);
    if (conffile.screens[screenId]) {
        console.log("found screen" + id + " at " + screenId)
        conffile.screens[screenId].speed = data;
        jsonfile.writeFileSync(files.data_json, conffile);
    }
}

function addScreen(id) {
    let conffile = getConfigSync();
    let screenId = conffile.screens.findIndex( screen => screen.id === id);
    if (conffile.screens[screenId]) {
        console.log("Id " + id + " already exists");
        return "ERROR: ALREADY EXISTS";
    }
    let screen = screenTemplate;
    screen.id = id;
    conffile.screens.push(screen);
    jsonfile.writeFileSync(files.data_json, conffile);
}
function removeScreen(id) {
    let conffile = getConfigSync();
    let screenId = conffile.screens.findIndex( screen => screen.id === id);
    if (!conffile.screens[screenId]) {
        console.log("Id " + id + " not found");
        return "ERROR: NOT FOUND";
    }
    conffile.screens.splice(screenId, 1);
    jsonfile.writeFileSync(files.data_json, conffile);

}

function deleteFileSync(file) {
    let path = dirs.images
    console.log("Removing "+path+file)
    fs.unlinkSync(path+file);
    for (let i = 0; i <= 100; i++) {
        unassignFileSync(file, i);
    }
}

function assignFileSync(file, id) {
    id = Number(id);
    let conffile = getConfigSync();
    let index = conffile.screens.findIndex( screen => screen.id === id);
    conffile.screens[index].files.push(file);
    jsonfile.writeFileSync(files.data_json, conffile);
}

function unassignFileSync(file, id) {
    id = Number(id);
    let conffile = getConfigSync();
    let screenIndex = conffile.screens.findIndex( screen => screen.id === id);
    if (screenIndex != -1) {
        while (conffile.screens[screenIndex].files.findIndex(filename => filename === file) >= 0) {
            let fileIndex = conffile.screens[screenIndex].files.findIndex(filename => filename === file);
            if (fileIndex != -1) {
                conffile.screens[screenIndex].files.splice(fileIndex, 1)
            }
        }
    }
    jsonfile.writeFileSync(files.data_json, conffile);
}

module.exports={getDirListingSync, getConfigSync, setConfigSync, addScreen, removeScreen, getScreen, deleteFileSync, assignFileSync, unassignFileSync, dirs, files};