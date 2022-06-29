import { Divider } from "antd";
import AddCar from "../forms/AddCar";
import AddPerson from "../forms/AddPerson";
import Title from "../layout/Title";
import People from "../lists/People";

const Home = () => {
    return (
        <>
            <AddPerson />
            <AddCar />
            <Divider><Title text="Records" /></Divider>
            <People />
        </>
    );
}
export default Home;