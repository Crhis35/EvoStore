import { Model } from 'mongoose';
import { AppError } from '.';
import { ApiArgs } from '../types';

const paginationApi = async (
  Model: Model<any>,
  { search, page, limit, sort }: ApiArgs
) => {
  try {
    const currentPage = page || 1;
    const limitLen = limit || 10;
    let searchQuery = {};
    let sortBy: any = {};
    // run if search is provided
    if (search) {
      // update the search query
      searchQuery = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } },
        ],
      };
    }
    if (sort) sortBy[sort.field] = sort.order === 'ASC' ? 1 : -1;

    const items = await Model.find(searchQuery)
      .limit(limitLen)
      .skip((currentPage - 1) * limitLen)
      .lean();
    const count = await Model.countDocuments(searchQuery);
    return {
      items,
      totalPages: Math.ceil(count / limitLen),
      currentPage,
    };
  } catch (error) {
    throw new AppError(error.message, '401');
  }
};
export default paginationApi;
