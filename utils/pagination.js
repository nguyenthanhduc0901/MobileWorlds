// utils/pagination.js

module.exports.paginate = (query, pageSize = 12) => {
    const page = parseInt(query.page) || 1; // Trang hiện tại, mặc định là 1
    const limit = parseInt(query.limit) || pageSize; // Số lượng sản phẩm trên mỗi trang
    const skip = (page - 1) * limit; // Số lượng sản phẩm cần bỏ qua
  
    return { limit, skip, page };
  };
  