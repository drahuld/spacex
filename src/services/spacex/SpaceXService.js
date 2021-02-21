import Constant from '@/constants';
import ApiService from '@/services/ApiService';
import { isArray, isEmpty, isObject } from 'lodash';

const SpaceXService = {

  async getCompanyInfo() {
    console.log('*** SpaceXService: getCompanyInfo Request *** : ');
    const response = await ApiService.get(Constant.SPACEX_COMPANY_INFO_API_ENDPOINT);
    // await new Promise((res) => setTimeout(res, 2000));
    console.log('*** SpaceXService: getCompanyInfo Response *** : ', response);
    return this.checkIfObjectAndEmptyResponse(response);
  },

  async getLaunches() {
    console.log('*** SpaceXService: getLaunches Request *** : ');
    const response = await ApiService.get(Constant.SPACEX_LAUNCHES_API_ENDPOINT);
    console.log('*** SpaceXService: getLaunches Response *** : ', response);
    return this.checkIfArrayAndEmptyResponse(response);
  },

  async getLaunchesSortedByLaunchDateDesc() {
    console.log('*** SpaceXService: getLaunchesSortedByLaunchDateDesc Request *** : ');
    const sortingRequestBody = {
      options: {
        pagination: false,
        sort: {
          date_local: 'desc',
        },
      },
    };
    const { data } = await ApiService
      .post(Constant.SPACEX_LAUNCHES_SORT_BY_DATE_DESC_API_ENDPOINT, sortingRequestBody);
    // console.log('*** SpaceXService: getLaunchesSortedByLaunchDateDesc Response *** : ', data);
    return this.checkIfArrayAndEmptyResponse(data);
  },

  async checkIfObjectAndEmptyResponse(response) {
    console.log('*** checkIfObjectAndEmptyResponse *** : ');
    if (response && !isEmpty(response.data) && isObject(response.data)) {
      // console.log('*** Is object and not empty *** : ', response.data);
      return response.data;
    }
    return {};
  },

  async checkIfArrayAndEmptyResponse(data) {
    console.log('*** checkIfObjectAndEmptyResponse *** : ');
    if (data && !isEmpty(data.docs) && isArray(data.docs)) {
      // console.log('*** Is Array and not empty *** : ', data.docs);
      return data.docs;
    }
    return [];
  },

};

export default SpaceXService;
