import { Card, Divider } from 'antd'
import { useState } from 'react'
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import DeletePerson from '../buttons/DeletePerson';
import Cars from '../lists/Cars';
import UpdatePerson from '../forms/UpdatePerson';

const getStyles = () => ({
    card: {
        width: '100%',
        minWidth: '500px',
        border: '1px solid #ccc',
    }
})

const Person = ({ person, people }) => {
    const styles = getStyles();
    const [id] = useState(person.id);
    const [, setFirstName] = useState(person.firstName);
    const [, setLastName] = useState(person.lastName);
    const [editMode, setEditMode] = useState(false);

    const updateStateVariable = (variable, value) => {
        switch (variable) {
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            default:
                break;
        }
    }

    return (
        editMode ?
            <Card style={styles.card}
                key={person.id}>
                <UpdatePerson person={person} setEditMode={setEditMode} updateParentStateVariable={updateStateVariable} />
                <Divider />
                <Cars personId={id} people={people} />
                <Link to={`/people/${id}`}>Learn More</Link>
            </Card>
            :
            <Card style={styles.card}
                actions={[
                    <EditOutlined key='edit' onClick={() => setEditMode(!editMode)} />,
                    <DeletePerson id={id} />
                ]}
                title={`${person.firstName} ${person.lastName}`}
                key={person.id}
            >
                <Cars personId={id} people={people} />
                <Link to={`/people/${id}`}>Learn More</Link>

            </Card>
    )
}
export default Person;