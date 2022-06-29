import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Form, Input, Button, InputNumber, Select, Divider } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { CREATE_CAR, GET_CARS, GET_PEOPLE } from '../../queries'
import Title from '../layout/Title'
import { currencyFormatter, currencyParser } from '../../utils/utilities'

const getStyles = () => ({
    formItem: { marginBottom: 10 }
})

const AddCar = () => {
    const styles = getStyles();
    const [id, setId] = useState(uuidv4());
    const [createCar] = useMutation(CREATE_CAR);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const { Option } = Select;

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
    }, []);

    // Get all people from the database.
    const { loading, error, data } = useQuery(GET_PEOPLE, {
        fetchPolicy: 'cache-and-network'
        });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    // Submit the form.
    const onFinish = values => {
        const { year, make, model, price, personId } = values;
        createCar({
            variables: { id, year, make, model, price, personId },
            update: (proxy, { data: { createCar } }) => {
                const data = proxy.readQuery({ query: GET_CARS });
                proxy.writeQuery({
                    query: GET_CARS,
                    data: {
                        ...data,
                        cars: [...data.cars, createCar]
                    }
                });
            }
        })
        form.resetFields();
        setId(uuidv4());
    }


    return (
        // Check if people is empty.
        data.people.length > 0 &&
        <>
            <Divider><Title text={'Add Car'} /></Divider>
            {/* Add Car Form */}
            <Form
                form={form}
                name='create-car-form'
                layout='inline'
                onFinish={onFinish}
                size='large'
                style={{ marginBottom: '40px' }}
            >

                <Form.Item style={styles.formItem} name="year" label="Year"
                    rules={[{ required: true, message: 'Please input your car year!' }]}>
                    <InputNumber min={1950} max={2022} placeholder="Year" />
                </Form.Item>

                <Form.Item style={styles.formItem} name="make" label="Make"
                    rules={[{ required: true, message: 'Please input your car make!' }]}>
                    <Input placeholder='Make' />
                </Form.Item>

                <Form.Item style={styles.formItem} name="model" label="Model"
                    rules={[{ required: true, message: 'Please input your car model!' }]}>
                    <Input placeholder='Model' />
                </Form.Item>

                <Form.Item style={styles.formItem} name="price" label="Price"
                    rules={[{ required: true, message: 'Please input your car price!' }]}>
                    <InputNumber min={0} step={0.01} formatter={currencyFormatter}
                        parser={currencyParser} />
                </Form.Item>

                <Form.Item style={styles.formItem} name="personId" label="Person"
                    rules={[{ required: true, message: 'Please select a person!' }]}>
                    <Select placeholder="Select a person">
                        {data.people.map(person => (
                            <Option key={person.id} value={person.id}>{person.firstName} {person.lastName}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item style={styles.formItem} shouldUpdate={true}>
                    {
                        () => (
                            <Button type="primary" htmlType='submit' disabled={
                                (!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price') && !form.isFieldTouched('personId')) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }>
                                Add Car
                            </Button>
                        )
                    }
                </Form.Item>
            </Form>
        </>
    )
}

export default AddCar;