/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ActionContext, ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { QuasarTableStateInterface, DataRows } from './state';
import { api as $http } from '../../boot/http';
import { HttpResponse, HttpError, UserCompany } from '../types';
import { RequestParams } from '../../types/table';
import { Notify } from 'quasar';

export interface QuasarTableActionsContract
  extends ActionTree<QuasarTableStateInterface, StateInterface> {
  FETCH_TABLE_DATA: (
    ctx: ActionContext<QuasarTableStateInterface, StateInterface>,
    payload: {
      requestParams: RequestParams;
      entityEndPoint: string;
    }
  ) => Promise<unknown>;
}

const actions: QuasarTableActionsContract = {
  async FETCH_TABLE_DATA(
    { commit, rootGetters },
    { requestParams, entityEndPoint }
  ) {
    return new Promise(async (resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const currentCompany = rootGetters[
        'auth/GET_CURRENT_COMPANY'
      ] as UserCompany;

      commit('SET_TABLE_DATA', []);

      await $http
        .get(`/${currentCompany.id}/${entityEndPoint}`, {
          params: requestParams ? requestParams : {},
        })
        .then((res: HttpResponse) => {
          commit(
            'SET_TABLE_DATA',
            (res.data.data?.data as DataRows) ?? res.data.data
          );

          resolve(res.data);
        })
        .catch((error: HttpError) => {
          Notify.create({
            message:
              error?.response?.data?.message ??
              'An unknown error occurred while fetching table data!',
            type: 'negative',
            position: 'top',
            progress: true,
            timeout: 10000,
            actions: [
              {
                label: 'Dismiss',
                color: 'white',
              },
            ],
          });

          reject(error);
        });
    });
  },
};

export default actions;