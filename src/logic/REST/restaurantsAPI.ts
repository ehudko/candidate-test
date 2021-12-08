import { ApiResponse } from '../../infra/rest/api-response';
import HttpRequest from '../../infra/rest/network-request';
import { Restaurant } from "./API-Response/get-restaurants-response";
import jsonConfig from '../../../config.json';

const baseUrl = jsonConfig.baseUrl + '/';

const getRestaurants = async (): Promise<ApiResponse<Restaurant[]>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurants', method: HttpRequest.HttpMethod.GET, });

}

const resetServer = async (): Promise<ApiResponse<null>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'reset', method: HttpRequest.HttpMethod.POST, });

}

const createRestaurant = async (body: Restaurant): Promise<ApiResponse<null>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant', method: HttpRequest.HttpMethod.POST, body: body })
}

const getRestaurantById = async (id: number): Promise<ApiResponse<Restaurant[]>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant', method: HttpRequest.HttpMethod.GET, queryParams: { id: id } });
}

const deleteRestaurantById = async (id: number): Promise<ApiResponse<Object>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant/' + id, method: HttpRequest.HttpMethod.DELETE, });
}

const editRestaurantById = async (id: number, body: Object): Promise<ApiResponse<Object>> => {
    return HttpRequest.networkRequest({ url: baseUrl + 'restaurant/' + id, method: HttpRequest.HttpMethod.PATCH, body: body });
}

export default { editRestaurantById, deleteRestaurantById, getRestaurants, resetServer, createRestaurant, getRestaurantById }