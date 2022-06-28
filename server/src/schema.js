import { gql } from 'apollo-server-express'
import { find, filter } from 'lodash'

const people = [
    {
        id: '1',
        firstName: 'Bill',
        lastName: 'Gates'
    },
    {
        id: '2',
        firstName: 'Steve',
        lastName: 'Jobs'
    },
    {
        id: '3',
        firstName: 'Linux',
        lastName: 'Torvalds'
    }
]

const cars = [
    {
        id: '1',
        year: '2019',
        make: 'Toyota',
        model: 'Corolla',
        price: '40000',
        personId: '1'
    },
    {
        id: '2',
        year: '2018',
        make: 'Lexus',
        model: 'LX 600',
        price: '13000',
        personId: '1'
    },
    {
        id: '3',
        year: '2017',
        make: 'Honda',
        model: 'Civic',
        price: '20000',
        personId: '1'
    },
    {
        id: '4',
        year: '2019',
        make: 'Acura ',
        model: 'MDX',
        price: '60000',
        personId: '2'
    },
    {
        id: '5',
        year: '2018',
        make: 'Ford',
        model: 'Focus',
        price: '35000',
        personId: '2'
    },
    {
        id: '6',
        year: '2017',
        make: 'Honda',
        model: 'Pilot',
        price: '45000',
        personId: '2'
    },
    {
        id: '7',
        year: '2019',
        make: 'Volkswagen',
        model: 'Golf',
        price: '40000',
        personId: '3'
    },
    {
        id: '8',
        year: '2018',
        make: 'Kia',
        model: 'Sorento',
        price: '45000',
        personId: '3'
    },
    {
        id: '9',
        year: '2017',
        make: 'Volvo',
        model: 'XC40',
        price: '55000',
        personId: '3'
    }
]

const typeDefs = gql`
	type Person {
		id: String!
		firstName: String
		lastName: String
	}
	type Car {
		id: String!
		year: Int
		make: String
		model: String
		price: Float
		personId: String
	}

	type PersonWithCars {
		person: Person
		cars: [Car]
	}

	type Query {
		person(id: String!): Person
		people: [Person]
		car(id: String!): Car
		cars: [Car]
		personWithCars(id: String!): PersonWithCars
	}
`;

const resolvers = {
    Query: {
        person: (parent, args, context, info) =>{
            return find(people, { id: args.id })
        },

        people: () => people,

        car: (parent, args, context, info) =>  {
            return find(cars, { id: args.id })
        },

        cars: () => cars,

        personWithCars: (parent, args, context, info) => {
            const personCars = filter(cars, { personId: args.id });
            const person = find(people, { id: args.id })
            return {
                person: person,
                cars: personCars
            };
        }
    },
}

export { typeDefs, resolvers }