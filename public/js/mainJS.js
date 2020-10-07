$(function () {
    mainForm = '#mainForm';
    mainSearchForm = '#searchTable';
    mainId = 'input.mainId';
    registeredModules = [];
    QUICK_UPDATER_COUNTER = 0;

    allTable = [];
    dynamikoFullScreen = new DynamikoFullScreen();
    dynaButtonAction = new DynaButtonAction();
    childFieldConstructor = new ChildFieldConstructor();
    childFieldAutoComplete = new ChildFieldAutoComplete();
    childTabs = new ChildTabs();

    customReport = new CustomReport();
    dataVisualizer = new DataVisualizer();
    widgetChartRule = new WidgetChartRule();
    fieldGenerator = new FieldGenerator();
    fieldConstructor = new FieldConstructor();
    fieldMultiSelect = new FieldMultiSelect();
    formLinker = new FormLinker();
    userUI = new UserUI();
    myReportViewer = new MyReportViewer();
    quickUpdater = new QuickUpdater();
    quickSearcher = new QuickSearcher();
    dynaRegister = new DynaRegister();
    uploadDataFile = new UploadDataFile();
    // utils = new Utils();
    dashboard = new Dashboard();
    mainReport = new MainReport();

    // #################for saas and modules
    personalDashboardUI = new PersonalDashboardUI();
    recruitmentUI = new RecruitmentUI();
    employeeUI = new EmployeeUI();
    payrollUI = new PayrollUI();
    governmentUI = new GovernmentUI();
    schoolUI = new SchoolUI();
    reviewCenterUI = new ReviewCenterUI();
    hospitalUI = new HospitalUI();
    inventoryUI = new InventoryUI();
    referenceUI = new ReferenceUI();

    // #################for sub modules
    purchaseOrderUI = new PurchaseOrderUI();
    payrollScheduleUI = new PayrollScheduleUI();
    hrRequisitionUI = new HrRequisitionUI();
    personTaskUI = new PersonTaskUI();
    employeeTimeSheetUI = new EmployeeTimeSheetUI();
    employeeTeamMemberUI = new EmployeeTeamMemberUI();
    productUI = new ProductUI();
    supplierUI = new SupplierUI();
    // accountChartUI = new AccountChartUI();
    // expenseUI = new ExpenseUI();
    taxPeriodUI = new TaxPeriodUI();
    // bankingUI = new BankingUI();
    reconcileUI = new ReconcileUI();
    productRequestUI = new ProductRequestUI();
    realEstateUI = new RealEstateUI();
    citizenUI = new CitizenUI();
    communityTaxCertificateUI = new CommunityTaxCertificateUI();
    businessPermitUI = new BusinessPermitUI();
    governmentCashierUI = new GovernmentCashierUI();
    governmentAccountingUI = new GovernmentAccountingUI();
    governmentReportsUI = new GovernmentReportsUI();
    governmentPrintingUI = new GovernmentPrintingUI();
    realEstateTaxUI = new RealEstateTaxUI();
    realEstateTransferUI = new RealEstateTransferUI();
    realEstateBuildingPermitUI = new RealEstateBuildingPermitUI();
    realEstateElectricalPermitUI = new RealEstateElectricalPermitUI();
    realEstatePlumbingPermitUI = new RealEstatePlumbingPermitUI();
});
