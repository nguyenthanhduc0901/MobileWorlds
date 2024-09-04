// utils/searchFilters.js

module.exports.buildProductFilter = (query) => {
    const { brand, q } = query;
    let filter = {};
  
    if (brand) {
      filter.brand = brand;
    }
  
    if (q) {
      const searchRegex = new RegExp(q, 'i'); 
      filter.$or = [
        { model: searchRegex },
        { brand: searchRegex },
        { 'specifications.screenSize': searchRegex },
        { 'specifications.batteryCapacity': searchRegex },
        { 'specifications.camera': searchRegex },
        { 'specifications.processor': searchRegex },
        { 'specifications.storage': searchRegex },
        { 'specifications.ram': searchRegex },
        { 'specifications.operatingSystem': searchRegex },
      ];
    }
  
    return filter;
  };
  