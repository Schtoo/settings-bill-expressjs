'use strict';

const express = require('express');
const app = express();
let Settings = require('./settingsFactory.js');
let bodyParser = require('body-parser');
const settingsInstance = Settings();
const exphbs = require('express-handlebars');
let moment = require('moment');
let costs = 0;
let costsTotal = 0;

app.engine('handlebars', exphbs({defaultLayout: 'main',
    helpers: {
        'time': function () {
            return moment(this.time).fromNow();
        }
    }
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    // This is how I send the data to my factory
    costs = {
        call: settingsInstance.getCallValue(),
        sms: settingsInstance.getSmsValue(),
        warning: settingsInstance.getWarningValue(),
        critical: settingsInstance.getCriticalValue()
    };
    costsTotal = {
        callCost: settingsInstance.Calls(),
        smsCost: settingsInstance.Sms(),
        total: settingsInstance.BothEqual(),
        screen: settingsInstance.totalAlert()
    };

    res.render('home', {
        costs,
        costsTotal
    });
});

app.post('/settings', function (req, res) {
    const {callCost, smsCost, warningValue, criticalValue} = req.body;

    costsTotal = {
        callCost: settingsInstance.Calls(),
        smsCost: settingsInstance.Sms(),
        total: settingsInstance.BothEqual(),
        screen: settingsInstance.totalAlert()
    };
    // This is how I send the data to my factoryu
    costs = {
        call: settingsInstance.UpdateCalls(callCost),
        sms: settingsInstance.UpdatingSms(smsCost),
        warning: settingsInstance.UpdateWarning(warningValue),
        critical: settingsInstance.UpdateCritical(criticalValue)
    };

    res.render('home', {
        costs,
        costsTotal
    });
});
app.post('/action', function (req, res) {
    let item = req.body.billItemTypeWithSettings;
    settingsInstance.WhichType(item);
    costs = {
        call: settingsInstance.getCallValue(),
        sms: settingsInstance.getSmsValue(),
        warning: settingsInstance.getWarningValue(),
        critical: settingsInstance.getCriticalValue()
    };
    costsTotal = {
        callCost: settingsInstance.Calls(),
        smsCost: settingsInstance.Sms(),
        total: settingsInstance.BothEqual(),
        screen: settingsInstance.totalAlert()
    };

    res.render('home', {
        costs,
        costsTotal
    });
});

app.get('/actions', function (req, res) {
    res.render('records', {
        records: settingsInstance.recordsList()
    });
});

app.get('/actions/:typeOfBill', function (req, res) {
    let typeOfBill = req.params.typeOfBill;

    res.render('records', {
        records: settingsInstance.billActions(typeOfBill)
    });
});

let PORT = process.env.PORT || 3020;

app.listen(PORT, function () {
    console.log('App starting on port', PORT);
});
