// in src/Roles.js
import React from 'react';


import { List, Edit, EditButton, Create, Datagrid, TextField, DisabledInput, ReferenceInput, SelectInput, SimpleForm, TextInput, Filter } from 'admin-on-rest';


export const RoleList = (props) => {
    return (
        <List {...props} filters={<RoleFilter />} >
            <Datagrid >
                <TextField source="id" />
                <TextField source="authority" />
                <EditButton />
            </Datagrid>
        </List>
    )

};

const RoleTitle = ({ record }) => {
    console.log(record)
    return <span>Role {record ? `"${record.authority}"` : ''}</span>;
};

export const RoleEdit = (props) => (
    <Edit title={<RoleTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="authority" />
        </SimpleForm>
    </Edit>
);

export const RoleCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="authority" />
        </SimpleForm>
    </Create>
);

const RoleFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="authority" />

        </ReferenceInput>
    </Filter>
);

