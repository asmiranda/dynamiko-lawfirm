class MainReport {
    constructMainReport(obj) {
        var moduleName = $(obj).attr("data");
        $.get( "/module/"+moduleName, function( result ) {
            // console.log(result);
            $("#content-main").html(result);
            invoiceReport.loadReport();
        });
    };
}
