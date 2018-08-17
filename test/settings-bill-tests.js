const assert = require('assert').assert;
const billSettings = require('./settingsFactory');
const Settings = billSettings();

describe('Settings Bill', function () {
    it('should give you the call total', function () {
        var settings = Settings();
        settings.UpdateValues(3.00);
        settings.WhichType('call');
        settings.WhichType('call');
        settings.WhichType('call');
        settings.WhichType('call');

        assert.equal(settings.Calls(), 12.00);
        assert.equal(settings.BothEqual(), 12.00);
    });
    it('should return the sms total', function () {
        var total4Sms = Settings();
        total4Sms.UpdateValues(3.00, 1.50);
        total4Sms.WhichType('sms');
        total4Sms.WhichType('sms');
        total4Sms.WhichType('sms');
        total4Sms.WhichType('sms');

        assert.equal(total4Sms.Sms(), 6.00);
        assert.equal(total4Sms.BothEqual(), 6.00);
    });
    it('should return the warning level', function () {
        var warningLevelSetting = Settings();
        warningLevelSetting.UpdateAlerts(30.00);
        warningLevelSetting.totalAlert('warning');
        assert.equal(warningLevelSetting.screenBehaviour(), 30.00);
    });
    it('should return the critical level', function () {
        var criticalLevelSetting = Settings();
        criticalLevelSetting.UpdateAlerts(30.00, 50.00);
        criticalLevelSetting.totalAlert('danger');
        assert.equal(criticalLevelSetting.screenAlert(), 50.00);
    });
});
