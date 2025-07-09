$(document).ready(function() {
    var table = $('.table').DataTable({
        "paging": true,
        "lengthChange": true,
        "searching": true
    });


    

    /////////////// 新增
    //表單提交的事件監聽器（用於添加新條目）
    $('form').on('submit', function(event) {
        event.preventDefault();

        var name = $('#nameInput').val();
        var email = $('#emailInput').val();
        var birthday = $('#dateInput').val();

        table.row.add([
            name,
            email,
            birthday,
            '<div class="edit-delete-btns"><button type="button" class="btn btn-warning btn-sm">編輯</button><button type="button" class="btn btn-danger btn-sm">刪除</button></div>'
        ]).draw(false);

        $('form')[0].reset();
    });

    /////////////////編輯
    // 顯示編輯模式的函數
    function showEditMode(row) {
        var columns = row.children('td');

        // 隱藏“保存更改”按鈕
        $('button[type="submit"]').hide();

        // 顯示“更新”按鈕
        $('.update-btn').show();

        // 使用行數據填充表單字段
        $('#nameInput').val(columns.eq(0).text());
        $('#emailInput').val(columns.eq(1).text());
        $('#dateInput').val(columns.eq(2).text());
    }

        // 編輯按鈕的事件監聽器（包括新類）
    $('.table').on('click', '.btn-warning', function() {
        var row = $(this).closest('tr');
        showEditMode(row);
        // Mark the selected row
        $('.table tr.selected').removeClass('selected');
        row.addClass('selected');
        // Retrieve and set data for the selected row
        var rowData = table.row(row).data();
        $('#nameInput').val(rowData[0]);
        $('#emailInput').val(rowData[1]);
        $('#dateInput').val(rowData[2]);
        // Store the row data for update
        $('.update-btn').data('row', rowData);
    });

    ///////////// 更新
    // 更新按鈕的事件監聽器
    $('.update-btn').on('click', function() {
        var updatedData = [
            $('#nameInput').val(),
            $('#emailInput').val(),
            $('#dateInput').val(),
            '<div class="edit-delete-btns"><button type="button" class="btn btn-warning btn-sm">編輯</button><button type="button" class="btn btn-danger btn-sm">刪除</button></div>'
        ];

        var selectedRow = $('.table tr.selected');
        if (selectedRow.length) {
            // Update the data for the selected row
            table.row(selectedRow).data(updatedData).draw();
            // 顯示成功消息
            alert('更新成功');
            // 清除表單數據
            $('form')[0].reset();
            // Clear selection
            selectedRow.removeClass('selected');
            // Reset stored row data
            $('.update-btn').removeData('row');
        } else {
            alert('請選擇要更新的行');
        }
    });



    ////////////////刪除
    // “刪除”按鈕的事件監聽器
    $('.table').on('click', '.btn-danger', function() {
        if (confirm('確定刪除？')) {
            var row = $(this).closest('tr');
            table.row(row).remove().draw(false);
        }
    });
    

    /////////////////取消
    // “取消”按鈕的事件監聽器
    $('button.btn-secondary').on('click', function() {
        // 隱藏“更新”按鈕
        $('.update-btn').hide();

        // 顯示“保存更改”按鈕
        $('button[type="submit"]').show();

        // 清除表單數據
        $('form')[0].reset();
    });


});