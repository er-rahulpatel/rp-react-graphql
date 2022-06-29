import { useQuery } from '@apollo/client'
import { GET_PEOPLE } from '../../queries';
import { List } from 'antd';
import Person from '../listitems/Person';

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center'
    }
});

const People = () => {
    const styles = getStyles();

    // Get the people
    const { loading, error, data } = useQuery(GET_PEOPLE, {
        fetchPolicy: 'cache-and-network'
        });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={data.people}
            renderItem={person => (
                <List.Item key={person.id}>
                    <Person person={person} people={data.people} />
                </List.Item>
            )}
            style={styles.list}
        />
    );
}

export default People;