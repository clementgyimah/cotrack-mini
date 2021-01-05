/* eslint-disable no-loop-func */
//Calling all necessary packages and libraries
const electron = require('electron');

const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const isDev = require('electron-is-dev');
const { ipcMain, shell } = require('electron');

// Enable live reload for Electron during development mode
if (isDev) {
    require('electron-reload')(__dirname, {
        // Note that the path to electron may vary according to the main file
        // The ".." in the path means the path moves backwards once
        electron: require(`${__dirname + "/../"}/node_modules/electron`)
    })
}

//variables to check which operating system it is
const isMac = process.platform === 'darwin';
const isWindows = process.platform === 'win32';

//Database declarations
var dbPath
if (isDev) {
    dbPath = "src/Database"
}
else {
    if (isWindows) {
        dbPath = electron.app.getPath('documents') + "/.Cotrack/db";
    }
    else {
        dbPath = electron.app.getPath('home') + "/.Cotrack/db";
    }
}
const Datastore = require('nedb');
const attendee = new Datastore({ filename: dbPath + "/attendee.db", autoload: true });
const session = new Datastore({ filename: dbPath + "/session.db", autoload: true });
const temp = new Datastore({ filename: dbPath + "/temp.db", autoload: true });



//Declaring variables for each app window
let mainWindow;
let sessionWindow;
let editWindow;
let analyzerWindow;
let tabsWindow;
let settingsWindow;
let aboutWindow;

//tweaking the current date to conform to a pattern like "2020-09-15"
var currDate;
var currentDate = new Date()
var thisyear = currentDate.getFullYear().toString();
var thismonth = (parseInt(currentDate.getMonth(), 10) + 1).toString();
if (thismonth.length === 1) {
    thismonth = "0" + thismonth;
}
var thisday = currentDate.getDate().toString()
if (thisday.length === 1) {
    thisday = "0" + thisday;
}
currDate = thisyear + '-' + thismonth + '-' + thisday;
currDate = currDate.toString();

//Main function that runs each app window
function createWindow() {
    //Each app window definition
    mainWindow = new BrowserWindow({ width: 1100, height: 850, minWidth: 1100, minHeight: 650, webPreferences: { nodeIntegration: true } });
    sessionWindow = new BrowserWindow({ width: 950, height: 850, minWidth: 950, minHeight: 350, parent: mainWindow, show: false, webPreferences: { nodeIntegration: true } });
    editWindow = new BrowserWindow({ width: 950, height: 850, minWidth: 950, minHeight: 350, parent: mainWindow, show: false, webPreferences: { nodeIntegration: true } });
    analyzerWindow = new BrowserWindow({ width: 950, height: 850, minWidth: 950, minHeight: 350, parent: mainWindow, show: false, webPreferences: { nodeIntegration: true } });
    tabsWindow = new BrowserWindow({ width: 950, height: 850, minWidth: 950, minHeight: 350, parent: mainWindow, show: false, webPreferences: { nodeIntegration: true } });
    settingsWindow = new BrowserWindow({ width: 950, height: 850, minWidth: 750, minHeight: 550, parent: mainWindow, show: false, webPreferences: { nodeIntegration: true } });
    aboutWindow = new BrowserWindow({ width: 550, height: 450, resizable: false, parent: mainWindow, show: false, webPreferences: { nodeIntegration: true } });

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${__dirname}/index.html`);
    sessionWindow.loadURL(isDev ? 'http://localhost:3000/#/sessioninfo' : `file://${__dirname}/index.html#/sessioninfo`);
    editWindow.loadURL(isDev ? 'http://localhost:3000/#/editpage' : `file://${__dirname}/index.html#/editpage`);
    analyzerWindow.loadURL(isDev ? 'http://localhost:3000/#/analyzer' : `file://${__dirname}/index.html#/analyzer`);
    tabsWindow.loadURL(isDev ? 'http://localhost:3000/#/tabspage' : `file://${__dirname}/index.html#/tabspage`);
    settingsWindow.loadURL(isDev ? 'http://localhost:3000/#/settings' : `file://${__dirname}/index.html#/settings`);
    aboutWindow.loadURL(isDev ? 'http://localhost:3000/#/about' : `file://${__dirname}/index.html#/about`);

    //Set main window to null when closed. Meaning the whole app will stop running
    mainWindow.on('closed', () => mainWindow = null);

    //open developer tools for the frontend part of the main windows
    //mainWindow.webContents.openDevTools();

    //Hide the view session window when closed. This will help the window correctly open again without errors when opened again before closing the main window.
    sessionWindow.on('close', (e) => {
        e.preventDefault();
        sessionWindow.hide();
    });

    sessionWindow.on('show', (e) => {
        e.preventDefault();
        sessionWindow.reload();
        sessionWindow.setMenu(printer);
    });

    //Hide the tabs window when closed. This will help the window correctly open again without errors when opened again before closing the main window.
    tabsWindow.on('close', (e) => {
        e.preventDefault();
        tabsWindow.hide();
    });

    tabsWindow.on('show', (e) => {
        e.preventDefault();
        tabsWindow.reload();
    });

    //Hide the edit window when closed. This will help the window correctly open again without errors when opened again before closing the main window.
    editWindow.on('close', (e) => {
        e.preventDefault();
        editWindow.hide();
    })

    editWindow.on('show', (e) => {
        e.preventDefault();
        editWindow.reload();
    })

    //Hide the analyzer window when closed. This will help the window correctly open again without errors when opened again before closing the main window.
    analyzerWindow.on('close', (e) => {
        e.preventDefault();
        analyzerWindow.hide();
    })

    analyzerWindow.on('show', (e) => {
        e.preventDefault();
        analyzerWindow.reload();
    })

    //Hide the settings window when closed. This will help the window correctly open again without errors when opened again before closing the main window.
    settingsWindow.on('close', (e) => {
        e.preventDefault();
        settingsWindow.hide();
    })

    settingsWindow.on('show', (e) => {
        e.preventDefault();
        settingsWindow.reload();
    })

    //Hide the about window when closed. This will help the window correctly open again without errors when opened again before closing the main window.
    aboutWindow.on('close', (e) => {
        e.preventDefault();
        aboutWindow.hide();
    })

    aboutWindow.on('show', (e) => {
        e.preventDefault();
        aboutWindow.reload();
        aboutWindow.setMenu(null);
    })

}

//when app is ready to open, open it using the createWindow function
app.on('ready', createWindow);

//When all windows closes, then quit the app.
app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
        await app.quit();
    }
});

//If the app opens again after closing the main window, call the createWindow function again. This will help prevent errors.
app.on('activate', async () => {
    if (mainWindow === null) {
        await createWindow();
    }
});

//Show the tabs sessions screen when this event emitter is on or activated
ipcMain.on('open-tabs', async (event, arg) => {
    const startingTime = arg.startingTime;
    const endingTime = arg.endingTime;
    await session.findOne({ _id: currDate }, async (err, doc) => {
        if (err) return console.log(err);
        //check if service is already started. if started, then return service already started as true to frontend.
        //else return service already started as true to frontend 
        if (doc) {
            const serviceAlreadyStarted = true;
            return await event.reply("open-tabs-reply", serviceAlreadyStarted);
        }
        else {
            const serviceAlreadyStarted = false;
            await putNewDate(startingTime, endingTime)
                .catch((err) => {
                    console.log(err);
                })
            await temp.find({ _id: 2 }, async (err, doc) => {
                if (err) return console.log(err);
                else if (doc.length === 0) {
                    return await temp.insert({ _id: 2, tempDate: currDate });
                }
                else {
                    return await temp.update({ _id: 2 }, { $set: { tempDate: currDate } });
                }
            })
            await event.reply("open-tabs-reply", serviceAlreadyStarted);
            await sessionWindow.reload();
            return await tabsWindow.show();

        }
    })
})

//event emitter used to open the edit window when on or activated
ipcMain.on('open-edit-window', async (event, arg) => {
    editWindow.show();
});

//event emitter used to open the settings window when on or activated
ipcMain.on('open-settings-window', async (event, arg) => {
    settingsWindow.show();
});

//event emitter used to open the about window when on or activated
ipcMain.on('open-about-window', async (event, arg) => {
    aboutWindow.show();
});

//event emitter used to search for the church name from the database
ipcMain.on('get-church-name', async (event, arg) => {
    await temp.findOne({ _id: 3 }, async (err, doc) => {
        var tempChurchName;
        if (err) return console.log(err);
        else if (doc) {
            tempChurchName = doc.tempChurchName;
            return await event.reply('get-church-name-reply', tempChurchName);
        }
        else {
            tempChurchName = "";
            return await event.reply('get-church-name-reply', tempChurchName);
        }
    })
})

//event emitter used to search for the current session from the database
ipcMain.on('current-session', async (event, arg) => {
    await temp.findOne({ _id: 2 }, async (err, doc) => {
        if (err) return console.log(err);
        else {
            var tempDate;
            if (doc) {
                tempDate = doc.tempDate;
                return await event.reply('current-session-reply', tempDate);
            }
            else {
                tempDate = "";
                return await event.reply('current-session-reply', tempDate);
            }
        }
    })
})

//event emitter used to store the settings data
ipcMain.on('store-settings', async (event, arg) => {
    //insert or update the settings data according to the data coming from frontend
    var currentDate = arg.currentSession;
    await session.findOne({ _id: currentDate }, async (err, doc) => {
        if (err) return console.log(err);

        if (doc) {
            const invalidSet = false;
            await temp.find({ _id: 2 }, async (err, doc) => {
                if (err) return console.log(err);
                else if (doc.length === 0) {
                    return await temp.insert({ _id: 2, tempDate: currentDate });
                }
                else {
                    return await temp.update({ _id: 2 }, { $set: { tempDate: currentDate } });
                }
            })
            await temp.find({ _id: 3 }, async (err, doc) => {
                if (err) return console.log(err);
                else if (doc.length === 0) {
                    return await temp.insert({ _id: 3, tempChurchName: arg.churchName });
                }
                else {
                    return await temp.update({ _id: 3 }, { $set: { tempChurchName: arg.churchName } });
                }
            })
            await event.reply("store-settings-reply", invalidSet)
            await tabsWindow.reload();
            return await mainWindow.reload();
        }
        else {
            const invalidSet = true;
            await temp.find({ _id: 3 }, async (err, doc) => {
                if (err) return console.log(err);
                else if (doc.length === 0) {
                    return await temp.insert({ _id: 3, tempChurchName: arg.churchName });
                }
                else {
                    return await temp.update({ _id: 3 }, { $set: { tempChurchName: arg.churchName } });
                }
            })
            await event.reply("store-settings-reply", invalidSet)
            return mainWindow.reload();
        }
    })
})

//event emitter used to call a function when on or activated
ipcMain.on('new-attendee', async (event, arg) => {
    //variables to hold attendee details
    var firstName = arg.firstName.split(" ").join("");
    var lastName = arg.lastName.split(" ").join("");
    var gender = arg.gender.split(" ").join("");
    var location = arg.location;
    var contactNumber = arg.contactNumber.split(" ").join("");
    var emailAddress = arg.emailAddress.split(" ").join("");
    var temperature = arg.temperature.split(" ").join("");

    if (firstName.length === 0) firstName = "NA";
    if (lastName.length === 0) lastName = "NA";
    if (gender.length === 0) gender = "NA";
    if (location.length === 0) location = "NA";
    if (contactNumber.length === 0) contactNumber = "NA";
    if (emailAddress.length === 0) emailAddress = "NA";
    if (temperature.length === 0) temperature = "NA";

    const generatedDetails = {
        firstName,
        lastName,
        gender,
        location,
        contactNumber,
        emailAddress,
        temperature
    }
    await attendee.find({}, async (err, doc) => {
        if (err) return console.log(err);
        const selectedAttendee = doc;
        if (selectedAttendee.length === 0) {
            const attendeeAlreadyExist = false;
            await newAttendee(generatedDetails)
                .catch(function (err) {
                    console.log(err)
                })
            await event.reply('new-attendee-reply', attendeeAlreadyExist);
            await sessionWindow.reload();
            await analyzerWindow.reload();
            return await editWindow.reload();
        }
        else {
            var firstParam;
            var secondParam;
            var genderParam
            var locationParam;
            var contactParam;
            var emailParam;
            for (var i = 0; i < selectedAttendee.length; i++) {
                firstParam = selectedAttendee[i].firstName.split(" ").join("").toLowerCase();
                secondParam = selectedAttendee[i].lastName.split(" ").join("").toLowerCase();
                genderParam = selectedAttendee[i].gender.split(" ").join("").toLowerCase();
                locationParam = selectedAttendee[i].location.split(" ").join("").toLowerCase();
                contactParam = selectedAttendee[i].contactNumber.split(" ").join("").toLowerCase();
                emailParam = selectedAttendee[i].emailAddress.split(" ").join("").toLowerCase();
                if (firstParam === firstName.toLowerCase() && secondParam === lastName.toLowerCase() && genderParam === gender.toLowerCase() && locationParam === location.toLowerCase() && contactParam === contactNumber.toLowerCase() && emailParam === emailAddress.toLowerCase()) {
                    const attendeeAlreadyExist = true;
                    return await event.reply('new-attendee-reply', attendeeAlreadyExist);
                }
                else if (i === (selectedAttendee.length - 1)) {
                    const attendeeAlreadyExist = false;
                    await newAttendee(generatedDetails)
                        .catch(function (err) {
                            console.log(err)
                        })
                    await event.reply('new-attendee-reply', attendeeAlreadyExist);
                    await sessionWindow.reload();
                    await analyzerWindow.reload();
                    return await editWindow.reload();
                }
            }
        }
    })
})

//verify if a session has been started for the current date
//Done by checking if the current date exists. If it exists, there will be a current session started
ipcMain.on('verify-session-availability', async (event, arg) => {
    await temp.findOne({ _id: 2 }, async (err, doc) => {
        if (err) return console.log(err);
        else if (doc) {
            const theTempDate = doc.tempDate;
            await session.findOne({ _id: theTempDate }, async (err, doc) => {
                if (err) return console.log(err);
                else if (doc) {
                    const sessionAvailable = true;
                    return event.reply('verify-session-availability-reply', sessionAvailable);
                }
                else {
                    const sessionAvailable = false;
                    return event.reply('verify-session-availability-reply', sessionAvailable);
                }

            })
        }
        else {
            const sessionAvailable = false;
            return event.reply('verify-session-availability-reply', sessionAvailable);
        }
    })

})

//event emitter used to search for all attendees who have been registered in the database
//also used to send a the results of the search in the form a reply to the frontend
ipcMain.on('old-attendee-all', async (event, arg) => {
    await attendee.find({}, async (err, doc) => {
        if (err) return console.log(err);
        return await event.reply('old-attendee-all-reply', doc);
    });
});

//event emitter used to search for all attendees who have been registered in the current session
//also used to send a the results of the search in the form a reply to the frontend
ipcMain.on('old-attendee-current-session-all', async (event, arg) => {
    await temp.findOne({ _id: 2 }, async (err, sesObj) => {
        if (sesObj) {
            const tempDateValue = sesObj.tempDate;
            await session.findOne({ _id: tempDateValue }, async (err, doc) => {
                if (err) return console.log(err);
                else if (doc) {
                    const gottenAttendees = doc.session.attendee;
                    await event.reply('sessionTime-reply', { start: doc.session.start, end: doc.session.end });
                    return await event.reply('old-attendee-current-session-all-reply', gottenAttendees);
                }
            });
        }
    })
});

//event emitter used to search for all attendees who have been registered in the current session
//also used to send a the results of the search in the form a reply to the frontend
ipcMain.on('view-old-attendee-current-session-all', async (event, arg) => {
    await temp.findOne({ _id: 1 }, async (err, sesObj) => {
        if (sesObj) {
            const tempDateValue = sesObj.tempViewDate;
            await session.findOne({ _id: tempDateValue }, async (err, doc) => {
                if (err) return console.log(err);
                else if (doc) {
                    const gottenAttendees = doc.session.attendee;
                    await event.reply('view-sessionTime-reply', { start: doc.session.start, end: doc.session.end });
                    return await event.reply('view-old-attendee-current-session-all-reply', gottenAttendees);
                }
            });
        }
    })
});

//event emitter used to search for attendee(s) whose name(s) correspond(s) to the search parameter
//also used to send the results of the search in the form of a reply to the frontend
ipcMain.on('old-attendee-name', async (event, arg) => {
    const searchName = arg.toLowerCase();
    //search for attendee with the search parameter in either their first name or last name
    await attendee.find({}, async (err, nameObj) => {
        if (err) return console.log(err);
        else {
            var currentArray = []
            const gottenSessions = nameObj;
            for (var j = 0; j < gottenSessions.length; j++) {
                if (gottenSessions[j].firstName.toLowerCase().indexOf(searchName) >= 0 || gottenSessions[j].lastName.toLowerCase().indexOf(searchName) >= 0) {
                    currentArray.push(gottenSessions[j]);
                }
            }
            return await event.reply('old-attendee-name-reply', currentArray);
        }
    });
});

//event emitter used to search for attendee(s) whose name(s) correspond(s) to the search parameter
//also used to send the results of the search in the form of a reply to the frontend
ipcMain.on('old-attendee-current-session-name', async (event, arg) => {
    const searchName = arg.toLowerCase();
    await temp.findOne({ _id: 2 }, async (err, sesObj) => {
        if (sesObj) {
            const tempDateValue = sesObj.tempDate;
            await session.findOne({ _id: tempDateValue }, async (err, doc) => {
                if (err) return console.log(err);
                else {
                    var currentArray = []
                    const gottenAttendees = doc.session.attendee;
                    for (var j = 0; j < gottenAttendees.length; j++) {
                        if (gottenAttendees[j].firstName.toLowerCase().indexOf(searchName) >= 0 || gottenAttendees[j].lastName.toLowerCase().indexOf(searchName) >= 0) {
                            currentArray.push(gottenAttendees[j]);
                        }
                    }
                    return await event.reply('old-attendee-current-session-name-reply', currentArray);
                }
            });
        }
    })
});

//record an old attendee's temperature when this event emitter is on or activated
ipcMain.on('record-attendee-temperature', async (event, arg) => {
    //variables to hold attendee details
    const firstName = arg.firstName;
    const lastName = arg.lastName;
    const gender = arg.gender;
    const location = arg.location;
    const contactNumber = arg.contactNumber;
    const emailAddress = arg.emailAddress;
    const temperature = arg.temperature;

    const sessionAttendeeDetails = {
        firstName,
        lastName,
        gender,
        location,
        contactNumber,
        emailAddress,
        temperature
    }

    return await temp.findOne({ _id: 2 }, async (err, doc) => {
        if (err) return console.log(err);
        else if (doc) {
            const theTempDate = doc.tempDate;
            return await session.findOne({ _id: theTempDate }, async (err, doc) => {
                if (err) return console.log(err);
                //check if the attendee to record his/her temperature is not already stored in the current session.
                //call the recordAttendeeTemperature function and send a "false" reply to frontend if the attendee does not exist already in the current session
                var theAttendeesArray = doc.session;
                if (theAttendeesArray.attendee.length === 0) {
                    const attendeeExists = false
                    await theAttendeesArray.attendee.push(sessionAttendeeDetails);
                    await session.update({ _id: theTempDate }, { $set: { session: theAttendeesArray } }, async (err) => {
                        if (err) return console.log(err);
                        return;
                    })
                    await event.reply('record-attendee-temperature-reply', attendeeExists);
                    await analyzerWindow.reload();
                    return await sessionWindow.reload();
                }
                else {
                    for (var j = 0; j < theAttendeesArray.attendee.length; j++) {
                        if (theAttendeesArray.attendee[j].firstName === firstName && theAttendeesArray.attendee[j].lastName === lastName && theAttendeesArray.attendee[j].gender === gender && theAttendeesArray.attendee[j].location === location && theAttendeesArray.attendee[j].contactNumber === contactNumber && theAttendeesArray.attendee[j].emailAddress === emailAddress) {
                            const attendeeExists = true
                            return await event.reply('record-attendee-temperature-reply', attendeeExists);
                        }
                        else if (j === (theAttendeesArray.attendee.length) - 1) {
                            const attendeeExists = false
                            await theAttendeesArray.attendee.push(sessionAttendeeDetails);
                            await session.update({ _id: theTempDate }, { $set: { session: theAttendeesArray } }, async (err) => {
                                if (err) return console.log(err);
                                return;
                            })
                            await event.reply('record-attendee-temperature-reply', attendeeExists);
                            await analyzerWindow.reload();
                            return await sessionWindow.reload();
                        }
                    }
                }



            })
        }
    })
})

//Show the view sessions screen when this event emitter is on or activated
ipcMain.on('open-session', async (event, arg) => {
    await tempDate(arg)
        .then(function () {
            sessionWindow.show();
        })
        .catch(function (err) {
            console.log(err);
        })
});


//search for the date that was entered in the frontend to view the session info
//This date is stored in the database
ipcMain.on('search-tempDate', async (event, arg) => {
    await temp.findOne({ _id: 1 }, async (err, doc) => {
        if (err) return console.log(err);
        else if (doc) {
            const tempViewDate = doc.tempViewDate;
            return await event.reply('search-tempDate-reply', tempViewDate);
        }
    })
})

//event emitter used to search for the current session in use
ipcMain.on('search-current-session', async (event, arg) => {
    await temp.findOne({ _id: 2 }, async (err, doc) => {
        var theTempDate;
        if (err) return console.log(err);
        else if (doc) {
            theTempDate = doc.tempDate;
        }
        return await event.reply('search-current-session-reply', theTempDate);
    })
})

//event emitter used to search for the analysis data of all the sessions
ipcMain.on('analysis-data', async (event, arg) => {
    await session.find({}, async (err, doc) => {
        if (doc) {
            var tempDoc = [];
            var tempHolder;
            for (var k = 0; k < doc.length; k++) {
                //push each object of the analysis data into the array "tempDoc" using the format below
                await tempDoc.push({ "_id": doc[k]._id, "maleNum": 0, "femaleNum": 0, "start": doc[k].session.start, "end": doc[k].session.end, "attendeeeNum": doc[k].session.attendee.length })
            }
            //loop through the data of all sessions to check the number of males and females
            for (var i = 0; i < doc.length; i++) {
                var maleNum = 0;
                var femaleNum = 0;
                tempHolder = doc[i].session.attendee;
                for (var j = 0; j < tempHolder.length; j++) {
                    if (tempHolder[j].gender === "Male") maleNum += 1;
                    else femaleNum += 1;
                }
                tempDoc[i].maleNum = maleNum;
                tempDoc[i].femaleNum = femaleNum;
            }

            const sessionAvailable = true;
            await event.reply('analysis-data-available-reply', sessionAvailable);
            //await event.reply('analysis-data-gender-reply', genderArray);
            return await event.reply('analysis-data-reply', tempDoc);
        }
        else {
            const sessionAvailable = false;
            await event.reply('analysis-data-available-reply', sessionAvailable);
            return await event.reply('analysis-data-reply', doc);
        }
    })
})

//event emitter used to search for the service information that correspond(s) to the search parameter
//also used to send the results of the search in the form of a reply to the frontend
ipcMain.on('analysis-data-search', async (event, arg) => {
    const searchName = arg.toLowerCase();
    await session.find({}, async (err, doc) => {
        if (err) return console.log(err);
        else {

            var tempDoc = [];
            var tempHolder;
            for (var k = 0; k < doc.length; k++) {
                await tempDoc.push({ "_id": doc[k]._id, "maleNum": 0, "femaleNum": 0, "start": doc[k].session.start, "end": doc[k].session.end, "attendeeeNum": doc[k].session.attendee.length })
            }
            for (var i = 0; i < doc.length; i++) {
                var maleNum = 0;
                var femaleNum = 0;
                tempHolder = doc[i].session.attendee;
                for (var j = 0; j < tempHolder.length; j++) {
                    if (tempHolder[j].gender === "Male") maleNum += 1;
                    else femaleNum += 1;
                }
                tempDoc[i].maleNum = maleNum;
                tempDoc[i].femaleNum = femaleNum;
            }

            var currentArray = []
            for (var l = 0; l < tempDoc.length; l++) {
                if (tempDoc[l]._id.toLowerCase().indexOf(searchName) >= 0) {
                    await currentArray.push(tempDoc[l]);
                }
            }
            return await event.reply('analysis-data-search-reply', currentArray);
        }
    });
});

//show the current session window when this event emitter is on or activated
ipcMain.on('open-current-session', async (event, arg) => {
    tabsWindow.show();
})

//Show the edit screen when this event emitter is on or activated
ipcMain.on('open-edit', async (event, arg) => {
    await editWindow.show();
})

//Show the analyzer screen when this event emitter is on or activated
ipcMain.on('open-analysis-window', async (event, arg) => {
    await analyzerWindow.show();
})

//event emitter used to update attendee details in the database 
ipcMain.on('edit-attendee-details', async (event, arg) => {
    await attendee.update({ _id: arg.editId }, { $set: { firstName: arg.editFirstName, lastName: arg.editLastName, gender: arg.editGender, location: arg.editLocation, contactNumber: arg.editContactNumber, emailAddress: arg.editEmailAddress } }, async (err) => {
        if (err) return console.log(err);
        return;
    })
    await editWindow.reload();
    return await tabsWindow.reload();
})

//event emitter used to update service details in the database
ipcMain.on('edit-service-details', async (event, arg) => {
    return await session.findOne({ _id: arg.editDate }, async (err, doc) => {
        if (err) return console.log(err);
        else {
            const newData = {
                start: arg.editStartTime,
                end: arg.editEndTime,
                attendee: doc.session.attendee
            }
            await session.update({ _id: arg.editDate }, { $set: { session: newData } }, async (err) => {
                if (err) return console.log(err);
                return;
            })
            await sessionWindow.reload();
            await tabsWindow.reload();
            return await analyzerWindow.reload();
        }
    })
})

//event emitter used to delete an attendee from the database
ipcMain.on('delete-attendee', async (event, arg) => {
    await attendee.remove({ _id: arg }, async (err) => {
        if (err) return console.log(err);
        return;
    })
    await editWindow.reload();
    return await tabsWindow.reload();
})

//event emitter used to delete a service from the database
ipcMain.on('delete-service', async (event, arg) => {
    await session.remove({ _id: arg }, async (err) => {
        if (err) return console.log(err);
        return;
    })
    await sessionWindow.reload();
    await tabsWindow.reload();
    await settingsWindow.reload();
    return await analyzerWindow.reload();
})

//event emitter used to open Clemotec website in the OS default browser
ipcMain.on('open-clemotec', async (event, arg) => {
    await shell.openExternal("https://clemotecghana.000webhostapp.com");
})

//event emitter used to open Clemotec apps and updates on the Clemotec webiste
ipcMain.on('open-updates', async (event, arg) => {
    await shell.openExternal("https://clemotecghana.000webhostapp.com#clemotec-apps")
})

//event emitter used to close the About window
ipcMain.on('close-about-window', async (event, arg) => {
    aboutWindow.close();
})

//Extra functions for clean code

//function to take care of adding new attendee to the database
async function newAttendee(data) {

    //variables to hold attendee details
    const firstName = data.firstName;
    const lastName = data.lastName;
    const gender = data.gender;
    const location = data.location;
    const contactNumber = data.contactNumber;
    const emailAddress = data.emailAddress;
    const temperature = data.temperature;

    const attendeeDetails = {
        firstName,
        lastName,
        gender,
        location,
        contactNumber,
        emailAddress
    }
    const sessionAttendeeDetails = {
        firstName,
        lastName,
        gender,
        location,
        contactNumber,
        emailAddress,
        temperature
    }

    await attendee.insert(attendeeDetails, (err) => {
        if (err) return console.log(err)
        return;
    })
    return await temp.findOne({ _id: 2 }, async (err, doc) => {
        if (err) return console.log(err);
        else if (doc) {
            const theTempDate = doc.tempDate;
            //Add the new attendee's information (temperature, first name, last name etc..) to the current church service or to the service set in settings
            await session.findOne({ _id: theTempDate }, async (err, doc) => {
                if (err) return console.log(err);
                const sessionHolder = doc.session
                await sessionHolder.attendee.push(sessionAttendeeDetails)

                return await session.update({ _id: theTempDate }, { $set: { session: sessionHolder } }, async (err) => {
                    if (err) return console.log(err);
                    return;
                })
            })
        }
    })
}


//function to take care of adding a new date to the database
async function putNewDate(startingTime, endingTime) {

    const doc = {
        _id: currDate,
        session: {
            start: startingTime,
            end: endingTime,
            attendee: []
        }
    }
    await session.insert(doc, (err, newDoc) => {
        if (err) return console.log(err);
        console.log("New Date added to the database");
    })
    return;
}

//function to take care of storing the temporary date to the database
async function tempDate(viewSessionDate) {
    //set the temporary date holder to the date entered in the frontend
    //the id for the temporary date holder is 2
    await temp.find({ _id: 1 }, async (err, doc) => {
        if (err) return console.log(err);
        else if (doc.length === 0) {
            return await temp.insert({ _id: 1, tempViewDate: viewSessionDate });
        }
        else {
            return await temp.update({ _id: 1 }, { $set: { tempViewDate: viewSessionDate } });
        }
    })
}

//function to take care of printing a session and it's attendees to PDF
async function takeCareOfPDFPrinting() {
    const downloadsPath = electron.app.getPath('downloads');
    await temp.findOne({ _id: 2 }, async (err, doc) => {
        if (err) return console.log(err);
        else if (doc) {
            const tempDate = doc.tempDate;
            if (fs.existsSync(downloadsPath + '/Cotrack')) {
                const pdfPath = downloadsPath + "/Cotrack/" + tempDate + ".pdf";
                //options for the pdf to be printed
                var options = {
                    marginsType: 0,
                    printBackground: false,
                    printSelectionOnly: false,
                    landscape: false,
                    pageSize: 'A4',
                    scaleFactor: 100
                }
                await sessionWindow.webContents.printToPDF(options).then(pdfFile => {
                    fs.writeFile(pdfPath, pdfFile, (err) => {
                        if (err) return console.log(err);
                        else {
                            return sessionWindow.send('pdf-printed', pdfPath);
                        }
                    })
                })
            }
            else {
                await fs.mkdir(downloadsPath + '/Cotrack', async (err) => {
                    if (err) return console.log(err);
                    else {
                        const pdfPath = downloadsPath + "/Cotrack/" + tempDate + ".pdf";
                        //options for the pdf to be printed
                        var options = {
                            marginsType: 0,
                            printBackground: false,
                            printSelectionOnly: false,
                            landscape: false,
                            pageSize: 'A4',
                            scaleFactor: 100
                        }
                        await sessionWindow.webContents.printToPDF(options).then(pdfFile => {
                            fs.writeFile(pdfPath, pdfFile, (err) => {
                                if (err) return console.log(err);
                                else {
                                    return sessionWindow.send('pdf-printed', pdfPath);
                                }
                            })
                        })
                    }
                })
            }
        }
    })
}

//function to take care of printing a session and it's attendees to printer
async function takeCareOfPrinterPrinting() {
    console.log('Hello Clement. Print with a printer');
}

//function to show the about page
async function showAboutPage() {
    aboutWindow.show()
}

//Menu templates used in the application

//template for general menu
const generalTemplate = [
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startspeaking' },
                        { role: 'stopspeaking' }
                    ]
                }
            ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ])
        ]
    },
    //The View menu item below is mainly needed during development
    /*
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    */
    {
        label: 'Window',
        submenu: [
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' }
            ] : [
                    { role: 'close' }
                ])
        ]
    },
    {
        label: "Help",
        submenu: [
            { label: "About", click: () => showAboutPage() }
        ]
    }
]

//template for menu in the windows that will print pages
const printTemplate = [
    {
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    },
    //The Edit menu item below is not needed on the Session Info page
    /*
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            ...(isMac ? [
                { role: 'pasteAndMatchStyle' },
                { role: 'delete' },
                { role: 'selectAll' },
                { type: 'separator' },
                {
                    label: 'Speech',
                    submenu: [
                        { role: 'startspeaking' },
                        { role: 'stopspeaking' }
                    ]
                }
            ] : [
                    { role: 'delete' },
                    { type: 'separator' },
                    { role: 'selectAll' }
                ])
        ]
    },
    */
    //The View menu item below is mainly needed during development
    /*
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    */
    {
        label: 'Window',
        submenu: [
            ...(isMac ? [
                { type: 'separator' },
                { role: 'front' },
                { type: 'separator' }
            ] : [
                    { role: 'close' }
                ])
        ]
    },
    {
        label: "Print",
        submenu: [
            { label: "as PDF",/* icon: 'src/Assets/images/printer1.png',*/ click: () => takeCareOfPDFPrinting() },
            { label: "with Printer", click: () => takeCareOfPrinterPrinting() }
        ]
    },
    {
        label: "Help",
        submenu: [
            { label: "About", click: () => showAboutPage() }
        ]
    }
]

//setting up templates from which menus will be built
const general = Menu.buildFromTemplate(generalTemplate);
const printer = Menu.buildFromTemplate(printTemplate);
//creating the main menu from a template
Menu.setApplicationMenu(general);