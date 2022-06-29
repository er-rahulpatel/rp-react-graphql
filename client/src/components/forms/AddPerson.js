import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form, Input, Button, Divider } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { CREATE_PERSON, GET_PEOPLE } from '../../queries'
import Title from '../layout/Title'

const getStyles = () => ({
    formItem: { marginBottom: 10 }
})

const AddPerson = () => {
    const styles = getStyles();
    const [id] = useState(uuidv4());
    const [createPerson] = useMutation(CREATE_PERSON);
    const [form] = Form.useForm();
    const [, forceUpdate] = useState()

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
    }, []);

    // Submit the form.
    const onFinish = values => {
        const { firstName, lastName } = values;
        createPerson({
            variables: { id, firstName, lastName },
            update: (proxy, { data: { createPerson } }) => {
                const data = proxy.readQuery({ query: GET_PEOPLE });
                proxy.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, createPerson]
                    }
                });
            }
        })
        form.resetFields();
    }


    return (
        <>
            <Divider><Title text={"Add Person"} /></Divider>
            {/* Add Person Form */}
            <Form
                form={form}
                name='create-person-form'
                layout='inline'
                onFinish={onFinish}
                size='large'
                style={{ marginBottom: '40px' }}
            >

                <Form.Item style={styles.formItem} name="firstName" label="First Name"
                    rules={[{ required: true, message: 'Please input your first name!' }]}>
                    <Input placeholder='First Name' />
                </Form.Item>

                <Form.Item style={styles.formItem} name="lastName" label="Last Name"
                    rules={[{ required: true, message: 'Please input your last name!' }]}>
                    <Input placeholder='Last Name' />
                </Form.Item>

                <Form.Item style={styles.formItem} shouldUpdate={true}>
                    {
                        () => (
                            <Button type="primary" htmlType='submit' disabled={
                                (!form.isFieldTouched('firstName') && !form.isFieldTouched('lastName')) ||
                                form.getFieldsError().filter(({ errors }) => errors.length).length
                            }>
                                Add Person
                            </Button>
                        )
                    }
                </Form.Item>
            </Form>
        </>
    )
}

export default AddPerson;