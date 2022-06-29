import { gql } from '@apollo/client'

export const GET_PEOPLE = gql`
    {   people {
            id
            firstName
            lastName
        }
    }
`;

export const CREATE_PERSON = gql`
    mutation CreatePerson($id: String!, $firstName: String!, $lastName: String!) {
        createPerson(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;

export const UPDATE_PERSON = gql`
    mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
        updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;

export const DELETE_PERSON = gql`
    mutation DeletePerson($id: String!) {
        deletePerson(id: $id) {
            id
            firstName
            lastName
        }
    }
`;

export const GET_CARS = gql`
    {   
        cars {
            id
            year
            make
            model
            price
            personId
        }
    }
`;

export const CREATE_CAR = gql`
    mutation CreateCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
        createCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
            id
            year
            make
            model
            price
            personId
        }
    }
`;

export const UPDATE_CAR = gql`
    mutation UpdateCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!, $personId: String!) {
        updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
            id
            year
            make
            model
            price
            personId
        }
    }
`;

export const DELETE_CAR = gql`
    mutation DeleteCar($id: String!) {
        deleteCar(id: $id) {
            id
            year
            make
            model
            price
            personId
        }
    }
`;

export const GET_PERSON_WITH_CARS = gql`
    query GetPersonWithCars($id: String!) {
        personWithCars(id: $id) {
            person {
                id
                firstName
                lastName
            }
            cars {
                id
                year
                make
                model
                price
                personId
            }
        }
    }
`;