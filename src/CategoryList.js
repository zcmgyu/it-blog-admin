// in src/Categorys.js
import React from 'react';


import { List, Edit, EditButton, Create, Datagrid, TextField, DisabledInput, ReferenceInput, SelectInput, SimpleForm, TextInput, Filter } from 'admin-on-rest';


export const CategoryList = (props) => {
    return (
        <List {...props} filters={<CategoryFilter />} >
            <Datagrid >
                <TextField source="id" />
                <TextField source="name" />
                <EditButton />
            </Datagrid>
        </List>
    )

};

const CategoryTitle = ({ record }) => {
    console.log(record)
    return <span>Category {record ? `"${record.name}"` : ''}</span>;
};

export const CategoryEdit = (props) => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);

const CategoryFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);