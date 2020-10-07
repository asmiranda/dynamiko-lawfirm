class ReportLoader {
    init() {
        console.log("ReportLoader called.");
        this.initDateRange();
    }

    initDateRange() {
        $('.dateRangeBtn').daterangepicker(
            {
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                },
                startDate: moment().subtract(29, 'days'),
                endDate: moment()
            },
            function (start, end) {
                var startDate = start.format('YYYY-MM-DD');
                var endDate = end.format('YYYY-MM-DD');
                var strHtml = `
                    <span>${startDate} - ${endDate}</span>
                    <i class="fa fa-caret-down"></i>
                `;

                $(this.element[0]).html(strHtml);
               

                var startInput = "input.dateRangeInput." + $(this.element[0]).attr("forStart");
                var endInput = "input.dateRangeInput." + $(this.element[0]).attr("forEnd");
                console.log(startInput);
                console.log(endInput);

                $(startInput).val(startDate);
                $(endInput).val(endDate);
            }
        )
    }
}

$(function () {
    reportLoader = new ReportLoader();
});
