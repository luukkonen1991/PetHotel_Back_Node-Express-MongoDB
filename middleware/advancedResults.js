const advancedResults = (model) => async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };
  console.log(reqQuery);
  // Fields to exlude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Make query to string in order to manipulate it
  let queryStr = JSON.stringify(reqQuery);
  console.log(queryStr);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in|or|and)\b/g, match => `$${match}`);
  console.log(queryStr);

  // Finding resource
  query = model.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {

    // default sort by date
    query = query.sort('-createdAt');
  }

  // Pagination (radix 10 = decimal)
  const page = parseInt(req.query.page, 10) || 1;
  console.log(page, 'page');
  const limit = parseInt(req.query.limit, 10) || 5;
  console.log(limit, 'limit');
  const startIndex = (page - 1) * limit;
  console.log(startIndex, 'startIndex');
  const endIndex = (page) * limit;
  console.log(endIndex, 'endIndex');
  const total = await model.countDocuments(query);
  console.log(total, 'total');

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit: limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit: limit
    };
  }

  res.advancedResults = {
    success: true,
    total: total,
    count: results.length,
    pagination: pagination,
    data: results
  };
  next();
};

module.exports = advancedResults;