// in src/posts.js
import React from 'react';

import { List, Edit, Create, Datagrid, TextField, DisabledInput, ReferenceManyField, ChipField, SingleFieldList, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextInput, Filter } from 'admin-on-rest';


export const PostList = (props) => {
    return (
        <List {...props} filters={<PostFilter />} >
            <Datagrid >
                <TextField source="id" />
                <ReferenceField label="Author" source="authorId" reference="users">
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="title" />
                <TextField source="categoryId" />
                
                <ReferenceManyField label="Test" reference="roles" target="roles">
                <SingleFieldList>
                    <ChipField source="authority" />
                </SingleFieldList>
            </ReferenceManyField>
            </Datagrid>
        </List>
    )

};

// <TagsField label="tags" />

// const styles = {
//     main: { display: 'flex', flexWrap: 'wrap' },
//     chip: { margin: 4 },
// };

// const TagsField = ({ record }) => {
//     return (
//         <span style={styles.main}>
//             {
//                 record.tags.map(tag => (<Chip key={tag} style={styles.chip}>{tag}</Chip>))
//             }
//         </span>
//     )
// }


const PostTitle = ({ record }) => {
    console.log(record)
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};

export const PostEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <ReferenceInput label="User" source="userId" reference="users">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="title" />
            
        </SimpleForm>
    </Create>
);

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);