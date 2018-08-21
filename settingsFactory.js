module.exports = function () {
    let callCost = 0;
    let smsCost = 0;
    let callTotal = 0;
    let smsTotal = 0;
    let warningValue = 0;
    let criticalValue = 0;
    let totals = 0;
    let billRecords = [];

    // this checks which radio button is selected
    function WhichType (checkedBill) {
        if (totals < criticalValue) {
            let bill = {
                billtype: checkedBill,
                time: new Date()
            };

            if (checkedBill === 'call') {
                callTotal += callCost;
                bill.cost = callCost.toFixed(2);
            }
            if (checkedBill === 'sms') {
                smsTotal += smsCost;
                bill.cost = smsCost.toFixed(2);
            }

            billRecords.unshift(
                bill
            );
        }
    }

    function recordsList () {
        return billRecords;
    }

    function billActions (type) {
        const filteringBills = [];
        // looping through all the indexes
        for (let i = 0; i < billRecords.length; i++) {
            const filter = billRecords[i];
            //
            if (filter.billtype === type) {
                filteringBills.push(filter);
            }
        }
        return filteringBills;
    }
    // These set values

    function UpdateCalls (call) {
        callCost = parseFloat(call);
        return callCost;
    }

    function UpdatingSms (sms) {
        smsCost = parseFloat(sms);
        return smsCost;
    }

    function UpdateWarning (warning) {
        warningValue = parseFloat(warning);
        return warningValue;
    }
    function UpdateCritical (danger) {
        criticalValue = parseFloat(danger);
        return criticalValue;
    }

    // These Get Values

    function getCallValue () {
        return callCost;
    }
    function getSmsValue () {
        return smsCost;
    }
    function getWarningValue () {
        return warningValue;
    }
    function getCriticalValue () {
        return criticalValue;
    }

    function totalAlert () {
        if (totals >= criticalValue) {
            return 'danger';
        } else if (totals >= warningValue) {
            return 'warning';
        }
    }

    function resetBtn () {
        callCost = 0;
        smsCost = 0;
        callTotal = 0;
        smsTotal = 0;
        warningValue = 0;
        criticalValue = 0;
        totals = 0;
    }

    // These are all the totals
    function Calls () {
        return callTotal.toFixed(2);
    }

    function Sms () {
        return smsTotal.toFixed(2);
    }

    function BothEqual () {
        totals = callTotal + smsTotal;
        return totals.toFixed(2);
    }

    // All the screen behaviour here
    function screenBehaviour () {
        return warningValue.toFixed(2);
    }

    function screenAlert () {
        return criticalValue.toFixed(2);
    }
    return {
        WhichType,
        recordsList,
        resetBtn,
        Calls,
        Sms,
        BothEqual,
        billActions,
        UpdateCalls,
        UpdatingSms,
        UpdateCritical,
        UpdateWarning,
        totalAlert,
        screenBehaviour,
        screenAlert,
        getCallValue,
        getSmsValue,
        getWarningValue,
        getCriticalValue
    };
};
