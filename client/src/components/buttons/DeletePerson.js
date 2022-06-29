import { useMutation } from '@apollo/client'
import { filter } from 'lodash'
import { DeleteOutlined } from '@ant-design/icons'
import { GET_PEOPLE, DELETE_PERSON } from '../../queries';

const DeletePerson = ({ id }) => {
    // Delete Person Mutation
    const [deletePerson] = useMutation(DELETE_PERSON, {
        update(cache, { data: { deletePerson } }) {
            const { people } = cache.readQuery({ query: GET_PEOPLE });
            cache.writeQuery({
                query: GET_PEOPLE,
                data: {
                    people: filter(people, person => person.id !== deletePerson.id)
                }
            });
        }
    });
    // Delete Person Handler
    const handleDelete = () => {
        let result = window.confirm('Are you sure you want to delete this person?');
        if (result) {
            deletePerson({ variables: { id } });
        }
    };

    return (
        // Delete Person Button
        <DeleteOutlined key='delete' onClick={handleDelete} style={{ color: 'red' }} />
    )
}
export default DeletePerson;