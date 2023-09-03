/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
exports.paginateQuery = async (
  model,
  query,
  page = 1,
  pageSize = 10,
  populateOptions = []
) => {
  try {
    const totalCount = await model.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);

    const skip = (page - 1) * pageSize;

    // sort by latest created
    let queryWithPopulate = model.find(query).sort({ createdAt: -1 });

    for (const populateOption of populateOptions) {
      queryWithPopulate = queryWithPopulate.populate(populateOption);
    }

    const results = await queryWithPopulate.skip(skip).limit(pageSize);

    return {
      data: results,
      currentPage: page,
      pageSize: pageSize,
      totalPages: totalPages,
      totalCount: totalCount,
    };
  } catch (err) {
    throw err;
  }
};
