class GlobalEventsGovernment {
    initializeGlobalEvents() {
        $(document).on('click', '.btnSaveRealEstatePlumbingPermit', function() {
            realEstatePlumbingPermitUI.savePlumbingPermitForCashier(this);
        });
        $(document).on('change', 'input.editRealEstatePlumbingPermit', function() {
            realEstatePlumbingPermitUI.changeValue(this);
        });
        $(document).on('click', '.selectRealEstatePlumbingPermit', function() {
            realEstatePlumbingPermitUI.loadRealEstatePlumbingPermitProfile(this);
        });

        $(document).on('click', '.btnSaveRealEstateElectricalPermit', function() {
            realEstateElectricalPermitUI.saveElectricalPermitForCashier(this);
        });
        $(document).on('change', 'input.editRealEstateElectricalPermit', function() {
            realEstateElectricalPermitUI.changeValue(this);
        });
        $(document).on('click', '.selectRealEstateElectricalPermit', function() {
            realEstateElectricalPermitUI.loadRealEstateElectricalPermitProfile(this);
        });

        $(document).on('click', '.btnSaveRealEstateBuildingPermit', function() {
            realEstateBuildingPermitUI.saveBuildingPermitForCashier(this);
        });
        $(document).on('change', 'input.editRealEstateBuildingPermit', function() {
            realEstateBuildingPermitUI.changeValue(this);
        });
        $(document).on('click', '.selectRealEstateBuildingPermit', function() {
            realEstateBuildingPermitUI.loadRealEstateBuildingPermitProfile(this);
        });

        $(document).on('keyup', 'input.editRealEstateTax[module="RealEstateTaxItemUI"]', function() {
            realEstateTaxUI.changeRealEstateTaxTotals(this);
        });
        $(document).on('change', '.calendarYear[module="RealEstateTaxUI"]', function(evt) {
            realEstateTaxUI.changeRealEstateTaxYears(evt);
        });
        $(document).on('changeAutoComplete[realEstateCode][RealEstateTaxUI]', function(evt) {
            realEstateTaxUI.changeRealEstateTax(evt);
        });
        $(document).on('click', '.btnSaveRealEstateTax', function() {
            realEstateTaxUI.saveRealEstateTaxForCashier(this);
        });
        $(document).on('click', '.selectRealEstateTax', function() {
            realEstateTaxUI.loadRealEstateTaxProfile(this);
        });

        $(document).on('click', '.btnSaveBusinessPermitForCashier', function() {
            businessPermitUI.saveBusinessPermitForCashier(this);
        });
        $(document).on('keyup', 'input.editBusinessPermit', function() {
            businessPermitUI.changeBusinessPermitValues(this);
        });
        $(document).on('click', '.BusinessPermitSelect', function() {
            businessPermitUI.loadBusinessPermitProfile(this);
        });

        $(document).on('click', '.CommunityTaxCertificateSelect', function() {
            communityTaxCertificateUI.selectCommunityTaxCertificate(this);
        });
        $(document).on('click', '.btnShowGovernmentReport', function() {
            governmentReportsUI.showGovernmentReport(this);
        });
        $(document).on('click', 'a[module="GovernmentReportsUI"]', function() {
            governmentReportsUI.autoChooseDate(this);
        });

        $(document).on('click', '.selectPrintingQueue', function() {
            governmentPrintingUI.selectPrintingQueue(this);
        });
        $(document).on('click', '.btnCashierAcceptPayment', function() {
            governmentCashierUI.acceptPayment(this);
        });
        $(document).on('click', '.selectGovernmentCashier', function() {
            governmentCashierUI.selectGovernmentCashier(this);
        });
        $(document).on('keyup', 'input.editCtc', function() {
            communityTaxCertificateUI.changeCTCValues(this);
        });
        $(document).on('click', '.btnSaveCTCForCashier', function() {
            communityTaxCertificateUI.saveCTCForCashier(this);
        });
        $(document).on('click', '.CommunityTaxCertificateUI_btnNewCommunityTaxCertificate', function() {
            communityTaxCertificateUI.newCTC(this);
        });
        
    }
}
