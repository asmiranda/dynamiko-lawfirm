class GlobalEventsAccounting {
    initializeGlobalEvents() {
        $(document).on('click', '.btnSaveReconcile', function() {
            reconcileUI.saveReconcile(this);
        });
        $(document).on('click', '.ReconcileUI_selectReconcile', function() {
            reconcileUI.loadReconcileProfile(this);
        });

        $(document).on('click', '.btnSaveTaxPeriod', function() {
            taxPeriodUI.saveTaxPeriod(this);
        });
        $(document).on('click', '.TaxPeriodUI_selectTaxPeriod', function() {
            taxPeriodUI.loadTaxPeriodProfile(this);
        });

        $(document).on('click', '.btnSaveBanking', function() {
            bankingUI.saveBanking(this);
        });
        $(document).on('click', '.BankingUI_selectBanking', function() {
            bankingUI.loadBankingProfile(this);
        });

        $(document).on('click', '.btnSaveSalesOrder', function() {
            salesOrderUI.saveSalesOrder(this);
        });
        $(document).on('click', '.SalesOrderUI_selectSalesOrder', function() {
            salesOrderUI.loadSalesOrderProfile(this);
        });

        $(document).on('click', '.btnSaveExpense', function() {
            expenseUI.saveExpense(this);
        });
        $(document).on('click', '.ExpenseUI_selectExpense', function() {
            expenseUI.loadExpenseProfile(this);
        });

        $(document).on('click', '.AccountChartUI_selectAccountChart', function() {
            accountChartUI.loadAccountChartProfile(this);
        });

        $(document).on('click', '.selectEstimate', function() {
            salesOrderUI.selectEstimate(this);
        });
        $(document).on('click', '.selectSalesOrder', function() {
            salesOrderUI.selectSalesOrder(this);
        });

    }
}
