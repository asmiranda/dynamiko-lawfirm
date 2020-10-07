class PersonalDashboardUI { 
    changeMainId(obj) {
    }

    doMainSearchData(evt) {
    }

    changeModule(evt) {
        personTaskUI.loadTodoList();
        // employeeUI.loadTopEmployees();
        // accountChartUI.loadTopAccountCharts("AccountChart");
        // expenseUI.loadTopExpenses("Expense");
        // salesOrderUI.loadTopSalesOrders("SalesOrder");
        // bankingUI.loadTopBankings("Banking");
        // taxPeriodUI.loadTopTaxPeriods("TaxPeriod");
        // reconcileUI.loadTopReconciles("Reconcile");
    }

    init() {
        $("#dynamikoMainSearch").hide();
    }
}

