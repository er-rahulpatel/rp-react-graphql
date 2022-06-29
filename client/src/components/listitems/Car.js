import { Card } from 'antd'
import { useState } from 'react'
import { EditOutlined } from '@ant-design/icons';
import DeleteCar from '../buttons/DeleteCar';
import { currencyFormatter } from '../../utils/utilities';
import UpdateCar from '../forms/UpdateCar';

const getStyles = () => ({
    card: {
        width: '100%',
        minWidth: '500px',
    }
})

const Car = ({ car, people }) => {
    const styles = getStyles();
    const [id] = useState(car.id)
    const [, setYear] = useState(car.year);
    const [, setMake] = useState(car.make);
    const [, setModel] = useState(car.model);
    const [, setPrice] = useState(car.price);
    const [, setPersonId] = useState(car.personId);
    const [editMode, setEditMode] = useState(false);

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'year':
                setYear(value);
                break;
            case 'make':
                setMake(value);
                break;
            case 'model':
                setModel(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'personId':
                setPersonId(value);
                break;
            default:
                break;
        }
    }

    return (
        editMode ?
            <UpdateCar car={car} setEditMode={setEditMode} updateParentStateVariable={updateStateVariable} people={people} />
            :
            <Card key={car.id}
                style={styles.card}
                actions={[
                    <EditOutlined key='edit' onClick={() => setEditMode(!editMode)} />,
                    <DeleteCar id={id} />
                ]}
                type='inner'
                title={`${car.year} ${car.make} ${car.model} -> ${currencyFormatter(car.price)}`}
            />
    )
}
export default Car;