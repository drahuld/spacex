import Constant from '@/constants';
import ApiService from '@/services/ApiService';

const SpaceXService = {

  async getCompanyInfo() {
    console.log('*** SpaceXService: getCompanyInfo Request *** : ');
    const { data } = await ApiService.get(Constant.SPACEX_COMPANY_INFO_API_ENDPOINT);
    // await new Promise((res) => setTimeout(res, 2000));
    console.log('*** SpaceXService: getCompanyInfo Response *** : ', data);
    return data;
  },

  async getLaunches() {
    console.log('*** SpaceXService: getLaunches Request *** : ');
    const { data = [] } = await ApiService.get(Constant.SPACEX_LAUNCHES_API_ENDPOINT);
    console.log('*** SpaceXService: getLaunches Response *** : ', data);
    return data;
  },

  async getLaunchesPads() {
    console.log('*** SpaceXService: getLaunchesPads Request *** : ');
    const { data = [] } = await ApiService.get(Constant.SPACEX_LAUNCH_PADS_INFO_API_ENDPOINT);
    console.log('*** SpaceXService: getLaunches Response *** : ', data);
    return data;
  },

  async getLaunchesSortedByLaunchDateDesc(isCompletedLaunches, paginationCounter) {
    console.log('*** SpaceXService: getLaunchesSortedByLaunchDateDesc Request *** : ', isCompletedLaunches, ' : ', paginationCounter);
    const sortingRequestBody = {
      query: {
        upcoming: !isCompletedLaunches,
      },
      options: {
        page: paginationCounter,
        pagination: (paginationCounter > 0),
        sort: {
          date_local: 'desc',
        },
        populate: [
          'rocket',
          'crew',
        ],
      },
    };

    const { data: { docs } = [] } = await ApiService
      .post(Constant.SPACEX_LAUNCHES_SORT_BY_DATE_DESC_API_ENDPOINT, sortingRequestBody);
    console.log('*** SpaceXService: getLaunchesSortedByLaunchDateDesc Response *** : ', docs);
    return docs;
  },

};

export default SpaceXService;
