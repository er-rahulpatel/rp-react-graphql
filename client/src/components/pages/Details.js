import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client'
import { GET_PERSON_WITH_CARS } from '../../queries';
import { Card } from "antd";
import DetailPageCars from "../lists/DetailPageCars";

const Details = () => {
    const { personId } = useParams();

    // Get the person and cars
    const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
        variables: { id: personId },
        fetchPolicy: 'cache-and-network',
    });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <>
            <Card style={{ width: '100%' }} title={`${data.personWithCars.person.firstName} ${data.personWithCars.person.lastName}`}
                extra={<Link to={"/"}>Go Back Home</Link>} >
                <DetailPageCars cars={data.personWithCars.cars} />
            </Card>
        </>
    );
}
export default Details;