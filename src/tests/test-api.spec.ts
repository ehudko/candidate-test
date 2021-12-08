import { ApiResponse } from '../infra/rest/api-response';
import { Restaurant } from '../logic/REST/API-Response/get-restaurants-response';
import { expect } from 'chai';


import restaurantsAPI from '../logic/REST/restaurantsAPI';

describe('Restaurants api tests', () => {

    beforeEach('Reset restaurant server', async () => {
        //Arrange
        await restaurantsAPI.resetServer();
    })

    it('Validate the deletion of a restaurant', async () => {
        //Act
        const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();
        const toDelete = 21;
        const deleted2 = await restaurantsAPI.deleteRestaurantById(toDelete);
        console.log("data: " + deleted2.data);
        console.log("obj: " + deleted2);

        //Assert
        expect(deleted2.status).to.equal(200);
        expect(deleted2.success).to.be.true;


        const getByIdResponse = await restaurantsAPI.getRestaurantById(toDelete);
        console.log("obj: " + getByIdResponse);
        //Assert
        expect(getByIdResponse.error).to.equal("restaurant with given id not found");
        expect(getByIdResponse.success).to.be.false;
        expect(getByIdResponse.status).to.equal(404);
    })

    it('Validate the editing of a restaurant', async () => {
        //Act
        // const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();

        const toEdit = 42;
        const body = { "address": "Hakotel hamaarvi" };
        const edited = await restaurantsAPI.editRestaurantById(toEdit, body);
        console.log("data: " + edited.data);
        console.log("obj: " + edited);

        //Assert
        expect(edited.status).to.equal(200);
        expect(edited.success).to.be.true;


        const getByIdResponse = await restaurantsAPI.getRestaurantById(toEdit);
        console.log("obj: " + getByIdResponse.toString());
        //Assert        
        expect(getByIdResponse.success).to.be.true;

        const myEditedRest = { "name": "Sachi's Place", "score": 4.9, "address": "Hakotel hamaarvi", "id": 42 }
        const editeddResponse = await restaurantsAPI.getRestaurantById(toEdit);

        //Assert
        expect(editeddResponse.status).to.equal(200);
        expect(editeddResponse.success).to.be.true;
        console.log()
        expect(editeddResponse.data).to.deep.equal(myEditedRest);
    })


    it('Validate the reset of a restaurant', async () => {
        console.log('aa')
        //Arrange
        const myNewRest = { address: "My Addess 2", id: 100, name: "My Restauranttest", score: 2.3 };
        const createResponse = await restaurantsAPI.createRestaurant(myNewRest);


        //Assert
        expect(createResponse.status).to.equal(201);
        expect(createResponse.success).to.be.true;

        const resetResponse = await restaurantsAPI.resetServer();
        expect(resetResponse.success).to.be.true;
        const restaurants: ApiResponse<Restaurant[]> = await restaurantsAPI.getRestaurants();
        //Assert
        expect(restaurants.success).to.be.true;
        const actualAmount = restaurants.data?.length;
        expect(actualAmount).to.equal(3, 'Restaurants amount is not as expected Reset didnt work');

    })
})