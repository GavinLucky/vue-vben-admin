import { getOnlineWordTypeOptionsApi } from '#/api/rg-modules/risk-control/words-online-api';

export function useOnlineRequest() {
  const getOnlineWordTypeOptionsApiFn = () => {
    return getOnlineWordTypeOptionsApi();
  };
  return {
    getOnlineWordTypeOptionsApiFn,
  };
}
