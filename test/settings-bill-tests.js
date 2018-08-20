let assert = require('assert');

const billSettings = require('../settingsFactory.js');

describe('Settings Bill', function () {
    it('should give you the call total', function () {
        let Settings = billSettings();
        Settings.UpdateCalls(3.00);
        Settings.UpdateCritical(5.50);
        Settings.WhichType('call');
        Settings.WhichType('call');
        Settings.WhichType('call');
        Settings.WhichType('call');

        console.log(Settings.Calls());
        assert.equal(Settings.Calls(), 12.00);
        assert.equal(Settings.BothEqual(), 12.00);
    });
    it('should return the sms total', function () {
        var total4Sms = billSettings();
        total4Sms.UpdatingSms(1.50);
        total4Sms.UpdateCritical(6.00);
        total4Sms.WhichType('sms');
        total4Sms.WhichType('sms');
        total4Sms.WhichType('sms');
        total4Sms.WhichType('sms');

        assert.equal(total4Sms.Sms(), 6.00);
        assert.equal(total4Sms.BothEqual(), 6.00);
    });
    it('should return the warning level', function () {
        var warningLevelSetting = billSettings();
        warningLevelSetting.UpdateWarning(30.00);
        warningLevelSetting.UpdateCritical(50.00);
        warningLevelSetting.totalAlert('warning');

        assert.equal(warningLevelSetting.screenBehaviour(), 30.00);
    });
    it('should return the critical level', function () {
        var criticalLevelSetting = billSettings();
        criticalLevelSetting.UpdateCritical(50.00);
        criticalLevelSetting.totalAlert('danger');

        assert.equal(criticalLevelSetting.screenAlert(), 50.00);
    });
});
