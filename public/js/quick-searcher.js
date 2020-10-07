class QuickSearcher {
    doMainQuickSearcher(obj) {
        var moduleName = $(obj).attr("module");
        storage.filterText = $(obj).val();

        document.dispatchEvent(new CustomEvent('doMainSearchData', { bubbles: true, detail: { text: () => moduleName } }))
    }

    displayMainQuickSearcher(obj) {
        var moduleName = $(obj).attr("module");

        var str = $("#quickMainSearcher").html();
        str = utils.replaceAll(str, "##MODULE##", moduleName);

        console.log(str);
        var pop = $(obj);

        pop.popover({
            placement: 'left',
            trigger: 'manual',
            html: true,
            title: `Search <a class="close" href="#">×</a>`,
            content: str,
            sanitize: false,
        }).on('shown.bs.popover', function (e) {
            //console.log('shown triggered');
            // 'aria-describedby' is the id of the current popover
            var current_popover = '#' + $(e.target).attr('aria-describedby');
            var cur_pop = $(current_popover);

            cur_pop.find('.close').click(function () {
                //console.log('close triggered');
                pop.popover('hide');
            });

            cur_pop.find('.OK').click(function () {
                //console.log('OK triggered');
                pop.popover('hide');
            });
        });
        pop.popover('show');
    }
}
