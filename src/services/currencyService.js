import { apiNames } from '../constants/endpointConstants'
import { getApiEndpoints } from '../utilities/commonUtility'
import { getApiData } from '../utilities/apiUtility'
import { formatCryptoCurrencyInfo } from '../utilities/currencyDataUtility'
import { getGraphInterval, getGraphOptions } from '../utilities/graphDataUtil'
import { getCurrentTimestamp, getTimestampFromDuration } from '../utilities/dateTimeUtil'

export const getCryptoCurrencyInfo = async (coinName) => {
    const currencyInfoEndpoint = getApiEndpoints(apiNames.CURRENCY_INFO, { coinName })

    const resp = await getApiData(currencyInfoEndpoint),
        currency = resp?.data?.data

    return currency ? formatCryptoCurrencyInfo(currency) : {}
}

export const getCryptoPriceGraphData = async (coinName, unit, value) => {
    const priceHistoryEndpoint = getApiEndpoints(apiNames.CURRENCY_PRICE_HISTORY),
        params = {
            exchange: 'poloniex',
            interval: getGraphInterval(unit),
            baseId: 'ethereum',
            quoteId: coinName,
            start: getTimestampFromDuration('sub', value, unit),
            end: getCurrentTimestamp()
        }

    const resp = await getApiData(priceHistoryEndpoint, params),
        graphData = resp?.data?.data;

    return graphData ? getGraphOptions(graphData) : {}
}