import { ReferenceArrayInput } from 'admin-on-rest';

// export class ReferenceInputRequired extends ReferenceInput {
// };
export class ReferenceInputRequired extends ReferenceArrayInput {
};

ReferenceInputRequired.defaultProps = Object.assign({}, ReferenceArrayInput.defaultProps);
ReferenceInputRequired.defaultProps.allowEmpty = true;
ReferenceInputRequired.defaultProps.validate = (value, _, props) => {
    if (!value) {
        return [props.translate("aor.validation.required")];
    }
};