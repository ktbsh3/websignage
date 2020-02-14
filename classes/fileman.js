var fs = require('fs');
var resolve = require('path').resolve;
var basedir = resolve(__dirname+'/../')+'/';
var jsonfile = require('jsonfile');

const screenTemplate = {
    "id": null,
    "name": "",
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
    return jsonfile.readFileSync(files.data_json);
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

function setConfigSync(parameter, data) {
    // obtain current contents of data.json and modify the config object
    var current = getConfigSync();
    console.log("Updating " + parameter)
    console.log(current);
    current.config[parameter] = data;
    // save modified datafile
    console.log(current);
    jsonfile.writeFileSync(files.data_json, current);
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

module.exports={getDirListingSync, getConfigSync, setConfigSync, addScreen, removeScreen, getScreen, dirs, files};