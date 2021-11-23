/*
import { reactive, toRefs, watch, onBeforeUnmount, computed, ComputedRef } from 'vue'

type ValidationOptions = {
  [key: string]: Array<(v: string) => string | undefined>;
};

type ValidatorParent = {
  [key: string]: Validator
}

type Validator = {
  errors?: Array<string> | null
  touched?: boolean
  valid?: boolean | ComputedRef<boolean>
  validate?: any
}

type X = { [key: string]: Validator | boolean | ComputedRef<boolean> }

export default function (rules: ValidationOptions) {
  const fields = Object.keys(rules);
  const $validation: X = reactive({
    valid: false
  });

  const values = fields.reduce((acc: ValidatorParent, field) => {
    const valid = !rules[field].includes(required);
    acc[field] = {};
    // Only add the validation results if theres any validation rule
    if (rules[field].length) {
      $validation[field] = {
        errors: null,
        touched: false,
        valid,
        validate() {
          validate(state, field, rules[field]);
        }
      };
    }
    return acc;
  }, {} );

  $validation.valid = computed(() => {
    return Object.values($validation)
      .filter(Boolean)
      .every((v) => !!v);
  });

  const state = reactive({
    ...values,
    $validation: toRefs($validation)
  });

  fields.forEach((field) => {
    // const isRequired = rules[field].includes(required);
    const stop = watch(
      () => state[field],
      () => {
        if (rules[field].length) {
          validate(state, field, rules[field]);
        }
      },
      {
        immediate: false
      }
    );

    onBeforeUnmount(stop);
  });

  return state;
}

function validate(state, field, rules) {
  const value = state[field];
  const isRequired = rules.includes(required);
  const errorMessages = rules
    .map((r) => {
      if (!isRequired && !value) {
        return null;
      }

      return r(value, state);
    })
    .filter(Boolean);

  state.$validation[field].errors = errorMessages.length ? errorMessages : null;
  state.$validation[field].touched = true;
  state.$validation[field].valid = !state.$validation[field].errors;
}

// Validation rules
// Required
export function required(v: string) {
  if (v === "") {
    return "This field is required";
  }
}

// Email
export function email(v: string) {
  const email = /^[a-z\d!#$%&'*+\-/=?^_`{|}~]+@([\w-]+\.)+[\w-]{2,4}$/gi;
  if (!email.test(v)) {
    return "This is not a valid email";
  }
}

// Min length
export function minLength(len: number) {
  return function (v: string) {
    if (v.trim().length < len) {
      return `The min length is ${len}`;
    }
  };
}

// Password validation
export function password(v: string) {
  const valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g.test(v);

  if (!valid) {
    return "Must contain numbers, lowercase and uppercase letters";
  }
}

// Validate than the value is the same as the given
export function sameAs(field: string) {
  return (v, state) => {
    if (state[field] && state[field] !== v) {
      return `Must match the "${field}" field`;
    }
  };
}
 */