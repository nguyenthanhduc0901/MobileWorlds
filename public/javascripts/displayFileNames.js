// file: displayFileNames.js

document.addEventListener('DOMContentLoaded', function() {
    // Lấy phần tử input và danh sách tên file
    const fileInput = document.getElementById('images');
    const fileNamesList = document.getElementById('file-names');
    const fileNamesContainer = document.getElementById('file-names-container');

    fileInput.addEventListener('change', function(event) {
        // Xóa nội dung cũ
        fileNamesList.innerHTML = '';

        // Lấy các file được chọn
        const files = event.target.files;

        // Nếu không có file nào được chọn, thông báo lỗi và thoát
        if (files.length === 0) {
            fileNamesContainer.style.display = 'none'; // Ẩn container nếu không có file
            return;
        }

        // Hiển thị container nếu có file được chọn
        fileNamesContainer.style.display = 'block';

        // Duyệt qua các file và thêm tên file vào danh sách
        for (let i = 0; i < files.length; i++) {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.textContent = files[i].name;
            fileNamesList.appendChild(listItem);
        }
    });
});