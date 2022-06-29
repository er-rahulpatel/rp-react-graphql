import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { UPDATE_PERSON } from '../../queries'

const getStyles = () => ({
    form: {
        padding: '10px',
        backgroundColor: '#fafafa',
    },
    formItem: { marginBottom: 10 }
})

const UpdatePerson = ({ person, setEditMode, updateParentStateVariable }) => {
    const styles = getStyles();
    const [id] = useState(person.id);
    const [firstName, setFirstName] = useState(person.firstName);
    const [lastName, setLastName] = useState(person.lastName);
    const [updatePerson] = useMutation(UPDATE_PERSON);

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate({})
    }, [])

    // Submit the form.
    const onFinish = values => {
        const { firstName, lastName } = values;
        updatePerson({
            variables: { id, firstName, lastName },
        })
        form.resetFields();
        setEditMode(false);
    }
    // Update variables
    const updateStateVariable = (variable, value) => {
        updateParentStateVariable(variable, value);
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
        // Update person form
        <Form
            form={form}
            name='update-person-form'
            layout='inline'
            style={styles.form}
            onFinish={onFinish}
            initialValues={{ firstName, lastName }}
        >
            <Form.Item style={styles.formItem} name="firstName" label="First Name"
                rules={[{ required: true, message: 'Please input your first name!' }]}>
                <Input placeholder='First Name' value={firstName} onChange={event => updateStateVariable('firstName', event.target.value)} />
            </Form.Item>

            <Form.Item style={styles.formItem} name="lastName" label="Last Name"
                rules={[{ required: true, message: 'Please input your last name!' }]}>
                <Input placeholder='Last Name' value={lastName} onChange={event => updateStateVariable('lastName', event.target.value)} />
            </Form.Item>

            <Form.Item style={styles.formItem} shouldUpdate={true}>
                {
                    () => (
                        <Button type='primary' htmlType='submit' disabled={
                            (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }>Update Person</Button>
                    )
                }
            </Form.Item>

            <Button onClick={() => setEditMode(false)}>Cancel</Button>
        </Form>
    )
}

export default UpdatePerson;