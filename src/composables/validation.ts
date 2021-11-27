import { reactive, toRefs, watch, onBeforeUnmount, computed, ComputedRef } from 'vue'

export type ValidationFunction = (v: string, state?: any) => string | undefined

export type ValidationOptions = {
  [key: string]: Array<ValidationFunction>
};

export type Validator = {
  errors?: Array<string> | null
  touched?: boolean
  valid?: boolean | ComputedRef<boolean>
  validate?: any
}

type FormState = {
  [key: string]: string | any
  $validation: ValidationState
}

type ValidationState = {
  [key: string]: any | Validator
  valid: boolean | ComputedRef<boolean>
}

export function useValidation(rules: ValidationOptions) {
  const fields = Object.keys(rules)
  
  const $validation: ValidationState = reactive({
    valid: false,
  });

  const values = fields.reduce((acc: any, field) => {
    const valid = !rules[field].includes(required)
    acc[field] = "";
    // Only add the validation results if theres any validation rule
    if (rules[field].length) {
      $validation[field] = {
        errors: null,
        touched: false,
        valid,
        validate() {
          validate(state, field, rules[field])
        }
      };
    }
    return acc;
  }, {});

  $validation.valid = computed(() => {
    return Object.values($validation)
      .filter(Boolean)
      .every((v) => !!v.valid)
  })

  const state: FormState = reactive({
    ...values,
    $validation: toRefs($validation)
  })

  fields.forEach((field) => {
    const stop = watch(
      () => state[field],
      () => {
        if (rules[field].length) {
          validate(state, field, rules[field])
        }
      },
      {
        immediate: false
      }
    )

    onBeforeUnmount(stop)
  })

  return state
}

function validate(state: FormState, field: string, rules: any) {
  const value = state[field]
  const isRequired = rules.includes(required)
  const errorMessages = rules
    .map((r: any) => {
      if (!isRequired && !value) {
        return null
      }

      return r(value, state)
    })
    .filter(Boolean)

  state.$validation[field].errors = errorMessages.length ? errorMessages : null
  state.$validation[field].touched = true
  state.$validation[field].valid = !state.$validation[field].errors
}

// Validation rules
// Required
export function required(v: string){
  if (v === "") {
    return "This field is required"
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
  return (v: string, state: ValidationState) => {
    if (state[field] && state[field] !== v) {
      return `Must match the "${field}" field`;
    }
  };
}
