import React from "react";
import {
  List,
  Show,
  SimpleShowLayout,
  CheckboxGroupInput,
  BooleanField,
  BooleanInput,
  Edit,
  ShowButton,
  EditButton,
  Create,
  EmailField,
  Datagrid,
  TextField,
  DisabledInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
  DateField
} from "admin-on-rest";
import Chip from "material-ui/Chip";

export const UserList = props => {
  return (
    <List title="All users" {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="username" />
        <TextField source="name" />
        <EmailField source="email" />
        <RoleField label="Roles" />
        <BooleanField source="enabled" />
        <ShowButton />
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const UserShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="name" />
      <EmailField label="Email Address" source="email" type="email" />
      <BooleanField source="enabled" />
      <TextField label="Roles" source="none" />
      <RoleField />
      <DateField label="Created at" source="createAt" showTime />
      <DateField label="Modified at" source="modifiedAt" showTime />
    </SimpleShowLayout>
  </Show>
);

// <ReferenceInput label="Roles" source="roles" reference="roles" allowEmpty>
//     <CheckboxGroupInput optionText='authority' />
// </ReferenceInput>

// <ReferenceManyField reference="roles" target="roles">
// <SingleFieldList>
// <ChipField source="authority" />
// </SingleFieldList>
// </ReferenceManyField>

const styles = {
  main: { display: "flex", flexWrap: "wrap" },
  chip: { margin: 4 }
};

const RoleField = ({ record }) => {
  console.log("RECORD");
  console.log(record);
  const { authorities } = record;
  if (authorities) {
    return (
      <span style={styles.main}>
        {authorities.map(authority => (
          <Chip key={authority.id} style={styles.chip}>
            {authority.authority}
          </Chip>
        ))}
      </span>
    );
  }
  return (
    <span style={styles.main}>
      <Chip style={styles.chip}>
        None
      </Chip>
    </span>
  );
};

// const RoleInput = ({ translate, ...rest }) => (
//     <SelectInput {...rest} choices={segments.map(segment => ({ id: segment.id, name: translate(segment.name) }))} />
// );

const UserTitle = ({ record }) => {
  return <span>User {record ? `"${record.name}"` : ""}</span>;
};

export const UserEdit = props => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <DisabledInput source="username" />
      <TextInput source="name" />
      <TextInput label="Email Address" source="email" type="email" />
      <ReferenceInput label="Roles" source="roles" reference="roles" allowEmpty>
        <CheckboxGroupInput optionText="authority" />
      </ReferenceInput>
      <BooleanInput label="Enabled?" source="enabled" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="name" />
      <TextInput label="Email Address" source="email" type="email" />
      <TextInput label="Password" source="password" type="password" />
      <ReferenceInput label="Roles" source="roles" reference="roles" allowEmpty>
        <CheckboxGroupInput optionText="authority" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

// <ReferenceInput label="Role" source="authorities" reference="roles" allowEmpty validation={{ required: true }}>
//     <SelectInput optionText="authority" />
// </ReferenceInput>

// <ReferenceArrayInput source="authorities" reference="roles" label="Roles" allowEmpty>
//     <SelectArrayInput optionText="authority" />
// </ReferenceArrayInput>

// const UserFilter = (props) => (
//     <Filter {...props}>
//         <TextInput label="Search" source="q" alwaysOn />
//         <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
//             <SelectInput optionText="name" />
//         </ReferenceInput>
//     </Filter>
// );
