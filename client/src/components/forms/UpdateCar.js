import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, Input, Select, InputNumber } from 'antd'
import { UPDATE_CAR } from '../../queries'
import { currencyFormatter, currencyParser } from '../../utils/utilities'

const getStyles = () => ({
    form: {
        border: '1px solid #ccc',
        padding: '10px',
    },
    formItem: { marginBottom: 10 }
})

const UpdateCar = ({ car, setEditMode, updateParentStateVariable, people }) => {
    const styles = getStyles();
    const [id] = useState(car.id);
    const [year, setYear] = useState(car.year);
    const [make, setMake] = useState(car.make);
    const [model, setModel] = useState(car.model);
    const [price, setPrice] = useState(car.price);
    const [personId, setPersonId] = useState(car.personId);
    const [updateCar] = useMutation(UPDATE_CAR);

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();
    const { Option } = Select;

    useEffect(() => {
        forceUpdate({})
    }, [])

    // Submit the form.
    const onFinish = values => {
        const { year, make, model, price, personId } = values;
        updateCar({
            variables: { id, year, make, model, price, personId },
        })
        form.resetFields();
        setEditMode(false);
    }

    // Update variables
    const updateStateVariable = (variable, value) => {
        updateParentStateVariable(variable, value);
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
        // Update car form
        <Form
            form={form}
            name='update-person-form'
            layout='inline'
            style={styles.form}
            onFinish={onFinish}
            initialValues={{ year, make, model, price, personId }}
        >
            <Form.Item style={styles.formItem} name="year" label="Year"
                rules={[{ required: true, message: 'Please input your car year!' }]}>
                <InputNumber placeholder='Year' min={1950} max={2022} value={year} onChange={value => updateStateVariable('year', value)} />
            </Form.Item>

            <Form.Item style={styles.formItem} name="make" label="Make"
                rules={[{ required: true, message: 'Please input your car make!' }]}>
                <Input placeholder='Make' value={make} onChange={event => updateStateVariable('make', event.target.value)} />
            </Form.Item>

            <Form.Item style={styles.formItem} name="model" label="Model"
                rules={[{ required: true, message: 'Please input your car model!' }]}>
                <Input placeholder='Model' value={model} onChange={event => updateStateVariable('model', event.target.value)} />
            </Form.Item>

            <Form.Item style={styles.formItem} name="price" label="Price"
                rules={[{ required: true, message: 'Please input your car price!' }]}>
                <InputNumber placeholder='Price' min={0} step={0.01} formatter={currencyFormatter} parser={currencyParser} value={price} onChange={value => updateStateVariable('price', value)} />
            </Form.Item>

            <Form.Item style={styles.formItem} name="personId" label="Person"
                rules={[{ required: true, message: 'Please select a person!' }]}>
                <Select placeholder='Select a person' value={personId} onChange={value => updateStateVariable('personId', value)}>
                    {people.map(person => (
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
                            Update Car
                        </Button>
                    )
                }
            </Form.Item>

            <Button onClick={() => setEditMode(false)}>Cancel</Button>
        </Form>
    )
}

export default UpdateCar;